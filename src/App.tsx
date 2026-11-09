import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Check,
  Search,
  X,
  Info,
  FileText,
  Layers,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';
import {
  QUICK_TEST_PRESETS,
  analyzeBrand,
  formatBrandKitReport,
  getDomainRegistrarsForVariant,
  DomainRegistrarOption,
  MarketingCopyResult,
} from './utils/brandEngine';
import { HeroWarpCanvas } from './components/HeroWarpCanvas';
import { IsometricExplodedView } from './components/IsometricExplodedView';
import { PhoneticValuationCard } from './components/PhoneticValuationCard';
import { DomainVariantsCard } from './components/DomainVariantsCard';
import { ExecutiveProposalSection } from './components/ExecutiveProposalSection';
import {
  MarketingAndPreviewSection,
  LiveCommercialPreviewSection,
} from './components/MarketingAndPreviewSection';
import { BrandLogoStudioSection } from './components/BrandLogoStudioSection';
import { MarketTrendBentoSection } from './components/MarketTrendBentoSection';
import { BrandAdvisorChatbot } from './components/BrandAdvisorChatbot';
import { ScientificModal } from './components/ScientificModal';
import { DemoConfigModal } from './components/DemoConfigModal';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_STAGES_META = [
  { id: 'scroll-stage-1', step: '01', label: '3 Thẻ chấm điểm' },
  { id: 'scroll-stage-2', step: '02', label: 'Chẩn đoán tên gốc' },
  { id: 'scroll-stage-3', step: '03', label: '05 Biến thể tên miền' },
  { id: 'scroll-stage-4', step: '04', label: 'Tagline & 03 Slogan' },
  { id: 'scroll-stage-5', step: '05', label: '02 Logo & Google' },
];

export default function App() {
  // Input & Context Filter States (Area B - Streamlined Free-Text Input Zone)
  const [rawBrandInput, setRawBrandInput] = useState<string>(QUICK_TEST_PRESETS[0].brandName);
  const [committedBrandInput, setCommittedBrandInput] = useState<string>(
    QUICK_TEST_PRESETS[0].brandName
  );
  const [rawIndustryInput, setRawIndustryInput] = useState<string>(
    QUICK_TEST_PRESETS[0].industryText
  );
  const [committedIndustryInput, setCommittedIndustryInput] = useState<string>(
    QUICK_TEST_PRESETS[0].industryText
  );
  const [brandDescription, setBrandDescription] = useState<string>(
    QUICK_TEST_PRESETS[0].brandDescription
  );
  const [committedBrandDescription, setCommittedBrandDescription] = useState<string>(
    QUICK_TEST_PRESETS[0].brandDescription
  );
  const [logoSeedOffset, setLogoSeedOffset] = useState<number>(0);

  // Interactive 3D Hero & Scroll Stage States
  const [typingPulseKey, setTypingPulseKey] = useState<number>(0);
  const [warpTriggerKey, setWarpTriggerKey] = useState<number>(0);
  const [auditVersion, setAuditVersion] = useState<number>(0);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [workspaceViewMode, setWorkspaceViewMode] = useState<'bento' | '3d_layer'>('bento');
  const [scrollProgressPct, setScrollProgressPct] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  // Interactive Selection States (Areas D & E)
  const [selectedDomainOverride, setSelectedDomainOverride] = useState<string | null>(null);
  const [selectedRegistrarId, setSelectedRegistrarId] =
    useState<DomainRegistrarOption['id']>('sponsor_official');
  const [selectedSloganIndex, setSelectedSloganIndex] = useState<number>(0);

  // Modals & Demo Config States (Area A & F) - Mặc định trỏ về https://datvietent.vn/
  const [isScientificModalOpen, setIsScientificModalOpen] = useState<boolean>(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [sponsorUrl, setSponsorUrl] = useState<string>('https://datvietent.vn/');
  const [useCloudAi, setUseCloudAi] = useState<boolean>(false);

  // Cloud Gemini AI override state
  const [customMarketing, setCustomMarketing] = useState<MarketingCopyResult | null>(null);
  const [isEnhancingAi, setIsEnhancingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Speech & Clipboard States
  const [speakingLang, setSpeakingLang] = useState<'vi-VN' | 'en-US' | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [showCopyToastModal, setShowCopyToastModal] = useState<boolean>(false);

  // Refs for Lenis & GSAP ScrollTrigger animations
  const lenisRef = useRef<Lenis | null>(null);
  const workspaceContainerRef = useRef<HTMLDivElement | null>(null);

  // Run Deterministic Pipeline + Ensure 05 Domain Variants are never duplicated
  const baseAudit = useMemo(() => {
    const rawResult = analyzeBrand(
      committedBrandInput,
      committedIndustryInput,
      undefined,
      committedBrandDescription,
      logoSeedOffset
    );

    // Chống trùng lặp tên miền số 04 với số 01 (ví dụ: nganfood.vn bị lặp 2 lần)
    const seenDomains = new Set<string>();
    const deduplicatedDomains = rawResult.domains.map((item) => {
      if (!seenDomains.has(item.domain)) {
        seenDomains.add(item.domain);
        return item;
      }
      const backupSuffix =
        rawResult.input.extractedKeywords.secondaryTopicSlug ||
        (item.slugPart.endsWith('food') ? 'fresh' : 'pro');
      const newSlug = item.slugPart.includes(backupSuffix)
        ? `${item.slugPart}vn`
        : `${rawResult.input.words[0] || item.slugPart}${backupSuffix}`;
      const newDomain = `${newSlug}${item.tld}`;
      seenDomains.add(newDomain);
      return {
        ...item,
        slugPart: newSlug,
        domain: newDomain,
        matchedMorpheme: backupSuffix,
        strategyDescription: `Biến thể kết hợp chữ "${
          rawResult.input.words[0] || item.slugPart
        }" với từ khóa "${backupSuffix}" ngắn gọn, dễ nhớ và tránh trùng lặp.`,
      };
    });

    const bestDomain =
      deduplicatedDomains.find((d) => d.isBestChoice) ||
      deduplicatedDomains.find((d) => d.status === 'available') ||
      deduplicatedDomains[0];

    return {
      ...rawResult,
      domains: deduplicatedDomains,
      bestDomain,
    };
  }, [
    committedBrandInput,
    committedIndustryInput,
    committedBrandDescription,
    logoSeedOffset,
  ]);

  const audit = useMemo(() => {
    if (!customMarketing) return baseAudit;
    return {
      ...baseAudit,
      marketing: customMarketing,
    };
  }, [baseAudit, customMarketing]);

  const activeDomain = useMemo(() => {
    if (
      selectedDomainOverride &&
      audit.domains.some((d) => d.domain === selectedDomainOverride)
    ) {
      return selectedDomainOverride;
    }
    return audit.bestDomain.domain;
  }, [audit.domains, audit.bestDomain.domain, selectedDomainOverride]);

  const activeDomainVariant = useMemo(() => {
    return (
      audit.domains.find((d) => d.domain === activeDomain) || audit.bestDomain
    );
  }, [audit.domains, audit.bestDomain, activeDomain]);

  // Gắn link web thật truy cập được ngay cho cả 4 Nhà đăng ký tên miền
  const registrarsForActiveDomain = useMemo(() => {
    const rawList = getDomainRegistrarsForVariant(
      activeDomainVariant,
      sponsorUrl,
      audit.input.cleanBrandName
    );
    const encodedDom = encodeURIComponent(activeDomainVariant.domain);
    const cleanSponsor =
      sponsorUrl && !sponsorUrl.includes('datviet.vn/dang-ky-ten-mien')
        ? sponsorUrl
        : 'https://datvietent.vn/';

    return rawList.map((reg) => {
      if (reg.id === 'sponsor_official') {
        return {
          ...reg,
          name: 'Đất Việt Entertainment (Nhà Tài Trợ Chính Thức)',
          registerUrl: cleanSponsor,
        };
      }
      if (reg.id === 'inet_tenten') {
        return {
          ...reg,
          name: 'iNET Việt Nam (inet.vn)',
          registerUrl: `https://inet.vn/dang-ky-ten-mien?domain=${encodedDom}`,
        };
      }
      if (reg.id === 'matbao_nhanhoa') {
        return {
          ...reg,
          name: 'Mắt Bão (matbao.net)',
          registerUrl: `https://www.matbao.net/ten-mien/dang-ky-ten-mien.html`,
        };
      }
      if (reg.id === 'cloudflare_namecheap') {
        return {
          ...reg,
          name: 'Namecheap Quốc tế (namecheap.com)',
          registerUrl: `https://www.namecheap.com/domains/registration/results/?domain=${encodedDom}`,
        };
      }
      return reg;
    });
  }, [activeDomainVariant, sponsorUrl, audit.input.cleanBrandName]);

  const selectedRegistrar = useMemo(() => {
    return (
      registrarsForActiveDomain.find((r) => r.id === selectedRegistrarId) ||
      registrarsForActiveDomain[0]
    );
  }, [registrarsForActiveDomain, selectedRegistrarId]);

  // 1. Initialize Lenis Smooth Scroll + Scroll Progress Tracking + IntersectionObserver for 5 Stages
  useEffect(() => {
    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      setScrollProgressPct(pct);

      let currentIdx = 0;
      SCROLL_STAGES_META.forEach((stage, idx) => {
        const el = document.getElementById(stage.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.65) {
            currentIdx = idx;
          }
        }
      });
      setActiveStageIndex(currentIdx);
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    updateScrollMetrics();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('scroll', updateScrollMetrics);
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      updateScrollMetrics();
    });

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Refresh Lenis & ScrollTrigger whenever dynamic results or view mode change
  useEffect(() => {
    const timer = window.setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 140);
    return () => clearTimeout(timer);
  }, [
    audit.input.domainSlug,
    audit.bestDomain.domain,
    workspaceViewMode,
    customMarketing,
    auditVersion,
  ]);

  const scrollToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -74, duration: 0.95 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerAnalyzeAndScrollToStage1 = (shouldAutoScroll: boolean = true) => {
    setWarpTriggerKey((prev) => prev + 1);
    setAuditVersion((prev) => prev + 1);
    setIsWarping(true);

    window.setTimeout(() => {
      setIsWarping(false);
    }, 750);

    window.setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
      if (shouldAutoScroll) {
        scrollToStage('scroll-stage-1');
      }
    }, 110);
  };

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = rawBrandInput.trim() || 'Đất Việt Media';
    const indTarget = rawIndustryInput.trim() || 'Truyền thông & Sự kiện';
    const descTarget = brandDescription.trim();
    setCustomMarketing(null);
    setAiError(null);
    setSelectedDomainOverride(null);
    setCommittedBrandInput(target);
    setCommittedIndustryInput(indTarget);
    setCommittedBrandDescription(descTarget);
    triggerAnalyzeAndScrollToStage1(true);

    const evaluated = analyzeBrand(
      target,
      indTarget,
      undefined,
      descTarget,
      logoSeedOffset
    );
    if (evaluated.input.wasSanitized) {
      setRawBrandInput(evaluated.input.cleanBrandName);
    }
    if (useCloudAi) {
      void triggerCloudAiEnhancement(
        evaluated.input.cleanBrandName,
        evaluated.industry.label,
        evaluated.emotion.label,
        evaluated.input.domainSlug,
        descTarget
      );
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = QUICK_TEST_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setRawBrandInput(preset.brandName);
    setCommittedBrandInput(preset.brandName);
    setRawIndustryInput(preset.industryText);
    setCommittedIndustryInput(preset.industryText);
    setBrandDescription(preset.brandDescription);
    setCommittedBrandDescription(preset.brandDescription);
    setSelectedDomainOverride(null);
    setSelectedSloganIndex(0);
    setCustomMarketing(null);
    setAiError(null);
    triggerAnalyzeAndScrollToStage1(false);
  };

  const handleApplySuggestedBrand = (suggestedName: string) => {
    setRawBrandInput(suggestedName);
    setCommittedBrandInput(suggestedName);
    setCommittedIndustryInput(rawIndustryInput.trim() || 'Truyền thông & Sự kiện');
    setCommittedBrandDescription(brandDescription.trim());
    setSelectedDomainOverride(null);
    setCustomMarketing(null);
    setAiError(null);
    triggerAnalyzeAndScrollToStage1(true);
  };

  const handlePlaySpeech = (lang: 'vi-VN' | 'en-US', customText?: string) => {
    const textToSpeak = customText || audit.input.cleanBrandName;
    setSpeakingLang(lang);

    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = lang;
        utterance.rate = 0.95;
        utterance.onend = () => setSpeakingLang(null);
        utterance.onerror = () => setSpeakingLang(null);
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Fallback timer if browser blocks audio
    }

    setTimeout(() => {
      setSpeakingLang(null);
    }, 1800);
  };

  const triggerCloudAiEnhancement = async (
    brandName: string,
    industryLabel: string,
    emotionLabel: string,
    domainSlug: string,
    descText: string
  ) => {
    setIsEnhancingAi(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          industryLabel,
          emotionLabel,
          domainSlug,
          brandDescription: descText,
        }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) {
        setAiError(
          json.error ||
            'Đang dùng bộ gợi ý câu chữ trực tiếp trên máy.'
        );
        return;
      }

      const d = json.data;
      setCustomMarketing({
        tagline: d.tagline || baseAudit.marketing.tagline,
        taglineRationale: d.taglineRationale || baseAudit.marketing.taglineRationale,
        slogans: [
          {
            ...baseAudit.marketing.slogans[0],
            text: d.sloganPhonetic || baseAudit.marketing.slogans[0].text,
          },
          {
            ...baseAudit.marketing.slogans[1],
            text: d.sloganEmotional || baseAudit.marketing.slogans[1].text,
          },
          {
            ...baseAudit.marketing.slogans[2],
            text: d.sloganAction || baseAudit.marketing.slogans[2].text,
          },
        ],
        source: 'gemini_hybrid',
      });
    } catch {
      setAiError('Đang dùng bộ gợi ý câu chữ trực tiếp trên máy.');
    } finally {
      setIsEnhancingAi(false);
    }
  };

  const fullReportText = useMemo(
    () => formatBrandKitReport(audit, sponsorUrl),
    [audit, sponsorUrl]
  );

  const handleCopyAllBrandKit = async () => {
    try {
      await navigator.clipboard.writeText(fullReportText);
    } catch {
      // Fallback handled by showing the preview toast/modal
    }
    setCopiedAll(true);
    setShowCopyToastModal(true);
    setTimeout(() => {
      setCopiedAll(false);
    }, 3500);
  };

  // Nút CTA chính ở dưới đáy luôn trỏ về trang Nhà tài trợ https://datvietent.vn/
  const primarySponsorHref = useMemo(() => {
    return sponsorUrl && !sponsorUrl.includes('datviet.vn/dang-ky-ten-mien')
      ? sponsorUrl
      : 'https://datvietent.vn/';
  }, [sponsorUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] text-slate-900 pb-28 relative">
      {/* Soft Pastel Radial Environment Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[560px]"
        style={{
          background:
            'radial-gradient(ellipse 46% 42% at 18% 0%, rgba(224, 231, 255, 0.78), transparent 72%), radial-gradient(ellipse 42% 38% at 52% -5%, rgba(224, 242, 254, 0.72), transparent 70%), radial-gradient(ellipse 44% 40% at 85% 4%, rgba(209, 250, 229, 0.65), transparent 72%)',
        }}
      />

      {/* FLOATING RIGHT-EDGE COMPACT SCROLL PROGRESS & 5-STAGE RAIL */}
      <aside
        aria-label="Thanh tiến trình cuộn 5 phân cảnh"
        className="hidden xl:flex fixed right-2.5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 px-1.5 py-2.5 shadow-lg backdrop-blur-md"
      >
        <span
          title="Tiến trình cuộn trang"
          className="font-mono text-[10px] font-extrabold text-emerald-700 tabular-nums border-b border-slate-200 pb-1.5 w-full text-center"
        >
          {scrollProgressPct}%
        </span>

        <div className="relative flex flex-col items-center gap-2 py-0.5">
          {SCROLL_STAGES_META.map((st, idx) => {
            const isCurrent = activeStageIndex === idx;
            const isPassed = activeStageIndex > idx;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => scrollToStage(st.id)}
                aria-label={`Phân cảnh ${st.step}: ${st.label}`}
                title={`Phân cảnh ${st.step}: ${st.label}`}
                className="group relative flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-sm scale-105'
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-700'
                  }`}
                >
                  {st.step}
                </span>

                <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-900 opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 shadow-md">
                  Phân cảnh {st.step}: {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* KHU VỰC A: THANH ĐIỀU HƯỚNG TRÊN CÙNG */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 border-b border-slate-200/90 bg-white/90 px-4 lg:px-8 py-2.5 backdrop-blur-xl shadow-2xs">
        <a
          href="#top"
          className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          XSon AI
        </a>

        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600"
        >
          <span className="font-bold text-indigo-700 whitespace-nowrap shrink-0">
            VIBE-CODING 2026 · ĐỀ SỐ 10
          </span>
          <a
            href="#scroll-stage-1"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage('scroll-stage-1');
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Điểm đánh giá & Chẩn đoán
          </a>
          <a
            href="#scroll-stage-3"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage('scroll-stage-3');
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            05 Tên miền & Nơi mua
          </a>
          <a
            href="#executive-proposal-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage('executive-proposal-section');
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Tờ trình Giám đốc
          </a>
          <a
            href="#scroll-stage-5"
            onClick={(e) => {
              e.preventDefault();
              scrollToStage('scroll-stage-5');
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Mẫu Logo & Google Preview
          </a>
          <button
            type="button"
            onClick={() => setIsScientificModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Về phương pháp chấm điểm
          </button>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsConfigModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
          >
            <span>Cấu hình Demo</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main
        id="top"
        ref={workspaceContainerRef}
        className="relative z-10 mx-auto max-w-[1440px] px-4 lg:px-8 xl:pr-14 pt-4"
      >
        {/* KHU VỰC B: HERO INPUT ZONE */}
        <section
          aria-label="Khung nhập tên thương hiệu và thông tin sản phẩm"
          className="obsidian-card relative overflow-hidden rounded-2xl p-4 lg:p-5"
        >
          <HeroWarpCanvas
            typingPulseKey={typingPulseKey}
            warpTriggerKey={warpTriggerKey}
            accentHex="#4F46E5"
            secondaryHex="#059669"
          />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-bold text-slate-900">
                  Kiểm tra độ hay của tên thương hiệu và tìm tên miền đẹp trước khi mở shop.
                </span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="font-medium text-slate-600">
                  Nhóm XSon (FPT Polytechnic)
                </span>
                {isWarping && (
                  <>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="font-mono text-[11px] font-bold text-emerald-700">
                      Đang quét dữ liệu tên miền & ngữ nghĩa...
                    </span>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsScientificModalOpen(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer"
              >
                Về phương pháp chấm điểm
              </button>
            </div>

            <form onSubmit={handleAnalyzeSubmit} className="space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-end">
                <div className="lg:col-span-6">
                  <label
                    htmlFor="brand-name-input"
                    className="block text-xs font-bold text-slate-800 mb-1"
                  >
                    Tên thương hiệu bạn định đặt
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="brand-name-input"
                      type="text"
                      value={rawBrandInput}
                      onChange={(e) => {
                        setRawBrandInput(e.target.value);
                        setTypingPulseKey((prev) => prev + 1);
                      }}
                      placeholder="VD: Đất Việt Media, FreshBite, Váy Đầm Xinh..."
                      className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <label
                    htmlFor="industry-text-input"
                    className="block text-xs font-bold text-slate-800 mb-1"
                  >
                    Lĩnh vực kinh doanh
                  </label>
                  <input
                    id="industry-text-input"
                    type="text"
                    value={rawIndustryInput}
                    onChange={(e) => {
                      setRawIndustryInput(e.target.value);
                      setCustomMarketing(null);
                      setTypingPulseKey((prev) => prev + 1);
                    }}
                    placeholder="VD: Truyền thông & Sự kiện, Nha khoa thẩm mỹ, Quán cà phê, Phụ kiện thú cưng..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-end">
                <div className="lg:col-span-9">
                  <label
                    htmlFor="brand-description-textarea"
                    className="flex items-center justify-between gap-2 text-xs font-bold text-slate-800 mb-1"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-indigo-600" />
                      Miêu tả sơ qua về thương hiệu / sản phẩm (bán gì, cho ai, có gì đặc biệt?)
                    </span>
                    {audit.input.extractedKeywords.slugTokens.length > 0 && (
                      <span className="hidden sm:inline font-mono text-[11px] font-semibold text-indigo-700">
                        Từ khóa gợi ý tên miền: {audit.input.extractedKeywords.slugTokens.slice(0, 4).join(', ')}
                      </span>
                    )}
                  </label>
                  <textarea
                    id="brand-description-textarea"
                    rows={2}
                    value={brandDescription}
                    onChange={(e) => {
                      setBrandDescription(e.target.value);
                      setTypingPulseKey((prev) => prev + 1);
                    }}
                    placeholder="VD: Phần mềm quản lý bán hàng dễ dùng cho các chủ shop nhỏ tại Việt Nam, tính tiền nhanh trên điện thoại..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs leading-relaxed font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none transition-all shadow-2xs"
                  />
                </div>

                <div className="lg:col-span-3">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_10px_25px_-6px_rgba(79,70,229,0.5)] hover:from-indigo-500 hover:to-violet-500 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Search className="h-4 w-4" />
                    <span>Kiểm tra tên này</span>
                  </button>
                </div>
              </div>
            </form>

            {audit.input.wasSanitized && audit.input.sanitizedNote && (
              <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-900">
                <Info className="h-4 w-4 text-sky-600 shrink-0" />
                <span>{audit.input.sanitizedNote}</span>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200/80 pt-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">
                  Dùng thử ví dụ mẫu:
                </span>
                {QUICK_TEST_PRESETS.map((preset) => {
                  const isCurrent =
                    audit.input.cleanBrandName.toLowerCase() ===
                    preset.brandName.toLowerCase();
                  const dotColor =
                    preset.id === 'datviet' || preset.id === 'freshbite'
                      ? 'bg-emerald-500'
                      : preset.id === 'shopee'
                      ? 'bg-sky-500'
                      : 'bg-amber-500';
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      title={`${preset.description}: "${preset.brandDescription}"`}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-slate-900'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                      <span>{preset.badge}</span>
                    </button>
                  );
                })}
              </div>

              <div
                role="group"
                aria-label="Chuyển đổi chế độ xem không gian 3D và Bento Grid"
                className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100/90 p-1"
              >
                <button
                  type="button"
                  onClick={() => setWorkspaceViewMode('bento')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    workspaceViewMode === 'bento'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Bento Grid View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWorkspaceViewMode('3d_layer')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    workspaceViewMode === '3d_layer'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>3D Layer View (Bóc tách 4 tầng)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="my-6 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/80 px-4 py-2 text-xs text-indigo-900 shadow-2xs">
          <span>
            Cuộn chuột xuống để khám phá tuần tự <strong>5 Phân cảnh đánh giá thương hiệu & tên miền</strong> theo chiều dọc.
          </span>
          <button
            type="button"
            onClick={() => scrollToStage('scroll-stage-1')}
            className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
          >
            <span>Bắt đầu từ Phân cảnh 01</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {workspaceViewMode === '3d_layer' && (
          <div className="mb-20">
            <IsometricExplodedView
              audit={audit}
              selectedDomain={activeDomain}
              onSelectDomain={(dom) => setSelectedDomainOverride(dom)}
              sponsorUrl={primarySponsorHref}
              onPlaySpeech={handlePlaySpeech}
              speakingLang={speakingLang}
              onSwitchToBento={() => setWorkspaceViewMode('bento')}
            />
          </div>
        )}

        <div
          id="bento-workspace"
          className="space-y-32 lg:space-y-36"
        >
          {/* PHÂN CẢNH 01 & 02 */}
          <PhoneticValuationCard
            input={audit.input}
            trapCheck={audit.trapCheck}
            scores={audit.scores}
            diagnostics={audit.diagnostics}
            onPlaySpeech={(lang) => handlePlaySpeech(lang)}
            speakingLang={speakingLang}
            auditVersion={auditVersion}
          />

          {/* PHÂN CẢNH 03: 05 BIẾN THỂ TÊN MIỀN (MỌI NÚT MUA NGAY TRỎ VỀ DATVIETENT.VN) + 4 NHÀ ĐĂNG KÝ LINK THẬT */}
          <div className="space-y-10">
            <DomainVariantsCard
              audit={audit}
              domains={audit.domains}
              selectedDomain={activeDomain}
              onSelectDomain={(dom) => setSelectedDomainOverride(dom)}
              selectedRegistrarId={selectedRegistrarId}
              onSelectRegistrarId={(regId) => setSelectedRegistrarId(regId)}
              registrars={registrarsForActiveDomain}
              sponsorUrl={primarySponsorHref}
              brandName={audit.input.cleanBrandName}
              auditVersion={auditVersion}
            />

            <ExecutiveProposalSection
              audit={audit}
              selectedDomainVariant={activeDomainVariant}
              selectedRegistrar={selectedRegistrar}
              onSelectRegistrar={(regId) => setSelectedRegistrarId(regId)}
              allRegistrars={registrarsForActiveDomain}
            />
          </div>

          {/* PHÂN CẢNH 04 */}
          <MarketingAndPreviewSection
            audit={audit}
            selectedDomain={activeDomain}
            selectedSloganIndex={selectedSloganIndex}
            onSelectSloganIndex={setSelectedSloganIndex}
            onPlaySpeech={handlePlaySpeech}
            onEnhanceWithAi={() =>
              triggerCloudAiEnhancement(
                audit.input.cleanBrandName,
                audit.industry.label,
                audit.emotion.label,
                audit.input.domainSlug,
                committedBrandDescription
              )
            }
            isEnhancingAi={isEnhancingAi}
            aiError={aiError}
            auditVersion={auditVersion}
          />

          {/* PHÂN CẢNH 05 */}
          <div
            id="scroll-stage-5"
            className="stage-3d-perspective space-y-10"
          >
            <div id="logo-studio">
              <BrandLogoStudioSection
                brandName={audit.input.cleanBrandName}
                domainName={activeDomain}
                brandDescription={audit.input.brandDescription}
                logos={audit.logos}
                industry={audit.industry}
                emotion={audit.emotion}
                onRegenerateLogos={() => setLogoSeedOffset((prev) => prev + 1)}
                auditVersion={auditVersion}
              />
            </div>

            <LiveCommercialPreviewSection
              audit={audit}
              selectedDomain={activeDomain}
              selectedSloganIndex={selectedSloganIndex}
              onPlaySpeech={handlePlaySpeech}
              auditVersion={auditVersion}
            />
          </div>

          {/* KHU VỰC G */}
          <div>
            <MarketTrendBentoSection audit={audit} />
          </div>
        </div>
      </main>

      {/* FLOATING CONTEXT-AWARE AI BRAND ADVISOR CHATBOT */}
      <BrandAdvisorChatbot
        audit={audit}
        useCloudAi={useCloudAi}
        onApplySuggestedBrand={handleApplySuggestedBrand}
      />

      {/* KHU VỰC F: THANH HÀNH ĐỘNG CỐ ĐỊNH Ở ĐÁY */}
      <footer
        aria-label="Thanh hành động sao chép bảng đánh giá và đăng ký tên miền"
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 lg:px-8 py-2 backdrop-blur-xl shadow-[0_-8px_24px_-6px_rgba(15,23,42,0.08)]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <span>Thương hiệu đang xem:</span>
            <strong className="text-slate-900">{audit.input.cleanBrandName}</strong>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-700 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {activeDomain} ({audit.bestDomain.domainScore}/100)
            </span>
          </div>

          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyAllBrandKit}
              aria-label="Copy toàn bộ thông tin"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
            >
              <span className="sm:hidden">
                {copiedAll ? 'Đã chép toàn bộ' : 'Copy toàn bộ'}
              </span>
              <span className="hidden sm:inline">
                {copiedAll
                  ? 'Đã chép toàn bộ thông tin'
                  : 'Copy toàn bộ thông tin'}
              </span>
            </button>

            <a
              href={primarySponsorHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Đăng ký tên miền tại Nhà tài trợ"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">Đăng ký tên miền ↗</span>
              <span className="hidden sm:inline">
                Đăng ký tên miền (Trang Nhà Tài Trợ) ↗
              </span>
            </a>
          </div>
        </div>
      </footer>

      {/* TOAST / MODAL PREVIEW OF COPIED BRAND KIT REPORT */}
      {showCopyToastModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="copied-report-title"
        >
          <div className="obsidian-card w-full max-w-2xl rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <h3 id="copied-report-title" className="text-base font-bold text-slate-900">
                  Đã chép bảng đánh giá thương hiệu vào bộ nhớ tạm
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCopyToastModal(false)}
                aria-label="Đóng bản xem trước Hồ sơ Thương hiệu"
                className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <pre className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-800 whitespace-pre-wrap">
              {fullReportText}
            </pre>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Bạn có thể dán (Ctrl+V / Cmd+V) trực tiếp vào Zalo, Messenger, Google Docs hoặc Email.
              </span>
              <button
                type="button"
                onClick={() => setShowCopyToastModal(false)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shrink-0"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCIENTIFIC PAPERS MODAL (4 PAPERS) */}
      <ScientificModal
        isOpen={isScientificModalOpen}
        onClose={() => setIsScientificModalOpen(false)}
      />

      {/* DEMO CONFIGURATION MODAL */}
      <DemoConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        sponsorUrl={sponsorUrl}
        onSaveSponsorUrl={(url) => setSponsorUrl(url)}
        useCloudAi={useCloudAi}
        onToggleCloudAi={(val) => setUseCloudAi(val)}
      />
    </div>
  );
}