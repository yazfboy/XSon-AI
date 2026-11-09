import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import {
  SanitizedBrandInput,
  TrapCheckResult,
  ScoreBreakdown,
  DomainDiagnostics,
} from '../utils/brandEngine';

gsap.registerPlugin(ScrollTrigger);

interface PhoneticValuationCardProps {
  input: SanitizedBrandInput;
  trapCheck: TrapCheckResult;
  scores: ScoreBreakdown;
  diagnostics: DomainDiagnostics;
  onPlaySpeech: (lang: 'vi-VN' | 'en-US') => void;
  speakingLang: 'vi-VN' | 'en-US' | null;
  auditVersion?: number;
}

export const PhoneticValuationCard: React.FC<PhoneticValuationCardProps> = ({
  input,
  trapCheck,
  scores,
  diagnostics,
  onPlaySpeech,
  speakingLang,
  auditVersion = 0,
}) => {
  const [showFormula, setShowFormula] = useState(false);

  // Stage 1 & Stage 2 DOM Refs
  const stage1Ref = useRef<HTMLElement | null>(null);
  const stage2Ref = useRef<HTMLElement | null>(null);

  // Refs for Count-up Numbers & SVG Gauges in Stage 1
  const pronNumRef = useRef<HTMLSpanElement | null>(null);
  const memNumRef = useRef<HTMLSpanElement | null>(null);
  const relNumRef = useRef<HTMLSpanElement | null>(null);
  const pronCircleRef = useRef<SVGCircleElement | null>(null);
  const memCircleRef = useRef<SVGCircleElement | null>(null);
  const relCircleRef = useRef<SVGCircleElement | null>(null);

  // Stage 1 + Stage 2 GSAP ScrollTrigger Choreography
  useEffect(() => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;

    const ctx = gsap.context(() => {
      // --- PHÂN CẢNH 1: 3 THẺ CHẤM ĐIỂM AI & LÝ DO MẤT ĐIỂM ---
      if (stage1Ref.current) {
        const cards = stage1Ref.current.querySelectorAll('.stage1-score-card');
        const reasonItems = stage1Ref.current.querySelectorAll('.stage1-reason-item');
        const progressBars = stage1Ref.current.querySelectorAll<HTMLElement>('.stage1-progress-bar');

        gsap.set(cards, {
          opacity: 0,
          y: 90,
          scale: 0.9,
          rotationX: 20,
          filter: 'blur(15px)',
          transformPerspective: 1000,
        });

        gsap.set(reasonItems, {
          opacity: 0,
          x: -35,
        });

        progressBars.forEach((bar) => {
          gsap.set(bar, { width: '0%' });
        });

        [pronCircleRef.current, memCircleRef.current, relCircleRef.current].forEach((circle) => {
          if (circle) {
            gsap.set(circle, {
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            });
          }
        });

        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: stage1Ref.current,
            start: 'top 82%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });

        // 1. 3 Score Cards fly up sequentially
        tl1.to(
          cards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: 'blur(0px)',
            duration: 1.0,
            stagger: 0.18,
            ease: 'power4.out',
          },
          0
        );

        // 2. Count-up numbers (0 -> target score in 1.4s) & draw SVG circular gauges
        const counterObj = { pron: 0, mem: 0, rel: 0 };
        tl1.to(
          counterObj,
          {
            pron: scores.pronunciationScore,
            mem: scores.memorabilityScore,
            rel: scores.relevanceScore,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => {
              if (pronNumRef.current) {
                pronNumRef.current.textContent = String(Math.round(counterObj.pron));
              }
              if (memNumRef.current) {
                memNumRef.current.textContent = String(Math.round(counterObj.mem));
              }
              if (relNumRef.current) {
                relNumRef.current.textContent = String(Math.round(counterObj.rel));
              }
            },
            onComplete: () => {
              if (pronNumRef.current) pronNumRef.current.textContent = String(scores.pronunciationScore);
              if (memNumRef.current) memNumRef.current.textContent = String(scores.memorabilityScore);
              if (relNumRef.current) relNumRef.current.textContent = String(scores.relevanceScore);
            },
          },
          0.15
        );

        const animateCircle = (circle: SVGCircleElement | null, targetScore: number, delay: number) => {
          if (!circle) return;
          const targetOffset = circumference - (targetScore / 100) * circumference;
          tl1.to(
            circle,
            {
              strokeDashoffset: targetOffset,
              duration: 1.4,
              ease: 'power3.out',
            },
            delay
          );
        };

        animateCircle(pronCircleRef.current, scores.pronunciationScore, 0.15);
        animateCircle(memCircleRef.current, scores.memorabilityScore, 0.33);
        animateCircle(relCircleRef.current, scores.relevanceScore, 0.51);

        // Animate inner percentage bars from 0% to target width
        progressBars.forEach((bar, i) => {
          const targetW = bar.getAttribute('data-target-width') || '80%';
          tl1.to(
            bar,
            {
              width: targetW,
              duration: 1.2,
              ease: 'power3.out',
            },
            0.25 + i * 0.1
          );
        });

        // 3. Penalty/bonus reason items slide in from left to right
        tl1.to(
          reasonItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.45
        );
      }

      // --- PHÂN CẢNH 2: HỘP CHẨN ĐOÁN TÊN MIỀN GỐC & KIỂM TRA AN TOÀN ---
      if (stage2Ref.current) {
        const leftBox = stage2Ref.current.querySelector('.stage2-left-box');
        const rightBox = stage2Ref.current.querySelector('.stage2-right-box');
        const headerBar = stage2Ref.current.querySelector('.stage2-header-bar');

        if (headerBar) {
          gsap.set(headerBar, { opacity: 0, y: 24 });
        }
        if (leftBox) {
          gsap.set(leftBox, { opacity: 0, x: -100, filter: 'blur(10px)' });
        }
        if (rightBox) {
          gsap.set(rightBox, { opacity: 0, x: 100, filter: 'blur(10px)' });
        }

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: stage2Ref.current,
            start: 'top 82%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        });

        if (headerBar) {
          tl2.to(
            headerBar,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
            },
            0
          );
        }
        if (leftBox) {
          tl2.to(
            leftBox,
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power4.out',
            },
            0.12
          );
        }
        if (rightBox) {
          tl2.to(
            rightBox,
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power4.out',
            },
            0.22
          );
        }
      }
    });

    return () => ctx.revert();
  }, [
    scores.pronunciationScore,
    scores.memorabilityScore,
    scores.relevanceScore,
    input.domainSlug,
    auditVersion,
  ]);

  const renderHighlightedSlug = () => {
    if (trapCheck.isSafe || trapCheck.detectedTraps.length === 0) {
      return (
        <span className="font-mono font-bold text-emerald-700">
          {input.domainSlug}
        </span>
      );
    }
    const trapWord = trapCheck.detectedTraps[0].substring;
    const idx = input.domainSlug.indexOf(trapWord);
    if (idx === -1) {
      return (
        <span className="font-mono font-bold text-rose-700">
          {input.domainSlug}
        </span>
      );
    }
    const before = input.domainSlug.slice(0, idx);
    const match = input.domainSlug.slice(idx, idx + trapWord.length);
    const after = input.domainSlug.slice(idx + trapWord.length);

    return (
      <span className="font-mono font-bold text-slate-900">
        {before}
        <mark className="rounded bg-rose-100 px-1 py-0.5 text-rose-800 underline decoration-rose-500 decoration-wavy">
          {match}
        </mark>
        {after}
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-indigo-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 85) return '#059669';
    if (score >= 70) return '#4F46E5';
    if (score >= 40) return '#D97706';
    return '#DC2626';
  };

  const renderCircularGauge = (
    score: number,
    label: string,
    numRef: React.RefObject<HTMLSpanElement | null>,
    circleRef: React.RefObject<SVGCircleElement | null>
  ) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative flex h-15 w-15 shrink-0 items-center justify-center">
        <svg
          className="h-15 w-15 -rotate-90 transform"
          viewBox="0 0 58 58"
          aria-label={label}
        >
          <circle
            cx="29"
            cy="29"
            r={radius}
            stroke="currentColor"
            strokeWidth="4.5"
            fill="transparent"
            className="text-slate-200"
          />
          <circle
            ref={circleRef}
            cx="29"
            cy="29"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth="4.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numRef}
            className={`font-mono text-base font-extrabold tabular-nums leading-none ${getScoreColor(
              score
            )}`}
          >
            {score}
          </span>
          <span className="font-mono text-[9px] text-slate-500">/100</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-32 lg:space-y-36">
      {/* =====================================================================
          PHÂN CẢNH 1: 3 THẺ CHẤM ĐIỂM AI & LÝ DO MẤT ĐIỂM (STAGE 01)
         ===================================================================== */}
      <section
        id="scroll-stage-1"
        ref={stage1Ref}
        aria-label="Đánh giá 3 tiêu chí thương hiệu và nhận xét tên miền gốc"
        className="obsidian-card stage-3d-perspective rounded-2xl p-5 lg:p-6"
      >
        {/* Stage 01 Header & Radio Test */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                01. ĐÁNH GIÁ 3 TIÊU CHÍ THƯƠNG HIỆU
              </span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {input.cleanBrandName}
              </h2>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="font-mono text-xs font-bold text-indigo-700">
                {input.domainSlug}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 tabular-nums">
              <span>{input.syllableCount} âm tiết</span>
              <span aria-hidden="true">·</span>
              <span>{input.charCount} chữ cái viết liền</span>
              <span aria-hidden="true">·</span>
              <span>
                Mảng chính:{' '}
                <strong className="text-slate-900">
                  {input.extractedKeywords.primaryTopicDisplay}
                </strong>
              </span>
            </div>
          </div>

          {/* Radio Test Voice Synthesis Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPlaySpeech('vi-VN')}
              aria-label="Nghe đọc thử giọng Tiếng Việt"
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                speakingLang === 'vi-VN'
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Nghe đọc thử (Việt)</span>
            </button>
            <button
              type="button"
              onClick={() => onPlaySpeech('en-US')}
              aria-label="Nghe đọc thử giọng Tiếng Anh"
              className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                speakingLang === 'en-US'
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
              }`}
            >
              <span>Anh</span>
            </button>
          </div>
        </div>

        {/* STRICT NSFW / CONCATENATION TRAP BANNER (IF UNSAFE) */}
        {!trapCheck.isSafe && (
          <div
            className={`mt-4 rounded-xl border p-3.5 ${
              trapCheck.isSevereNsfw
                ? 'border-rose-300 bg-rose-50/90'
                : 'border-amber-300 bg-amber-50/90'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {trapCheck.isSevereNsfw ? (
                <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0 flex-1">
                <div
                  className={`text-xs font-extrabold ${
                    trapCheck.isSevereNsfw ? 'text-rose-800' : 'text-amber-800'
                  }`}
                >
                  {trapCheck.statusHeadline}
                </div>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs">
                  <span className="font-semibold text-slate-700">{input.cleanBrandName}</span>
                  <span className="text-slate-400">→</span>
                  {renderHighlightedSlug()}
                </div>
                <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                  {trapCheck.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3 SCORE CARDS (0 - 100) WITH STAGGERED ENTRANCE & COUNT-UP */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SCORE CARD 1: ĐỘ DỄ ĐỌC */}
          <div className="stage1-score-card obsidian-subcard flex flex-col justify-between rounded-2xl p-4">
            <div>
              <div className="flex items-center gap-3">
                {renderCircularGauge(
                  scores.pronunciationScore,
                  `Độ dễ đọc: ${scores.pronunciationScore} trên 100`,
                  pronNumRef,
                  pronCircleRef
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Độ dễ đọc
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                    Khách nghe một lần có nhớ và đọc lại đúng không?
                  </p>
                </div>
              </div>

              {/* Sub-bars */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>Đọc tiếng Việt</span>
                  <span className="font-mono font-bold tabular-nums text-slate-900">
                    {scores.vnFluencyScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="stage1-progress-bar h-full rounded-full bg-emerald-600"
                    data-target-width={`${scores.vnFluencyScore}%`}
                    style={{ width: `${scores.vnFluencyScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700 pt-0.5">
                  <span>Khách nước ngoài đọc</span>
                  <span className="font-mono font-bold tabular-nums text-slate-900">
                    {scores.intlFluencyScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="stage1-progress-bar h-full rounded-full bg-indigo-600"
                    data-target-width={`${scores.intlFluencyScore}%`}
                    style={{ width: `${scores.intlFluencyScore}%` }}
                  />
                </div>
              </div>

              {/* Lý do cộng / trừ điểm */}
              <div className="mt-3.5 border-t border-slate-200 pt-3">
                <div className="text-xs font-bold text-slate-800">
                  Vì sao được cộng / trừ điểm?
                </div>
                <ul className="mt-2 space-y-2 text-xs text-slate-700 leading-relaxed">
                  {scores.pronunciationReasons.map((item, idx) => (
                    <li key={idx} className="stage1-reason-item leading-snug">
                      <span
                        className={`font-mono font-bold ${
                          item.isPositive ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {item.deltaText}{' '}
                      </span>
                      <span>{item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SCORE CARD 2: ĐỘ DỄ NHỚ */}
          <div className="stage1-score-card obsidian-subcard flex flex-col justify-between rounded-2xl p-4">
            <div>
              <div className="flex items-center gap-3">
                {renderCircularGauge(
                  scores.memorabilityScore,
                  `Độ dễ nhớ: ${scores.memorabilityScore} trên 100`,
                  memNumRef,
                  memCircleRef
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Độ dễ nhớ
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                    Tên có ngắn gọn và bắt tai không?
                  </p>
                </div>
              </div>

              {/* Compact Phonetic Indicators */}
              <div className="mt-3.5 space-y-1.5">
                {scores.phoneticBadges.map((b) => (
                  <div
                    key={b.id}
                    className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-1 text-xs ${
                      b.active
                        ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-medium'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                          b.active ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      />
                      <span className="truncate">{b.label}</span>
                    </span>
                    <span className="font-mono text-[11px] font-semibold shrink-0">
                      {b.active ? 'Có' : 'Chưa có'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lý do cộng / trừ điểm */}
              <div className="mt-3.5 border-t border-slate-200 pt-3">
                <div className="text-xs font-bold text-slate-800">
                  Vì sao được cộng / trừ điểm?
                </div>
                <ul className="mt-2 space-y-2 text-xs text-slate-700 leading-relaxed">
                  {scores.memorabilityReasons.map((item, idx) => (
                    <li key={idx} className="stage1-reason-item leading-snug">
                      <span
                        className={`font-mono font-bold ${
                          item.isPositive ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {item.deltaText}{' '}
                      </span>
                      <span>{item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SCORE CARD 3: ĐỘ KHỚP VỚI SẢN PHẨM */}
          <div
            className={`stage1-score-card obsidian-subcard flex flex-col justify-between rounded-2xl p-4 ${
              trapCheck.isSevereNsfw ? 'border-rose-300 bg-rose-50/70' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                {renderCircularGauge(
                  scores.relevanceScore,
                  `Độ khớp với sản phẩm: ${scores.relevanceScore} trên 100`,
                  relNumRef,
                  relCircleRef
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Độ khớp với sản phẩm
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-snug">
                    Nghe tên có đoán được bạn bán gì không?
                  </p>
                </div>
              </div>

              {/* Sub-bars: Semantic Match & Tone Match */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>Sát với mô tả sản phẩm</span>
                  <span className="font-mono font-bold tabular-nums text-slate-900">
                    {scores.semanticMatchScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`stage1-progress-bar h-full rounded-full ${
                      trapCheck.isSevereNsfw ? 'bg-rose-600' : 'bg-emerald-600'
                    }`}
                    data-target-width={`${scores.semanticMatchScore}%`}
                    style={{ width: `${scores.semanticMatchScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700 pt-0.5">
                  <span>Hợp cá tính đã chọn</span>
                  <span className="font-mono font-bold tabular-nums text-slate-900">
                    {scores.toneEmotionMatchScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`stage1-progress-bar h-full rounded-full ${
                      trapCheck.isSevereNsfw ? 'bg-rose-600' : 'bg-violet-600'
                    }`}
                    data-target-width={`${scores.toneEmotionMatchScore}%`}
                    style={{ width: `${scores.toneEmotionMatchScore}%` }}
                  />
                </div>
              </div>

              {/* Lý do cộng / trừ điểm */}
              <div className="mt-3.5 border-t border-slate-200 pt-3">
                <div className="text-xs font-bold text-slate-800">
                  Vì sao được cộng / trừ điểm?
                </div>
                <ul className="mt-2 space-y-2 text-xs text-slate-700 leading-relaxed">
                  {scores.relevanceReasons.map((item, idx) => (
                    <li key={idx} className="stage1-reason-item leading-snug">
                      <span
                        className={`font-mono font-bold ${
                          item.isPositive ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {item.deltaText}{' '}
                      </span>
                      <span>{item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion: Xem cách tính điểm chi tiết */}
        <div className="mt-4 border-t border-slate-200 pt-3">
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            aria-expanded={showFormula}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50/70 transition-colors cursor-pointer"
          >
            <span>Xem cách tính điểm chi tiết</span>
            {showFormula ? (
              <ChevronUp className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0" />
            )}
          </button>

          {showFormula && (
            <div className="mt-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-700 space-y-1.5 tabular-nums">
              <div className="text-indigo-700 font-bold">
                1. Độ dễ đọc:
              </div>
              <div>
                • Điểm gốc = 85 | Tỷ lệ nguyên âm = {scores.vowelCount}/{input.charCount} ={' '}
                <span className="text-emerald-700 font-bold">{scores.vowelRatio}</span> (Cộng/trừ ={' '}
                {scores.vowelDelta >= 0 ? `+${scores.vowelDelta}` : scores.vowelDelta}) | Số âm tiết = {input.syllableCount} ⇒{' '}
                <strong className="text-slate-900">
                  {scores.pronunciationScore}/100 điểm
                </strong>
              </div>

              <div className="pt-1 text-violet-700 font-bold">
                2. Độ dễ nhớ:
              </div>
              <div>
                • Điểm gốc = 80 | Độ dài = {input.charCount} chữ cái (Cộng/trừ ={' '}
                {scores.lengthDelta >= 0 ? `+${scores.lengthDelta}` : scores.lengthDelta}) | Phụ âm đầu rõ = {scores.plosiveCount} (+
                {scores.plosiveBonus}) | Điệp âm/vần = +{scores.alliterationOrRhymeBonus} ⇒{' '}
                <strong className="text-slate-900">
                  {scores.memorabilityScore}/100 điểm
                </strong>
              </div>

              <div className="pt-1 text-emerald-700 font-bold">
                3. Độ khớp với sản phẩm:
              </div>
              <div>
                • Từ khóa khớp = [{scores.matchedKeywords.join(', ') || 'chưa có'}] | Độ sát mô tả = {scores.semanticMatchScore}% | Độ hợp cá tính = {scores.toneEmotionMatchScore}% ⇒{' '}
                <strong className="text-slate-900">
                  {scores.relevanceScore}/100 điểm
                </strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          PHÂN CẢNH 2: HỘP CHẨN ĐOÁN TÊN MIỀN GỐC & KIỂM TRA AN TOÀN (STAGE 02)
         ===================================================================== */}
      <section
        id="scroll-stage-2"
        ref={stage2Ref}
        aria-label="Chẩn đoán tên miền gốc và cách khắc phục"
        className="obsidian-card overflow-hidden rounded-2xl p-5 lg:p-6"
      >
        {/* Shimmer Sweep Safety Header Bar */}
        <div className="stage2-header-bar shimmer-sweep-bar flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-900">
            <Wrench className="h-4 w-4 text-indigo-600 shrink-0" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-700">
              02. CHẨN ĐOÁN TÊN MIỀN GỐC
            </span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span>
              Nhận xét thẳng về tên miền{' '}
              <code className="font-mono font-bold text-indigo-700">{diagnostics.originalSlug}</code> của bạn
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold ${
              diagnostics.overallHealth === 'critical_unsafe'
                ? 'text-rose-700'
                : diagnostics.overallHealth === 'needs_improvement'
                ? 'text-amber-700'
                : 'text-emerald-700'
            }`}
          >
            {trapCheck.isSafe ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Không bị hiểu nhầm nghĩa</span>
              </>
            ) : (
              trapCheck.statusHeadline
            )}
          </span>
        </div>

        {/* Left & Right opposing slide-in diagnostic boxes */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Box: Điểm cần lưu ý (Slides from left x: -100px) */}
          <div className="stage2-left-box rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <div className="text-sm font-bold text-amber-800 mb-2">
              Điểm cần lưu ý
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {diagnostics.weaknesses.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>

          {/* Right Box: Cách khắc phục (Slides from right x: +100px) */}
          <div className="stage2-right-box rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="text-sm font-bold text-emerald-800 mb-2">
              Cách khắc phục
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {diagnostics.actionableFixes.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {trapCheck.isFamousBrand && (
          <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-3 text-xs font-medium text-amber-800">
            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
            <span>
              Tên này trùng với thương hiệu lớn đã có trên thị trường (
              <strong>{trapCheck.famousBrandMatched}</strong>). Bạn nên chọn tên miền có gắn thêm từ khóa sản phẩm ở bên dưới.
            </span>
          </div>
        )}
      </section>
    </div>
  );
};
