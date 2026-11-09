import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Lock,
  Volume2,
  Search,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import {
  FullBrandAuditResult,
  MarketingSlogan,
} from '../utils/brandEngine';

gsap.registerPlugin(ScrollTrigger);

interface MarketingAndPreviewSectionProps {
  audit: FullBrandAuditResult;
  selectedDomain: string;
  selectedSloganIndex: number;
  onSelectSloganIndex: (index: number) => void;
  onPlaySpeech: (lang: 'vi-VN' | 'en-US', customText?: string) => void;
  onEnhanceWithAi: () => void;
  isEnhancingAi: boolean;
  aiError: string | null;
  auditVersion?: number;
}

export const MarketingAndPreviewSection: React.FC<MarketingAndPreviewSectionProps> = ({
  audit,
  selectedSloganIndex,
  onSelectSloganIndex,
  onEnhanceWithAi,
  isEnhancingAi,
  aiError,
  auditVersion = 0,
}) => {
  const { marketing } = audit;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const stage4Ref = useRef<HTMLElement | null>(null);

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback copy if clipboard API restricted
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // PHÂN CẢNH 4: Word-by-Word Masked Tagline Reveal + 03 Slogan Fan-Out
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!stage4Ref.current) return;

      const taglineWords = stage4Ref.current.querySelectorAll<HTMLElement>(
        '.stage4-tagline-word'
      );
      const sloganCards = stage4Ref.current.querySelectorAll<HTMLElement>(
        '.stage4-slogan-card'
      );

      gsap.set(taglineWords, {
        y: '110%',
        opacity: 0,
        filter: 'blur(8px)',
      });

      gsap.set(sloganCards, {
        scale: 0.8,
        y: 70,
        opacity: 0,
      });

      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: stage4Ref.current,
          start: 'top 82%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      });

      tl4.to(taglineWords, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.65,
        stagger: 0.055,
        ease: 'power3.out',
      });

      tl4.to(
        sloganCards,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'back.out(1.4)',
        },
        '-=0.25'
      );
    }, stage4Ref);

    return () => ctx.revert();
  }, [marketing.tagline, marketing.slogans, auditVersion]);

  const taglineWordsList = marketing.tagline.trim().split(/\s+/);

  return (
    <section
      id="scroll-stage-4"
      ref={stage4Ref}
      aria-label="Phân cảnh 4: Gợi ý câu định vị thương hiệu và 3 khẩu hiệu bán hàng"
      className="obsidian-card stage-3d-perspective flex flex-col justify-between rounded-2xl p-4 sm:p-5"
    >
      <div>
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                PHÂN CẢNH 04 / 05
              </span>
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Gợi ý Câu định vị (Tagline) & Khẩu hiệu bán hàng (Slogan)
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Gồm <strong>01 câu định vị</strong> gắn cố định dưới logo và <strong>03 khẩu hiệu</strong> để bạn dùng khi đăng bài hoặc chạy quảng cáo.
            </p>
          </div>

          <button
            type="button"
            onClick={onEnhanceWithAi}
            disabled={isEnhancingAi}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isEnhancingAi ? 'animate-spin' : ''}`}
            />
            <span>
              {isEnhancingAi
                ? 'Đang viết câu mới...'
                : 'Viết thêm phương án khác'}
            </span>
          </button>
        </div>

        {aiError && (
          <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
            {aiError}
          </div>
        )}

        {/* 01 TAGLINE CARD WITH WORD-BY-WORD MASKED REVEAL */}
        <div className="mt-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/60 p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              01 Câu định vị thương hiệu (Tagline)
            </span>
            <button
              type="button"
              onClick={() => handleCopyText('tagline', marketing.tagline)}
              aria-label="Sao chép câu định vị thương hiệu"
              className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {copiedId === 'tagline' ? 'Đã chép câu định vị' : 'Chép câu này'}
              </span>
            </button>
          </div>

          <p
            aria-label={marketing.tagline}
            className="mt-2 text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex flex-wrap items-baseline gap-x-1.5 gap-y-1"
          >
            <span className="text-indigo-600">&ldquo;</span>
            {taglineWordsList.map((word, wIdx) => (
              <span
                key={`${word}-${wIdx}`}
                className="inline-block overflow-hidden py-0.5"
              >
                <span className="stage4-tagline-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
            <span className="text-indigo-600">&rdquo;</span>
          </p>
          <p className="mt-1.5 text-xs text-slate-600">
            <strong className="text-indigo-700">Nơi đặt phù hợp:</strong> Đặt dưới logo trên đầu trang web, ảnh bìa Fanpage và in trên bao bì sản phẩm.
          </p>
        </div>

        {/* 03 SLOGANS FAN-OUT GRID */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            <span>03 Khẩu hiệu bán hàng theo từng mục đích (Slogan)</span>
            <span className="text-xs font-normal text-slate-500 normal-case">
              Viết ngắn gọn, bám sát sản phẩm của bạn
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
            {marketing.slogans.map((slogan, idx) => {
              const isSelected = selectedSloganIndex === idx;
              return (
                <div
                  key={slogan.id}
                  className={`stage4-slogan-card flex flex-col justify-between rounded-xl border p-3.5 transition-colors will-change-transform ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-50/50 shadow-sm'
                      : 'border-slate-200 bg-slate-50/80 hover:border-indigo-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                        <span className="font-bold text-indigo-700">
                          {slogan.dimensionTitle}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-slate-500">
                        {slogan.dimensionCode}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm font-bold text-slate-900 leading-snug">
                      &ldquo;{slogan.text}&rdquo;
                    </p>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {slogan.explanation}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200 pt-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSloganIndex(idx);
                        const previewEl = document.getElementById('live-preview-section');
                        if (previewEl) {
                          previewEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      aria-label={`Xem thử ${slogan.dimensionTitle} trên Google`}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                      }`}
                    >
                      <span>
                        {isSelected ? 'Đang hiện trên Google ↓' : 'Xem thử trên Google'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyText(slogan.id, slogan.text)}
                      aria-label={`Chép ${slogan.dimensionTitle}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {copiedId === slogan.id ? 'Đã chép' : 'Chép'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface LiveCommercialPreviewProps {
  audit: FullBrandAuditResult;
  selectedDomain: string;
  selectedSloganIndex: number;
  onPlaySpeech: (lang: 'vi-VN' | 'en-US', customText?: string) => void;
  auditVersion?: number;
}

export const LiveCommercialPreviewSection: React.FC<LiveCommercialPreviewProps> = ({
  audit,
  selectedDomain,
  selectedSloganIndex,
  onPlaySpeech,
  auditVersion = 0,
}) => {
  const { input, industry, emotion, marketing, marketTrend } = audit;
  const previewCardRef = useRef<HTMLElement | null>(null);

  const activeSlogan: MarketingSlogan =
    marketing.slogans[selectedSloganIndex] || marketing.slogans[0];

  // PHÂN CẢNH 5 (Part B): 3D Perspective Tilt-Up Reveal for Live Google & Browser Preview
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!previewCardRef.current) return;

      gsap.fromTo(
        previewCardRef.current,
        {
          rotationY: -15,
          rotationX: 10,
          y: 60,
          opacity: 0,
          transformOrigin: 'center bottom',
        },
        {
          rotationY: 0,
          rotationX: 0,
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewCardRef.current,
            start: 'top 84%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, previewCardRef);

    return () => ctx.revert();
  }, [input.cleanBrandName, selectedDomain, auditVersion]);

  return (
    <section
      id="live-preview-section"
      ref={previewCardRef}
      aria-label="Xem trước hiển thị trên Google và trình duyệt"
      className="obsidian-card rounded-2xl p-4 sm:p-5 will-change-transform"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-emerald-600 shrink-0" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Xem trước khi lên Google & Trình duyệt
          </h3>
        </div>
        <span className="text-xs text-slate-600">
          Mô phỏng thực tế kết quả tìm kiếm & thanh địa chỉ website
        </span>
      </div>

      <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left 7/12: Browser Bar + Google SERP Snippet */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* 1. Browser Address Bar Simulation */}
          <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 font-mono text-xs min-w-0 shadow-2xs">
                <Lock className="h-3 w-3 text-emerald-600 shrink-0" />
                <span className="text-slate-500">https://</span>
                <span className="font-bold text-emerald-700 truncate">
                  {selectedDomain}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onPlaySpeech(
                  'vi-VN',
                  `${input.cleanBrandName}. ${marketing.tagline}`
                )
              }
              aria-label="Nghe đọc thử tên thương hiệu và câu định vị"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors shrink-0 cursor-pointer"
            >
              <Volume2 className="h-3.5 w-3.5 text-indigo-600" />
              <span>Đọc thử</span>
            </button>
          </div>

          {/* 2. Authentic Google SERP Snippet Simulation on White Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${emotion.gradientClass} text-xs font-extrabold text-white`}
              >
                {input.cleanBrandName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {input.cleanBrandName}
                </div>
                <div className="font-mono text-[11px] text-emerald-700 truncate">
                  https://{selectedDomain} › {industry.id}
                </div>
              </div>
            </div>

            <h4 className="mt-2 text-sm sm:text-base font-bold text-[#1A0DAB] hover:underline cursor-pointer leading-snug">
              {marketing.tagline}
            </h4>

            <p className="mt-1 text-xs text-slate-700 leading-relaxed">
              {activeSlogan.text} Xem chi tiết các sản phẩm và dịch vụ {industry.shortLabel.toLowerCase()} tại{' '}
              <strong className="font-mono text-slate-900">{selectedDomain}</strong>.
            </p>
          </div>
        </div>

        {/* Right 5/12: Mini Brand Identity Card + Commercial Insight */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* 3. Mini Brand Identity Card */}
          <div
            className={`rounded-xl bg-gradient-to-r ${emotion.gradientClass} p-4 text-white shadow-md border border-slate-200/40`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/85">
                  THẺ NHẬN DIỆN · {emotion.colorName.toUpperCase()}
                </span>
                <div className="text-lg font-extrabold tracking-tight">
                  {input.cleanBrandName}
                </div>
              </div>
              <div className="text-right font-mono text-xs bg-black/25 rounded-lg px-2.5 py-1 tabular-nums">
                {selectedDomain}
              </div>
            </div>
            <p className="mt-1.5 text-xs text-white/95 font-medium">
              {marketing.tagline}
            </p>
          </div>

          {/* 4. Commercial Insight Summary Box */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Đánh giá mức độ thu hút khách trên Google</span>
            </div>
            <p className="mt-1 text-xs text-slate-700 leading-relaxed">
              {marketTrend.insightText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
