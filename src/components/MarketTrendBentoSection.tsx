import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, Search, BarChart3, ArrowUpRight } from 'lucide-react';
import { FullBrandAuditResult } from '../utils/brandEngine';

interface MarketTrendBentoSectionProps {
  audit: FullBrandAuditResult;
  onSelectKeywordDomain?: (domainOrKeyword: string) => void;
}

export const MarketTrendBentoSection: React.FC<MarketTrendBentoSectionProps> = ({
  audit,
}) => {
  const { input, industry, marketTrend, scores } = audit;

  const [chartMode, setChartMode] = useState<'keywords' | 'industry_tld'>('keywords');
  const [timeframe, setTimeframe] = useState<'6m' | '12m'>('12m');
  const [highlightedSeries, setHighlightedSeries] = useState<string | null>(null);

  const visiblePoints = useMemo(() => {
    if (timeframe === '6m') {
      return marketTrend.points.slice(-6);
    }
    return marketTrend.points;
  }, [marketTrend.points, timeframe]);

  const primaryKwLabel =
    marketTrend.trendingKeywords[1]?.keyword || `${input.words[0]} ${industry.keywords[0]}`;
  const secondaryKwLabel =
    marketTrend.trendingKeywords[3]?.keyword || `xu hướng ${industry.shortLabel.toLowerCase()}`;

  return (
    <section
      id="market-trend-bento"
      aria-label="Biểu đồ mức độ quan tâm và từ khóa tên miền theo tháng"
      className="obsidian-card rounded-2xl p-4 sm:p-5"
    >
      {/* Top Header & Interactive Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Mức độ quan tâm theo tháng & Các từ khóa hay được tìm kiếm
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-600">
            Biểu đồ ước tính lượng người tìm kiếm từ khóa liên quan tới <strong className="text-indigo-700">{input.domainSlug}</strong> và lĩnh vực <strong>{industry.shortLabel}</strong>.
          </p>
        </div>

        {/* Segmented Controls: Chart Mode + Timeframe */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Mode Switcher */}
          <div
            role="group"
            aria-label="Chế độ hiển thị biểu đồ xu hướng"
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100/90 p-1"
          >
            <button
              type="button"
              onClick={() => {
                setChartMode('keywords');
                setHighlightedSeries(null);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'keywords'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Từ khóa tên miền
            </button>
            <button
              type="button"
              onClick={() => {
                setChartMode('industry_tld');
                setHighlightedSeries(null);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'industry_tld'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tỷ lệ chọn đuôi .vn / .com / .shop
            </button>
          </div>

          {/* Timeframe Switcher */}
          <div
            role="group"
            aria-label="Khung thời gian thống kê"
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100/90 p-1"
          >
            <button
              type="button"
              onClick={() => setTimeframe('6m')}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                timeframe === '6m'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6 Tháng
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('12m')}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                timeframe === '12m'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              12 Tháng
            </button>
          </div>
        </div>
      </div>

      {/* Main 12-Col Bento Inner Split: 8 Cols Recharts LineChart + 4 Cols Trending Domain Keywords & TLD Stats */}
      <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left 8/12 Cols: Recharts Multi-Series LineChart */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <BarChart3 className="h-4 w-4 text-indigo-600 shrink-0" />
              <span className="font-bold text-slate-900">
                {chartMode === 'keywords'
                  ? `Biến động Chỉ số Tìm kiếm Từ khóa Tên miền (${timeframe === '12m' ? '12 tháng qua' : '6 tháng gần nhất'})`
                  : `Biến động Độ phổ biến Ngành ${industry.shortLabel} & Thị phần Đuôi Tên miền (.vn / .com / .shop)`}
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-600 tabular-nums">
              Đỉnh chu kỳ: <strong className="text-emerald-700">{marketTrend.peakSeasonMonth}</strong> · {marketTrend.volatilityIndex}
            </div>
          </div>

          {/* Recharts LineChart Container */}
          <div className="h-64 w-full" data-testid="recharts-market-trend-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visiblePoints}
                margin={{ top: 10, right: 16, left: -12, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="month"
                  stroke="#64748B"
                  tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[30, 100]}
                  stroke="#64748B"
                  tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#CBD5E1',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0F172A',
                    fontFamily: 'JetBrains Mono',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1)',
                  }}
                  itemStyle={{ padding: '2px 0' }}
                  formatter={(value: unknown, name: unknown) => [
                    `${Number(value)} / 100 điểm xu hướng`,
                    String(name),
                  ]}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: '11px',
                    paddingTop: '8px',
                    color: '#334155',
                  }}
                />
                <ReferenceLine
                  y={75}
                  stroke="#94A3B8"
                  strokeDasharray="4 4"
                  label={{
                    value: 'Ngưỡng bùng nổ (75)',
                    position: 'insideTopRight',
                    fill: '#475569',
                    fontSize: 10,
                  }}
                />

                {chartMode === 'keywords' ? (
                  <>
                    <Line
                      type="monotone"
                      dataKey="brandMomentum"
                      name={`Từ khóa "${input.domainSlug}"`}
                      stroke="#4F46E5"
                      strokeWidth={highlightedSeries === 'brandMomentum' ? 3.5 : 2.5}
                      dot={{ r: 3.5, fill: '#4F46E5', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="keywordPrimary"
                      name={`Từ khóa "${primaryKwLabel}"`}
                      stroke="#059669"
                      strokeWidth={highlightedSeries === 'keywordPrimary' ? 3.5 : 2.25}
                      dot={{ r: 3, fill: '#059669', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="keywordSecondary"
                      name={`Từ khóa "${secondaryKwLabel}"`}
                      stroke="#D97706"
                      strokeWidth={highlightedSeries === 'keywordSecondary' ? 3.5 : 2}
                      dot={{ r: 2.5, fill: '#D97706' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="industryAvg"
                      name={`Trung bình ngành ${industry.shortLabel}`}
                      stroke="#64748B"
                      strokeWidth={1.75}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </>
                ) : (
                  <>
                    <Line
                      type="monotone"
                      dataKey="vnTldTrend"
                      name="Đuôi Quốc gia (.vn)"
                      stroke="#059669"
                      strokeWidth={2.5}
                      dot={{ r: 3.5, fill: '#059669', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="comTldTrend"
                      name="Đuôi Quốc tế (.com)"
                      stroke="#0284C7"
                      strokeWidth={2.25}
                      dot={{ r: 3, fill: '#0284C7', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="shopTldTrend"
                      name={`Đuôi TMĐT (${industry.defaultTlds[2] || '.shop'})`}
                      stroke="#7C3AED"
                      strokeWidth={2.25}
                      dot={{ r: 3, fill: '#7C3AED', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="industryAvg"
                      name={`Độ phổ biến ngành ${industry.shortLabel}`}
                      stroke="#D97706"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Summary KPI Strip */}
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-slate-200 pt-2.5 text-center font-mono tabular-nums">
            <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
              <div className="text-[10px] text-slate-500">Tăng trưởng Ngành YoY</div>
              <div className="text-xs font-bold text-emerald-700">
                +{marketTrend.growthRateYoY}%
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
              <div className="text-[10px] text-slate-500">Organic CTR Tiềm năng</div>
              <div className="text-xs font-bold text-indigo-700">
                {marketTrend.organicClickShare}% (Điểm: {scores.memorabilityScore})
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
              <div className="text-[10px] text-slate-500">CPC Quảng cáo TB</div>
              <div className="text-xs font-bold text-amber-700">
                {marketTrend.cpcEstimateVnd}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
              <div className="text-[10px] text-slate-500">Tháng Đỉnh Xu Hướng</div>
              <div className="text-xs font-bold text-sky-700">
                {marketTrend.peakSeasonMonth}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4/12 Cols: Trending Domain Search Keywords & TLD Popularity Breakdown */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-3">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Search className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                <span>Từ khóa Tên miền Thịnh hành</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                Click để làm nổi bật đường biểu đồ
              </span>
            </div>

            {/* Trending Keywords List */}
            <div className="mt-2.5 space-y-2" role="list">
              {marketTrend.trendingKeywords.map((kw) => {
                const isActive = highlightedSeries === kw.seriesKey;
                return (
                  <button
                    key={kw.id}
                    type="button"
                    onClick={() => {
                      setChartMode('keywords');
                      setHighlightedSeries(
                        highlightedSeries === kw.seriesKey ? null : kw.seriesKey
                      );
                    }}
                    className={`w-full text-left rounded-xl border px-3 py-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50/80 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 truncate">
                        {kw.keyword}
                      </span>
                      <span className="inline-flex items-center gap-0.5 font-mono text-xs font-bold text-emerald-700 tabular-nums shrink-0">
                        <ArrowUpRight className="h-3 w-3" />
                        +{kw.growthPct}%
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600 font-mono tabular-nums">
                      <span>{kw.monthlySearches.toLocaleString('vi-VN')} lượt/tháng</span>
                      <span>·</span>
                      <span>Cạnh tranh: {kw.competition}</span>
                      <span>·</span>
                      <span className="font-semibold text-indigo-700">Gợi ý: {kw.suggestedTld}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TLD Popularity Distribution in Current Industry */}
          <div className="border-t border-slate-200 pt-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Thị phần Đuôi Tên miền ({industry.shortLabel})</span>
              <span className="font-mono text-[10px] text-emerald-700">Tăng trưởng 12T</span>
            </div>
            <div className="space-y-1.5">
              {marketTrend.tldDemandSplit.map((item) => (
                <div key={item.tld}>
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums">
                    <span className="font-semibold text-slate-700">{item.tld}</span>
                    <span className="text-slate-600">
                      <strong className="text-slate-900">{item.share}%</strong> ({item.growth})
                    </span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500"
                      style={{ width: `${item.share}%` }}
                    />
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
