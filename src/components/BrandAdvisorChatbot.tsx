import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Zap,
  Bot,
  User,
} from 'lucide-react';
import {
  FullBrandAuditResult,
  SmartBrandSuggestion,
  generateAdvisorChatResponse,
  buildChatbotSystemPrompt,
  extractBrandSuggestionsFromAiText,
} from '../utils/brandEngine';

interface BrandAdvisorChatbotProps {
  audit: FullBrandAuditResult;
  useCloudAi: boolean;
  onApplySuggestedBrand: (newBrandName: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  suggestions?: SmartBrandSuggestion[];
  timestamp: string;
}

const QUICK_QUESTION_CHIPS = [
  'Tại sao mình nên dùng tên miền gợi ý thay vì tên gốc?',
  'Gợi ý giúp mình 3 tên thương hiệu mới sát với sản phẩm',
  'Làm sao để sửa các điểm bị trừ của tên này?',
  'Mình nên chọn câu khẩu hiệu nào để chạy quảng cáo bán hàng?',
];

function sanitizeChatReply(text: string): string {
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*--\s*/g, ', ')
    .trim();
}

// Hàm xoay vòng 3 Key Gemini trực tiếp trên trình duyệt (dành cho bản deploy tĩnh .github.io)
async function callClientSideGeminiWithRotation(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  question: string
): Promise<string | null> {
  const rawEnvKey =
    (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) || '';
  const keys = rawEnvKey
    .split(',')
    .map((k) => k.trim().replace(/^["']|["']$/g, ''))
    .filter((k) => k && k !== 'MY_GEMINI_API_KEY');

  if (keys.length === 0) return null;

  const transcript = history
    .map((m) => `${m.role === 'user' ? 'Khách hỏi' : 'Mình trả lời'}: ${m.content}`)
    .join('\n');
  const fullPrompt = transcript
    ? `${transcript}\n\nKhách hỏi tiếp: "${question}"`
    : question;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        key
      )}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(4000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (typeof reply === 'string' && reply.trim()) {
          return sanitizeChatReply(reply);
        }
      }
    } catch {
      // Tự động thử sang Key tiếp theo trong danh sách
    }
  }
  return null;
}

// Hàm gọi trực tiếp LLM miễn phí Pollinations trên trình duyệt (hoạt động cả trên .github.io)
async function callClientSidePollinations(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  question: string
): Promise<string | null> {
  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
      { role: 'user', content: question },
    ];
    const res = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(4500),
      body: JSON.stringify({
        model: 'openai',
        messages,
        temperature: 0.7,
      }),
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        const text = json?.choices?.[0]?.message?.content;
        if (typeof text === 'string' && text.trim()) {
          return sanitizeChatReply(text);
        }
      } else {
        const raw = await res.text();
        if (raw && raw.trim()) return sanitizeChatReply(raw);
      }
    }
  } catch {
    // Fallback
  }
  return null;
}

export const BrandAdvisorChatbot: React.FC<BrandAdvisorChatbotProps> = ({
  audit,
  onApplySuggestedBrand,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const buildWelcomeMessage = (currentAudit: FullBrandAuditResult): ChatMessage => {
    const { input, scores, bestDomain } = currentAudit;
    return {
      id: `welcome-${input.domainSlug}`,
      role: 'assistant',
      text: `Chào bạn, mình đang xem tên "${input.cleanBrandName}" của bạn đây. Tên này hiện đạt ${scores.pronunciationScore} điểm dễ đọc, ${scores.memorabilityScore} điểm dễ nhớ và ${scores.relevanceScore} điểm khớp với sản phẩm. Tên miền đáng mua nhất đang là ${bestDomain.domain}.\n\nBạn có thể hỏi mình bất kỳ câu hỏi nào về cách đặt tên, chọn tên miền, sửa điểm yếu hoặc viết nội dung quảng cáo nhé.`,
      timestamp: 'Trợ lý AI trực tuyến',
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    buildWelcomeMessage(audit),
  ]);

  useEffect(() => {
    setMessages((prev) => {
      const welcome = buildWelcomeMessage(audit);
      if (prev.length <= 1) {
        return [welcome];
      }
      return [welcome, ...prev.slice(1)];
    });
  }, [audit.input.cleanBrandName, audit.input.brandDescription, audit.bestDomain.domain]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, isOpen]);

  const handleAskQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: 'Vừa xong',
    };

    const conversationHistory = messages
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    const systemPrompt = buildChatbotSystemPrompt(audit);
    const localReply = generateAdvisorChatResponse(trimmed, audit);

    let finalAnswerText = '';
    const startTime = Date.now();

    // Tầng 1: Thử gọi qua Backend /api/ai-chat (khi chạy local với server.ts)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3500),
        body: JSON.stringify({
          question: trimmed,
          systemPrompt,
          history: conversationHistory,
          brandName: audit.input.cleanBrandName,
          brandDescription: audit.input.brandDescription,
          industryLabel: audit.industry.label,
          emotionLabel: audit.emotion.label,
          scores: {
            pronunciation: audit.scores.pronunciationScore,
            memorability: audit.scores.memorabilityScore,
            relevance: audit.scores.relevanceScore,
          },
          bestDomain: audit.bestDomain.domain,
          bestDomainScore: audit.bestDomain.domainScore,
          originalDomain: audit.domains[0]?.domain,
          tagline: audit.marketing.tagline,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && typeof json.answer === 'string' && json.answer.trim()) {
          finalAnswerText = json.answer.trim();
        }
      }
    } catch {
      // Nếu chạy trên .github.io (không có server.ts), tự động chuyển sang Tầng 2 & 3
    }

    // Tầng 2: Nếu trên .github.io, xoay vòng 3 Key Gemini trực tiếp từ trình duyệt
    if (!finalAnswerText) {
      const clientGemini = await callClientSideGeminiWithRotation(
        systemPrompt,
        conversationHistory,
        trimmed
      );
      if (clientGemini) {
        finalAnswerText = clientGemini;
      }
    }

    // Tầng 3: Nếu hết cả 3 Key hoặc chưa cấu hình Key, gọi thẳng LLM Pollinations từ trình duyệt
    if (!finalAnswerText) {
      const clientPollinations = await callClientSidePollinations(
        systemPrompt,
        conversationHistory,
        trimmed
      );
      if (clientPollinations) {
        finalAnswerText = clientPollinations;
      }
    }

    const elapsed = Date.now() - startTime;
    if (elapsed < 420) {
      await new Promise((r) => setTimeout(r, 420 - elapsed));
    }

    const answerToDisplay = finalAnswerText || localReply.answerMarkdown;
    const extractedFromAi = extractBrandSuggestionsFromAiText(answerToDisplay, audit);
    const mergedSuggestions =
      extractedFromAi.length > 0 ? extractedFromAi : localReply.suggestions;

    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: answerToDisplay,
        suggestions: mergedSuggestions,
        timestamp: finalAnswerText ? 'Chuyên gia AI trực tuyến' : 'Tư vấn tức thì',
      },
    ]);
    setIsThinking(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleAskQuestion(inputText);
  };

  const renderFormattedLine = (line: string, idx: number, isUser: boolean) => {
    const normalizedLine = line.replace(/\*\*`([^`]+)`\*\*/g, '`$1`');
    const parts = normalizedLine.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
    return (
      <p key={idx} className="leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong
                key={i}
                className={`font-bold ${isUser ? 'text-white' : 'text-slate-900'}`}
              >
                {part.slice(2, -2).replace(/`/g, '')}
              </strong>
            );
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={i}
                className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[11px] font-bold text-indigo-700 border border-indigo-200"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return (
              <em
                key={i}
                className={`italic ${isUser ? 'text-indigo-100' : 'text-indigo-700'}`}
              >
                {part.slice(1, -1)}
              </em>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  return (
    <div
      aria-label="Hỏi đáp cách đặt tên và chọn tên miền"
      className="fixed bottom-16 right-4 lg:right-8 z-40 flex flex-col items-end"
    >
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cửa sổ hỏi đáp chọn tên thương hiệu và tên miền"
          className="mb-3 flex h-[540px] max-h-[calc(100vh-140px)] w-[360px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/98 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.18)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-gradient-to-r from-indigo-50 via-white to-emerald-50/70 px-3.5 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-2xs">
                <Bot className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-xs font-extrabold text-slate-900">
                  Trợ lý AI Tư vấn Thương hiệu & Tên miền
                </h3>
                <div className="truncate text-[10px] text-emerald-700 font-semibold">
                  Đang nắm rõ hồ sơ: <strong>{audit.input.cleanBrandName}</strong> ({audit.scores.relevanceScore}/100đ)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Thu gọn cửa sổ hỏi đáp"
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages History */}
          <div className="flex-1 overflow-y-auto bg-slate-50/60 p-3 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 space-y-1.5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] mb-0.5">
                    {msg.role === 'assistant' ? (
                      <>
                        <Sparkles className="h-3 w-3 text-indigo-600" />
                        <span className="font-semibold text-indigo-700">
                          {msg.timestamp}
                        </span>
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3 text-indigo-100" />
                        <span className="text-indigo-100 font-medium">Bạn</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    {msg.text
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((paragraph, pIdx) =>
                        renderFormattedLine(paragraph, pIdx, msg.role === 'user')
                      )}
                  </div>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2.5 space-y-2 border-t border-slate-200 pt-2.5">
                      <div className="text-[10px] font-bold text-slate-600">
                        Bấm để thẩm định ngay tên thương hiệu gợi ý:
                      </div>
                      {msg.suggestions.map((sug) => (
                        <div
                          key={sug.brandName}
                          className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                              <span className="text-xs font-extrabold text-slate-900">
                                {sug.brandName}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-emerald-700">
                                ({sug.recommendedDomain})
                              </span>
                            </div>
                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                              ~{sug.estimatedScore}/100đ
                            </span>
                          </div>
                          <p className="mt-1 text-[10px] text-slate-600 leading-snug">
                            {sug.rationale}
                          </p>
                          <button
                            type="button"
                            onClick={() => onApplySuggestedBrand(sug.brandName)}
                            className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-indigo-500 transition-all cursor-pointer shadow-2xs"
                          >
                            <Zap className="h-3 w-3 text-amber-300" />
                            <span>Dùng thử tên này ({sug.brandName})</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-indigo-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-indigo-700 shadow-2xs">
                <div className="flex items-center gap-1" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
                </div>
                <span>Đang suy nghĩ câu trả lời sát với sản phẩm của bạn...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips Bar */}
          <div className="border-t border-slate-200 bg-white px-2.5 py-2">
            <div className="text-[10px] font-semibold text-slate-500 mb-1 px-0.5">
              Bấm chọn câu hỏi nhanh hoặc tự gõ câu hỏi bất kỳ:
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {QUICK_QUESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  disabled={isThinking}
                  onClick={() => void handleAskQuestion(chip)}
                  className="rounded-lg border border-indigo-200 bg-indigo-50/70 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 hover:border-indigo-400 hover:bg-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-1.5 border-t border-slate-200 bg-slate-50 p-2.5"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Hỏi bất kỳ điều gì về "${audit.input.cleanBrandName}"...`}
              aria-label="Nhập câu hỏi về tên thương hiệu"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isThinking}
              aria-label="Gửi câu hỏi"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 p-2 text-white hover:bg-indigo-500 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Mở cửa sổ hỏi đáp đặt tên thương hiệu"
        className="group relative inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-[0_12px_28px_-6px_rgba(79,70,229,0.55)] hover:from-indigo-500 hover:to-violet-500 transition-all cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <MessageSquare className="h-4 w-4 text-white" />
        <span>Hỏi thêm về tên này</span>
      </button>
    </div>
  );
};