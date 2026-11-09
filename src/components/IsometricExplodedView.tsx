import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Layers,
  LayoutGrid,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Crown,
  ExternalLink,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { FullBrandAuditResult } from '../utils/brandEngine';

interface IsometricExplodedViewProps {
  audit: FullBrandAuditResult;
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
  sponsorUrl: string;
  onPlaySpeech: (lang: 'vi-VN' | 'en-US', customText?: string) => void;
  speakingLang: 'vi-VN' | 'en-US' | null;
  onSwitchToBento: () => void;
}

export const IsometricExplodedView: React.FC<IsometricExplodedViewProps> = ({
  audit,
  selectedDomain,
  onSelectDomain,
  sponsorUrl,
  onPlaySpeech,
  speakingLang,
  onSwitchToBento,
}) => {
  const { input, trapCheck, scores, diagnostics, bestDomain, marketing, logos, emotion } = audit;

  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isFullyExploded, setIsFullyExploded] = useState<boolean>(true);
  const [isIsometricAngle, setIsIsometricAngle] = useState<boolean>(true);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([null, null, null, null]);

  const buildSponsorHref = (domainName: string) => {
    const separator = sponsorUrl.includes('?') ? '&' : '?';
    return `${sponsorUrl}${separator}domain=${encodeURIComponent(
      domainName
    )}&brand=${encodeURIComponent(input.cleanBrandName)}`;
  };

  // Animate 3D Isometric layers with GSAP whenever activeLayer, explosion state, or angle changes
  useEffect(() => {
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length === 0) return;

    layers.forEach((el, index) => {
      const isFocused = activeLayer === index;
      const hasOtherFocus = activeLayer !== null && activeLayer !== index;

      const baseZ = isFullyExploded ? (3 - index) * 22 : (3 - index) * 8;
      const targetZ = isFocused ? baseZ + 26 : hasOtherFocus ? baseZ - 12 : baseZ;
      const targetRotateX = isFocused
        ? 3
        : isIsometricAngle
        ? 11
        : 0;
      const targetRotateZ = isFocused
        ? 0
        : isIsometricAngle
        ? -1.6
        : 0;
      const targetScale = isFocused ? 0.985 : hasOtherFocus ? 0.94 : isIsometricAngle ? 0.96 : 1;
      const targetOpacity = hasOtherFocus ? 0.78 : 1;

      gsap.to(el, {
        z: targetZ,
        rotationX: targetRotateX,
        rotationZ: targetRotateZ,
        scale: targetScale,
        opacity: targetOpacity,
        duration: 0.65,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    });
  }, [activeLayer, isFullyExploded, isIsometricAngle, audit.input.domainSlug]);

  const layerLabels = [
    { id: 0, code: 'TẦNG 01', title: 'Định danh & Âm thanh' },
    { id: 1, code: 'TẦNG 02', title: '3 Chỉ số Chấm điểm' },
    { id: 2, code: 'TẦNG 03', title: 'Chẩn đoán & Tên miền' },
    { id: 3, code: 'TẦNG 04', title: 'Câu định vị, Khẩu hiệu & Logo' },
  ];

  return (
    <section
      aria-label="Khối kiến trúc 3D bóc tách 4 tầng đánh giá thương hiệu"
      className="obsidian-card relative overflow-hidden rounded-2xl p-4 lg:p-6"
    >
      {/* Top Control Bar for 3D Exploded View */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600 shrink-0" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Mô hình Bóc tách 4 Tầng Thương hiệu (3D Isometric Exploded View)
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-600">
            Di chuột hoặc bấm vào từng tầng để tách giãn trục không gian 3D và xem rõ chi tiết của <strong className="text-slate-900">{input.cleanBrandName}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Quick Focus Pills */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveLayer(null)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeLayer === null
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Xem cả 4 tầng
            </button>
            {layerLabels.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
                className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeLayer === l.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {l.code}
              </button>
            ))}
          </div>

          {/* Toggle Explode Depth */}
          <button
            type="button"
            onClick={() => setIsFullyExploded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            {isFullyExploded ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-indigo-600" />
                <span>Thu hẹp khoảng cách 3D</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-indigo-600" />
                <span>Tách giãn trục Z tối đa</span>
              </>
            )}
          </button>

          {/* Toggle 3D Angle vs Flat Focus */}
          <button
            type="button"
            onClick={() => setIsIsometricAngle((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{isIsometricAngle ? 'Góc nghiêng 3D Isometric' : 'Góc nhìn thẳng 2D'}</span>
          </button>

          {/* Switch back to Bento Grid View */}
          <button
            type="button"
            onClick={onSwitchToBento}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Quay lại Bento Grid</span>
          </button>
        </div>
      </div>

      {/* 3D Isometric 4-Layer Stack Stage */}
      <div
        ref={stageRef}
        className="iso-stage-perspective relative z-10 mt-4 space-y-4 px-3 sm:px-8 py-3"
      >
        {/* LAYER 1 (TOP): ĐỊNH DANH & ÂM THANH (RADIO TEST + SAFETY CHECK) */}
        <div
          ref={(el) => {
            layerRefs.current[0] = el;
          }}
          onMouseEnter={() => setActiveLayer(0)}
          onMouseLeave={() => setActiveLayer(null)}
          onClick={() => setActiveLayer(activeLayer === 0 ? null : 0)}
          className={`iso-layer-card rounded-2xl border p-4 cursor-pointer ${
            activeLayer === 0
              ? 'border-indigo-500 bg-white shadow-[0_20px_50px_-15px_rgba(79,70,229,0.22)]'
              : 'border-slate-200 bg-white/95 shadow-sm'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-700">
                TẦNG 01 · ĐỊNH DANH & ÂM THANH
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {input.cleanBrandName}
              </h3>
              <span className="font-mono text-xs font-semibold text-indigo-700">
                /{input.domainSlug}/
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                · {input.syllableCount} âm tiết · {input.charCount} chữ cái viết liền
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                  trapCheck.isSafe
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-amber-200 bg-amber-50 text-amber-800'
                }`}
              >
                {trapCheck.isSafe ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>An toàn khi viết liền không dấu</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    <span>{trapCheck.statusHeadline}</span>
                  </>
                )}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySpeech('vi-VN');
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  speakingLang === 'vi-VN'
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                }`}
              >
                <Volume2 className="h-3.5 w-3.5 text-indigo-600" />
                <span>Nghe đọc thử (Việt)</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySpeech('en-US');
                }}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  speakingLang === 'en-US'
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700'
                }`}
              >
                <span>Anh</span>
              </button>
            </div>
          </div>
        </div>

        {/* LAYER 2 (CORE METRICS): 3 CHỈ SỐ CHẤM ĐIỂM & LÝ DO CỘNG/TRỪ ĐIỂM */}
        <div
          ref={(el) => {
            layerRefs.current[1] = el;
          }}
          onMouseEnter={() => setActiveLayer(1)}
          onMouseLeave={() => setActiveLayer(null)}
          onClick={() => setActiveLayer(activeLayer === 1 ? null : 1)}
          className={`iso-layer-card rounded-2xl border p-4 cursor-pointer ${
            activeLayer === 1
              ? 'border-indigo-500 bg-white shadow-[0_20px_50px_-15px_rgba(79,70,229,0.22)]'
              : 'border-slate-200 bg-white/95 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[11px] font-bold text-indigo-700">
              TẦNG 02 · 3 CHỈ SỐ CHẤM ĐIỂM & LÝ DO CỘNG / TRỪ
            </span>
            <span className="font-mono text-xs text-slate-600">
              Mảng chính: <strong className="text-slate-900">{input.extractedKeywords.primaryTopicDisplay}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Metric 1 */}
            <div className="obsidian-subcard rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">1. Độ dễ đọc</span>
                <span className="font-mono text-sm font-extrabold text-emerald-600 tabular-nums">
                  {scores.pronunciationScore}/100
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 leading-snug">
                {scores.pronunciationReasons.map((r, i) => (
                  <li key={i}>
                    <strong className={r.isPositive ? 'text-emerald-600 font-mono' : 'text-rose-600 font-mono'}>
                      {r.deltaText}{' '}
                    </strong>
                    <span>{r.reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric 2 */}
            <div className="obsidian-subcard rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">2. Độ dễ nhớ</span>
                <span className="font-mono text-sm font-extrabold text-indigo-600 tabular-nums">
                  {scores.memorabilityScore}/100
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 leading-snug">
                {scores.memorabilityReasons.map((r, i) => (
                  <li key={i}>
                    <strong className={r.isPositive ? 'text-emerald-600 font-mono' : 'text-rose-600 font-mono'}>
                      {r.deltaText}{' '}
                    </strong>
                    <span>{r.reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric 3 */}
            <div className="obsidian-subcard rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">3. Độ khớp với sản phẩm</span>
                <span className="font-mono text-sm font-extrabold text-amber-600 tabular-nums">
                  {scores.relevanceScore}/100
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 leading-snug">
                {scores.relevanceReasons.map((r, i) => (
                  <li key={i}>
                    <strong className={r.isPositive ? 'text-emerald-600 font-mono' : 'text-rose-600 font-mono'}>
                      {r.deltaText}{' '}
                    </strong>
                    <span>{r.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* LAYER 3 (DIAGNOSIS & DOMAIN MATRIX): NHẬN XÉT TÊN MIỀN GỐC & TÊN MIỀN ĐÁNG MUA NHẤT */}
        <div
          ref={(el) => {
            layerRefs.current[2] = el;
          }}
          onMouseEnter={() => setActiveLayer(2)}
          onMouseLeave={() => setActiveLayer(null)}
          onClick={() => setActiveLayer(activeLayer === 2 ? null : 2)}
          className={`iso-layer-card rounded-2xl border p-4 cursor-pointer ${
            activeLayer === 2
              ? 'border-emerald-500 bg-white shadow-[0_20px_50px_-15px_rgba(5,150,105,0.22)]'
              : 'border-slate-200 bg-white/95 shadow-sm'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700">
              TẦNG 03 · CHẨN ĐOÁN TÊN MIỀN GỐC & PHƯƠNG ÁN ĐÁNG MUA NHẤT
            </span>
            <span className="font-mono text-xs font-semibold text-amber-700">
              Lưu ý: Tình trạng tên miền là kết quả demo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                <div className="text-xs font-bold text-amber-800 mb-1">
                  Điểm cần lưu ý ở tên gốc ({diagnostics.originalSlug})
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 leading-snug">
                  {diagnostics.weaknesses.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                <div className="text-xs font-bold text-emerald-800 mb-1">
                  Cách khắc phục
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 leading-snug">
                  {diagnostics.actionableFixes.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best Domain Highlight */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/70 p-3">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800">
                    <Crown className="h-3.5 w-3.5 text-amber-600" />
                    <span>Đáng mua nhất (Điểm cao nhất: {bestDomain.domainScore}/100)</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-700">
                    Còn trống (Kết quả demo)
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDomain(bestDomain.domain);
                    }}
                    className="font-mono text-base font-extrabold text-slate-900 hover:text-indigo-700 transition-colors cursor-pointer"
                  >
                    {bestDomain.domain}
                  </button>
                  <span className="font-mono text-xs text-slate-600 tabular-nums">
                    Giá: {bestDomain.pricePerYear}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-700 leading-snug">
                  {bestDomain.bestFitExplanation || bestDomain.strategyDescription}
                </p>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-amber-200">
                <span className="font-mono text-[10px] text-slate-600">
                  Đang chọn preview: <strong className="text-indigo-700">{selectedDomain}</strong>
                </span>
                <a
                  href={buildSponsorHref(bestDomain.domain)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  <span>Đăng ký tên miền ↗</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 4 (BASE): BRAND IDENTITY (01 TAGLINE + 03 SLOGANS + 02 LOGOS) */}
        <div
          ref={(el) => {
            layerRefs.current[3] = el;
          }}
          onMouseEnter={() => setActiveLayer(3)}
          onMouseLeave={() => setActiveLayer(null)}
          onClick={() => setActiveLayer(activeLayer === 3 ? null : 3)}
          className={`iso-layer-card rounded-2xl border p-4 cursor-pointer ${
            activeLayer === 3
              ? 'border-violet-500 bg-white shadow-[0_20px_50px_-15px_rgba(124,58,237,0.22)]'
              : 'border-slate-200 bg-white/95 shadow-sm'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 font-mono text-[11px] font-bold text-violet-700">
              TẦNG 04 · CÂU ĐỊNH VỊ, 03 KHẨU HIỆU & 02 MẪU LOGO
            </span>
            <span className="text-xs text-slate-600">
              Cá tính màu sắc: <strong className="text-slate-900">{emotion.colorName}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            {/* Tagline + 3 Slogans */}
            <div className="lg:col-span-7 space-y-2">
              <div className="obsidian-subcard rounded-xl p-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                  01 Câu định vị thương hiệu (Tagline)
                </div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  &ldquo;{marketing.tagline}&rdquo;
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {marketing.slogans.map((s) => (
                  <div key={s.id} className="obsidian-subcard rounded-xl p-2.5">
                    <div className="text-[10px] font-bold text-indigo-700">
                      {s.dimensionTitle}
                    </div>
                    <p className="mt-1 text-xs font-bold text-slate-900 leading-snug">
                      &ldquo;{s.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 02 Logo Previews */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="obsidian-subcard flex flex-col justify-between rounded-xl p-2.5"
                >
                  <div>
                    <div className="font-mono text-[10px] font-bold text-indigo-700">
                      MẪU {logo.variantNumber} · {logo.monogramText}
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-slate-900 truncate">
                      {logo.title}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-2xs">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg font-extrabold text-sm text-white shadow-inner"
                      style={{
                        background: `linear-gradient(135deg, ${emotion.hexPrimary}, ${emotion.hexSecondary})`,
                      }}
                    >
                      {logo.monogramText.slice(0, 2)}
                    </div>
                    <div className="text-right min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {input.cleanBrandName}
                      </div>
                      <div className="font-mono text-[10px] font-semibold text-emerald-700 truncate">
                        {selectedDomain}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
