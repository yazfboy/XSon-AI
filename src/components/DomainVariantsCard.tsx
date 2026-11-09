import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  ExternalLink,
  Crown,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  FileText,
  PhoneCall,
  TrendingUp,
} from 'lucide-react';
import {
  DomainVariant,
  DomainRegistrarOption,
  FullBrandAuditResult,
  getDomainDeepDiveAnalysis,
} from '../utils/brandEngine';

gsap.registerPlugin(ScrollTrigger);

interface DomainVariantsCardProps {
  audit: FullBrandAuditResult;
  domains: DomainVariant[];
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
  selectedRegistrarId: DomainRegistrarOption['id'];
  onSelectRegistrarId: (id: DomainRegistrarOption['id']) => void;
  registrars: DomainRegistrarOption[];
  sponsorUrl: string;
  brandName: string;
  auditVersion?: number;
}

export const DomainVariantsCard: React.FC<DomainVariantsCardProps> = ({
  audit,
  domains,
  selectedDomain,
  onSelectDomain,
  selectedRegistrarId,
  onSelectRegistrarId,
  registrars,
  sponsorUrl,
  brandName,
  auditVersion = 0,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const stage3Ref = useRef<HTMLElement | null>(null);
  const detailTabRef = useRef<HTMLDivElement | null>(null);

  const buildSponsorHref = (domainName: string, regId?: string) => {
    const separator = sponsorUrl.includes('?') ? '&' : '?';
    return `${sponsorUrl}${separator}domain=${encodeURIComponent(
      domainName
    )}&brand=${encodeURIComponent(brandName)}${
      regId ? `&registrar=${encodeURIComponent(regId)}` : ''
    }`;
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / Math.max(rect.width, 1) - 0.5;
    const normY = y / Math.max(rect.height, 1) - 0.5;
    const tiltX = (-normY * 4.5).toFixed(2);
    const tiltY = (normX * 4.5).toFixed(2);

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.setProperty('--tilt-x', `${tiltX}deg`);
    el.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    setHoveredId(null);
  };

  const handleChooseDomainAndViewDetail = (domainName: string, shouldScroll: boolean) => {
    onSelectDomain(domainName);
    if (shouldScroll && detailTabRef.current) {
      detailTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  // PHÂN CẢNH 3: 3D Domino Cascade + Domain Score Count-Up
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!stage3Ref.current) return;

      const domainCards = stage3Ref.current.querySelectorAll<HTMLElement>(
        '.stage3-domain-card'
      );
      const scoreNums = stage3Ref.current.querySelectorAll<HTMLElement>(
        '.stage3-score-num'
      );

      gsap.set(domainCards, {
        opacity: 0,
        y: 80,
        rotationX: -35,
        transformOrigin: 'top center',
        filter: 'blur(8px)',
      });

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: stage3Ref.current,
          start: 'top 82%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      });

      tl3.to(domainCards, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
      });

      scoreNums.forEach((numEl, idx) => {
        const targetScore = Number(
          numEl.getAttribute('data-target') || domains[idx]?.domainScore || 0
        );
        const counter = { val: 0 };
        tl3.to(
          counter,
          {
            val: targetScore,
            duration: 1.0,
            ease: 'power3.out',
            onUpdate: () => {
              numEl.textContent = String(Math.round(counter.val));
            },
          },
          idx * 0.15 + 0.1
        );
      });
    }, stage3Ref);

    return () => ctx.revert();
  }, [domains, brandName, auditVersion]);

  const availableCount = domains.filter((d) => d.status === 'available').length;
  const bestDomain = domains.find((d) => d.isBestChoice) || domains[0];
  const activeDomainVariant =
    domains.find((d) => d.domain === selectedDomain) || bestDomain;
  const deepDive = getDomainDeepDiveAnalysis(activeDomainVariant, audit);
  const activeRegistrar =
    registrars.find((r) => r.id === selectedRegistrarId) || registrars[0];

  return (
    <section
      id="scroll-stage-3"
      ref={stage3Ref}
      aria-label="Phân cảnh 3: Gợi ý 05 tên miền phù hợp và so sánh nhà đăng ký"
      className="obsidian-card stage-3d-perspective flex flex-col justify-between rounded-2xl p-4 sm:p-5"
    >
      <div>
        {/* Header & Demo Mode Notice */}
        <div className="border-b border-slate-200 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  PHÂN CẢNH 03 / 05
                </span>
                <Globe className="h-4 w-4 text-indigo-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Gợi ý 05 tên miền phù hợp cho bạn
                </h2>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Xếp hạng theo điểm tối ưu thương mại từ 01 đến 05. Bấm chọn tên miền bất kỳ để xem phân tích chuyên sâu và bảng so sánh giá của 4 nhà đăng ký uy tín bên dưới.
              </p>
            </div>
            <span className="font-mono text-xs font-semibold text-emerald-700 tabular-nums">
              {availableCount}/05 còn trống · Đáng mua nhất:{' '}
              <strong>
                {bestDomain.domain} ({bestDomain.domainScore}/100)
              </strong>
            </span>
          </div>

          {/* Mandatory Demo Notice */}
          <div className="mt-2.5 rounded-xl border border-amber-200 bg-amber-50/90 px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>
                Lưu ý: Tình trạng tên miền dưới đây là kết quả demo (mô phỏng theo quy tắc đơn giản của hệ thống).
              </span>
            </div>
          </div>
        </div>

        {/* 05 Scored Domain Variants List with 3D Domino Cascade & Spotlight Reveal */}
        <div className="mt-4 space-y-3" role="list">
          {domains.map((item, idx) => {
            const isSelected = item.domain === selectedDomain;
            const isAvailable = item.status === 'available';
            const isBest = item.isBestChoice;
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                role="listitem"
                onClick={() => handleChooseDomainAndViewDetail(item.domain, false)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`stage3-domain-card spotlight-tilt-card group flex flex-col justify-between gap-2.5 rounded-xl border p-3.5 cursor-pointer will-change-transform ${
                  isSelected
                    ? 'crowned-glow-border border-indigo-500 bg-gradient-to-r from-indigo-50/90 via-white to-emerald-50/60 ring-2 ring-indigo-500/20'
                    : isBest
                    ? 'border-amber-400 bg-gradient-to-r from-amber-50/80 via-white to-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                {/* Top Crown Banner for Highest-Scoring Domain */}
                {isBest && (
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800">
                      <Crown className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>
                        Đáng mua nhất (Điểm cao nhất: {item.domainScore}/100)
                      </span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      Ưu tiên chọn để làm website và chạy quảng cáo
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChooseDomainAndViewDetail(item.domain, true);
                        }}
                        className={`font-mono text-sm sm:text-base font-extrabold transition-colors text-left cursor-pointer ${
                          isSelected
                            ? 'text-indigo-700'
                            : 'text-slate-900 hover:text-indigo-600'
                        }`}
                      >
                        {item.domain}
                      </button>

                      {/* Domain Score Badge with Count-up */}
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          item.domainScore >= 90
                            ? 'text-emerald-700'
                            : item.domainScore >= 75
                            ? 'text-indigo-700'
                            : 'text-slate-600'
                        }`}
                      >
                        ·{' '}
                        <span
                          className="stage3-score-num"
                          data-target={item.domainScore}
                        >
                          {item.domainScore}
                        </span>
                        /100 điểm
                      </span>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          <CheckCircle2 className="h-3 w-3" />
                          Đang chọn
                        </span>
                      )}
                    </div>

                    <div className="mt-1 text-xs font-bold text-indigo-700">
                      {item.strategyBadge}
                    </div>

                    <p className="mt-0.5 text-xs text-slate-700 leading-snug">
                      {item.takenNote ? item.takenNote : item.strategyDescription}
                    </p>

                    {/* Best Domain Fit Explanation */}
                    {isBest && item.bestFitExplanation && (
                      <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50/90 px-2.5 py-1.5 text-xs font-semibold text-amber-900 leading-snug">
                        {item.bestFitExplanation}
                      </div>
                    )}

                    {/* Highlights of why this domain scored well + Weighted Sub-scores */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                      <span className="font-mono font-semibold text-indigo-700">
                        Dễ đọc: {item.readabilitySubScore} · Dễ nhớ: {item.memorabilitySubScore} · Khớp sản phẩm: {item.descriptionFitSubScore}
                      </span>
                      {item.scoreHighlights.map((hl) => (
                        <React.Fragment key={hl}>
                          <span aria-hidden="true">·</span>
                          <span
                            className={
                              hl.includes('Chưa có')
                                ? 'text-amber-700 font-medium'
                                : 'text-slate-600'
                            }
                          >
                            {hl}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Hover / Active Spotlight Reveal Drawer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isHovered || isSelected
                          ? 'max-h-24 opacity-100 mt-2 pt-2 border-t border-slate-200'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-slate-700">
                          {item.matchedMorpheme ? (
                            <>
                              Từ khóa ghép thêm:{' '}
                              <code className="font-mono font-bold text-indigo-700">
                                +{item.matchedMorpheme}
                              </code>
                            </>
                          ) : (
                            <>
                              Độ khớp mô tả sản phẩm:{' '}
                              <strong className="font-mono text-emerald-700">
                                {item.descriptionFitSubScore}/100
                              </strong>
                            </>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDomain(item.domain);
                            const previewEl =
                              document.getElementById('live-preview-section');
                            if (previewEl) {
                              previewEl.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                              });
                            }
                          }}
                          className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Xem thử trực tiếp trên Google Preview ↓</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Demo Status + Price + Explicit "Chọn tên miền này & Xem nơi mua" + Register CTA */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 shrink-0">
                    <div className="text-left sm:text-right mr-1">
                      {isAvailable ? (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 whitespace-nowrap">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span>Còn trống (Kết quả demo)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 whitespace-nowrap">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span>Đã có người mua (Kết quả demo)</span>
                        </div>
                      )}
                      <div className="font-mono text-[11px] text-slate-500 tabular-nums">
                        {isAvailable
                          ? `Giá từ: ${item.pricePerYear}`
                          : 'Nên chọn phương án điểm cao nhất'}
                      </div>
                    </div>

                    {/* Explicit Action Button: Chọn tên miền này & Xem nơi mua */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChooseDomainAndViewDetail(item.domain, true);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                          : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Chọn tên miền này & Xem nơi mua</span>
                    </button>

                    <a
                      href={buildSponsorHref(item.domain, selectedRegistrarId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={
                        isAvailable
                          ? `Đăng ký tên miền ${item.domain} tại Nhà tài trợ`
                          : `Nhờ tư vấn tên miền ${item.domain}`
                      }
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                        isAvailable
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-2xs'
                          : 'border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <span>{isAvailable ? 'Mua ngay ↗' : 'Tư vấn ↗'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            FEATURE 1: TAB / KHUNG CHI TIẾT CHUYÊN SÂU & BẢNG SO SÁNH 4 NHÀ ĐĂNG KÝ
           ===================================================================== */}
        <div
          id="domain-deep-dive-tab"
          ref={detailTabRef}
          className="mt-6 rounded-2xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50/80 p-4 sm:p-5 shadow-md"
        >
          {/* Tab Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-200/80 pb-3.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
                  <Sparkles className="h-3 w-3" />
                  ĐANG CHỌN PHÂN TÍCH CHUYÊN SÂU
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Chi tiết Tên miền{' '}
                  <span className="font-mono text-indigo-700 underline underline-offset-4">
                    {activeDomainVariant.domain}
                  </span>{' '}
                  & So sánh Nhà đăng ký
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Thông số đánh giá chuyên sâu để trình Ban Giám đốc và bảng so sánh 4 nhà cung cấp tên miền uy tín, giá tốt nhất hiện nay.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const propEl = document.getElementById('executive-proposal-section');
                  if (propEl) {
                    propEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-white px-3 py-1.5 text-xs font-bold text-indigo-800 hover:bg-indigo-50 transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="h-3.5 w-3.5 text-indigo-600" />
                <span>Xem Tờ trình Giám đốc ↓</span>
              </button>
            </div>
          </div>

          {/* PART 1: THÔNG SỐ ĐÁNH GIÁ CHUYÊN SÂU & LÝ DO THUYẾT PHỤC TRÌNH BAN GIÁM ĐỐC */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* 4 Deep-Dive Structural Metrics (7/12 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>1. Cấu trúc & Độ dài ký tự</span>
                  <span className="font-mono text-indigo-700">
                    {deepDive.charLength} ký tự ({activeDomainVariant.tld})
                  </span>
                </div>
                <p className="mt-1.5 text-slate-600 leading-relaxed">
                  {deepDive.lengthVerdict}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>2. Từ khóa sản phẩm đi kèm</span>
                  <span className="font-mono text-emerald-700">
                    {activeDomainVariant.descriptionFitSubScore}/100đ
                  </span>
                </div>
                <p className="mt-1.5 text-slate-600 leading-relaxed">
                  {deepDive.keywordAnalysis}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="inline-flex items-center gap-1">
                    <PhoneCall className="h-3.5 w-3.5 text-indigo-600" />
                    3. Ghi nhớ qua điện thoại
                  </span>
                  <span className="font-mono text-indigo-700">
                    {activeDomainVariant.readabilitySubScore}/100đ
                  </span>
                </div>
                <p className="mt-1.5 text-slate-600 leading-relaxed">
                  {deepDive.phoneDictationVerdict}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="inline-flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    4. Thuận lợi SEO & Quảng cáo
                  </span>
                  <span className="font-mono text-emerald-700">Tối ưu CTR</span>
                </div>
                <p className="mt-1.5 text-slate-600 leading-relaxed">
                  {deepDive.seoAndAdsVerdict}
                </p>
              </div>
            </div>

            {/* Executive Pitch Box: Tại sao tên miền này tối ưu hơn phương án khác? (5/12 cols) */}
            <div className="lg:col-span-5 rounded-xl border border-indigo-200 bg-indigo-50/70 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900">
                  <Award className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>
                    Lý do thuyết phục trình Ban Giám đốc (Vì sao tối ưu nhất?)
                  </span>
                </div>
                <ul className="mt-2.5 space-y-2 text-xs text-slate-800">
                  {deepDive.executivePitchPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 font-mono text-[10px] font-bold text-white shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 pt-2.5 border-t border-indigo-200/80 flex items-center justify-between text-[11px] font-semibold text-indigo-900">
                <span>Đang gắn với nhà đăng ký: {activeRegistrar.name}</span>
                <span className="font-mono text-emerald-700 font-bold">
                  {activeRegistrar.firstYearPrice}
                </span>
              </div>
            </div>
          </div>

          {/* PART 2: BẢNG GỢI Ý & SO SÁNH 4 NHÀ ĐĂNG KÝ TÊN MIỀN UY TÍN, GIÁ TỐT NHẤT */}
          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Bảng Gợi ý & So sánh các Nhà đăng ký Tên miền (Mua ở đâu giá rẻ, ngon nhất, uy tín nhất?)
                </h4>
                <p className="text-xs text-slate-600">
                  Giá tự động tính theo đuôi{' '}
                  <strong className="font-mono text-indigo-700">
                    {activeDomainVariant.tld}
                  </strong>{' '}
                  của tên miền{' '}
                  <strong className="font-mono text-slate-900">
                    {activeDomainVariant.domain}
                  </strong>
                  . Hãy bấm chọn 1 Nhà đăng ký để đưa thẳng vào <em>Tờ trình Giám đốc</em> và nút <em>Đăng ký tên miền</em>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" role="list">
              {registrars.map((reg, index) => {
                const isSelectedReg = reg.id === selectedRegistrarId;
                return (
                  <div
                    key={reg.id}
                    role="listitem"
                    onClick={() => onSelectRegistrarId(reg.id)}
                    className={`rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelectedReg
                        ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/20 shadow-md'
                        : reg.isRecommended
                        ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-500'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      {/* Top Row: Number + Name + Recommended Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 font-mono text-xs font-bold text-white shrink-0">
                            0{index + 1}
                          </span>
                          <h5 className="text-sm font-extrabold text-slate-900">
                            {reg.name}
                          </h5>
                        </div>

                        {reg.badge && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              reg.isRecommended
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                            }`}
                          >
                            {reg.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 text-xs font-bold text-indigo-700">
                        {reg.groupTitle}
                      </div>

                      {/* Price Comparison Bar */}
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                        <div>
                          <span className="text-slate-500">Năm đầu: </span>
                          <strong className="font-mono text-sm font-black text-emerald-700">
                            {reg.firstYearPrice}
                          </strong>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          Gia hạn năm sau:{' '}
                          <strong className="font-mono text-slate-900">
                            {reg.renewalPrice}
                          </strong>
                        </div>
                      </div>

                      {/* Strengths & Perks */}
                      <p className="mt-2.5 text-xs text-slate-700 leading-relaxed">
                        {reg.strengths}
                      </p>

                      <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                        {reg.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Buttons inside Registrar Card */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRegistrarId(reg.id);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                          isSelectedReg
                            ? 'bg-indigo-600 text-white'
                            : 'border border-slate-300 bg-slate-100 text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>
                          {isSelectedReg
                            ? 'Đã chọn trong Tờ trình Giám đốc'
                            : 'Chọn đưa vào Tờ trình'}
                        </span>
                      </button>

                      <a
                        href={reg.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap"
                      >
                        <span>Đăng ký tại đây ↗</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer helper inside Stage 3 */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2.5 text-xs text-slate-600">
        <span>
          Đang chọn tên miền:{' '}
          <strong className="font-mono text-indigo-700">{selectedDomain}</strong> · Nhà đăng ký:{' '}
          <strong className="text-emerald-700">{activeRegistrar.name}</strong>
        </span>
        <span className="text-[11px] text-slate-500">
          Kéo xuống ngay bên dưới để xem và xuất Tờ trình Đề xuất trình Giám đốc duyệt
        </span>
      </div>
    </section>
  );
};
