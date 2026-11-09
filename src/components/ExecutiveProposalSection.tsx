import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Printer,
  ExternalLink,
  ShieldCheck,
  Award,
  Building2,
  X,
} from 'lucide-react';
import {
  FullBrandAuditResult,
  DomainVariant,
  DomainRegistrarOption,
  getDomainDeepDiveAnalysis,
  formatExecutiveProposalText,
} from '../utils/brandEngine';

interface ExecutiveProposalSectionProps {
  audit: FullBrandAuditResult;
  selectedDomainVariant: DomainVariant;
  selectedRegistrar: DomainRegistrarOption;
  onSelectRegistrar: (registrarId: DomainRegistrarOption['id']) => void;
  allRegistrars: DomainRegistrarOption[];
}

export const ExecutiveProposalSection: React.FC<ExecutiveProposalSectionProps> = ({
  audit,
  selectedDomainVariant,
  selectedRegistrar,
  onSelectRegistrar,
  allRegistrars,
}) => {
  const [copiedProposal, setCopiedProposal] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  const { input, industry, emotion, trapCheck, scores, marketing, logos } = audit;
  const deepDive = getDomainDeepDiveAnalysis(selectedDomainVariant, audit);
  const proposalPlainText = formatExecutiveProposalText(
    audit,
    selectedDomainVariant,
    selectedRegistrar
  );
  const todayStr = new Date().toLocaleDateString('vi-VN');

  const handleCopyProposal = async () => {
    try {
      await navigator.clipboard.writeText(proposalPlainText);
    } catch {
      // Fallback modal will still display the full text for easy copy
    }
    setCopiedProposal(true);
    setShowProposalModal(true);
    setTimeout(() => {
      setCopiedProposal(false);
    }, 3500);
  };

  const handlePrintProposal = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  return (
    <section
      id="executive-proposal-section"
      aria-label="Tờ trình Đề xuất Thương hiệu và Tên miền trình Giám đốc duyệt"
      className="obsidian-card rounded-2xl p-4 sm:p-6 print:border-none print:shadow-none print:p-0"
    >
      {/* Top Section Header & Quick Registrar Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 print:hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              DÀNH CHO NHÂN SỰ THƯƠNG HIỆU & MARKETING
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              📄 Tờ trình Đề xuất Thương hiệu & Tên miền (Trình Giám đốc duyệt)
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Bản đề xuất chuẩn doanh nghiệp tự động tổng hợp từ tên miền{' '}
            <strong className="font-mono text-indigo-700">
              {selectedDomainVariant.domain}
            </strong>{' '}
            và nhà đăng ký{' '}
            <strong className="text-emerald-700">{selectedRegistrar.name}</strong> để gửi trình Ban Giám đốc phê duyệt ngân sách.
          </p>
        </div>

        {/* Quick Registrar Pill Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">
            Đơn vị mua trong tờ trình:
          </span>
          {allRegistrars.map((reg) => {
            const isActive = reg.id === selectedRegistrar.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => onSelectRegistrar(reg.id)}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700'
                }`}
              >
                {reg.id === 'sponsor_official'
                  ? 'Nhà Tài Trợ Chính Thức'
                  : reg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Action Bar for Brand Managers */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-indigo-200/90 bg-indigo-50/70 p-3 print:hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950">
          <FileText className="h-4 w-4 text-indigo-600 shrink-0" />
          <span>
            Sẵn sàng xuất hồ sơ trình ký cho tên miền{' '}
            <strong className="font-mono underline underline-offset-2">
              {selectedDomainVariant.domain}
            </strong>{' '}
            ({selectedRegistrar.firstYearPrice})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyProposal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-white px-3.5 py-2 text-xs font-bold text-indigo-900 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer shadow-2xs"
          >
            {copiedProposal ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-indigo-600" />
            )}
            <span>
              {copiedProposal
                ? 'Đã chép nguyên văn Tờ trình!'
                : '📋 Copy nguyên văn Tờ trình (Gửi Zalo/Email cho Sếp)'}
            </span>
          </button>

          <button
            type="button"
            onClick={handlePrintProposal}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:border-indigo-400 hover:text-indigo-700 transition-all cursor-pointer shadow-2xs"
          >
            <Printer className="h-3.5 w-3.5 text-slate-700" />
            <span>🖨️ In / Xuất file PDF Báo cáo Đề xuất</span>
          </button>

          <a
            href={selectedRegistrar.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:from-emerald-500 hover:to-teal-500 transition-all"
          >
            <span>🚀 Đi tới trang Đăng ký tên miền đã chọn ↗</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* EXECUTIVE PROPOSAL PAPER DOCUMENT (Luxury White A4 Corporate Sheet) */}
      <div className="mt-5 rounded-2xl border-2 border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] text-slate-900">
        {/* Document Formal Letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <Building2 className="h-4 w-4" />
              <span>PHÒNG THƯƠNG HIỆU & PHÁT TRIỂN KINH DOANH · XSON AI AUDIT</span>
            </div>
            <h3 className="mt-1.5 text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900">
              TỜ TRÌNH ĐỀ XUẤT PHƯƠNG ÁN THƯƠNG HIỆU & ĐĂNG KÝ TÊN MIỀN
            </h3>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
              Kính trình: <span className="underline">Ban Giám đốc / Hội đồng Phê duyệt Ngân sách Doanh nghiệp</span>
            </p>
          </div>

          <div className="sm:text-right text-xs text-slate-600 shrink-0 bg-slate-50 rounded-xl border border-slate-200 px-3.5 py-2.5">
            <div className="font-bold text-slate-900">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="font-semibold text-slate-700">
              Độc lập · Tự do · Hạnh phúc
            </div>
            <div className="mt-1 font-mono text-[11px] text-slate-500">
              Mã hồ sơ: #XSON-{input.domainSlug.slice(0, 6).toUpperCase()} · Ngày: {todayStr}
            </div>
          </div>
        </div>

        {/* 5 EXECUTIVE PROPOSAL SECTIONS */}
        <div className="mt-6 space-y-6">
          {/* MỤC 1: TÓM TẮT ĐỀ XUẤT */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                1. Tóm tắt Đề xuất Thương hiệu & Tên miền
              </h4>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                <Award className="h-3.5 w-3.5 text-emerald-600" />
                Đạt chuẩn triển khai ({selectedDomainVariant.domainScore}/100 điểm)
              </span>
            </div>

            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Tên thương hiệu đề xuất:</span>
                <div className="mt-1 text-sm font-black text-slate-900">
                  {input.cleanBrandName}
                </div>
                <span className="text-[11px] text-slate-500">
                  ({input.syllableCount} âm tiết · {input.charCount} chữ cái)
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Lĩnh vực & Ngành hàng:</span>
                <div className="mt-1 text-sm font-bold text-indigo-800">
                  {industry.label}
                </div>
                <span className="text-[11px] text-slate-500">
                  Tông nhận diện: {emotion.colorName}
                </span>
              </div>

              <div className="rounded-lg border border-indigo-300 bg-indigo-50/60 p-3">
                <span className="text-indigo-800 font-semibold">Tên miền quyết định lựa chọn:</span>
                <div className="mt-1 font-mono text-sm sm:text-base font-black text-indigo-700">
                  {selectedDomainVariant.domain}
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">
                  {selectedDomainVariant.statusLabel}
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Định hướng sản phẩm chính:</span>
                <div className="mt-1 text-xs font-semibold text-slate-800 line-clamp-2">
                  {input.brandDescription}
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 2: CƠ SỞ ĐÁNH GIÁ & THẨM ĐỊNH (SỐ LIỆU CHỨNG MINH VỚI SẾP) */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight border-b border-slate-200 pb-2.5">
              2. Cơ sở Đánh giá & Thẩm định (Số liệu chứng minh với Ban Giám đốc)
            </h4>

            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Độ dễ đọc</span>
                  <span className="font-mono text-sm font-black text-emerald-700">
                    {scores.pronunciationScore}/100
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                  Đọc tiếng Việt đạt {scores.vnFluencyScore}%, khách quốc tế đọc đạt {scores.intlFluencyScore}%. {scores.pronunciationSummary}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Độ dễ nhớ</span>
                  <span className="font-mono text-sm font-black text-indigo-700">
                    {scores.memorabilityScore}/100
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                  {scores.memorabilitySummary}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Độ khớp sản phẩm</span>
                  <span className="font-mono text-sm font-black text-indigo-700">
                    {scores.relevanceScore}/100
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                  {scores.relevanceSummary}
                </p>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">An toàn ngữ nghĩa</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
                <p className="mt-1.5 text-[11px] font-medium text-emerald-900 leading-relaxed">
                  {trapCheck.isSafe
                    ? `Chuỗi "${selectedDomainVariant.slugPart}" hoàn toàn sạch nghĩa, không phát sinh từ nhạy cảm khi viết liền không dấu.`
                    : `Phương án "${selectedDomainVariant.domain}" đã được xử lý tách từ khóa để tránh hiểu lầm khi bỏ dấu tiếng Việt.`}
                </p>
              </div>
            </div>
          </div>

          {/* MỤC 3: LÝ DO CHỌN TÊN MIỀN [TÊN MIỀN ĐÃ CHỌN] */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight border-b border-slate-200 pb-2.5">
              3. Lý do Chọn Tên miền{' '}
              <span className="font-mono text-indigo-700">
                {selectedDomainVariant.domain}
              </span>{' '}
              thay vì các phương án khác
            </h4>

            <div className="mt-3 space-y-2 text-xs text-slate-700">
              {deepDive.executivePitchPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 font-mono text-[10px] font-bold text-white shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium text-slate-800">
                    {point}
                  </span>
                </div>
              ))}
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <strong className="text-slate-900">Lợi thế truyền thông & Quảng cáo:</strong>{' '}
                  {deepDive.seoAndAdsVerdict}
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <strong className="text-slate-900">Khả năng đọc qua điện thoại (Telesales):</strong>{' '}
                  {deepDive.phoneDictationVerdict}
                </div>
              </div>
            </div>
          </div>

          {/* MỤC 4: PHƯƠNG ÁN MUA & DỰ TOÁN NGÂN SÁCH */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2.5">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                4. Phương án Mua & Dự toán Ngân sách ({selectedRegistrar.name})
              </h4>
              {selectedRegistrar.badge && (
                <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {selectedRegistrar.badge}
                </span>
              )}
            </div>

            <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Đơn vị cung cấp được chọn:</span>
                <div className="mt-1 text-sm font-extrabold text-slate-900">
                  {selectedRegistrar.name}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-indigo-700">
                  {selectedRegistrar.groupTitle}
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Dự toán ngân sách đăng ký:</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-base font-black text-emerald-700">
                    {selectedRegistrar.firstYearPrice}
                  </span>
                  <span className="text-[11px] text-slate-500">(Năm đầu)</span>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-600">
                  Phí duy trì năm tiếp theo:{' '}
                  <strong className="font-mono text-slate-800">
                    {selectedRegistrar.renewalPrice}
                  </strong>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <span className="text-slate-500 font-medium">Quyền lợi pháp lý & kỹ thuật đi kèm:</span>
                <ul className="mt-1 space-y-1 text-[11px] text-slate-700">
                  {selectedRegistrar.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MỤC 5: BỘ NHẬN DIỆN KHỞI ĐẦU ĐI KÈM */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight border-b border-slate-200 pb-2.5">
              5. Bộ Nhận diện Khởi đầu Đi kèm (Tagline, 03 Slogan & 02 Phương án Logo)
            </h4>

            <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
              <div className="lg:col-span-7 space-y-2.5">
                <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-3">
                  <span className="text-[11px] font-bold uppercase text-indigo-700">
                    01 Câu định vị thương hiệu (Tagline gắn dưới Logo):
                  </span>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">
                    “{marketing.tagline}”
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-slate-700">
                    03 Khẩu hiệu chiến dịch (Slogan quảng cáo):
                  </span>
                  {marketing.slogans.map((sl, i) => (
                    <div key={sl.id} className="flex items-start gap-2 text-slate-800">
                      <span className="font-mono font-bold text-indigo-600 shrink-0">
                        0{i + 1}.
                      </span>
                      <span>
                        <strong>{sl.dimensionCode}:</strong> “{sl.text}”
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-700">
                    02 Phương án Logo đề xuất (Xem tại Phân cảnh 05):
                  </span>
                  <div className="mt-2 space-y-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="font-bold text-slate-900">
                        {logos[0].title}
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-600">
                        {logos[0].symbolism}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="font-bold text-slate-900">
                        {logos[1].title}
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-600">
                        {logos[1].symbolism}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Người lập đề xuất: Phòng Thương hiệu</span>
                  <span className="font-semibold text-slate-800">
                    Phê duyệt của Ban Giám đốc
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview when Copying Executive Proposal */}
      {showProposalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="copied-proposal-modal-title"
        >
          <div className="obsidian-card w-full max-w-2xl rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <h3
                  id="copied-proposal-modal-title"
                  className="text-base font-bold text-slate-900"
                >
                  Đã sao chép nguyên văn Tờ trình Đề xuất trình Giám đốc
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                aria-label="Đóng bản xem trước Tờ trình"
                className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <pre className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-800 whitespace-pre-wrap">
              {proposalPlainText}
            </pre>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Bạn có thể dán (Ctrl+V / Cmd+V) gửi trực tiếp qua Zalo, Email hoặc Google Docs cho Sếp duyệt.
              </span>
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shrink-0 cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
