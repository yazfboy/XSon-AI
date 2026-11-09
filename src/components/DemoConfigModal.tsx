import React, { useState } from 'react';
import { X, Settings, ExternalLink, Check, Sparkles, Zap } from 'lucide-react';

interface DemoConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorUrl: string;
  onSaveSponsorUrl: (url: string) => void;
  useCloudAi: boolean;
  onToggleCloudAi: (val: boolean) => void;
}

const SPONSOR_PRESETS = [
  {
    label: 'Nhà tài trợ Vàng Đất Việt Media (Mặc định)',
    url: 'https://datviet.vn/dang-ky-ten-mien',
  },
  {
    label: 'Cổng cuộc thi VIBE-CODING 2026 (FPT Polytechnic)',
    url: 'https://poly.edu.vn/vibe-coding-2026',
  },
  {
    label: 'Nhà đăng ký Tên miền Quốc gia VNNIC (.vn)',
    url: 'https://vnnic.vn/ten-mien',
  },
];

export const DemoConfigModal: React.FC<DemoConfigModalProps> = ({
  isOpen,
  onClose,
  sponsorUrl,
  onSaveSponsorUrl,
  useCloudAi,
  onToggleCloudAi,
}) => {
  const [draftUrl, setDraftUrl] = useState(sponsorUrl);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftUrl.trim() || 'https://datviet.vn/dang-ky-ten-mien';
    onSaveSponsorUrl(cleaned);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-config-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <Settings className="h-4 w-4" />
              <span>CẤU HÌNH PHỄU CHUYỂN ĐỔI & ENGINE</span>
            </div>
            <h2 id="demo-config-title" className="mt-1 text-lg font-bold text-slate-900">
              Cấu hình Demo cho Hội đồng Giám khảo & Nhà tài trợ
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ Cấu hình Demo"
            className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="sponsor-url-input"
              className="block text-xs font-bold text-slate-800"
            >
              Link Trang đích Nhà Tài Trợ (Conversion CTA URL)
            </label>
            <p className="mt-0.5 text-xs text-slate-600">
              Khi bấm nút &ldquo;Đăng ký tên miền&rdquo;, hệ thống sẽ dẫn về địa chỉ này kèm tham số{' '}
              <code className="font-mono font-bold text-indigo-700">?domain=...</code>
            </p>
            <input
              id="sponsor-url-input"
              type="url"
              value={draftUrl}
              onChange={(e) => setDraftUrl(e.target.value)}
              placeholder="https://datviet.vn/dang-ky-ten-mien"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
            />

            <div className="mt-2.5 space-y-1.5">
              <span className="block text-xs font-semibold text-slate-600">Chọn nhanh mẫu Nhà tài trợ:</span>
              <div className="flex flex-wrap gap-1.5">
                {SPONSOR_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setDraftUrl(preset.url)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      draftUrl === preset.url
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Viết thêm khẩu hiệu qua máy chủ đám mây</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Mặc định ứng dụng trả kết quả ngay lập tức trên máy. Bạn có thể bật thêm kết nối máy chủ để viết thêm các phương án câu chữ mới.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={useCloudAi}
                aria-label="Bật chế độ kết nối máy chủ"
                onClick={() => onToggleCloudAi(!useCloudAi)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  useCloudAi ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    useCloudAi ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>
                {useCloudAi
                  ? 'Đang bật: Tự động gọi thêm máy chủ khi bấm Kiểm tra tên này'
                  : 'Đang bật: Trả kết quả ngay lập tức trên trình duyệt (0 giây chờ)'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Đã lưu cấu hình!</span>
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  <span>Lưu cấu hình Demo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
