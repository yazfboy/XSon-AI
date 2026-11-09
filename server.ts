import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

function sanitizeHumanText(text: string): string {
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*--\s*/g, ', ')
    .trim();
}

// Tách danh sách 3 API Keys từ biến GEMINI_API_KEY trong file .env (ngăn cách bởi dấu phẩy)
function getGeminiApiKeys(): string[] {
  const raw = process.env.GEMINI_API_KEY || '';
  return raw
    .split(',')
    .map((k) => k.trim().replace(/^["']|["']$/g, ''))
    .filter((k) => k && k !== 'MY_GEMINI_API_KEY');
}

// Hàm tự động xoay vòng qua từng Key (Key 1 hết hạn/lỗi -> tự động đổi sang Key 2 -> Key 3)
async function callGeminiWithKeyRotation<T>(
  runner: (ai: GoogleGenAI, modelName: string) => Promise<T>
): Promise<T | null> {
  const keys = getGeminiApiKeys();
  if (keys.length === 0) return null;

  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash'];

  for (let i = 0; i < keys.length; i++) {
    const apiKey = keys[i];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const result = await runner(ai, modelName);
        return result;
      } catch (err) {
        console.warn(`[XSon AI] Key #${i + 1} (${modelName}) gặp lỗi hoặc hết token, đang tự động chuyển sang Key tiếp theo...`);
      }
    }
  }
  return null;
}

// Server-side Hybrid Marketing Copy Generation (Tier 1: 3-Key Gemini Rotation -> Tier 2: Pollinations OpenAI)
app.post('/api/ai-enhance', async (req, res) => {
  try {
    const { brandName, industryLabel, emotionLabel, domainSlug, brandDescription } = req.body || {};
    if (!brandName) {
      res.status(400).json({ error: 'Thiếu tên thương hiệu (brandName).' });
      return;
    }

    const prompt = `Bạn là một người làm marketing thực chiến tại Việt Nam.
Hãy viết bộ câu định vị (Tagline) và 3 câu khẩu hiệu bán hàng (Slogan) ngắn gọn, đời thường, nói thẳng vào sản phẩm cho thương hiệu sau:
- Tên thương hiệu: "${brandName}" (Tên miền viết liền: ${domainSlug})
- Lĩnh vực: ${industryLabel}
- Cá tính thương hiệu: ${emotionLabel}
- Mô tả sản phẩm: "${brandDescription || industryLabel}"

Quy tắc bắt buộc:
- Tuyệt đối KHÔNG dùng dấu gạch ngang dài (—).
- Tuyệt đối KHÔNG dùng các từ sáo rỗng như: kiến tạo, vươn tầm, định hình tương lai, bứt phá giới hạn, tiên phong, giải pháp toàn diện, nâng tầm trải nghiệm, chìa khóa thành công.
- Mỗi câu chỉ dài từ 5 đến 12 chữ, cụ thể, dễ hiểu với khách mua hàng.

Yêu cầu trả về đúng định dạng JSON gồm:
1. tagline: 01 câu định vị ngắn gọn gắn dưới logo.
2. taglineRationale: Giải thích ngắn gọn vì sao câu này hợp với sản phẩm (1 câu tự nhiên).
3. sloganPhonetic: Khẩu hiệu số 1 có nhịp điệu hoặc vần tai để đọc một lần là nhớ.
4. sloganEmotional: Khẩu hiệu số 2 tạo thiện cảm, sự tin cậy và gần gũi.
5. sloganAction: Khẩu hiệu số 3 nêu rõ lợi ích cụ thể và mời khách đặt hàng ngay.`;

    const geminiResult = await callGeminiWithKeyRotation(async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tagline: { type: Type.STRING },
              taglineRationale: { type: Type.STRING },
              sloganPhonetic: { type: Type.STRING },
              sloganEmotional: { type: Type.STRING },
              sloganAction: { type: Type.STRING },
            },
            required: [
              'tagline',
              'taglineRationale',
              'sloganPhonetic',
              'sloganEmotional',
              'sloganAction',
            ],
          },
        },
      });
      return JSON.parse((response.text ?? '{}').trim());
    });

    if (geminiResult) {
      res.json({
        success: true,
        data: {
          tagline: sanitizeHumanText(geminiResult.tagline || ''),
          taglineRationale: sanitizeHumanText(geminiResult.taglineRationale || ''),
          sloganPhonetic: sanitizeHumanText(geminiResult.sloganPhonetic || ''),
          sloganEmotional: sanitizeHumanText(geminiResult.sloganEmotional || ''),
          sloganAction: sanitizeHumanText(geminiResult.sloganAction || ''),
        },
      });
      return;
    }

    // Tier 2: Zero-config OpenAI-compatible LLM via text.pollinations.ai
    const pollRes = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'system',
            content:
              'Bạn là chuyên gia copywriting thực chiến tại Việt Nam. Chỉ trả về đúng 1 JSON object hợp lệ với các trường: tagline, taglineRationale, sloganPhonetic, sloganEmotional, sloganAction. Tuyệt đối không dùng dấu gạch ngang dài (—).',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (pollRes.ok) {
      const pollJson = (await pollRes.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const rawText = pollJson.choices?.[0]?.message?.content || '{}';
      const cleanedJson = rawText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanedJson);
      res.json({
        success: true,
        data: {
          tagline: sanitizeHumanText(parsed.tagline || ''),
          taglineRationale: sanitizeHumanText(parsed.taglineRationale || ''),
          sloganPhonetic: sanitizeHumanText(parsed.sloganPhonetic || ''),
          sloganEmotional: sanitizeHumanText(parsed.sloganEmotional || ''),
          sloganAction: sanitizeHumanText(parsed.sloganAction || ''),
        },
      });
      return;
    }

    res.status(503).json({
      error: 'Đang dùng bộ gợi ý câu chữ trực tiếp trên máy.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi kết nối máy chủ';
    res.status(500).json({ error: message });
  }
});

// Server-side 2-Tier Real LLM Endpoint for Context-Aware Brand Advisor Chatbot
app.post('/api/ai-chat', async (req, res) => {
  try {
    const {
      question,
      systemPrompt,
      history,
      brandName,
      brandDescription,
      industryLabel,
      emotionLabel,
      scores,
      bestDomain,
      bestDomainScore,
      originalDomain,
      tagline,
    } = req.body || {};

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Thiếu câu hỏi (question).' });
      return;
    }

    const effectiveSystemPrompt =
      systemPrompt ||
      `Bạn là một chuyên gia tư vấn đặt tên thương hiệu, kiểm tra tên miền và marketing thực chiến tại Việt Nam đang trò chuyện trực tiếp với chủ shop.
Xưng "mình" và gọi người dùng là "bạn". Tuyệt đối KHÔNG dùng dấu gạch ngang dài (—).
Thông tin thương hiệu đang thẩm định:
- Tên thương hiệu: "${brandName}"
- Mô tả sản phẩm: "${brandDescription}"
- Lĩnh vực: ${industryLabel} | Cá tính: ${emotionLabel}
- 3 Điểm số: Độ dễ đọc ${scores?.pronunciation}/100, Độ dễ nhớ ${scores?.memorability}/100, Độ khớp sản phẩm ${scores?.relevance}/100
- Tên miền gốc: ${originalDomain} | Tên miền đáng mua nhất: ${bestDomain} (${bestDomainScore}/100)
- Câu định vị: "${tagline}"`;

    const historyTranscript = Array.isArray(history)
      ? history
          .slice(-6)
          .map((m: { role?: string; content?: string }) =>
            `${m.role === 'user' ? 'Khách hỏi' : 'Mình trả lời'}: ${m.content || ''}`
          )
          .join('\n')
      : '';

    // TIER 1: 3-Key Auto-Rotation Google Gemini API
    const geminiReply = await callGeminiWithKeyRotation(async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: historyTranscript
          ? `${historyTranscript}\n\nKhách hỏi tiếp: "${question}"`
          : question,
        config: {
          systemInstruction: effectiveSystemPrompt,
          temperature: 0.7,
        },
      });
      const text = sanitizeHumanText(response.text ?? '');
      if (!text) throw new Error('Empty response');
      return text;
    });

    if (geminiReply) {
      res.json({
        success: true,
        answer: geminiReply,
        source: 'gemini',
      });
      return;
    }

    // TIER 2 (Zero-config default): Free OpenAI-compatible LLM via https://text.pollinations.ai/openai
    const chatMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: effectiveSystemPrompt },
    ];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((m: { role?: string; content?: string }) => {
        if (m && typeof m.content === 'string' && m.content.trim()) {
          chatMessages.push({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content.trim(),
          });
        }
      });
    }

    chatMessages.push({ role: 'user', content: question.trim() });

    const pollRes = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(4000),
      body: JSON.stringify({
        model: 'openai',
        messages: chatMessages,
        temperature: 0.7,
      }),
    });

    if (pollRes.ok) {
      const contentType = pollRes.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const pollJson = (await pollRes.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const aiReply = sanitizeHumanText(
          pollJson.choices?.[0]?.message?.content || ''
        );
        if (aiReply) {
          res.json({
            success: true,
            answer: aiReply,
            source: 'pollinations_openai',
          });
          return;
        }
      } else {
        const rawText = sanitizeHumanText(await pollRes.text());
        if (rawText) {
          res.json({
            success: true,
            answer: rawText,
            source: 'pollinations_openai',
          });
          return;
        }
      }
    }

    res.status(200).json({
      success: false,
      fallback: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi kết nối AI API';
    res.status(200).json({ success: false, error: message });
  }
});

// Server-side 2-Tier AI Generative Logo Director Endpoint
app.post('/api/ai-logo-director', async (req, res) => {
  try {
    const { brandName, industryLabel, brandDescription, seed } = req.body || {};
    if (!brandName) {
      res.status(200).json({ success: false, fallback: true });
      return;
    }

    const prompt = `Bạn là Giám đốc Sáng tạo Thương hiệu (Creative Logo Director).
Hãy phân tích sâu thông tin thương hiệu dưới đây để thiết kế 02 mẫu Logo độc bản, KHÔNG dùng khuôn mẫu có sẵn, bám sát từng chữ trong mục Miêu tả sản phẩm:
- Tên thương hiệu: "${brandName}"
- Lĩnh vực kinh doanh: "${industryLabel || 'Đa ngành'}"
- Miêu tả sơ qua về thương hiệu / sản phẩm (bán gì, cho ai, có gì đặc biệt?): "${brandDescription || industryLabel || ''}"
- Seed sáng tạo: ${seed || 1}

Hãy trả về đúng định dạng JSON gồm các trường:
1. whatTheySellLabel: Cụm ngắn gọn (3-6 chữ) nêu chính xác bán sản phẩm/dịch vụ gì từ mô tả.
2. whoTheyServeLabel: Cụm ngắn gọn (3-6 chữ) nêu đối tượng khách hàng phục vụ từ mô tả.
3. whatIsSpecialLabel: Cụm ngắn gọn (4-8 chữ) nêu điểm đặc biệt/khác biệt từ mô tả.
4. primaryPrimitive: Chọn 1 biểu tượng chính sát nhất trong danh sách: "phone_mobile", "shop_cart", "chart_growth", "lightning_fast", "flame_hot", "leaf_organic", "droplet_pure", "coffee_mug", "bakery_food", "sports_car", "wheel_speed", "camera_lens", "sound_stage", "dress_fashion", "gem_luxury", "lotus_spa", "tooth_dental", "heart_care", "paw_pet", "building_arch", "airplane_globe", "book_grad", "ai_spark", "shield_trust", "sun_horizon", "star_crown", "gift_box", "clock_247".
5. secondaryPrimitive: Chọn 1 biểu tượng phụ bổ trợ khác với primaryPrimitive từ danh sách trên để kết hợp tạo sự độc đáo riêng cho mô tả này.
6. uspEffect: Chọn 1 hiệu ứng thị giác thể hiện điểm đặc biệt: "speed_trails", "organic_halo", "sparkle_stars", "orbital_rings", "sound_waves", "precision_grid", "sunburst_rays", "shield_aura".
7. archetype01: Chọn 1 bố cục nghệ thuật cho Logo 01: "fusion_monogram", "kinetic_horizon", "orbital_constellation", "editorial_atelier", "organic_bloom", "bauhaus_modular", "circular_stamp", "isometric_prism".
8. archetype02: Chọn 1 bố cục nghệ thuật khác hẳn archetype01 cho Logo 02 từ danh sách trên.
9. primaryHex: Mã màu Hex chủ đạo hợp cảm xúc sản phẩm (VD: "#2563EB", "#059669", "#7C3AED", "#F97316", "#E11D48", "#0284C7").
10. secondaryHex: Mã màu Hex chuyển sắc phụ hài hòa.
11. accentHex: Mã màu Hex điểm nhấn sáng nổi bật.
12. fontStyle: Chọn 1 trong 3: "serif_luxury", "sans_modern", "geometric_tech".
13. creativeNarrative01: 1 câu tiếng Việt tự nhiên giải thích vì sao Logo 01 kết hợp các hình ảnh trên từ mô tả sản phẩm (không dùng dấu —).
14. creativeNarrative02: 1 câu tiếng Việt tự nhiên giải thích ý nghĩa sáng tạo của Logo 02 (không dùng dấu —).
15. customSvgMarkup01: (Tùy chọn) Chuỗi thẻ SVG (<path>, <circle>, <polygon>) trong hệ tọa độ tâm (0,0) bán kính [-75, 75] vẽ nét nghệ thuật đặc trưng cho sản phẩm. Nếu không có để chuỗi rỗng "".`;

    const geminiLogoPlan = await callGeminiWithKeyRotation(async (ai, modelName) => {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              whatTheySellLabel: { type: Type.STRING },
              whoTheyServeLabel: { type: Type.STRING },
              whatIsSpecialLabel: { type: Type.STRING },
              primaryPrimitive: { type: Type.STRING },
              secondaryPrimitive: { type: Type.STRING },
              uspEffect: { type: Type.STRING },
              archetype01: { type: Type.STRING },
              archetype02: { type: Type.STRING },
              primaryHex: { type: Type.STRING },
              secondaryHex: { type: Type.STRING },
              accentHex: { type: Type.STRING },
              fontStyle: { type: Type.STRING },
              creativeNarrative01: { type: Type.STRING },
              creativeNarrative02: { type: Type.STRING },
              customSvgMarkup01: { type: Type.STRING },
            },
            required: [
              'whatTheySellLabel',
              'whoTheyServeLabel',
              'whatIsSpecialLabel',
              'primaryPrimitive',
              'secondaryPrimitive',
              'uspEffect',
              'archetype01',
              'archetype02',
              'primaryHex',
              'secondaryHex',
              'accentHex',
              'fontStyle',
            ],
          },
        },
      });
      return JSON.parse((response.text ?? '{}').trim());
    });

    if (geminiLogoPlan) {
      res.json({
        success: true,
        source: 'gemini',
        data: geminiLogoPlan,
      });
      return;
    }

    const pollRes = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(3500),
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'system',
            content:
              'Bạn là Creative Logo Director. Chỉ trả về đúng 1 JSON object hợp lệ với các trường: whatTheySellLabel, whoTheyServeLabel, whatIsSpecialLabel, primaryPrimitive, secondaryPrimitive, uspEffect, archetype01, archetype02, primaryHex, secondaryHex, accentHex, fontStyle, creativeNarrative01, creativeNarrative02.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.75,
        response_format: { type: 'json_object' },
      }),
    });

    if (pollRes.ok) {
      const pollJson = (await pollRes.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const rawText = pollJson.choices?.[0]?.message?.content || '{}';
      const cleanedJson = rawText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanedJson);
      res.json({
        success: true,
        source: 'pollinations_openai',
        data: parsed,
      });
      return;
    }

    res.status(200).json({
      success: false,
      fallback: true,
    });
  } catch {
    res.status(200).json({
      success: false,
      fallback: true,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`XSon AI server running on http://localhost:${PORT}`);
  });
}

startServer();