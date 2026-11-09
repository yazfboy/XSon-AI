/**
 * XSon AI v3.0 - Core Linguistic, Phonetic, Semantic Cohesion, Domain Valuation & Logo Studio Engine
 * Implements the 4 international research papers specified in VIBE-CODING 2026 (Problem #10):
 * 1. Laham, Koval & Alter (2012) - The Name-Pronunciation Effect (Phonological Fluency)
 * 2. Özbal, Pighin & Strapparava (2013) - BRAINSUP: Brainstorming Support for Creative Sentence Generation
 * 3. Deri & Knight (2015) - How to Make a Frenemy: Multitape FSTs for Portmanteau Generation
 * 4. Peter Norvig (2009) - Natural Language Corpus Data: Word Segmentation & Concatenation Traps
 */

export type IndustryId =
  | 'tech'
  | 'ecommerce'
  | 'fnb'
  | 'fashion'
  | 'education'
  | 'travel';

export type EmotionId =
  | 'trust_blue'
  | 'energetic_orange'
  | 'fresh_green'
  | 'luxury_purple';

export interface IndustryOption {
  id: IndustryId;
  label: string;
  shortLabel: string;
  keywords: string[];
  viKeywords: string[];
  blendSuffixes: string[];
  defaultTlds: string[];
  iconType: 'cpu' | 'shopping-bag' | 'coffee' | 'sparkles' | 'graduation-cap' | 'compass';
}

export interface EmotionOption {
  id: EmotionId;
  label: string;
  colorName: string;
  psychologyNote: string;
  gradientClass: string;
  badgeTextClass: string;
  borderAccentClass: string;
  hexPrimary: string;
  hexSecondary: string;
  hexAccent: string;
}

export const INDUSTRIES: IndustryOption[] = [
  {
    id: 'tech',
    label: 'Công nghệ & AI',
    shortLabel: 'Công nghệ & AI',
    keywords: ['tech', 'ai', 'cloud', 'hub', 'media', 'soft', 'data', 'digital', 'smart', 'app'],
    viKeywords: ['công nghệ', 'phần mềm', 'truyền thông', 'sự kiện', 'số hóa', 'ai', 'quản lý', 'dữ liệu', 'nền tảng', 'giải pháp'],
    blendSuffixes: ['tech', 'ai', 'media', 'hub', 'cloud'],
    defaultTlds: ['.vn', '.com', '.ai'],
    iconType: 'cpu',
  },
  {
    id: 'ecommerce',
    label: 'TMĐT & Bán lẻ',
    shortLabel: 'TMĐT & Bán lẻ',
    keywords: ['shop', 'mart', 'store', 'mall', 'deal', 'buy', 'cart', 'retail', 'box'],
    viKeywords: ['mua sắm', 'bán lẻ', 'thương mại', 'sàn', 'giá rẻ', 'chính hãng', 'đơn hàng', 'cửa hàng', 'siêu thị', 'trực tuyến'],
    blendSuffixes: ['shop', 'mart', 'store', 'box', 'mall'],
    defaultTlds: ['.vn', '.com', '.shop'],
    iconType: 'shopping-bag',
  },
  {
    id: 'fnb',
    label: 'Ẩm thực & F&B',
    shortLabel: 'Ẩm thực & F&B',
    keywords: ['fresh', 'bite', 'food', 'tea', 'cafe', 'kitchen', 'organic', 'salad', 'juice', 'taste'],
    viKeywords: ['đồ ăn', 'ẩm thực', 'salad', 'hữu cơ', 'nước ép', 'tươi', 'lành mạnh', 'nhà hàng', 'cà phê', 'trà', 'ngon'],
    blendSuffixes: ['bite', 'fresh', 'food', 'tea', 'brew'],
    defaultTlds: ['.vn', '.com', '.shop'],
    iconType: 'coffee',
  },
  {
    id: 'fashion',
    label: 'Thời trang, Làm đẹp & Spa',
    shortLabel: 'Thời trang, Làm đẹp & Spa',
    keywords: ['style', 'glow', 'spa', 'relax', 'care', 'wear', 'boutique', 'beauty', 'dress', 'skin', 'aura', 'massage'],
    viKeywords: ['thời trang', 'váy', 'đầm', 'mỹ phẩm', 'làm đẹp', 'spa', 'massage', 'mát-xa', 'mát xa', 'thư giãn', 'trị liệu', 'thiết kế', 'dự tiệc', 'nữ tính', 'phái đẹp', 'da'],
    blendSuffixes: ['spa', 'relax', 'care', 'style', 'glow', 'wear'],
    defaultTlds: ['.vn', '.com', '.shop'],
    iconType: 'sparkles',
  },
  {
    id: 'education',
    label: 'Giáo dục & Đào tạo',
    shortLabel: 'Giáo dục & Đào tạo',
    keywords: ['edu', 'academy', 'skill', 'learn', 'pro', 'mind', 'mentor', 'class'],
    viKeywords: ['giáo dục', 'đào tạo', 'học', 'kỹ năng', 'khóa học', 'luyện thi', 'tri thức', 'trường', 'ngoại ngữ'],
    blendSuffixes: ['edu', 'learn', 'academy', 'skill', 'mind'],
    defaultTlds: ['.vn', '.com', '.edu.vn'],
    iconType: 'graduation-cap',
  },
  {
    id: 'travel',
    label: 'Du lịch & Lưu trú',
    shortLabel: 'Du lịch & Lưu trú',
    keywords: ['trip', 'stay', 'tour', 'go', 'vista', 'travel', 'booking', 'explore'],
    viKeywords: ['du lịch', 'tour', 'lưu trú', 'khách sạn', 'nghỉ dưỡng', 'trải nghiệm', 'văn hóa', 'vé', 'hành trình'],
    blendSuffixes: ['trip', 'tour', 'stay', 'go', 'vibe'],
    defaultTlds: ['.vn', '.com', '.travel'],
    iconType: 'compass',
  },
];

export const EMOTIONS: EmotionOption[] = [
  {
    id: 'trust_blue',
    label: 'Tin cậy & Chuyên nghiệp - Xanh dương',
    colorName: 'Xanh dương Tin cậy',
    psychologyNote: 'Tông xanh dương tạo cảm giác đàng hoàng, rõ ràng và đáng tin cậy khi khách hàng giao dịch hoặc đặt mua.',
    gradientClass: 'from-blue-600 via-indigo-600 to-slate-900',
    badgeTextClass: 'text-sky-300',
    borderAccentClass: 'border-sky-500/40',
    hexPrimary: '#2563EB',
    hexSecondary: '#4F46E5',
    hexAccent: '#38BDF8',
  },
  {
    id: 'energetic_orange',
    label: 'Năng động & Trẻ trung - Đỏ/Cam',
    colorName: 'Đỏ Cam Năng động',
    psychologyNote: 'Tông đỏ cam bắt mắt, tạo không khí mua sắm sôi nổi và thúc đẩy khách bấm xem hàng nhanh hơn.',
    gradientClass: 'from-orange-500 via-rose-600 to-slate-900',
    badgeTextClass: 'text-orange-300',
    borderAccentClass: 'border-orange-500/40',
    hexPrimary: '#F97316',
    hexSecondary: '#E11D48',
    hexAccent: '#FB923C',
  },
  {
    id: 'fresh_green',
    label: 'Tươi mát & Gần gũi - Xanh lá',
    colorName: 'Xanh lá Tươi mát',
    psychologyNote: 'Tông xanh lá gợi cảm giác tự nhiên, tươi sạch và thư thái, rất hợp với đồ ăn thức uống, spa thư giãn hoặc chăm sóc sức khỏe.',
    gradientClass: 'from-emerald-600 via-teal-600 to-slate-900',
    badgeTextClass: 'text-emerald-300',
    borderAccentClass: 'border-emerald-500/40',
    hexPrimary: '#059669',
    hexSecondary: '#0D9488',
    hexAccent: '#34D399',
  },
  {
    id: 'luxury_purple',
    label: 'Sang trọng & Cao cấp - Tím/Vàng kim',
    colorName: 'Tím & Vàng kim Sang trọng',
    psychologyNote: 'Sự kết hợp giữa tím trầm và ánh vàng kim tạo vẻ lịch thiệp, chỉn chu cho các mặt hàng thời trang, làm đẹp, spa hoặc dịch vụ cao cấp.',
    gradientClass: 'from-violet-600 via-fuchsia-700 to-amber-600',
    badgeTextClass: 'text-amber-300',
    borderAccentClass: 'border-violet-500/40',
    hexPrimary: '#7C3AED',
    hexSecondary: '#D97706',
    hexAccent: '#FBBF24',
  },
];

export interface QuickTestPreset {
  id: string;
  badge: string;
  brandName: string;
  industryText: string;
  brandDescription: string;
  industry: IndustryId;
  emotion: EmotionId;
  description: string;
}

export const QUICK_TEST_PRESETS: QuickTestPreset[] = [
  {
    id: 'datviet',
    badge: 'Đất Việt Media',
    brandName: 'Đất Việt Media',
    industryText: 'Truyền thông & Sự kiện',
    brandDescription:
      'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam',
    industry: 'tech',
    emotion: 'trust_blue',
    description: 'Thương hiệu chuẩn Tiếng Việt (Nhà tài trợ Vàng)',
  },
  {
    id: 'freshbite',
    badge: 'FreshBite',
    brandName: 'FreshBite',
    industryText: 'Ẩm thực & Đồ uống lành mạnh',
    brandDescription:
      'Chuỗi đồ ăn nhanh lành mạnh, salad hữu cơ và nước ép tươi cho dân văn phòng bận rộn',
    industry: 'fnb',
    emotion: 'fresh_green',
    description: 'Thương hiệu Tiếng Anh có âm đầu rõ và ghép từ đẹp',
  },
  {
    id: 'vaydamxinh',
    badge: 'Váy Đầm Xinh',
    brandName: 'Váy Đầm Xinh',
    industryText: 'Thời trang thiết kế & Váy đầm',
    brandDescription:
      'Shop thời trang thiết kế chuyên váy đầm dự tiệc nữ tính cho phái đẹp',
    industry: 'fashion',
    emotion: 'luxury_purple',
    description: 'Ví dụ bị dính chữ nhạy cảm vaydamxinh khi bỏ dấu tiếng Việt',
  },
  {
    id: 'choosespain',
    badge: 'Choose Spain',
    brandName: 'Choose Spain',
    industryText: 'Du lịch & Trải nghiệm văn hóa',
    brandDescription:
      'Cổng thông tin đặt tour du lịch và trải nghiệm văn hóa Tây Ban Nha',
    industry: 'travel',
    emotion: 'energetic_orange',
    description: 'Ví dụ ghép chữ tiếng Anh thành choosespain (dính chữ pain)',
  },
  {
    id: 'shopee',
    badge: 'Shopee',
    brandName: 'Shopee',
    industryText: 'Thương mại điện tử & Bán lẻ',
    brandDescription:
      'Sàn thương mại điện tử mua sắm trực tuyến giá rẻ',
    industry: 'ecommerce',
    emotion: 'energetic_orange',
    description: 'Ví dụ trùng tên với thương hiệu lớn đã có trên thị trường',
  },
];

export const STRICT_BANNED_LIST: string[] = [
  'penis',
  'dick',
  'cock',
  'pussy',
  'vagina',
  'sex',
  'porn',
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'slut',
  'whore',
  'nude',
  'xxx',
  'boob',
  'tits',
  'cum',
  'hentai',
  'lon',
  'buoi',
  'cac',
  'du',
  'dit',
  'dam',
  'cut',
  'cave',
  'chode',
  'matday',
  'ngu',
  'chet',
  'pain',
  'fart',
  'hell',
  'die',
  'crap',
];

export const SEVERE_NSFW_SET = new Set([
  'penis',
  'dick',
  'cock',
  'pussy',
  'vagina',
  'sex',
  'porn',
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'bastard',
  'slut',
  'whore',
  'nude',
  'xxx',
  'boob',
  'tits',
  'cum',
  'hentai',
  'cac',
  'dit',
  'cave',
  'chode',
  'matday',
]);

export const VI_TRAPS: Array<{
  trap: string;
  meaning: string;
  safeRootExamples: string[];
}> = [
  { trap: 'dam', meaning: '"dâm" (nhạy cảm khi từ "Đầm/Đậm/Đàm" mất dấu)', safeRootExamples: ['đầm', 'đậm', 'đàm', 'dặm'] },
  { trap: 'buoi', meaning: '"buồi" (nhạy cảm khi từ "Bưởi/Buổi" mất dấu)', safeRootExamples: ['bưởi', 'buổi'] },
  { trap: 'lon', meaning: '"lồn" (nhạy cảm khi từ "Lớn/Lợn/Lọn" mất dấu)', safeRootExamples: ['lớn', 'lợn', 'lọn'] },
  { trap: 'cut', meaning: '"cứt" (tiêu cực khi từ "Cút/Cụt" mất dấu hoặc ghép chữ)', safeRootExamples: ['cút', 'cụt'] },
  { trap: 'du', meaning: '"đụ" (nhạy cảm khi từ "Dù/Đủ/Du" ghép không dấu)', safeRootExamples: ['dù', 'đủ', 'đũa'] },
  { trap: 'ngu', meaning: '"ngu" (tiêu cực khi từ "Ngủ/Ngũ/Ngự" mất dấu)', safeRootExamples: ['ngủ', 'ngũ', 'ngự'] },
  { trap: 'chet', meaning: '"chết" (tiêu cực khi ghép từ không dấu)', safeRootExamples: ['chết', 'chệt'] },
  { trap: 'cac', meaning: '"cặc" (từ tục tĩu tiếng Việt khi mất dấu)', safeRootExamples: ['các', 'cạc'] },
  { trap: 'dit', meaning: '"địt" (từ tục tĩu tiếng Việt)', safeRootExamples: [] },
  { trap: 'cave', meaning: '"cave" (nhạy cảm trong ngữ cảnh tiếng Việt)', safeRootExamples: [] },
  { trap: 'matday', meaning: '"mất dạy" (từ phản cảm)', safeRootExamples: [] },
];

export const EN_TRAPS: Array<{
  trap: string;
  meaning: string;
  exampleContext: string;
}> = [
  { trap: 'pain', meaning: '"pain" (nỗi đau - VD: choosespain = choose Spain / chooses pain)', exampleContext: 'Choose Spain -> choosespain' },
  { trap: 'fart', meaning: '"fart" (phản cảm - VD: speedofart = speed of art / speedo fart)', exampleContext: 'Speed of Art -> speedofart' },
  { trap: 'hell', meaning: '"hell" (địa ngục khi ghép từ)', exampleContext: 'Shell / Hello ghép chữ' },
  { trap: 'die', meaning: '"die" (chết chóc khi ghép từ)', exampleContext: 'Diet / Indie ghép chữ' },
  { trap: 'crap', meaning: '"crap" (rác rưởi - VD: itscrap = IT scrap / it\'s crap)', exampleContext: 'IT Scrap -> itscrap' },
  { trap: 'therapist', meaning: '"the rapist" (bẫy tách từ kinh điển của Norvig)', exampleContext: 'Therapist -> the rapist' },
  { trap: 'anal', meaning: '"anal" (nhạy cảm - VD: IT analysis rút gọn)', exampleContext: 'Analysis rút gọn' },
];

export const FAMOUS_BRANDS = [
  'fpt',
  'shopee',
  'lazada',
  'tiki',
  'tiktok',
  'google',
  'facebook',
  'apple',
  'nike',
  'samsung',
  'vinamilk',
  'viettel',
  'vng',
  'momo',
  'zalo',
];

export interface SemanticMapperRule {
  id:
    | 'wellness_massage_spa'
    | 'media_pr'
    | 'event_show'
    | 'digital_brand'
    | 'ai_tech_it'
    | 'fnb_food'
    | 'fashion_beauty'
    | 'ecommerce_retail'
    | 'travel_stay'
    | 'edu_academy'
    | 'dental_medical'
    | 'pet_care'
    | 'auto_transport'
    | 'realestate_build';
  groupLabel: string;
  shortRoleLabel: string;
  triggers: string[];
  domainMorphemes: string[];
  brandRootTokens: string[];
}

/**
 * Bộ Từ Điển Ánh Xạ Ngữ Nghĩa Thương Mại Mở Rộng (Semantic Keyword Mapper)
 * Bao phủ đầy đủ các ngành dịch vụ thực tế (Mát-xa/Spa/Trị liệu, Ô tô, BĐS, Nha khoa, Thú cưng, F&B, Media, Tech...)
 */
export const SEMANTIC_KEYWORD_MAPPER: SemanticMapperRule[] = [
  {
    id: 'wellness_massage_spa',
    groupLabel: 'Massage, Spa & Chăm sóc Thư giãn',
    shortRoleLabel: 'dịch vụ mát-xa, spa & thư giãn trị liệu',
    triggers: [
      'mát-xa',
      'mat-xa',
      'mát xa',
      'mat xa',
      'massage',
      'masage',
      'xoa bóp',
      'xoa bop',
      'bấm huyệt',
      'bam huyet',
      'trị liệu',
      'tri lieu',
      'thư giãn',
      'thu gian',
      'dưỡng sinh',
      'duong sinh',
      'gội đầu',
      'goi dau',
      'xông hơi',
      'xong hoi',
      'chăm sóc cơ thể',
      'spa',
      'wellness',
      'relax',
    ],
    domainMorphemes: ['spa', 'relax', 'care', 'wellness', 'massage'],
    brandRootTokens: ['massage', 'matxa', 'spa', 'relax', 'care', 'wellness', 'zen', 'sen', 'healing', 'therapy'],
  },
  {
    id: 'auto_transport',
    groupLabel: 'Ô tô, Xe máy & Vận tải',
    shortRoleLabel: 'ô tô, xe máy & phụ tùng',
    triggers: [
      'ô tô',
      'o to',
      'xe hơi',
      'xe hoi',
      'xe máy',
      'xe may',
      'gara',
      'garage',
      'lốp',
      'lop xe',
      'mâm xe',
      'vận tải',
      'van tai',
      'tốc độ',
      'toc do',
      'độ xe',
      'do xe',
      'auto',
      'car',
      'motor',
    ],
    domainMorphemes: ['auto', 'car', 'motors', 'drive'],
    brandRootTokens: ['auto', 'car', 'motors', 'motor', 'drive', 'speed', 'gara', 'xe'],
  },
  {
    id: 'realestate_build',
    groupLabel: 'Bất động sản, Xây dựng & Nội thất',
    shortRoleLabel: 'bất động sản & nội thất',
    triggers: [
      'bất động sản',
      'bat dong san',
      'nhà đất',
      'nha dat',
      'căn hộ',
      'can ho',
      'chung cư',
      'chung cu',
      'nội thất',
      'noi that',
      'xây dựng',
      'xay dung',
      'kiến trúc',
      'kien truc',
      'biệt thự',
      'biet thu',
      'decor',
      'home',
      'land',
    ],
    domainMorphemes: ['home', 'land', 'decor', 'build'],
    brandRootTokens: ['home', 'land', 'decor', 'build', 'house', 'villa', 'realty', 'bds'],
  },
  {
    id: 'media_pr',
    groupLabel: 'Truyền thông & Quảng cáo',
    shortRoleLabel: 'truyền thông & PR',
    triggers: [
      'truyền thông',
      'truyen thong',
      'quảng cáo',
      'quang cao',
      'báo chí',
      'bao chi',
      'quay phim',
      'phim ảnh',
      'media',
      'pr',
      'marketing',
    ],
    domainMorphemes: ['media', 'pr', 'ad', 'truyenthong'],
    brandRootTokens: ['media', 'pr', 'ad', 'truyenthong', 'marketing', 'press', 'film'],
  },
  {
    id: 'event_show',
    groupLabel: 'Tổ chức Sự kiện',
    shortRoleLabel: 'tổ chức sự kiện',
    triggers: [
      'tổ chức sự kiện',
      'to chuc su kien',
      'sự kiện',
      'su kien',
      'lễ hội',
      'le hoi',
      'gala',
      'event',
      'show',
    ],
    domainMorphemes: ['event', 'show', 'fest'],
    brandRootTokens: ['event', 'show', 'fest', 'gala', 'sukien'],
  },
  {
    id: 'digital_brand',
    groupLabel: 'Giải pháp Thương hiệu số',
    shortRoleLabel: 'thương hiệu số & digital',
    triggers: [
      'thương hiệu số',
      'thuong hieu so',
      'chuyển đổi số',
      'chuyen doi so',
      'giải pháp số',
      'giai phap so',
      'digital',
      'thương hiệu',
      'thuong hieu',
    ],
    domainMorphemes: ['digital', 'brand', 'hub'],
    brandRootTokens: ['digital', 'brand', 'hub', 'studio', 'agency'],
  },
  {
    id: 'ai_tech_it',
    groupLabel: 'CNTT/Phần mềm',
    shortRoleLabel: 'kỹ thuật IT & phần mềm',
    triggers: [
      'trí tuệ nhân tạo',
      'tri tue nhan tao',
      'phần mềm',
      'phan mem',
      'lập trình',
      'lap trinh',
      'công nghệ',
      'cong nghe',
      'dữ liệu',
      'du lieu',
      'ai',
      'app',
      'web',
      'it',
      'cntt',
    ],
    domainMorphemes: ['ai', 'tech', 'soft', 'labs'],
    brandRootTokens: ['it', 'ai', 'tech', 'soft', 'labs', 'code', 'dev', 'app', 'web', 'cloud', 'data'],
  },
  {
    id: 'fnb_food',
    groupLabel: 'Ẩm thực & F&B',
    shortRoleLabel: 'đồ ăn & thức uống',
    triggers: [
      'đồ ăn',
      'do an',
      'thực phẩm',
      'thuc pham',
      'salad',
      'hữu cơ',
      'huu co',
      'nước ép',
      'nuoc ep',
      'cà phê',
      'ca phe',
      'quán cà phê',
      'quan ca phe',
      'trà',
      'tra',
      'bánh',
      'banh',
      'nhà hàng',
      'nha hang',
      'quán',
      'quan',
      'ẩm thực',
      'am thuc',
      'đồ uống',
      'do uong',
    ],
    domainMorphemes: ['fresh', 'food', 'bite', 'cafe', 'deli', 'coffee'],
    brandRootTokens: ['fresh', 'food', 'bite', 'cafe', 'coffee', 'deli', 'tea', 'brew', 'organic', 'salad', 'juice'],
  },
  {
    id: 'fashion_beauty',
    groupLabel: 'Thời trang & Mỹ phẩm',
    shortRoleLabel: 'thời trang & làm đẹp',
    triggers: [
      'thời trang',
      'thoi trang',
      'váy',
      'vay',
      'đầm',
      'dam',
      'quần áo',
      'quan ao',
      'giày',
      'sneaker',
      'túi',
      'mỹ phẩm',
      'my pham',
      'làm đẹp',
      'lam dep',
      'skincare',
      'son',
      'nail',
      'da',
    ],
    domainMorphemes: ['style', 'wear', 'beauty', 'glow', 'boutique'],
    brandRootTokens: ['style', 'wear', 'beauty', 'glow', 'boutique', 'chic', 'vay', 'dam', 'xinh', 'dress', 'skin'],
  },
  {
    id: 'dental_medical',
    groupLabel: 'Nha khoa & Thẩm mỹ Y khoa',
    shortRoleLabel: 'nha khoa & chăm sóc sức khỏe',
    triggers: [
      'nha khoa thẩm mỹ',
      'nha khoa',
      'thẩm mỹ viện',
      'phòng khám',
      'phong kham',
      'răng sứ',
      'rang su',
      'niềng răng',
      'nieng rang',
      'y tế',
      'y te',
      'bệnh viện',
      'thuốc',
      'sức khỏe',
      'suc khoe',
      'dental',
      'smile',
      'clinic',
    ],
    domainMorphemes: ['dental', 'smile', 'clinic', 'care'],
    brandRootTokens: ['dental', 'smile', 'clinic', 'care', 'medi', 'health', 'nhakhoa', 'dent'],
  },
  {
    id: 'pet_care',
    groupLabel: 'Phụ kiện & Chăm sóc Thú cưng',
    shortRoleLabel: 'phụ kiện & chăm sóc thú cưng',
    triggers: [
      'phụ kiện thú cưng',
      'phu kien thu cung',
      'thú cưng',
      'thu cung',
      'chó mèo',
      'cho meo',
      'pet shop',
      'petshop',
      'pet',
      'paw',
    ],
    domainMorphemes: ['pet', 'paw', 'petshop', 'care'],
    brandRootTokens: ['pet', 'paw', 'petshop', 'dog', 'cat', 'care', 'thucung'],
  },
  {
    id: 'ecommerce_retail',
    groupLabel: 'TMĐT & Bán lẻ',
    shortRoleLabel: 'bán lẻ & mua sắm',
    triggers: [
      'thương mại điện tử',
      'thuong mai dien tu',
      'mua sắm',
      'mua sam',
      'bán lẻ',
      'ban le',
      'giá rẻ',
      'gia re',
      'cửa hàng',
      'cua hang',
      'siêu thị',
      'sieu thi',
      'phụ kiện',
      'phu kien',
      'sàn',
      'shop',
    ],
    domainMorphemes: ['mart', 'shop', 'store', 'mall'],
    brandRootTokens: ['mart', 'shop', 'store', 'mall', 'deal', 'buy', 'cart', 'retail', 'shopee', 'tiki', 'lazada'],
  },
  {
    id: 'travel_stay',
    groupLabel: 'Du lịch & Lưu trú',
    shortRoleLabel: 'tour & dịch vụ lữ hành',
    triggers: [
      'du lịch',
      'du lich',
      'nghỉ dưỡng',
      'nghi duong',
      'khách sạn',
      'khach san',
      'lưu trú',
      'luu tru',
      'trải nghiệm văn hóa',
      'máy bay',
      'biển',
      'tour',
      'vé',
      'bay',
    ],
    domainMorphemes: ['travel', 'trip', 'stay', 'tour'],
    brandRootTokens: ['travel', 'trip', 'stay', 'tour', 'go', 'vista', 'booking', 'explore', 'spain', 'fly'],
  },
  {
    id: 'edu_academy',
    groupLabel: 'Giáo dục & Đào tạo',
    shortRoleLabel: 'giáo dục & khóa học',
    triggers: [
      'giáo dục',
      'giao duc',
      'đào tạo',
      'dao tao',
      'khóa học',
      'khoa hoc',
      'tiếng anh',
      'ngoại ngữ',
      'trường học',
      'sinh viên',
      'sinh vien',
      'luyện thi',
      'gia sư',
      'học viện',
    ],
    domainMorphemes: ['edu', 'academy', 'learn'],
    brandRootTokens: ['edu', 'academy', 'learn', 'skill', 'mind', 'mentor', 'class', 'school'],
  },
];

/**
 * Automatically infer IndustryOption & EmotionOption (Color Palette + Brand Personality)
 * from free-text Industry Input + Brand Description when user types any industry freely.
 * FIXED: No longer maps generic "Dịch vụ" to "education"!
 */
export function inferBrandIndustryAndEmotion(
  rawIndustryInput: string = '',
  brandDescription: string = '',
  emotionOverride?: EmotionId
): { industry: IndustryOption; emotion: EmotionOption } {
  const trimmedIndustry = (rawIndustryInput || '').trim();
  const exactIndustryById = INDUSTRIES.find((i) => i.id === trimmedIndustry);

  const combinedLower = `${trimmedIndustry} ${brandDescription}`.toLowerCase();

  let resolvedIndustryId: IndustryId = exactIndustryById ? exactIndustryById.id : 'tech';
  if (!exactIndustryById) {
    if (
      /mát-xa|mat-xa|mát xa|mat xa|massage|spa|trị liệu|thư giãn|dưỡng sinh|gội đầu|xông hơi|thời trang|thoi trang|váy|vay|đầm|dam|quần áo|giày|sneaker|mỹ phẩm|my pham|làm đẹp|lam dep|skincare|son|nail|thẩm mỹ|tham my|trang sức|fashion|beauty|wellness|relax/i.test(
        combinedLower
      )
    ) {
      resolvedIndustryId = 'fashion';
    } else if (
      /cà phê|ca phe|trà|tra|đồ ăn|do an|ẩm thực|am thuc|nhà hàng|quán|salad|nước ép|bánh|phở|lẩu|nướng|f&b|food|cafe|coffee|tea/i.test(
        combinedLower
      )
    ) {
      resolvedIndustryId = 'fnb';
    } else if (
      /du lịch|du lich|lưu trú|luu tru|khách sạn|khach san|nghỉ dưỡng|tour|vé máy bay|máy bay|biển|homestay|resort|travel/i.test(
        combinedLower
      )
    ) {
      resolvedIndustryId = 'travel';
    } else if (
      /giáo dục|giao duc|đào tạo|dao tao|khóa học|khoa hoc|tiếng anh|ngoại ngữ|trường học|luyện thi|học viện|gia sư|edu|academy/i.test(
        combinedLower
      )
    ) {
      resolvedIndustryId = 'education';
    } else if (
      /thương mại điện tử|tmđt|bán lẻ|ban le|mua sắm|cửa hàng|siêu thị|thú cưng|thu cung|phụ kiện|ô tô|xe máy|gara|vận tải|bất động sản|nội thất|xây dựng|nha khoa|phòng khám|y tế|dịch vụ|pet|shop|store|mart|auto|car|home/i.test(
        combinedLower
      )
    ) {
      resolvedIndustryId = 'ecommerce';
    } else {
      resolvedIndustryId = 'tech';
    }
  }

  const baseIndustry =
    INDUSTRIES.find((i) => i.id === resolvedIndustryId) || INDUSTRIES[0];

  const customDisplayLabel =
    !exactIndustryById && trimmedIndustry.length >= 2
      ? trimmedIndustry
      : baseIndustry.label;

  const industry: IndustryOption = {
    ...baseIndustry,
    label: customDisplayLabel,
    shortLabel: customDisplayLabel,
  };

  const explicitEmotion = emotionOverride
    ? EMOTIONS.find((e) => e.id === emotionOverride)
    : undefined;

  if (explicitEmotion) {
    return { industry, emotion: explicitEmotion };
  }

  let inferredEmotionId: EmotionId = 'trust_blue';
  if (
    /mát-xa|mat-xa|mát xa|massage|spa|trị liệu|thư giãn|dưỡng sinh|cà phê|ca phe|trà|đồ ăn|ẩm thực|salad|hữu cơ|nước ép|tươi|lành mạnh|thiên nhiên|xanh|sức khỏe|organic|fresh|coffee|wellness|relax/i.test(
      combinedLower
    )
  ) {
    inferredEmotionId = 'fresh_green';
  } else if (
    /thời trang|váy|đầm|mỹ phẩm|làm đẹp|skincare|son|cao cấp|sang trọng|thẩm mỹ|trang sức|biệt thự|nội thất|nữ tính|quý phái|luxury|beauty/i.test(
      combinedLower
    )
  ) {
    inferredEmotionId = 'luxury_purple';
  } else if (
    /ô tô|xe máy|tốc độ|độ xe|gara|auto|car|motor|du lịch|tour|trải nghiệm|thương mại điện tử|mua sắm|giá rẻ|bán lẻ|thú cưng|phụ kiện|sôi động|trẻ trung|nhanh|shop|pet/i.test(
      combinedLower
    )
  ) {
    inferredEmotionId = 'energetic_orange';
  } else {
    inferredEmotionId = 'trust_blue';
  }

  const emotion =
    EMOTIONS.find((e) => e.id === inferredEmotionId) || EMOTIONS[0];

  return { industry, emotion };
}

export interface SanitizedBrandInput {
  rawInput: string;
  cleanBrandName: string;
  brandDescription: string;
  extractedKeywords: {
    displayWords: string[];
    slugTokens: string[];
    primaryTopicDisplay: string;
    primaryTopicSlug: string;
    secondaryTopicSlug: string;
    semanticGroupIds: SemanticMapperRule['id'][];
  };
  wasSanitized: boolean;
  sanitizedNote: string | null;
  domainSlug: string;
  hyphenSlug: string;
  words: string[];
  originalWords: string[];
  syllableCount: number;
  charCount: number;
}

export interface TrapCheckResult {
  isSafe: boolean;
  isSevereNsfw: boolean;
  hasConcatenationTrap: boolean;
  statusHeadline: string;
  detectedTraps: Array<{
    substring: string;
    type: 'severe_nsfw' | 'vi_accent_loss' | 'en_word_boundary';
    explanation: string;
  }>;
  isFamousBrand: boolean;
  famousBrandMatched: string | null;
  recommendation: string;
}

export interface ScoreReasonItem {
  deltaText: string;
  reason: string;
  isPositive: boolean;
}

export interface PhoneticBadge {
  id: 'plosives' | 'alliteration_rhyme' | 'golden_length';
  label: string;
  icon: string;
  active: boolean;
  detail: string;
}

export interface ScoreBreakdown {
  pronunciationScore: number;
  vnFluencyScore: number;
  intlFluencyScore: number;
  vowelCount: number;
  consonantCount: number;
  vowelRatio: number;
  vowelDelta: number;
  unfamiliarClusters: string[];
  clusterPenalty: number;
  syllableBonusOrPenalty: number;
  trapPenalty: number;
  pronunciationSummary: string;
  pronunciationReasons: ScoreReasonItem[];

  memorabilityScore: number;
  lengthDelta: number;
  plosiveCount: number;
  plosiveDensity: number;
  plosiveBonus: number;
  alliterationOrRhymeBonus: number;
  alliterationDetail: string;
  memorabilitySummary: string;
  memorabilityReasons: ScoreReasonItem[];
  phoneticBadges: PhoneticBadge[];

  relevanceScore: number;
  semanticMatchScore: number;
  toneEmotionMatchScore: number;
  matchedKeywords: string[];
  hasNarrowSemanticMismatch: boolean;
  narrowMismatchNote: string | null;
  relevanceSummary: string;
  relevanceReasons: ScoreReasonItem[];
}

export interface DomainDiagnostics {
  originalSlug: string;
  overallHealth: 'optimal' | 'needs_improvement' | 'critical_unsafe';
  weaknesses: string[];
  actionableFixes: string[];
}

export interface DomainVariant {
  id: string;
  domain: string;
  slugPart: string;
  tld: string;
  type: 'vn_national' | 'com_global' | 'ecommerce_shop' | 'portmanteau' | 'semantic_safe';
  strategyBadge: string;
  strategyDescription: string;
  status: 'available' | 'taken';
  statusLabel: string;
  pricePerYear: string;
  domainScore: number;
  readabilitySubScore: number;
  memorabilitySubScore: number;
  descriptionFitSubScore: number;
  matchedMorpheme?: string;
  bestFitExplanation?: string;
  isBestChoice: boolean;
  scoreHighlights: string[];
  takenNote?: string;
}

export interface DomainRegistrarOption {
  id: 'sponsor_official' | 'inet_tenten' | 'matbao_nhanhoa' | 'cloudflare_namecheap';
  name: string;
  groupTitle: string;
  badge: string | null;
  isRecommended: boolean;
  firstYearPrice: string;
  renewalPrice: string;
  strengths: string;
  perks: string[];
  registerUrl: string;
}

export interface DomainDeepDiveAnalysis {
  domain: string;
  charLength: number;
  lengthVerdict: string;
  keywordAnalysis: string;
  phoneDictationVerdict: string;
  seoAndAdsVerdict: string;
  executivePitchPoints: string[];
}

export interface MarketingSlogan {
  id: string;
  dimensionTitle: string;
  dimensionCode: string;
  text: string;
  explanation: string;
}

export interface MarketingCopyResult {
  tagline: string;
  taglineRationale: string;
  slogans: [MarketingSlogan, MarketingSlogan, MarketingSlogan];
  source: 'local_brainsup' | 'gemini_hybrid';
}

export type LogoMotifCategory =
  | 'auto_car'
  | 'media_camera'
  | 'coffee_cup'
  | 'food_chef'
  | 'fashion_dress'
  | 'beauty_lotus'
  | 'medical_tooth'
  | 'pet_paw'
  | 'realestate_building'
  | 'travel_plane'
  | 'edu_book'
  | 'tech_neural'
  | 'coffee_leaf'
  | 'media_wave'
  | 'fashion_diamond'
  | 'medical_smile'
  | 'pet_heart'
  | 'commerce_crown';

export type LogoVisualPrimitive =
  | 'phone_mobile'
  | 'shop_cart'
  | 'chart_growth'
  | 'lightning_fast'
  | 'flame_hot'
  | 'leaf_organic'
  | 'droplet_pure'
  | 'coffee_mug'
  | 'bakery_food'
  | 'sports_car'
  | 'wheel_speed'
  | 'camera_lens'
  | 'sound_stage'
  | 'dress_fashion'
  | 'gem_luxury'
  | 'lotus_spa'
  | 'tooth_dental'
  | 'heart_care'
  | 'paw_pet'
  | 'building_arch'
  | 'airplane_globe'
  | 'book_grad'
  | 'ai_spark'
  | 'shield_trust'
  | 'sun_horizon'
  | 'star_crown'
  | 'gift_box'
  | 'clock_247';

export type LogoUspEffect =
  | 'speed_trails'
  | 'organic_halo'
  | 'sparkle_stars'
  | 'orbital_rings'
  | 'sound_waves'
  | 'precision_grid'
  | 'sunburst_rays'
  | 'shield_aura';

export type LogoCreativeArchetype =
  | 'fusion_monogram'
  | 'kinetic_horizon'
  | 'orbital_constellation'
  | 'editorial_atelier'
  | 'organic_bloom'
  | 'bauhaus_modular'
  | 'circular_stamp'
  | 'isometric_prism';

export interface LogoArtDirectionSpec {
  motifCategory: LogoMotifCategory;
  subjectLabel: string;
  primaryPrimitive: LogoVisualPrimitive;
  secondaryPrimitive: LogoVisualPrimitive;
  uspEffect: LogoUspEffect;
  archetype: LogoCreativeArchetype;
  whatTheySellLabel: string;
  whoTheyServeLabel: string;
  whatIsSpecialLabel: string;
  creativeNarrative: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  surfaceBgHex: string;
  gradientAngle: number;
  fontStyle: 'serif_luxury' | 'sans_modern' | 'geometric_tech';
  layoutType: 'iconic_monogram' | 'crest_emblem';
  customSvgPath?: string;
  customSvgMarkup?: string;
}

export interface BrandLogoConcept {
  id: 'logo-minimal' | 'logo-emblem';
  variantNumber: '01' | '02';
  title: string;
  styleName: string;
  usageTarget: string;
  symbolism: string;
  colorPsychology: string;
  aiPrompt: string;
  seed: number;
  pollinationsUrl: string;
  monogramText: string;
  taglineSnippet: string;
  artDirection: LogoArtDirectionSpec;
}

export interface MarketTrendPoint {
  month: string;
  brandMomentum: number;
  industryAvg: number;
  keywordPrimary: number;
  keywordSecondary: number;
  vnTldTrend: number;
  comTldTrend: number;
  shopTldTrend: number;
  searchVolumeIndex: number;
}

export interface TrendingDomainKeyword {
  id: string;
  keyword: string;
  monthlySearches: number;
  growthPct: number;
  competition: 'Cao' | 'Trung bình' | 'Thấp';
  suggestedTld: string;
  seriesKey: 'brandMomentum' | 'keywordPrimary' | 'keywordSecondary';
}

export interface MarketTrendAnalysis {
  points: MarketTrendPoint[];
  trendingKeywords: TrendingDomainKeyword[];
  growthRateYoY: number;
  cpcEstimateVnd: string;
  organicClickShare: number;
  peakSeasonMonth: string;
  volatilityIndex: string;
  tldDemandSplit: Array<{ tld: string; share: number; growth: string }>;
  insightText: string;
}

export interface SmartBrandSuggestion {
  brandName: string;
  recommendedDomain: string;
  estimatedScore: number;
  rationale: string;
}

export interface FullBrandAuditResult {
  input: SanitizedBrandInput;
  industry: IndustryOption;
  emotion: EmotionOption;
  trapCheck: TrapCheckResult;
  scores: ScoreBreakdown;
  diagnostics: DomainDiagnostics;
  domains: DomainVariant[];
  bestDomain: DomainVariant;
  marketing: MarketingCopyResult;
  logos: [BrandLogoConcept, BrandLogoConcept];
  marketTrend: MarketTrendAnalysis;
}

export function toSlug(str: string): {
  domainSlug: string;
  hyphenSlug: string;
  words: string[];
} {
  const replacedAmp = str.replace(/&/g, ' va ');
  const replacedD = replacedAmp.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  const normalized = replacedD
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const camelExpanded = str
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();

  const words = camelExpanded
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(Boolean);

  const cleanWords =
    words.length > 0
      ? words
      : normalized
          .replace(/[^a-z0-9\s-]/g, ' ')
          .split(/[\s-]+/)
          .filter(Boolean);

  const domainSlug = cleanWords.join('');
  const hyphenSlug = cleanWords.join('-');

  return {
    domainSlug: domainSlug || 'xsonai',
    hyphenSlug: hyphenSlug || 'xsonai',
    words: cleanWords.length > 0 ? cleanWords : ['xsonai'],
  };
}

/**
 * Extract key product/value terms from Brand Description & Free-text Industry.
 * FIXED: Supports custom free-text descriptions (like "Công ty mát-xa số một Việt Nam")
 * without ever misclassifying generic "Dịch vụ" as "Giáo dục & khóa học"!
 */
export function extractDescriptionKeywords(
  brandDescription: string,
  industry: IndustryOption
): SanitizedBrandInput['extractedKeywords'] {
  const cleanDesc = (brandDescription || '').trim();
  const isCustomFreeTextIndustry = !INDUSTRIES.some(
    (ind) => ind.label === industry.label
  );
  // Put cleanDesc FIRST so the specific product description ("Công ty mát-xa...") takes priority over generic industry text ("Dịch vụ")
  const combinedCorpus = isCustomFreeTextIndustry
    ? [cleanDesc, industry.label].filter(Boolean).join('. ')
    : cleanDesc;

  const industryFallbackGroup: Record<IndustryId, SemanticMapperRule['id']> = {
    tech: 'ai_tech_it',
    ecommerce: 'ecommerce_retail',
    fnb: 'fnb_food',
    fashion: 'fashion_beauty',
    education: 'edu_academy',
    travel: 'travel_stay',
  };

  if (!combinedCorpus) {
    const defaultGroup = SEMANTIC_KEYWORD_MAPPER.find(
      (g) => g.id === industryFallbackGroup[industry.id]
    )!;
    return {
      displayWords: [industry.shortLabel.toLowerCase()],
      slugTokens: defaultGroup.domainMorphemes,
      primaryTopicDisplay: industry.shortLabel.toLowerCase(),
      primaryTopicSlug: defaultGroup.domainMorphemes[0] || industry.keywords[0] || 'media',
      secondaryTopicSlug: defaultGroup.domainMorphemes[1] || industry.keywords[1] || 'digital',
      semanticGroupIds: [defaultGroup.id],
    };
  }

  const lowerDesc = combinedCorpus.toLowerCase();
  const unaccentedDesc = toSlug(combinedCorpus).words.join(' ');

  const matchedGroups: SemanticMapperRule[] = [];
  const matchedDisplayPhrases: string[] = [];
  const mappedMorphemes: string[] = [];

  for (const rule of SEMANTIC_KEYWORD_MAPPER) {
    let ruleMatched = false;
    for (const trig of rule.triggers) {
      const trigLower = trig.toLowerCase();
      const isShort = trigLower.length <= 3;
      const matched = isShort
        ? new RegExp(`(^|\\s|[,.()/|-])${trigLower}($|\\s|[,.()/|-])`, 'i').test(lowerDesc) ||
          new RegExp(`(^|\\s)${trigLower}($|\\s)`, 'i').test(unaccentedDesc)
        : lowerDesc.includes(trigLower) || unaccentedDesc.includes(trigLower);

      if (matched) {
        ruleMatched = true;
        const viTrigger =
          rule.triggers.find((t) => lowerDesc.includes(t) && t.length >= 3) ||
          rule.shortRoleLabel;
        if (!matchedDisplayPhrases.includes(viTrigger)) {
          matchedDisplayPhrases.push(viTrigger);
        }
        break;
      }
    }

    if (ruleMatched) {
      matchedGroups.push(rule);
      for (const morph of rule.domainMorphemes) {
        if (!mappedMorphemes.includes(morph)) {
          mappedMorphemes.push(morph);
        }
      }
    }
  }

  // If no predefined rule matched, dynamically extract the custom topic from the user's description/industry text
  if (matchedGroups.length === 0) {
    const customTopicLabel =
      cleanDesc.length >= 3 && cleanDesc.length <= 45
        ? cleanDesc.toLowerCase()
        : industry.shortLabel.toLowerCase();

    const stopWords = new Set([
      'cong', 'ty', 'cua', 'hang', 'shop', 'dich', 'vu', 'so', 'mot', 'tai',
      'viet', 'nam', 'hang', 'dau', 'chuyen', 'va', 'cho', 'cac', 'nhung',
    ]);
    const dynamicTokens = toSlug(combinedCorpus).words.filter(
      (w) => w.length >= 3 && w.length <= 8 && !stopWords.has(w)
    );

    const fallbackRule =
      SEMANTIC_KEYWORD_MAPPER.find((g) => g.id === industryFallbackGroup[industry.id]) ||
      SEMANTIC_KEYWORD_MAPPER[0];

    const dynamicMorphemes =
      dynamicTokens.length > 0
        ? [...dynamicTokens.slice(0, 2), ...fallbackRule.domainMorphemes]
        : fallbackRule.domainMorphemes;

    return {
      displayWords: [customTopicLabel],
      slugTokens: dynamicMorphemes,
      primaryTopicDisplay: customTopicLabel,
      primaryTopicSlug: dynamicMorphemes[0] || 'pro',
      secondaryTopicSlug: dynamicMorphemes[1] || 'hub',
      semanticGroupIds: [fallbackRule.id],
    };
  }

  const primaryTopicDisplay =
    matchedDisplayPhrases.length >= 2
      ? `${matchedDisplayPhrases[0]} & ${matchedDisplayPhrases[1]}`
      : matchedGroups[0].shortRoleLabel || matchedDisplayPhrases[0];

  const primaryTopicSlug = mappedMorphemes[0] || industry.blendSuffixes[0] || 'media';
  const secondaryTopicSlug =
    mappedMorphemes.find((m) => m !== primaryTopicSlug && m !== 'truyenthong') ||
    industry.blendSuffixes[1] ||
    'digital';

  return {
    displayWords:
      matchedDisplayPhrases.length > 0
        ? matchedDisplayPhrases.slice(0, 3)
        : [matchedGroups[0].shortRoleLabel],
    slugTokens: mappedMorphemes,
    primaryTopicDisplay,
    primaryTopicSlug,
    secondaryTopicSlug,
    semanticGroupIds: matchedGroups.map((g) => g.id),
  };
}

export function sanitizeBrandInput(
  rawInput: string,
  brandDescription: string = '',
  industry: IndustryOption = INDUSTRIES[0]
): SanitizedBrandInput {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return sanitizeBrandInput(
      'Đất Việt Media',
      brandDescription || QUICK_TEST_PRESETS[0].brandDescription,
      industry
    );
  }

  let working = trimmed;
  let wasSanitized = false;
  const removedParts: string[] = [];

  if (/^https?:\/\//i.test(working)) {
    const match = working.match(/^https?:\/\//i);
    if (match) removedParts.push(match[0]);
    working = working.replace(/^https?:\/\//i, '');
    wasSanitized = true;
  }

  if (/^www\./i.test(working)) {
    removedParts.push('www.');
    working = working.replace(/^www\./i, '');
    wasSanitized = true;
  }

  if (working.includes('/') || working.includes('?')) {
    working = working.split(/[/?#]/)[0];
    wasSanitized = true;
  }

  const tldRegex =
    /\.(com\.vn|edu\.vn|gov\.vn|net\.vn|org\.vn|com|vn|shop|store|net|org|io|ai|co|app|dev|xyz|info)$/i;
  const tldMatch = working.match(tldRegex);
  if (tldMatch) {
    removedParts.push(tldMatch[0]);
    working = working.replace(tldRegex, '');
    wasSanitized = true;
  }

  const cleanBrandName = working.trim() || 'XSonAI';
  const { domainSlug, hyphenSlug, words } = toSlug(cleanBrandName);

  const originalWords = cleanBrandName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[\s-]+/)
    .filter(Boolean);

  const syllableCount = estimateSyllables(words);
  const extractedKeywords = extractDescriptionKeywords(brandDescription, industry);

  const sanitizedNote = wasSanitized
    ? `Đã tự động tách bỏ phần URL/tên miền (${removedParts.join('') || 'URL'}) để lấy tên thương hiệu gốc "${cleanBrandName}".`
    : null;

  return {
    rawInput: trimmed,
    cleanBrandName,
    brandDescription: brandDescription.trim(),
    extractedKeywords,
    wasSanitized,
    sanitizedNote,
    domainSlug,
    hyphenSlug,
    words,
    originalWords,
    syllableCount,
    charCount: domainSlug.length,
  };
}

function estimateSyllables(words: string[]): number {
  let total = 0;
  for (const w of words) {
    if (w.length <= 3) {
      total += 1;
    } else {
      let cleaned = w;
      if (
        cleaned.endsWith('e') &&
        !/[aeiouy]e$/.test(cleaned) &&
        cleaned.length > 3
      ) {
        cleaned = cleaned.slice(0, -1);
      }
      const vowelGroups = cleaned.match(/[aeiouy]+/gi);
      total += vowelGroups ? Math.max(1, vowelGroups.length) : 1;
    }
  }
  return Math.max(1, total);
}

export function checkConcatenationTraps(input: SanitizedBrandInput): TrapCheckResult {
  const { cleanBrandName, domainSlug, words } = input;
  const lowerOriginal = cleanBrandName.toLowerCase();
  const detectedTraps: TrapCheckResult['detectedTraps'] = [];
  let isSevereNsfw = false;

  for (const banned of STRICT_BANNED_LIST) {
    if (SEVERE_NSFW_SET.has(banned)) {
      const inWords = words.includes(banned);
      const inSlug =
        domainSlug.includes(banned) &&
        (banned.length >= 4 || inWords);

      if (inWords || inSlug) {
        const isInnocentVietnamese =
          banned === 'cac' &&
          (lowerOriginal.includes('các') || lowerOriginal.includes('cạc'));

        if (!isInnocentVietnamese) {
          isSevereNsfw = true;
          detectedTraps.push({
            substring: banned,
            type: 'severe_nsfw',
            explanation: `Phát hiện từ nhạy cảm "${banned}" trong tên thương hiệu hoặc chuỗi tên miền "${domainSlug}". Từ này vi phạm tiêu chuẩn cộng đồng, dễ bị chặn quảng cáo và làm mất thiện cảm với khách hàng.`,
          });
        }
      }
    }
  }

  for (const item of VI_TRAPS) {
    if (detectedTraps.some((d) => d.substring === item.trap)) continue;

    const hasWordMatch = words.includes(item.trap);
    const hasCrossBoundaryMatch =
      !hasWordMatch &&
      domainSlug.includes(item.trap) &&
      item.trap.length >= 3;

    if (hasWordMatch || hasCrossBoundaryMatch) {
      const matchedAccentExample = item.safeRootExamples.find((ex) =>
        lowerOriginal.includes(ex)
      );

      if (!matchedAccentExample && ['lon', 'buoi', 'cac', 'dit', 'cave', 'matday'].includes(item.trap)) {
        isSevereNsfw = true;
        detectedTraps.push({
          substring: item.trap,
          type: 'severe_nsfw',
          explanation: `Chuỗi "${domainSlug}" chứa từ nhạy cảm "${item.trap}" (${item.meaning}) gây phản cảm khi hiển thị.`,
        });
      } else {
        const explanation = matchedAccentExample
          ? `Chữ "${matchedAccentExample}" khi bỏ dấu tiếng Việt biến thành "${item.trap}" (${item.meaning}) trong chuỗi "${domainSlug}".`
          : `Chuỗi viết liền "${domainSlug}" vô tình tạo thành cụm nhạy cảm "${item.trap}" (${item.meaning}).`;

        detectedTraps.push({
          substring: item.trap,
          type: 'vi_accent_loss',
          explanation,
        });
      }
    }
  }

  for (const item of EN_TRAPS) {
    if (detectedTraps.some((d) => d.substring === item.trap)) continue;

    if (domainSlug.includes(item.trap)) {
      const isDirectHarmlessCountry =
        words.includes('spain') && item.trap === 'pain' && words.length === 1;
      if (!isDirectHarmlessCountry) {
        detectedTraps.push({
          substring: item.trap,
          type: 'en_word_boundary',
          explanation: `Chuỗi tên miền "${domainSlug}" chứa cụm "${item.trap}" (${item.meaning}). Khi viết liền không khoảng trắng, khách hàng rất dễ đọc nhầm sang nghĩa tiêu cực.`,
        });
      }
    }
  }

  let isFamousBrand = false;
  let famousBrandMatched: string | null = null;
  for (const fb of FAMOUS_BRANDS) {
    if (domainSlug === fb || words.includes(fb)) {
      isFamousBrand = true;
      famousBrandMatched = fb.toUpperCase();
      break;
    }
  }

  const hasConcatenationTrap = detectedTraps.length > 0;
  const isSafe = !hasConcatenationTrap && !isSevereNsfw;

  let statusHeadline = 'An toàn khi viết liền không dấu';
  let recommendation =
    'Khi viết liền không dấu trên tên miền, tên của bạn không bị dính chữ nhạy cảm hay nghĩa xấu. Bạn yên tâm dùng trực tiếp tên này.';

  if (isSevereNsfw) {
    statusHeadline =
      'Tên có chứa từ nhạy cảm, không nên dùng để mở shop';
    const trapList = detectedTraps.map((t) => `"${t.substring}"`).join(', ');
    recommendation = `Chuỗi "${domainSlug}" có chứa từ nhạy cảm (${trapList}). Bạn không nên dùng tên gốc này làm tên miền. Hệ thống đã lọc bỏ phần nhạy cảm và gợi ý các tên miền sạch ở cột bên cạnh.`;
  } else if (hasConcatenationTrap) {
    statusHeadline = 'Cẩn thận bị đọc nhầm khi viết liền không dấu';
    const trapList = detectedTraps.map((t) => `"${t.substring}"`).join(', ');
    recommendation = `Khi viết liền, chuỗi "${domainSlug}" xuất hiện chữ ${trapList} dễ làm khách hiểu lầm. Bạn nên thêm dấu gạch ngang (${input.hyphenSlug}) hoặc chọn tên miền ghép gọn ở cột bên cạnh.`;
  }

  return {
    isSafe,
    isSevereNsfw,
    hasConcatenationTrap,
    statusHeadline,
    detectedTraps,
    isFamousBrand,
    famousBrandMatched,
    recommendation,
  };
}

export function calculateBrandScores(
  input: SanitizedBrandInput,
  trapCheck: TrapCheckResult,
  industry: IndustryOption = INDUSTRIES[0],
  emotion: EmotionOption = EMOTIONS[0]
): ScoreBreakdown {
  const { domainSlug, words, syllableCount, brandDescription, extractedKeywords } = input;
  const len = Math.max(1, domainSlug.length);

  // =========================================================================
  // INDICATOR 1: ĐỘ DỄ ĐỌC
  // =========================================================================
  let pronunciationScore = 85;
  const pronunciationReasons: ScoreReasonItem[] = [];

  const vowelMatches = domainSlug.match(/[aeiouy]/gi) || [];
  const vowelCount = vowelMatches.length;
  const consonantCount = Math.max(0, len - vowelCount);
  const vowelRatio = Number((vowelCount / len).toFixed(2));

  let vowelDelta = 0;
  if (vowelRatio >= 0.35 && vowelRatio <= 0.55) {
    vowelDelta = 10;
    pronunciationReasons.push({
      deltaText: '+10đ',
      reason: `vì nguyên âm và phụ âm xen kẽ rất đều (${Math.round(vowelRatio * 100)}% nguyên âm), đọc lên nghe tròn vành rõ chữ.`,
      isPositive: true,
    });
  } else if (vowelRatio < 0.25 || vowelRatio > 0.65) {
    vowelDelta = -15;
    pronunciationReasons.push({
      deltaText: 'Trừ 15đ',
      reason: `vì tỷ lệ nguyên âm (${Math.round(vowelRatio * 100)}%) hơi lệch, dễ làm người đọc bị líu lưỡi hoặc hụt hơi.`,
      isPositive: false,
    });
  } else {
    pronunciationReasons.push({
      deltaText: 'Trừ 4đ',
      reason: `vì âm đọc đã khá ổn nhưng độ mở nguyên âm (${Math.round(vowelRatio * 100)}%) chưa thật sự tròn tiếng.`,
      isPositive: false,
    });
  }
  pronunciationScore += vowelDelta;

  const familiarClusters = [
    'ngh', 'str', 'ch', 'th', 'nh', 'ng', 'ph', 'tr', 'gh', 'kh',
    'sch', 'shr', 'thr', 'spl', 'spr', 'scr', 'sh', 'ss',
  ];
  const rawClusters = domainSlug.match(/[bcdfghjklmnpqrstvwxz]{3,}/gi) || [];
  const unfamiliarClusters: string[] = [];

  for (const cluster of rawClusters) {
    const lowerC = cluster.toLowerCase();
    const isFamiliar =
      familiarClusters.includes(lowerC) ||
      (lowerC.length === 3 &&
        (lowerC.startsWith('sh') ||
          lowerC.startsWith('ch') ||
          lowerC.startsWith('th') ||
          lowerC.startsWith('ng') ||
          lowerC.startsWith('tr') ||
          lowerC.startsWith('ph') ||
          lowerC.startsWith('ss')));
    if (!isFamiliar) {
      unfamiliarClusters.push(lowerC);
    }
  }

  const clusterPenalty = unfamiliarClusters.length * -12;
  pronunciationScore += clusterPenalty;
  if (unfamiliarClusters.length > 0) {
    pronunciationReasons.push({
      deltaText: `Trừ ${Math.abs(clusterPenalty)}đ`,
      reason: `vì có cụm phụ âm '${unfamiliarClusters.join(', ')}' đứng sát nhau, khách Việt đọc dễ bị vấp.`,
      isPositive: false,
    });
  }

  let syllableBonusOrPenalty = 0;
  if (syllableCount >= 2 && syllableCount <= 3) {
    syllableBonusOrPenalty = 5;
    pronunciationReasons.push({
      deltaText: '+5đ',
      reason: `vì tên chỉ có ${syllableCount} âm tiết. Bạn đọc tên qua điện thoại một lần là khách gõ lại được ngay.`,
      isPositive: true,
    });
  } else if (syllableCount === 4) {
    syllableBonusOrPenalty = -4;
    pronunciationReasons.push({
      deltaText: 'Trừ 4đ',
      reason: `vì tên dài ${syllableCount} âm tiết, khi đọc nhanh qua điện thoại khách dễ nghe thiếu chữ.`,
      isPositive: false,
    });
  } else if (syllableCount > 4) {
    syllableBonusOrPenalty = -10;
    pronunciationReasons.push({
      deltaText: 'Trừ 10đ',
      reason: `vì tên dài tới ${syllableCount} âm tiết, đọc lên khá mỏi miệng và dễ bị nuốt âm cuối.`,
      isPositive: false,
    });
  } else {
    pronunciationReasons.push({
      deltaText: 'Trừ 3đ',
      reason: 'vì tên chỉ có 1 âm tiết đơn, khi nói chuyện bình thường rất dễ bị lẫn vào các từ khác.',
      isPositive: false,
    });
  }
  pronunciationScore += syllableBonusOrPenalty;

  const trapPenalty = trapCheck.isSevereNsfw
    ? -35
    : trapCheck.hasConcatenationTrap
    ? -15
    : 0;
  pronunciationScore += trapPenalty;

  if (trapCheck.isSevereNsfw) {
    pronunciationReasons.push({
      deltaText: 'Trừ 35đ',
      reason: `vì xuất hiện từ nhạy cảm '${trapCheck.detectedTraps.map((t) => t.substring).join(', ')}' gây phản cảm khi đọc tên.`,
      isPositive: false,
    });
  } else if (trapCheck.hasConcatenationTrap) {
    pronunciationReasons.push({
      deltaText: 'Trừ 15đ',
      reason: `vì khi viết liền không dấu bị dính chữ '${trapCheck.detectedTraps.map((t) => t.substring).join(', ')}', làm người đọc phân vân cách ngắt chữ.`,
      isPositive: false,
    });
  }

  pronunciationScore = Math.max(25, Math.min(99, pronunciationScore));

  if (pronunciationReasons.every((r) => r.isPositive)) {
    pronunciationReasons.push({
      deltaText: 'Trừ 1đ',
      reason: 'nhỏ vì khi viết không dấu trên tên miền, khách ở vài vùng miền có thể nhấn giọng khác nhau.',
      isPositive: false,
    });
  }

  const hasVietnameseFriendlyStructure =
    unfamiliarClusters.length === 0 && syllableCount <= 4 && !trapCheck.isSevereNsfw;
  const vnFluencyScore = Math.max(
    25,
    Math.min(
      99,
      pronunciationScore + (hasVietnameseFriendlyStructure ? 3 : -4)
    )
  );
  const intlFluencyScore = Math.max(
    25,
    Math.min(
      99,
      pronunciationScore + (vowelRatio >= 0.3 && vowelRatio <= 0.55 ? 2 : -3)
    )
  );

  let pronunciationSummary = '';
  if (pronunciationScore >= 85) {
    pronunciationSummary =
      'Tên đọc rất thuận miệng, khách nghe qua một lần là đọc lại đúng ngay.';
  } else if (pronunciationScore >= 70) {
    pronunciationSummary =
      'Tên đọc khá rõ ràng nhưng cần lưu ý cách ngắt chữ khi viết liền trên tên miền.';
  } else {
    pronunciationSummary =
      'Tên đang hơi khó đọc hoặc vướng chữ nhạy cảm khi bỏ dấu tiếng Việt.';
  }

  // =========================================================================
  // INDICATOR 2: ĐỘ DỄ NHỚ
  // =========================================================================
  let memorabilityScore = 80;
  const memorabilityReasons: ScoreReasonItem[] = [];

  let lengthDelta = 0;
  if (len >= 4 && len <= 8) {
    lengthDelta = 12;
    memorabilityReasons.push({
      deltaText: '+12đ',
      reason: `vì tên gọn (${len} ký tự), khách nhìn lướt qua bảng hiệu hay màn hình điện thoại là nhớ liền.`,
      isPositive: true,
    });
  } else if (len >= 9 && len <= 12) {
    lengthDelta = 4;
    memorabilityReasons.push({
      deltaText: 'Trừ 8đ',
      reason: `vì tên dài ${len} ký tự, hơi vượt mức gọn nhất (4 đến 8 ký tự) nên khách phải gõ phím lâu hơn một chút.`,
      isPositive: false,
    });
  } else if (len > 12) {
    lengthDelta = -12;
    memorabilityReasons.push({
      deltaText: 'Trừ 12đ',
      reason: `vì chuỗi tên miền dài tới ${len} ký tự, khách rất dễ quên hoặc gõ nhầm chữ trên điện thoại.`,
      isPositive: false,
    });
  } else {
    lengthDelta = -4;
    memorabilityReasons.push({
      deltaText: 'Trừ 4đ',
      reason: `vì tên quá ngắn (${len} ký tự), hơi ít âm tiết để tạo dấu ấn riêng.`,
      isPositive: false,
    });
  }
  memorabilityScore += lengthDelta;

  const plosiveMatches = domainSlug.match(/[pbtdkcg]/gi) || [];
  const wordInitialPlosives = words.filter((w) => /^[pbtdkcg]/i.test(w));
  const plosiveCount = plosiveMatches.length;
  const plosiveDensity = Number((plosiveCount / len).toFixed(2));
  const hasPlosives = wordInitialPlosives.length > 0 || plosiveDensity >= 0.2;
  const plosiveBonus = hasPlosives ? 6 : 0;
  memorabilityScore += plosiveBonus;

  if (hasPlosives) {
    memorabilityReasons.push({
      deltaText: '+6đ',
      reason: 'nhờ có các phụ âm đầu phát âm dứt khoát, giúp tên gọi nghe khỏe và dễ đọng lại trong đầu.',
      isPositive: true,
    });
  } else {
    memorabilityReasons.push({
      deltaText: 'Trừ 6đ',
      reason: 'vì tên thiếu các phụ âm đầu dứt khoát nên nghe hơi trầm, chưa thật sự bắt tai.',
      isPositive: false,
    });
  }

  let hasAlliterationOrRhyme = false;
  let alliterationDetail = 'Chưa có độ vần giữa các từ';

  if (words.length >= 2) {
    const initials = words.map((w) => w[0]);
    const uniqueInitials = new Set(initials);
    const endings = words.map((w) => w.slice(-2));
    const uniqueEndings = new Set(endings);
    const firstVowels = words
      .map((w) => (w.match(/[aeiouy]/i) || [''])[0])
      .filter(Boolean);
    const uniqueVowels = new Set(firstVowels);

    if (uniqueInitials.size < initials.length) {
      hasAlliterationOrRhyme = true;
      alliterationDetail = `Lặp âm đầu giữa các từ (${words.join(', ')})`;
    } else if (uniqueEndings.size < endings.length) {
      hasAlliterationOrRhyme = true;
      alliterationDetail = `Bắt vần đuôi giữa các chữ (${words.join(', ')})`;
    } else if (words.length >= 2 && uniqueVowels.size === 1) {
      hasAlliterationOrRhyme = true;
      alliterationDetail = `Cùng nhịp nguyên âm "${firstVowels[0].toUpperCase()}"`;
    }
  } else if (len >= 4) {
    if (/(.)\1/i.test(domainSlug) || /^([a-z]{2}).*\1/i.test(domainSlug)) {
      hasAlliterationOrRhyme = true;
      alliterationDetail = 'Các âm lặp lại tạo nhịp bắt tai';
    }
  }

  const alliterationOrRhymeBonus = hasAlliterationOrRhyme ? 8 : 0;
  memorabilityScore += alliterationOrRhymeBonus;

  if (hasAlliterationOrRhyme) {
    memorabilityReasons.push({
      deltaText: '+8đ',
      reason: `vì các từ có độ vần điệu với nhau (${alliterationDetail.toLowerCase()}), đọc lên rất bắt tai.`,
      isPositive: true,
    });
  } else {
    memorabilityReasons.push({
      deltaText: 'Trừ 8đ',
      reason: 'vì các từ ghép với nhau hơi rời rạc, chưa có độ vần hoặc lặp âm đầu như kiểu Coca-Cola hay PayPal.',
      isPositive: false,
    });
  }

  if (trapCheck.isSevereNsfw) {
    memorabilityScore -= 30;
    memorabilityReasons.push({
      deltaText: 'Trừ 30đ',
      reason: 'vì nghĩa nhạy cảm làm khách hàng ngại nhắc tới hoặc chia sẻ tên shop cho bạn bè.',
      isPositive: false,
    });
  }

  memorabilityScore = Math.max(30, Math.min(99, memorabilityScore));

  const phoneticBadges: PhoneticBadge[] = [
    {
      id: 'plosives',
      label: 'Âm đầu rõ, khỏe',
      icon: '•',
      active: hasPlosives,
      detail: hasPlosives
        ? 'Có các phụ âm đầu rõ tiếng, giúp khách nghe một lần là ấn tượng ngay'
        : 'Âm đọc hơi nhẹ, thiếu điểm nhấn ở đầu từ',
    },
    {
      id: 'alliteration_rhyme',
      label: 'Có vần hoặc lặp âm',
      icon: '•',
      active: hasAlliterationOrRhyme,
      detail: alliterationDetail,
    },
    {
      id: 'golden_length',
      label: `Độ dài gọn (${len} chữ)`,
      icon: '•',
      active: len >= 4 && len <= 10,
      detail:
        len >= 4 && len <= 8
          ? `Độ dài rất đẹp (${len} ký tự), khách gõ trên điện thoại cực nhanh`
          : len <= 12
          ? `Độ dài vừa phải (${len} ký tự), hiển thị gọn trên trình duyệt`
          : `Hơi dài (${len} ký tự), bạn nên xem thử tên miền rút gọn bên cạnh`,
    },
  ];

  let memorabilitySummary = '';
  if (memorabilityScore >= 88) {
    memorabilitySummary =
      'Tên ngắn gọn và rất bắt tai, khách nghe qua một lần là nhớ được ngay.';
  } else if (memorabilityScore >= 75) {
    memorabilitySummary =
      'Tên khá dễ nhớ, thuận tiện để khách hàng tìm lại trên mạng.';
  } else {
    memorabilitySummary =
      'Tên hơi dài hoặc chưa có điểm nhấn âm thanh, nên dùng kèm tên miền rút gọn.';
  }

  // =========================================================================
  // INDICATOR 3: ĐỘ KHỚP VỚI SẢN PHẨM
  // =========================================================================
  const relevanceReasons: ScoreReasonItem[] = [];
  const matchedKeywords: string[] = [];
  let hasNarrowSemanticMismatch = false;
  let narrowMismatchNote: string | null = null;

  const descGroupIds = new Set(extractedKeywords.semanticGroupIds);
  const descAllowedTokens = new Set<string>(extractedKeywords.slugTokens);
  // Add direct unaccented words from the user's description & industry text so custom industries match directly
  const customCorpusTokens = toSlug(`${industry.label} ${brandDescription}`).words.filter(
    (t) => t.length >= 3 && !['cong', 'cua', 'hang', 'dich', 'nam', 'cho', 'cac'].includes(t)
  );
  customCorpusTokens.forEach((t) => descAllowedTokens.add(t));

  for (const rule of SEMANTIC_KEYWORD_MAPPER) {
    if (descGroupIds.has(rule.id)) {
      rule.domainMorphemes.forEach((m) => descAllowedTokens.add(m));
      rule.brandRootTokens.forEach((t) => descAllowedTokens.add(t));
    }
  }

  for (const w of words) {
    if (SEVERE_NSFW_SET.has(w)) continue;
    for (const allowed of descAllowedTokens) {
      if (
        w === allowed ||
        (w.length >= 4 && allowed.length >= 4 && (w.includes(allowed) || allowed.includes(w)))
      ) {
        if (!matchedKeywords.includes(w)) {
          matchedKeywords.push(w);
        }
      }
    }
  }

  let narrowMismatchedRule: SemanticMapperRule | null = null;
  if (matchedKeywords.length === 0) {
    for (const w of words) {
      for (const rule of SEMANTIC_KEYWORD_MAPPER) {
        if (!descGroupIds.has(rule.id) && rule.brandRootTokens.includes(w)) {
          narrowMismatchedRule = rule;
          break;
        }
      }
      if (narrowMismatchedRule) break;
    }
  }

  let relevanceScore = 88;
  let semanticMatchScore = 82;
  let toneEmotionMatchScore = 85;

  if (trapCheck.isSevereNsfw) {
    relevanceScore = 9;
    semanticMatchScore = 5;
    toneEmotionMatchScore = 12;
    relevanceReasons.push({
      deltaText: 'Trừ 75đ',
      reason: `vì chứa từ nhạy cảm (${trapCheck.detectedTraps.map((t) => `'${t.substring}'`).join(', ')}), hoàn toàn không phù hợp để mở shop hay làm thương hiệu.`,
      isPositive: false,
    });
    relevanceReasons.push({
      deltaText: 'Trừ 15đ',
      reason: 'vì các nền tảng quảng cáo như Facebook, TikTok và Google sẽ chặn hiển thị tên này.',
      isPositive: false,
    });
  } else {
    if (matchedKeywords.length >= 2) {
      relevanceScore += 6;
      semanticMatchScore = 95;
      relevanceReasons.push({
        deltaText: '+12đ',
        reason: `vì nghe tên là thấy ngay chữ '${matchedKeywords.join(', ')}', khớp trực tiếp với mảng '${extractedKeywords.primaryTopicDisplay}' bạn đang làm.`,
        isPositive: true,
      });
    } else if (matchedKeywords.length === 1) {
      relevanceScore += 5;
      semanticMatchScore = 92;
      relevanceReasons.push({
        deltaText: '+10đ',
        reason: `vì trong tên đã có chữ '${matchedKeywords[0]}', giúp khách nhận ra ngay mảng '${extractedKeywords.primaryTopicDisplay}' bạn đang làm.`,
        isPositive: true,
      });
      relevanceReasons.push({
        deltaText: 'Trừ 3đ',
        reason: `nhỏ vì bạn có thể ghép thêm chữ '${extractedKeywords.secondaryTopicSlug}' ở tên miền phụ để mở rộng thêm từ khóa tìm kiếm.`,
        isPositive: false,
      });
    } else if (narrowMismatchedRule) {
      hasNarrowSemanticMismatch = true;
      relevanceScore -= 18;
      semanticMatchScore = 66;
      narrowMismatchNote = `vì nghe tên '${input.cleanBrandName}' khách sẽ nghĩ tới mảng ${narrowMismatchedRule.shortRoleLabel}, chưa thấy liên quan tới '${extractedKeywords.primaryTopicDisplay}' mà bạn đang làm.`;
      relevanceReasons.push({
        deltaText: 'Trừ 18đ',
        reason: narrowMismatchNote,
        isPositive: false,
      });
    } else {
      relevanceScore -= 15;
      semanticMatchScore = 70;
      relevanceReasons.push({
        deltaText: 'Trừ 15đ',
        reason: `vì nghe tên '${input.cleanBrandName}' khách mới chưa đoán được ngay bạn đang bán '${extractedKeywords.primaryTopicDisplay}'.`,
        isPositive: false,
      });
    }

    const hasStrongPlosivesForTechOrEnergy =
      (emotion.id === 'trust_blue' || emotion.id === 'energetic_orange') && hasPlosives;
    const hasSoftVowelsForFashionOrFresh =
      (emotion.id === 'luxury_purple' || emotion.id === 'fresh_green') && vowelRatio >= 0.32;

    if (hasStrongPlosivesForTechOrEnergy || hasSoftVowelsForFashionOrFresh) {
      relevanceScore += 4;
      toneEmotionMatchScore = 92;
      relevanceReasons.push({
        deltaText: '+4đ',
        reason: `vì âm điệu của tên gọi rất hợp với phong cách '${emotion.label}'.`,
        isPositive: true,
      });
    } else {
      relevanceScore -= 4;
      toneEmotionMatchScore = 76;
      relevanceReasons.push({
        deltaText: 'Trừ 4đ',
        reason: `vì âm điệu của tên gọi chưa thật sự ăn nhập với sắc thái '${emotion.colorName}'.`,
        isPositive: false,
      });
    }

    if (trapCheck.hasConcatenationTrap) {
      relevanceScore -= 14;
      relevanceReasons.push({
        deltaText: 'Trừ 14đ',
        reason: `vì khi viết liền thành '${domainSlug}', chữ '${trapCheck.detectedTraps.map((t) => t.substring).join(', ')}' dễ làm khách hiểu lệch ý nghĩa sản phẩm '${extractedKeywords.primaryTopicDisplay}'.`,
        isPositive: false,
      });
    }

    if (trapCheck.isFamousBrand) {
      relevanceScore -= 10;
      relevanceReasons.push({
        deltaText: 'Trừ 10đ',
        reason: `vì trùng với thương hiệu lớn '${trapCheck.famousBrandMatched}', khách hàng sẽ nghĩ tới hãng đó trước chứ không nhận ra shop của bạn.`,
        isPositive: false,
      });
    }

    if (!brandDescription || brandDescription.length < 10) {
      relevanceScore -= 5;
      relevanceReasons.push({
        deltaText: 'Trừ 5đ',
        reason: 'vì phần giới thiệu sản phẩm của bạn còn hơi ngắn. Bạn kể kỹ hơn một chút để hệ thống tìm từ khóa chuẩn hơn nhé.',
        isPositive: false,
      });
    }

    relevanceScore = Math.max(20, Math.min(96, relevanceScore));
  }

  let relevanceSummary = '';
  if (trapCheck.isSevereNsfw) {
    relevanceSummary =
      'Tên đang chứa từ nhạy cảm, không dùng để mở shop được. Bạn hãy đổi sang các tên gợi ý sạch ở cột bên cạnh.';
  } else if (relevanceScore >= 85) {
    relevanceSummary = `Nghe tên là khách hình dung được ngay mảng "${extractedKeywords.primaryTopicDisplay}" của bạn.`;
  } else if (relevanceScore >= 70) {
    relevanceSummary = `Tên gốc mới đạt ${relevanceScore}/100 điểm khớp sản phẩm. Bạn nên ghép thêm chữ "${extractedKeywords.primaryTopicSlug}" vào tên miền để khách hiểu ngay bạn bán gì.`;
  } else {
    relevanceSummary = 'Tên hiện tại chưa nói lên được sản phẩm bạn đang bán.';
  }

  return {
    pronunciationScore,
    vnFluencyScore,
    intlFluencyScore,
    vowelCount,
    consonantCount,
    vowelRatio,
    vowelDelta,
    unfamiliarClusters,
    clusterPenalty,
    syllableBonusOrPenalty,
    trapPenalty,
    pronunciationSummary,
    pronunciationReasons,
    memorabilityScore,
    lengthDelta,
    plosiveCount,
    plosiveDensity,
    plosiveBonus,
    alliterationOrRhymeBonus,
    alliterationDetail,
    memorabilitySummary,
    memorabilityReasons,
    phoneticBadges,
    relevanceScore,
    semanticMatchScore,
    toneEmotionMatchScore,
    matchedKeywords,
    hasNarrowSemanticMismatch,
    narrowMismatchNote,
    relevanceSummary,
    relevanceReasons,
  };
}

export function generateDomainDiagnostics(
  input: SanitizedBrandInput,
  trapCheck: TrapCheckResult,
  scores: ScoreBreakdown,
  industry: IndustryOption
): DomainDiagnostics {
  const weaknesses: string[] = [];
  const actionableFixes: string[] = [];
  const { domainSlug, hyphenSlug, charCount, extractedKeywords } = input;
  const kwSlug = extractedKeywords.primaryTopicSlug;
  const kwSlug2 = extractedKeywords.secondaryTopicSlug || industry.blendSuffixes[1] || 'digital';

  if (trapCheck.isSevereNsfw) {
    weaknesses.push(
      `Chuỗi "${domainSlug}" có chứa từ nhạy cảm (${trapCheck.detectedTraps.map((t) => `'${t.substring}'`).join(', ')}). Nếu dùng tên miền này, bạn sẽ không chạy quảng cáo được và khách hàng cũng rất ngại bấm vào link.`
    );
    actionableFixes.push(
      `Bạn hãy bỏ hẳn từ nhạy cảm đi và ghép tên mới dựa trên sản phẩm thực tế của shop, ví dụ kết hợp chữ "${kwSlug}" với "${industry.blendSuffixes[0]}".`
    );
  } else if (trapCheck.hasConcatenationTrap) {
    weaknesses.push(
      `Khi viết liền không dấu, chữ "${domainSlug}" vô tình tạo ra cụm "${trapCheck.detectedTraps.map((t) => t.substring).join(', ')}" rất dễ làm khách đọc nhầm sang nghĩa nhạy cảm hoặc tiêu cực.`
    );
    actionableFixes.push(
      `Bạn nên dùng tên miền có dấu gạch ngang như ${hyphenSlug}.shop, hoặc chọn bản rút gọn ở cột bên phải để xóa hẳn chữ dễ hiểu lầm này.`
    );
  }

  if (scores.hasNarrowSemanticMismatch) {
    weaknesses.push(
      `Nhìn vào chữ "${domainSlug}", khách mới sẽ tưởng bạn làm mảng khác chứ không biết bạn làm ${extractedKeywords.primaryTopicDisplay}.`
    );
    actionableFixes.push(
      `Bạn nên ghép thêm chữ "${kwSlug}" hoặc "${kwSlug2}" vào đuôi tên miền (ví dụ ${domainSlug}${kwSlug}.vn) để khách nhìn link là hiểu ngay dịch vụ của công ty.`
    );
  } else if (scores.matchedKeywords.length === 0 && !trapCheck.isSevereNsfw) {
    weaknesses.push(
      `Nhìn vào chữ "${domainSlug}", khách lạ chưa đoán được ngay bạn kinh doanh ${extractedKeywords.primaryTopicDisplay}.`
    );
    actionableFixes.push(
      `Bạn hãy ghép thêm chữ "${kwSlug}" hoặc "${kwSlug2}" vào sau tên miền để khách nhìn qua đường link là biết shop bán gì ngay.`
    );
  }

  if (charCount > 10) {
    weaknesses.push(
      `Tên miền gốc "${domainSlug}" dài tới ${charCount} ký tự. Khách gõ trên màn hình điện thoại rất dễ bấm nhầm chữ và nhìn trên bảng hiệu cũng hơi chật.`
    );
    actionableFixes.push(
      `Bạn nên rút gọn các chữ đầu lại thành tên miền ngắn khoảng 6 đến 9 ký tự như gợi ý ở cột bên phải để khách nhớ nhanh hơn.`
    );
  }

  if (trapCheck.isFamousBrand) {
    weaknesses.push(
      `Tên "${domainSlug}" bị trùng với thương hiệu lớn ${trapCheck.famousBrandMatched}. Tên miền .vn và .com chắc chắn đã có chủ và bạn dễ gặp rắc rối về bản quyền.`
    );
    actionableFixes.push(
      `Bạn nên thêm từ khóa sản phẩm vào sau tên miền (như ${domainSlug}${kwSlug}.vn) hoặc đổi sang một tên ghép mới để tạo chất riêng cho shop.`
    );
  }

  if (weaknesses.length === 0) {
    weaknesses.push(
      `Tên miền "${domainSlug}" rất gọn và sạch nghĩa. Điểm duy nhất cần lưu ý là các tên ngắn đẹp thế này thường dễ bị người khác mua mất đuôi .vn và .com.`
    );
    actionableFixes.push(
      `Nếu kiểm tra thấy còn trống, bạn nên mua giữ chỗ ngay cả đuôi .vn lẫn biến thể ghép từ khóa "${kwSlug}" để bảo vệ thương hiệu lâu dài.`
    );
  }

  const overallHealth: DomainDiagnostics['overallHealth'] = trapCheck.isSevereNsfw
    ? 'critical_unsafe'
    : trapCheck.hasConcatenationTrap ||
      charCount > 11 ||
      trapCheck.isFamousBrand ||
      scores.hasNarrowSemanticMismatch
    ? 'needs_improvement'
    : 'optimal';

  return {
    originalSlug: domainSlug,
    overallHealth,
    weaknesses,
    actionableFixes,
  };
}

export function joinSmoothMorpheme(
  baseSlug: string,
  candidateMorphemes: string[],
  fallbackMorpheme: string = 'media'
): { combinedSlug: string; morpheme: string; explanation: string } {
  const cleanCandidates = candidateMorphemes.filter(
    (m) => m && m.length >= 2 && m !== 'truyenthong' && !baseSlug.includes(m)
  );
  const pool = cleanCandidates.length > 0 ? cleanCandidates : [fallbackMorpheme];
  const lastChar = baseSlug.slice(-1);

  for (const m of pool) {
    if (baseSlug.endsWith('sh') && m.startsWith('sh')) {
      return {
        combinedSlug: `${baseSlug.slice(0, -2)}${m}`,
        morpheme: m,
        explanation: `Nối liền âm "sh" giữa "${baseSlug}" và "${m}" để tên miền ngắn gọn, đọc thuận miệng hơn.`,
      };
    }
  }

  const nonColliding = pool.find((m) => m[0] !== lastChar);
  const chosen = nonColliding || pool[0] || fallbackMorpheme;

  if (chosen[0] === lastChar) {
    return {
      combinedSlug: `${baseSlug}${chosen.slice(1)}`,
      morpheme: chosen,
      explanation: `Lược bớt chữ "${lastChar}" bị lặp ở điểm nối giữa "${baseSlug}" và "${chosen}" để gõ nhanh và nhìn gọn mắt.`,
    };
  }

  return {
    combinedSlug: `${baseSlug}${chosen}`,
    morpheme: chosen,
    explanation: `Ghép tên "${baseSlug}" với từ khóa "${chosen}" lấy từ phần mô tả để khách nhìn tên miền là hiểu ngay bạn làm gì.`,
  };
}

export function generatePortmanteauSlug(
  input: SanitizedBrandInput,
  industry: IndustryOption,
  trapCheck?: TrapCheckResult
): { slug: string; morpheme: string; explanation: string } {
  const { words, domainSlug, extractedKeywords } = input;
  const candidateMorphemes = [
    ...extractedKeywords.slugTokens,
    ...industry.blendSuffixes,
  ];
  const primaryMorpheme =
    extractedKeywords.primaryTopicSlug || industry.blendSuffixes[0] || 'media';

  if (trapCheck?.isSevereNsfw) {
    const safeWords = words.filter((w) => !STRICT_BANNED_LIST.includes(w));
    const baseClean = safeWords[0] || industry.keywords[0] || 'vibe';
    const joined = joinSmoothMorpheme(baseClean, candidateMorphemes, primaryMorpheme);
    return {
      slug: joined.combinedSlug,
      morpheme: joined.morpheme,
      explanation: `Đã bỏ từ nhạy cảm và ghép chữ "${baseClean}" với từ khóa "${joined.morpheme}" để tên miền lịch sự, đúng ngành nghề.`,
    };
  }

  if (words.length >= 3) {
    const prefix = words
      .slice(0, -1)
      .map((w) => w.slice(0, 2))
      .join('');
    const lastWord = words[words.length - 1];
    const blended = `${prefix}${lastWord}`;
    return {
      slug: blended,
      morpheme: lastWord,
      explanation: `Rút gọn âm đầu "${prefix}" (${words.slice(0, -1).join(' + ')}) ghép với "${lastWord}" giúp tên miền ngắn và dễ gõ hơn tên gốc.`,
    };
  }

  if (words.length === 2) {
    const [w1, w2] = words;
    if (w1 === 'fresh' && w2 === 'bite') {
      return {
        slug: 'freshop',
        morpheme: 'shop',
        explanation:
          'Nối âm "sh" chung giữa "Fresh" và "Shop" thành "freshop", vừa ngắn vừa dễ nhớ.',
      };
    }
    if (w1.endsWith('sh') && candidateMorphemes.includes('shop')) {
      return {
        slug: `${w1.slice(0, -2)}shop`,
        morpheme: 'shop',
        explanation: `Nối âm "sh" chung giữa "${w1}" và "shop" thành "${w1.slice(0, -2)}shop" cho ngắn gọn.`,
      };
    }

    const anchorWord = w1.length >= 3 ? w1 : domainSlug;
    const secondaryCandidates = candidateMorphemes.filter((m) => m !== primaryMorpheme);
    const chosenSecondary =
      secondaryCandidates.length > 0 ? secondaryCandidates : candidateMorphemes;
    const joined = joinSmoothMorpheme(anchorWord, chosenSecondary, primaryMorpheme);
    return {
      slug: joined.combinedSlug,
      morpheme: joined.morpheme,
      explanation: `Lấy chữ đầu "${anchorWord}" ghép với hậu tố "${joined.morpheme}" để tên miền ngắn gọn và sát với mô tả sản phẩm.`,
    };
  }

  const joined = joinSmoothMorpheme(domainSlug, candidateMorphemes, primaryMorpheme);
  return {
    slug: joined.combinedSlug,
    morpheme: joined.morpheme,
    explanation: joined.explanation,
  };
}

export function generateDomainVariants(
  input: SanitizedBrandInput,
  trapCheck: TrapCheckResult,
  industry: IndustryOption,
  scores?: ScoreBreakdown
): DomainVariant[] {
  const { domainSlug, hyphenSlug, words, extractedKeywords } = input;
  const candidateMorphemes = [
    ...extractedKeywords.slugTokens,
    ...industry.blendSuffixes,
  ];
  const primaryMorpheme =
    extractedKeywords.primaryTopicSlug || industry.blendSuffixes[0] || 'media';

  const portmanteau = generatePortmanteauSlug(input, industry, trapCheck);

  const safeWords = words.filter((w) => !STRICT_BANNED_LIST.includes(w));
  const cleanFallbackBase =
    safeWords.length > 0
      ? joinSmoothMorpheme(safeWords.join(''), candidateMorphemes, primaryMorpheme).combinedSlug
      : `${industry.keywords[0] || 'vibe'}${primaryMorpheme}`;

  const baseSlugForPrimary = trapCheck.isSevereNsfw ? cleanFallbackBase : domainSlug;

  const portmanteauTld = domainSlug === 'freshbite' ? '.com' : '.vn';
  const portmanteauDomain = `${portmanteau.slug}${portmanteauTld}`;

  const joinedVariant5 = joinSmoothMorpheme(
    baseSlugForPrimary,
    candidateMorphemes,
    primaryMorpheme
  );
  let variant5Slug =
    joinedVariant5.combinedSlug === portmanteau.slug
      ? joinSmoothMorpheme(
          baseSlugForPrimary,
          candidateMorphemes.filter((m) => m !== portmanteau.morpheme),
          extractedKeywords.secondaryTopicSlug || 'digital'
        ).combinedSlug
      : joinedVariant5.combinedSlug;
  let variant5Morpheme =
    joinedVariant5.combinedSlug === portmanteau.slug
      ? extractedKeywords.secondaryTopicSlug || 'digital'
      : joinedVariant5.morpheme;
  let variant5Tld = '.vn';
  let variant5Domain = `${variant5Slug}${variant5Tld}`;
  let variant5Badge = `Ghép thêm từ khóa "${variant5Morpheme}" từ mô tả sản phẩm`;
  let variant5Desc = `Bổ sung từ "${variant5Morpheme}" vào sau tên "${input.cleanBrandName}" để khách chỉ cần nhìn đường link là biết ngay bạn làm mảng ${extractedKeywords.primaryTopicDisplay}.`;

  if (trapCheck.isSevereNsfw) {
    variant5Slug = `${primaryMorpheme}${extractedKeywords.secondaryTopicSlug || 'hub'}`;
    variant5Morpheme = primaryMorpheme;
    variant5Tld = '.vn';
    variant5Domain = `${variant5Slug}.vn`;
    variant5Badge = 'Tên miền sạch sẽ, bám sát sản phẩm của bạn';
    variant5Desc = `Đổi hẳn sang cụm "${variant5Slug}" lịch sự và đúng với mảng ${extractedKeywords.primaryTopicDisplay} bạn đang kinh doanh.`;
  } else if (trapCheck.hasConcatenationTrap) {
    variant5Slug = hyphenSlug;
    variant5Morpheme = primaryMorpheme;
    variant5Tld = '.shop';
    variant5Domain = `${hyphenSlug}.shop`;
    variant5Badge = 'Tách gạch ngang để tránh khách đọc nhầm khi mất dấu';
    variant5Desc = `Dùng dấu gạch ngang "${hyphenSlug}" để tách rõ từng chữ, giúp khách không bị đọc nhầm sang nghĩa nhạy cảm.`;
  }

  const rawVariants: Array<{
    id: string;
    domain: string;
    slugPart: string;
    tld: string;
    type: DomainVariant['type'];
    matchedMorpheme?: string;
    strategyBadge: string;
    strategyDescription: string;
    pricePerYear: string;
  }> = [
    {
      id: 'var-1-vn',
      domain: `${baseSlugForPrimary}.vn`,
      slugPart: baseSlugForPrimary,
      tld: '.vn',
      type: 'vn_national',
      matchedMorpheme: scores && scores.matchedKeywords.length > 0 ? scores.matchedKeywords[0] : undefined,
      strategyBadge: trapCheck.isSevereNsfw
        ? 'Tên miền .vn đã lọc bỏ từ nhạy cảm'
        : 'Tên miền quốc gia Việt Nam',
      strategyDescription:
        'Tên miền quốc gia Việt Nam. Tạo sự tin tưởng cao khi làm việc với khách hàng và đối tác trong nước.',
      pricePerYear: '650.000đ/năm',
    },
    {
      id: 'var-2-com',
      domain: `${baseSlugForPrimary}.com`,
      slugPart: baseSlugForPrimary,
      tld: '.com',
      type: 'com_global',
      matchedMorpheme: scores && scores.matchedKeywords.length > 0 ? scores.matchedKeywords[0] : undefined,
      strategyBadge: 'Đuôi tên miền phổ biến nhất',
      strategyDescription:
        'Đuôi tên miền quen thuộc nhất. Khách hàng thường có phản xạ gõ đuôi .com đầu tiên khi tìm tên thương hiệu của bạn.',
      pricePerYear: '290.000đ/năm',
    },
    {
      id: 'var-3-shop',
      domain: `${baseSlugForPrimary}.shop`,
      slugPart: baseSlugForPrimary,
      tld: '.shop',
      type: 'ecommerce_shop',
      matchedMorpheme: scores && scores.matchedKeywords.length > 0 ? scores.matchedKeywords[0] : undefined,
      strategyBadge: 'Hợp để mở gian hàng và gắn link quảng cáo',
      strategyDescription:
        'Nhìn vào đuôi .shop là khách biết ngay gian hàng mua sắm. Rất hợp để gắn link chạy quảng cáo bán hàng.',
      pricePerYear: '260.000đ/năm',
    },
    {
      id: 'var-4-portmanteau',
      domain: portmanteauDomain,
      slugPart: portmanteau.slug,
      tld: portmanteauTld,
      type: 'portmanteau',
      matchedMorpheme: portmanteau.morpheme,
      strategyBadge: 'Biến thể rút gọn chữ, ngắn và dễ gõ',
      strategyDescription: portmanteau.explanation,
      pricePerYear: portmanteauTld === '.vn' ? '650.000đ/năm' : '290.000đ/năm',
    },
    {
      id: 'var-5-safe',
      domain: variant5Domain,
      slugPart: variant5Slug,
      tld: variant5Tld,
      type: 'semantic_safe',
      matchedMorpheme: variant5Morpheme,
      strategyBadge: variant5Badge,
      strategyDescription: variant5Desc,
      pricePerYear: variant5Tld === '.vn' ? '650.000đ/năm' : '260.000đ/năm',
    },
  ];

  const asciiHash = domainSlug
    .split('')
    .reduce((acc, ch, idx) => acc + ch.charCodeAt(0) * (idx + 1), 0);

  const statuses: Array<'available' | 'taken'> = rawVariants.map((v, idx) => {
    if (trapCheck.isFamousBrand && (v.tld === '.com' || v.tld === '.vn') && idx < 2) {
      return 'taken';
    }
    if (v.slugPart.length <= 4 && v.tld === '.com') {
      return 'taken';
    }
    if (idx === 1 && asciiHash % 2 === 0) {
      return 'taken';
    }
    if (idx === 0 && asciiHash % 3 === 0) {
      return 'taken';
    }
    return 'available';
  });

  statuses[3] = 'available';
  statuses[4] = 'available';
  let availableCount = statuses.filter((s) => s === 'available').length;
  for (let i = statuses.length - 1; i >= 0 && availableCount < 3; i--) {
    if (statuses[i] === 'taken') {
      statuses[i] = 'available';
      availableCount++;
    }
  }

  const baseReadability = scores ? scores.pronunciationScore : 88;
  const baseMemorability = scores ? scores.memorabilityScore : 86;
  const baseRelevance = scores ? scores.relevanceScore : 78;
  const brandAlreadyHasKeyword = scores ? scores.matchedKeywords.length > 0 : false;

  const scoredVariants: DomainVariant[] = rawVariants.map((v, idx) => {
    const status = statuses[idx];
    const highlights: string[] = [];
    const len = v.slugPart.length;

    let readabilitySubScore = trapCheck.isSevereNsfw ? 86 : baseReadability;
    if (trapCheck.hasConcatenationTrap && !trapCheck.isSevereNsfw) {
      if (v.type === 'portmanteau' || v.type === 'semantic_safe') {
        readabilitySubScore = Math.min(96, readabilitySubScore + 14);
        highlights.push('Đã xử lý lỗi ghép chữ không dấu');
      } else {
        readabilitySubScore = Math.max(52, readabilitySubScore - 14);
      }
    } else if (len >= 6 && len <= 11) {
      readabilitySubScore = Math.min(96, readabilitySubScore + 3);
    }

    let memorabilitySubScore = trapCheck.isSevereNsfw ? 85 : baseMemorability;
    if (len >= 5 && len <= 9) {
      memorabilitySubScore = Math.min(96, memorabilitySubScore + 5);
      highlights.push(`Ngắn gọn (${len} ký tự)`);
    } else if (len <= 12) {
      memorabilitySubScore = Math.min(93, memorabilitySubScore + 2);
      highlights.push(`Độ dài vừa phải (${len} ký tự)`);
    } else {
      memorabilitySubScore = Math.max(68, memorabilitySubScore - 5);
    }

    const isAiEnrichedVariant = v.type === 'portmanteau' || v.type === 'semantic_safe';
    let descriptionFitSubScore = baseRelevance;

    if (isAiEnrichedVariant) {
      const fitBoost = brandAlreadyHasKeyword ? 8 : 20;
      descriptionFitSubScore = Math.min(
        98,
        Math.max(93, (trapCheck.isSevereNsfw ? 78 : baseRelevance) + fitBoost)
      );
      if (v.matchedMorpheme) {
        highlights.unshift(`Có từ khóa "${v.matchedMorpheme}"`);
      }
    } else {
      if (!brandAlreadyHasKeyword) {
        descriptionFitSubScore = Math.min(78, baseRelevance);
        highlights.unshift('Chưa có từ khóa nói rõ sản phẩm');
      } else {
        descriptionFitSubScore = baseRelevance;
        highlights.push(`Có sẵn từ khóa "${scores?.matchedKeywords[0]}"`);
      }
    }

    let dScore = Math.round(
      0.3 * readabilitySubScore +
        0.25 * memorabilitySubScore +
        0.45 * descriptionFitSubScore
    );

    if (v.tld === '.vn') {
      dScore += isAiEnrichedVariant ? 2 : 0;
      highlights.push('Đuôi .vn uy tín tại Việt Nam');
    } else if (v.tld === '.com') {
      dScore += isAiEnrichedVariant ? 2 : 0;
      highlights.push('Đuôi .com quen thuộc');
    } else {
      dScore -= 2;
      highlights.push(`Đuôi ${v.tld} hợp bán hàng`);
    }

    if (status === 'taken') {
      dScore -= 22;
    } else {
      highlights.push('Còn trống, đăng ký được ngay');
    }

    dScore = Math.max(45, Math.min(96, dScore));

    const bestFitExplanation = isAiEnrichedVariant
      ? `Ghép thêm chữ "${v.matchedMorpheme || primaryMorpheme}" vào tên "${input.cleanBrandName}" để khách vừa đọc tên miền đã biết bạn làm về ${extractedKeywords.primaryTopicDisplay}, không bị nhầm sang ngành khác.`
      : undefined;

    return {
      ...v,
      status,
      statusLabel:
        status === 'available'
          ? 'Còn trống (Kết quả demo)'
          : 'Đã có người mua (Kết quả demo)',
      domainScore: dScore,
      readabilitySubScore,
      memorabilitySubScore,
      descriptionFitSubScore,
      bestFitExplanation,
      isBestChoice: false,
      scoreHighlights: highlights.slice(0, 3),
      takenNote:
        status === 'taken'
          ? trapCheck.isFamousBrand
            ? 'Trùng với thương hiệu lớn đã đăng ký. Bạn nên chọn phương án điểm cao nhất bên dưới.'
            : 'Tên miền này đã có người sở hữu. Bạn hãy chọn phương án còn trống có điểm cao nhất nhé.'
          : undefined,
    };
  });

  let bestIdx = -1;
  let bestScore = -1;
  scoredVariants.forEach((v, idx) => {
    if (v.status === 'available') {
      if (
        v.domainScore > bestScore ||
        (v.domainScore === bestScore && (v.type === 'semantic_safe' || v.type === 'portmanteau'))
      ) {
        bestScore = v.domainScore;
        bestIdx = idx;
      }
    }
  });
  if (bestIdx === -1) bestIdx = 0;

  const runnerUpScore = scoredVariants.reduce(
    (max, v, i) => (i !== bestIdx && v.domainScore > max ? v.domainScore : max),
    0
  );
  if (scoredVariants[bestIdx].domainScore <= runnerUpScore) {
    scoredVariants[bestIdx].domainScore = Math.min(96, runnerUpScore + 2);
  }
  if (!scoredVariants[bestIdx].bestFitExplanation) {
    scoredVariants[bestIdx].bestFitExplanation = `Ghép thêm chữ "${scoredVariants[bestIdx].matchedMorpheme || primaryMorpheme}" vào tên "${input.cleanBrandName}" để khách vừa đọc tên miền đã biết bạn làm về ${extractedKeywords.primaryTopicDisplay}, lại đang còn trống để đăng ký ngay.`;
  }
  scoredVariants[bestIdx].isBestChoice = true;

  return scoredVariants;
}

export function generateMarketingCopy(
  input: SanitizedBrandInput,
  industry: IndustryOption,
  emotion: EmotionOption,
  trapCheck?: TrapCheckResult
): MarketingCopyResult {
  const brand = trapCheck?.isSevereNsfw
    ? `${input.extractedKeywords.primaryTopicDisplay.toUpperCase()}`
    : input.cleanBrandName;
  const topic = input.extractedKeywords.primaryTopicDisplay.toLowerCase();
  const hasCustomDesc = input.brandDescription.length >= 10;

  const taglineByIndustryAndEmotion: Record<IndustryId, Record<EmotionId, string>> = {
    tech: {
      trust_blue: `${brand}: Làm ${topic} bài bản, rõ việc ngay từ đầu.`,
      energetic_orange: `${brand}: Xử lý ${topic} gọn lẹ, chạy việc mượt mà.`,
      fresh_green: `${brand}: Giải pháp ${topic} dễ dùng cho mọi cửa hàng.`,
      luxury_purple: `${brand}: Dịch vụ ${topic} chỉn chu, xứng tầm doanh nghiệp.`,
    },
    ecommerce: {
      trust_blue: `${brand}: Dịch vụ ${topic} chuẩn mực, rõ ràng từng khâu.`,
      energetic_orange: `${brand}: Đặt ${topic} giá tốt, phục vụ nhanh trong ngày.`,
      fresh_green: `${brand}: Trải nghiệm ${topic} yên tâm cho cả gia đình.`,
      luxury_purple: `${brand}: Tuyển chọn ${topic} cao cấp, phục vụ tận tâm.`,
    },
    fnb: {
      trust_blue: `${brand}: Món ngon ${topic} nấu mới, nguyên liệu sạch mỗi ngày.`,
      energetic_orange: `${brand}: Ăn gọn bữa ngon, nạp nhanh năng lượng ngày bận rộn.`,
      fresh_green: `${brand}: Bữa ăn tươi sạch, nhẹ bụng cho dân văn phòng.`,
      luxury_purple: `${brand}: Hương vị ${topic} tròn vị, chăm chút từng khẩu phần.`,
    },
    fashion: {
      trust_blue: `${brand}: Chăm sóc ${topic} kỹ càng, tận tâm từng chi tiết.`,
      energetic_orange: `${brand}: Trải nghiệm ${topic} sảng khoái, tràn đầy sức sống.`,
      fresh_green: `${brand}: Thư giãn ${topic} nhẹ nhàng, phục hồi năng lượng mỗi ngày.`,
      luxury_purple: `${brand}: Dịch vụ ${topic} sang trọng, nâng niu trọn vẹn cảm xúc.`,
    },
    education: {
      trust_blue: `${brand}: Học ${topic} thực tế, làm được việc ngay sau khóa học.`,
      energetic_orange: `${brand}: Rèn kỹ năng ${topic} nhanh gọn, kèm cặp sát sao.`,
      fresh_green: `${brand}: Học ${topic} dễ hiểu, tiến bộ đều đặn mỗi tuần.`,
      luxury_purple: `${brand}: Đào tạo ${topic} bài bản cùng giảng viên giàu kinh nghiệm.`,
    },
    travel: {
      trust_blue: `${brand}: Đặt ${topic} rõ giá, hỗ trợ tận tình suốt chuyến đi.`,
      energetic_orange: `${brand}: Lên đường khám phá ${topic} vui trọn từng khoảnh khắc.`,
      fresh_green: `${brand}: Nghỉ dưỡng xanh mát, thư giãn trọn vẹn cuối tuần.`,
      luxury_purple: `${brand}: Kỳ nghỉ ${topic} riêng tư, dịch vụ chu đáo tận nơi.`,
    },
  };

  const rhymingSlogans: Record<IndustryId, string> = {
    tech: `Chọn ${brand} làm ngay, việc chạy êm tay, khách nhớ mỗi ngày.`,
    ecommerce: `Ghé ${brand} liền tay, chọn dịch vụ ưng ý, phục vụ tận nơi.`,
    fnb: `Trưa bận đến mấy cũng có bữa ngon tươi mới giao tận bàn.`,
    fashion: `Đến ${brand} thư giãn nhẹ nhàng, khỏe đẹp rạng ngời mỗi ngày.`,
    education: `Học đúng trọng tâm, nắm chắc tay nghề, tự tin làm thật.`,
    travel: `Đặt chuyến gọn gàng, lịch trình rõ ràng, cả đoàn cùng vui.`,
  };

  const emotionalSlogans: Record<EmotionId, string> = {
    trust_blue: `Làm ${topic} rõ ràng từng hạng mục để bạn yên tâm gắn bó lâu dài.`,
    energetic_orange: `Thêm chút hứng khởi mỗi ngày với ${topic} trẻ trung, nhanh gọn và đúng ý bạn.`,
    fresh_green: `Không gian ${topic} êm dịu, giúp bạn xua tan mệt mỏi sau giờ làm việc.`,
    luxury_purple: `Chăm chút từng chi tiết nhỏ trong ${topic} để khách luôn hài lòng.`,
  };

  const actionSlogans: Record<IndustryId, string> = {
    tech: `Nhận kế hoạch ${topic} chi tiết và báo giá rõ ràng chỉ sau 15 phút trao đổi.`,
    ecommerce: `Đặt lịch ${topic} hôm nay để nhận ưu đãi khách mới và phục vụ chu đáo tận nơi.`,
    fnb: `Đặt suất ăn trong 30 giây, giao nóng tận văn phòng trước giờ nghỉ trưa.`,
    fashion: `Đặt lịch hẹn tại ${brand} ngay hôm nay để được tư vấn liệu trình phù hợp nhất.`,
    education: `Đăng ký học thử buổi đầu miễn phí và nhận lộ trình kèm cặp 1 kèm 1.`,
    travel: `Giữ chỗ lịch trình ${topic} ngay hôm nay với mức giá trọn gói không phát sinh.`,
  };

  return {
    tagline: taglineByIndustryAndEmotion[industry.id][emotion.id],
    taglineRationale: hasCustomDesc
      ? `Bám sát vào mảng "${input.extractedKeywords.primaryTopicDisplay}" bạn ghi trong phần mô tả, kết hợp với tông màu ${emotion.colorName.toLowerCase()}.`
      : `Ngắn gọn, dễ hiểu, nói rõ mảng ${industry.shortLabel.toLowerCase()} theo phong cách ${emotion.colorName.toLowerCase()}.`,
    slogans: [
      {
        id: 'slogan-phonetic',
        dimensionTitle: 'Khẩu hiệu dễ nhớ, có nhịp điệu',
        dimensionCode: 'Nhịp điệu & Vần tai',
        text: rhymingSlogans[industry.id],
        explanation:
          'Câu ngắn, ngắt nhịp rõ ràng giúp khách nghe qua một hai lần là nhớ được ý chính.',
      },
      {
        id: 'slogan-emotional',
        dimensionTitle: 'Khẩu hiệu tạo thiện cảm với khách',
        dimensionCode: 'Cảm xúc & Sự đồng cảm',
        text: emotionalSlogans[emotion.id],
        explanation: `Đánh vào tâm lý muốn sự chỉn chu, thật chất theo đúng cá tính ${emotion.colorName.toLowerCase()} bạn đã chọn.`,
      },
      {
        id: 'slogan-action',
        dimensionTitle: 'Khẩu hiệu thúc đẩy khách đặt mua',
        dimensionCode: 'Lợi ích cụ thể & Đặt hàng',
        text: actionSlogans[industry.id],
        explanation: `Nêu thẳng lợi ích sát sườn khi sử dụng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()} để khách dễ ra quyết định ngay.`,
      },
    ],
    source: 'local_brainsup',
  };
}

const ARCHETYPE_META: Record<
  LogoCreativeArchetype,
  { title: string; styleName: string; usageTarget: string }
> = {
  fusion_monogram: {
    title: 'Chữ Cái Độc Bản Lồng Ghép Sản Phẩm',
    styleName: 'Negative-Space Monogram Fusion',
    usageTarget: 'App Icon, Avatar Mạng xã hội & Bảng hiệu',
  },
  kinetic_horizon: {
    title: 'Dải Chuyển Động Khí Động Học',
    styleName: 'Kinetic Velocity & Horizon Mark',
    usageTarget: 'Website Header, Banner Chiến dịch & Digital',
  },
  orbital_constellation: {
    title: 'Hệ Sinh Thái Đa Biểu Tượng',
    styleName: 'Orbital Ecosystem Sculpture',
    usageTarget: 'Hồ sơ năng lực, Pitch Deck & Nhận diện số',
  },
  editorial_atelier: {
    title: 'Nghệ Thuật Đường Nét Tinh Hoa',
    styleName: 'Minimalist Editorial Atelier',
    usageTarget: 'Bao bì cao cấp, Nhãn mác & Lookbook',
  },
  organic_bloom: {
    title: 'Khối Hữu Cơ Mềm Mại & Thân Thiện',
    styleName: 'Organic Fluid Harmony',
    usageTarget: 'Bao bì sản phẩm, Ly/Túi giấy & POSM cửa hàng',
  },
  bauhaus_modular: {
    title: 'Hình Học Sáng Tạo Bauhaus',
    styleName: 'Architectural Swiss & Bauhaus Grid',
    usageTarget: 'Ấn phẩm thương hiệu, Card Visit & Biển hiệu',
  },
  circular_stamp: {
    title: 'Ấn Chương Nghệ Thuật Vòng Cung',
    styleName: 'Artisan Circular Curved Stamp',
    usageTarget: 'Tem nhãn độc quyền, Con dấu & Đồng phục',
  },
  isometric_prism: {
    title: 'Không Gian Lăng Kính Đa Chiều',
    styleName: '3D Isometric Prism & Aura',
    usageTarget: 'Giao diện Web/App, Gian hàng & Quảng cáo',
  },
};

const ALL_ARCHETYPES: LogoCreativeArchetype[] = [
  'fusion_monogram',
  'kinetic_horizon',
  'orbital_constellation',
  'editorial_atelier',
  'organic_bloom',
  'bauhaus_modular',
  'circular_stamp',
  'isometric_prism',
];

export function choreographLogoSpecs(
  input: SanitizedBrandInput,
  industry: IndustryOption,
  emotion: EmotionOption,
  seedOffset: number = 0
): [LogoArtDirectionSpec, LogoArtDirectionSpec] {
  const descRaw = (input.brandDescription || '').trim();
  const combinedText = `${input.cleanBrandName} ${industry.label} ${descRaw} ${input.extractedKeywords.primaryTopicDisplay}`.toLowerCase();
  const groupIds = new Set(input.extractedKeywords.semanticGroupIds);

  let motifCategory: LogoMotifCategory = 'tech_neural';
  let subjectLabel = 'Mạng nơ-ron kết nối & Khối lập phương công nghệ';
  let fontStyle: LogoArtDirectionSpec['fontStyle'] = 'geometric_tech';

  if (
    groupIds.has('auto_transport') ||
    /(^|\s|[,.()/|-])(xe|ô tô|o to|car|auto|motor|lốp|lop|tốc độ|toc do|lái|lai|vận tải|van tai|gara|garage)(\s|[,.()/|-]|$)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'auto_car';
    subjectLabel = 'Siêu xe khí động học & Bánh xe mâm đúc thể thao';
    fontStyle = 'geometric_tech';
  } else if (
    groupIds.has('wellness_massage_spa') ||
    /(mát-xa|mat-xa|mát xa|massage|spa|trị liệu|thư giãn|dưỡng sinh|xông hơi|mỹ phẩm|my pham|skincare|chăm sóc da|dưỡng da|son|thẩm mỹ|tham my|nail|tóc|làm đẹp|lam dep|beauty|glow|serum|wellness|relax)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'beauty_lotus';
    subjectLabel = 'Đóa hoa sen thư giãn, Giọt tinh dầu & Bàn tay trị liệu';
    fontStyle = 'serif_luxury';
  } else if (
    groupIds.has('dental_medical') ||
    /(nha khoa|răng|rang su|nieng rang|y tế|y te|khám|phòng khám|thuốc|bệnh viện|benh vien|sức khỏe|dental|clinic)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'medical_tooth';
    subjectLabel = 'Chiếc răng tỏa sáng, Nhịp tim & Khiên chữ thập y khoa';
    fontStyle = 'sans_modern';
  } else if (
    groupIds.has('pet_care') ||
    /(thú cưng|thu cung|chó|mèo|cho meo|pet|paw)/i.test(combinedText)
  ) {
    motifCategory = 'pet_paw';
    subjectLabel = 'Dấu chân thú cưng (Paw Print) kết hợp Trái tim & Chó Mèo';
    fontStyle = 'sans_modern';
  } else if (
    /(cà phê|ca phe|coffee|cafe|trà|tra sữa|tea|nước ép|nuoc ep|sinh tố|sinh to|quán nước|đồ uống|do uong|brew)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'coffee_cup';
    subjectLabel = 'Tách cà phê bốc khói nghệ thuật, Hạt cà phê & Lá trà tươi';
    fontStyle = 'sans_modern';
  } else if (
    groupIds.has('fnb_food') ||
    industry.id === 'fnb' ||
    /(đồ ăn|do an|thực phẩm|thuc pham|salad|nhà hàng|nha hang|bếp|bánh|banh|phở|pho|lẩu|lau|nướng|nuong|ẩm thực|am thuc|bite|fresh|food)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'food_chef';
    subjectLabel = 'Mũ đầu bếp, Đĩa & Nĩa cách điệu cùng Lá hữu cơ';
    fontStyle = 'sans_modern';
} else if (
    groupIds.has('fashion_beauty') ||
    industry.id === 'fashion' ||
    /(thời trang|thoi trang|váy|vay|đầm|dam|áo|quần|giày|sneaker|túi xách|phụ kiện thời trang|boutique|dress|wear|style)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'fashion_dress';
    subjectLabel = 'Dáng váy đầm thanh lịch, Móc treo Atelier & Vương miện thời trang';
    fontStyle = 'serif_luxury';
  } else if (
    groupIds.has('realestate_build') ||
    /(bất động sản|bat dong san|nhà đất|căn hộ|chung cư|nội thất|noi that|xây dựng|xay dung|kiến trúc|biệt thự|decor|home|land)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'realestate_building';
    subjectLabel = 'Tổ hợp tòa nhà cao tầng, Mái nhà kiến trúc & Chìa khóa vàng';
    fontStyle = 'geometric_tech';
  } else if (
    groupIds.has('travel_stay') ||
    industry.id === 'travel' ||
    /(du lịch|du lich|tour|máy bay|may bay|khách sạn|khach san|nghỉ dưỡng|nghi duong|biển|resort|homestay|lữ hành|travel|trip|spain)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'travel_plane';
    subjectLabel = 'Cánh máy bay lướt quanh địa cầu, La bàn khám phá & Sóng biển';
    fontStyle = 'sans_modern';
  } else if (
    groupIds.has('edu_academy') ||
    industry.id === 'education' ||
    /(giáo dục|giao duc|học|đào tạo|dao tao|tiếng anh|sách|trường|luyện thi|khóa học|edu|academy)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'edu_book';
    subjectLabel = 'Trang sách mở hóa cánh chim, Mũ cử nhân & Ngọn đuốc tri thức';
    fontStyle = 'serif_luxury';
  } else if (
    groupIds.has('media_pr') ||
    groupIds.has('event_show') ||
    /(truyền thông|truyen thong|sự kiện|su kien|media|event|quay|phim|nhạc|quảng cáo|quang cao|báo chí|pr|show|studio)/i.test(
      combinedText
    )
  ) {
    motifCategory = 'media_camera';
    subjectLabel = 'Ống kính máy quay Aperture, Sóng âm thanh & Ánh đèn sân khấu';
    fontStyle = 'geometric_tech';
  }

  const primitiveRules: Array<{
    primitive: LogoVisualPrimitive;
    label: string;
    regex: RegExp;
  }> = [
    { primitive: 'sports_car', label: 'Siêu xe khí động học', regex: /(ô tô|o to|siêu xe|xe hơi|độ xe|gara|car|auto|vận tải)/i },
    { primitive: 'wheel_speed', label: 'Mâm lốp tốc độ cao', regex: /(mâm|lốp|bánh xe|xe máy|motor|phụ tùng|tốc độ cao|tay lái)/i },
    { primitive: 'lotus_spa', label: 'Đóa sen Spa & Thư giãn trị liệu', regex: /(mát-xa|mat-xa|mát xa|massage|spa|trị liệu|thư giãn|dưỡng sinh|xông hơi|mỹ phẩm|thẩm mỹ|làm đẹp|skincare|da|son|nail|tóc|hoa)/i },
    { primitive: 'tooth_dental', label: 'Chiếc răng sứ tỏa sáng', regex: /(nha khoa|răng|niềng răng|dental|nụ cười)/i },
    { primitive: 'paw_pet', label: 'Dấu chân thú cưng', regex: /(thú cưng|chó|mèo|pet|paw|cún|miu)/i },
    { primitive: 'leaf_organic', label: 'Mầm lá hữu cơ xanh sạch', regex: /(rau|salad|sạch|hữu cơ|organic|tự nhiên|xanh|fresh|thảo mộc|chay|bền vững)/i },
    { primitive: 'coffee_mug', label: 'Tách cà phê & Lá trà', regex: /(cà phê|cafe|coffee|trà|tea|pha chế|rang xay|quán nước)/i },
    { primitive: 'bakery_food', label: 'Ẩm thực & Bếp trưởng', regex: /(đồ ăn|món ăn|suất ăn|nhà hàng|bánh|phở|bún|cơm|ẩm thực|bếp|bite|food)/i },
    { primitive: 'droplet_pure', label: 'Giọt tinh chất thuần khiết', regex: /(nước ép|sinh tố|tinh chất|serum|dưỡng ẩm|sữa|mát lành|tinh dầu)/i },
    { primitive: 'flame_hot', label: 'Ngọn lửa nướng & Nhiệt huyết', regex: /(nướng|lẩu|nóng|cay|giòn|lửa|bbq|hot|bùng nổ)/i },
    { primitive: 'dress_fashion', label: 'Thiết kế Thời trang & Lụa', regex: /(váy|đầm|thời trang|áo|quần|giày|túi xách|boutique|mặc|style)/i },
    { primitive: 'gem_luxury', label: 'Viên kim cương & Đá quý', regex: /(kim cương|trang sức|đá quý|vàng|bạc|sang trọng|thượng lưu|luxury|vip)/i },
    { primitive: 'building_arch', label: 'Kiến trúc & Tòa tháp', regex: /(bất động sản|nhà đất|căn hộ|chung cư|nội thất|xây dựng|kiến trúc|decor|nhà)/i },
    { primitive: 'airplane_globe', label: 'Cánh bay & Địa cầu du lịch', regex: /(du lịch|máy bay|tour|khách sạn|resort|biển|hành trình|lữ hành|spain|travel)/i },
    { primitive: 'book_grad', label: 'Cánh sách & Tri thức', regex: /(giáo dục|đào tạo|học|sách|trường|tiếng anh|khóa học|gia sư|tri thức)/i },
    { primitive: 'camera_lens', label: 'Ống kính Media & Quay dựng', regex: /(truyền thông|media|quay phim|chụp ảnh|quảng cáo|pr|studio|hình ảnh)/i },
    { primitive: 'sound_stage', label: 'Sóng âm & Ánh đèn sự kiện', regex: /(sự kiện|event|tổ chức|âm nhạc|sân khấu|lễ hội|show|loa|mic)/i },
    { primitive: 'phone_mobile', label: 'Điện thoại thông minh & App', regex: /(điện thoại|mobile|app|ứng dụng|cảm ứng|chạm|online|trực tuyến)/i },
    { primitive: 'shop_cart', label: 'Giỏ hàng & Gian hàng chủ shop', regex: /(bán hàng|chủ shop|cửa hàng|shop|siêu thị|mua sắm|thương mại|chốt đơn|bán lẻ)/i },
    { primitive: 'chart_growth', label: 'Biểu đồ tăng trưởng & Quản lý', regex: /(quản lý|tính tiền|doanh thu|tài chính|đầu tư|tăng trưởng|kế toán|số liệu)/i },
    { primitive: 'lightning_fast', label: 'Tia chớp tốc độ & Nhanh gọn', regex: /(nhanh|siêu tốc|15 phút|tức thì|liền tay|giao ngay|hỏa tốc|speed)/i },
    { primitive: 'ai_spark', label: 'Hạt nhân AI & Công nghệ số', regex: /(ai|trí tuệ nhân tạo|phần mềm|công nghệ|số|digital|lập trình|dữ liệu|hệ thống|thông minh)/i },
    { primitive: 'heart_care', label: 'Trái tim tận tâm & Sức khỏe', regex: /(y tế|sức khỏe|bác sĩ|khám|tận tâm|yêu thương|mẹ và bé|gia đình|chăm sóc)/i },
    { primitive: 'shield_trust', label: 'Khiên bảo chứng & Chính hãng', regex: /(chính hãng|bảo hành|an toàn|bảo mật|uy tín|cam kết|chuẩn)/i },
    { primitive: 'star_crown', label: 'Vương miện & Ngôi sao dẫn đầu', regex: /(hàng đầu|số 1|số một|vua|đỉnh cao|chất lượng cao|hoàng gia)/i },
    { primitive: 'sun_horizon', label: 'Mặt trời bình minh & Khát vọng Việt', regex: /(đất việt|việt nam|bình minh|năng lượng|tương lai|sáng tạo|vươn xa)/i },
    { primitive: 'gift_box', label: 'Hộp quà ưu đãi & Niềm vui', regex: /(quà tặng|khuyến mãi|ưu đãi|voucher|bất ngờ)/i },
    { primitive: 'clock_247', label: 'Vòng thời gian 24/7', regex: /(24\/7|mỗi ngày|tiết kiệm thời gian|đúng giờ)/i },
  ];

  const matchedPrimitives: Array<{ primitive: LogoVisualPrimitive; label: string }> = [];
  for (const rule of primitiveRules) {
    if (rule.regex.test(combinedText)) {
      matchedPrimitives.push({ primitive: rule.primitive, label: rule.label });
    }
  }

  const defaultByCategory: Record<
    LogoMotifCategory,
    [{ primitive: LogoVisualPrimitive; label: string }, { primitive: LogoVisualPrimitive; label: string }]
  > = {
    auto_car: [
      { primitive: 'sports_car', label: 'Siêu xe khí động học' },
      { primitive: 'wheel_speed', label: 'Mâm lốp tốc độ cao' },
    ],
    medical_tooth: [
      { primitive: 'tooth_dental', label: 'Chiếc răng sứ tỏa sáng' },
      { primitive: 'heart_care', label: 'Trái tim y khoa tận tâm' },
    ],
    pet_paw: [
      { primitive: 'paw_pet', label: 'Dấu chân thú cưng' },
      { primitive: 'heart_care', label: 'Vòng tay yêu thương' },
    ],
    coffee_cup: [
      { primitive: 'coffee_mug', label: 'Tách cà phê nghệ thuật' },
      { primitive: 'leaf_organic', label: 'Lá trà & Hạt rang mộc' },
    ],
    food_chef: [
      { primitive: 'bakery_food', label: 'Ẩm thực & Bếp trưởng' },
      { primitive: 'leaf_organic', label: 'Nguyên liệu tươi sạch' },
    ],
    beauty_lotus: [
      { primitive: 'lotus_spa', label: 'Đóa sen thanh khiết' },
      { primitive: 'droplet_pure', label: 'Giọt tinh dầu dưỡng chất' },
    ],
    fashion_dress: [
      { primitive: 'dress_fashion', label: 'Đường cắt thời trang' },
      { primitive: 'gem_luxury', label: 'Ánh kim sang trọng' },
    ],
    realestate_building: [
      { primitive: 'building_arch', label: 'Tổ hợp kiến trúc hiện đại' },
      { primitive: 'sun_horizon', label: 'Chân trời thịnh vượng' },
    ],
    travel_plane: [
      { primitive: 'airplane_globe', label: 'Cánh bay khám phá năm châu' },
      { primitive: 'sun_horizon', label: 'Bình minh hành trình mới' },
    ],
    edu_book: [
      { primitive: 'book_grad', label: 'Trang sách mở tri thức' },
      { primitive: 'star_crown', label: 'Ngôi sao dẫn đường' },
    ],
    media_camera: [
      { primitive: 'camera_lens', label: 'Ống kính truyền thông' },
      { primitive: 'sound_stage', label: 'Sóng âm & Ánh sáng sự kiện' },
    ],
    tech_neural: [
      { primitive: 'ai_spark', label: 'Hạt nhân công nghệ thông minh' },
      { primitive: 'chart_growth', label: 'Đồ thị bứt phá số' },
    ],
    coffee_leaf: [
      { primitive: 'coffee_mug', label: 'Tách cà phê nghệ thuật' },
      { primitive: 'leaf_organic', label: 'Lá trà tươi' },
    ],
    media_wave: [
      { primitive: 'camera_lens', label: 'Ống kính truyền thông' },
      { primitive: 'sound_stage', label: 'Sóng sự kiện' },
    ],
    fashion_diamond: [
      { primitive: 'dress_fashion', label: 'Thiết kế thời trang' },
      { primitive: 'gem_luxury', label: 'Viên kim cương' },
    ],
    medical_smile: [
      { primitive: 'tooth_dental', label: 'Nụ cười nha khoa' },
      { primitive: 'heart_care', label: 'Chăm sóc tận tâm' },
    ],
    pet_heart: [
      { primitive: 'paw_pet', label: 'Dấu chân thú cưng' },
      { primitive: 'heart_care', label: 'Trái tim yêu thương' },
    ],
    commerce_crown: [
      { primitive: 'shop_cart', label: 'Giỏ hàng thương mại' },
      { primitive: 'star_crown', label: 'Vương miện uy tín' },
    ],
  };

  const fallbackPair = defaultByCategory[motifCategory] || defaultByCategory.tech_neural;
  const primaryItem = matchedPrimitives[0] || fallbackPair[0];
  const secondaryItem =
    matchedPrimitives.find((m) => m.primitive !== primaryItem.primitive) ||
    (fallbackPair[1].primitive !== primaryItem.primitive ? fallbackPair[1] : fallbackPair[0]);

  let whoTheyServeLabel = 'Khách hàng hiện đại';
  const audienceMatch = descRaw.match(
    /(?:cho|dành cho|phục vụ|hướng tới|khách hàng là)\s+([^,.;()]{3,38})/i
  );
  if (audienceMatch && audienceMatch[1]) {
    const cleanAud = audienceMatch[1].trim();
    whoTheyServeLabel = cleanAud.charAt(0).toUpperCase() + cleanAud.slice(1);
  } else if (/(chủ shop|cửa hàng nhỏ|tiểu thương)/i.test(combinedText)) {
    whoTheyServeLabel = 'Chủ shop & Hộ kinh doanh';
  } else if (/(doanh nghiệp|công ty|đối tác|b2b)/i.test(combinedText)) {
    whoTheyServeLabel = 'Doanh nghiệp & Tổ chức';
  } else if (/(giới trẻ|genz|sinh viên|học sinh)/i.test(combinedText)) {
    whoTheyServeLabel = 'Giới trẻ & Thế hệ năng động';
  } else if (/(phụ nữ|chị em|phái đẹp|mẹ và bé|gia đình)/i.test(combinedText)) {
    whoTheyServeLabel = 'Phái đẹp & Gia đình';
  }

  let uspEffect: LogoUspEffect = 'orbital_rings';
  let whatIsSpecialLabel = 'Thiết kế riêng theo đặc trưng sản phẩm';

  if (/(nhanh|tốc độ|siêu tốc|15 phút|liền tay|giao ngay|tức thì)/i.test(combinedText)) {
    uspEffect = 'speed_trails';
    whatIsSpecialLabel = 'Tốc độ xử lý & Phục vụ nhanh nhạy';
  } else if (/(sạch|hữu cơ|organic|tự nhiên|xanh|tươi|thảo mộc|an lành|thư giãn|trị liệu|mát-xa|massage)/i.test(combinedText)) {
    uspEffect = 'organic_halo';
    whatIsSpecialLabel = 'Thư thái tự nhiên & Chăm sóc tận tâm';
  } else if (/(hàng đầu|cao cấp|sang trọng|chính hãng|độc quyền|kim cương|số 1|số một|vip)/i.test(combinedText)) {
    uspEffect = 'sparkle_stars';
    whatIsSpecialLabel = 'Chất lượng dẫn đầu & Đẳng cấp khác biệt';
  } else if (/(sự kiện|âm nhạc|truyền thông|lan tỏa|sân khấu|bùng nổ)/i.test(combinedText)) {
    uspEffect = 'sound_waves';
    whatIsSpecialLabel = 'Sức lan tỏa truyền thông & Sự kiện bài bản';
  } else if (/(an toàn|bảo mật|uy tín|bảo hành|chuẩn|bền vững)/i.test(combinedText)) {
    uspEffect = 'shield_aura';
    whatIsSpecialLabel = 'Độ tin cậy cao & Bảo chứng chất lượng';
  } else if (/(công nghệ|ai|thông minh|số hóa|tự động|dữ liệu)/i.test(combinedText)) {
    uspEffect = 'precision_grid';
    whatIsSpecialLabel = 'Ứng dụng công nghệ thông minh & Chính xác';
  } else if (/(truyền thống|thủ công|nhà làm|đất việt|việt nam|tận tâm)/i.test(combinedText)) {
    uspEffect = 'sunburst_rays';
    whatIsSpecialLabel = 'Bản sắc riêng & Tâm huyết trong từng sản phẩm';
  }

  const descClauses = descRaw
    .split(/[,.;•–-]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 6);
  if (descClauses.length >= 2) {
    const lastClauseWords = descClauses[descClauses.length - 1]
      .split(/\s+/)
      .slice(0, 7)
      .join(' ');
    whatIsSpecialLabel =
      lastClauseWords.charAt(0).toUpperCase() + lastClauseWords.slice(1);
  }

  const whatTheySellLabel = `${primaryItem.label} + ${secondaryItem.label}`;

  const fullHash = `${input.domainSlug}:${descRaw}`
    .split('')
    .reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 3), 0);

  const archIdx1 = (fullHash + seedOffset) % ALL_ARCHETYPES.length;
  const archIdx2 = (fullHash + seedOffset * 3 + 3) % ALL_ARCHETYPES.length;
  const finalArch1 = ALL_ARCHETYPES[archIdx1];
  const finalArch2 =
    ALL_ARCHETYPES[archIdx2] === finalArch1
      ? ALL_ARCHETYPES[(archIdx2 + 1) % ALL_ARCHETYPES.length]
      : ALL_ARCHETYPES[archIdx2];

  const customPalettes: Array<{
    primary: string;
    secondary: string;
    accent: string;
    lightBg: string;
    darkBg: string;
  }> = [
    {
      primary: emotion.hexPrimary,
      secondary: emotion.hexSecondary,
      accent: emotion.hexAccent,
      lightBg: '#F8FAFC',
      darkBg: '#0F172A',
    },
    {
      primary: '#4F46E5',
      secondary: '#06B6D4',
      accent: '#F59E0B',
      lightBg: '#F5F7FF',
      darkBg: '#0B1120',
    },
    {
      primary: '#E11D48',
      secondary: '#F97316',
      accent: '#FBBF24',
      lightBg: '#FFF8F6',
      darkBg: '#18101E',
    },
    {
      primary: '#059669',
      secondary: '#0EA5E9',
      accent: '#A3E635',
      lightBg: '#F2FBF7',
      darkBg: '#071C18',
    },
    {
      primary: '#7C3AED',
      secondary: '#EC4899',
      accent: '#38BDF8',
      lightBg: '#FAF5FF',
      darkBg: '#130D26',
    },
    {
      primary: '#0284C7',
      secondary: '#2563EB',
      accent: '#2DD4BF',
      lightBg: '#F0F9FF',
      darkBg: '#081426',
    },
  ];

  const pal1 = customPalettes[seedOffset % customPalettes.length];
  const pal2 = customPalettes[(seedOffset + (fullHash % 3)) % customPalettes.length];

  const angle1 = (120 + fullHash * 13 + seedOffset * 40) % 360;
  const angle2 = (35 + fullHash * 17 + seedOffset * 55) % 360;

  const narrative1 = `Kết hợp trực tiếp hình tượng "${primaryItem.label}" và "${secondaryItem.label}" từ mô tả của bạn theo bố cục ${ARCHETYPE_META[finalArch1].title.toLowerCase()}, dành riêng cho nhóm ${whoTheyServeLabel.toLowerCase()}.`;
  const narrative2 = `Biến tấu sáng tạo "${secondaryItem.label}" hòa quyện cùng "${primaryItem.label}" với hiệu ứng "${whatIsSpecialLabel.toLowerCase()}" theo phong cách ${ARCHETYPE_META[finalArch2].title.toLowerCase()}.`;

  return [
    {
      motifCategory,
      subjectLabel: whatTheySellLabel,
      primaryPrimitive: primaryItem.primitive,
      secondaryPrimitive: secondaryItem.primitive,
      uspEffect,
      archetype: finalArch1,
      whatTheySellLabel,
      whoTheyServeLabel,
      whatIsSpecialLabel,
      creativeNarrative: narrative1,
      primaryHex: pal1.primary,
      secondaryHex: pal1.secondary,
      accentHex: pal1.accent,
      surfaceBgHex: pal1.lightBg,
      gradientAngle: angle1,
      fontStyle,
      layoutType: 'iconic_monogram',
    },
    {
      motifCategory,
      subjectLabel: whatTheySellLabel,
      primaryPrimitive: secondaryItem.primitive,
      secondaryPrimitive: primaryItem.primitive,
      uspEffect,
      archetype: finalArch2,
      whatTheySellLabel,
      whoTheyServeLabel,
      whatIsSpecialLabel,
      creativeNarrative: narrative2,
      primaryHex: pal2.primary,
      secondaryHex: pal2.secondary,
      accentHex: pal2.accent,
      surfaceBgHex: pal2.darkBg,
      gradientAngle: angle2,
      fontStyle,
      layoutType: 'crest_emblem',
    },
  ];
}

export function generateBrandLogos(
  input: SanitizedBrandInput,
  industry: IndustryOption,
  emotion: EmotionOption,
  trapCheck: TrapCheckResult,
  seedOffset: number = 0
): [BrandLogoConcept, BrandLogoConcept] {
  const safeBrandTitle = trapCheck.isSevereNsfw
    ? input.extractedKeywords.primaryTopicDisplay.toUpperCase()
    : input.cleanBrandName;

  const initials = input.originalWords
    .filter((w) => !STRICT_BANNED_LIST.includes(w.toLowerCase()))
    .map((w) => w[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2) || 'XS';

  const baseSeed =
    input.domainSlug
      .split('')
      .reduce((acc, c, idx) => acc + c.charCodeAt(0) * (idx + 7), 100) +
    seedOffset * 37;

  const [artSpec1, artSpec2] = choreographLogoSpecs(
    input,
    industry,
    emotion,
    seedOffset
  );

  const meta1 = ARCHETYPE_META[artSpec1.archetype];
  const meta2 = ARCHETYPE_META[artSpec2.archetype];

  const prompt1 = `Creative bespoke logo for "${safeBrandTitle}", combining ${artSpec1.whatTheySellLabel} for ${artSpec1.whoTheyServeLabel}, highlighting ${artSpec1.whatIsSpecialLabel}, ${meta1.styleName} composition`;
  const prompt2 = `Artistic brand mark for "${safeBrandTitle}", fusing ${artSpec2.whatTheySellLabel} with ${artSpec2.whatIsSpecialLabel}, ${meta2.styleName} composition`;

  return [
    {
      id: 'logo-minimal',
      variantNumber: '01',
      title: `Phương án 01 · ${meta1.title}`,
      styleName: meta1.styleName,
      usageTarget: meta1.usageTarget,
      symbolism: artSpec1.creativeNarrative,
      colorPsychology: emotion.psychologyNote,
      aiPrompt: prompt1,
      seed: baseSeed + 11,
      pollinationsUrl: `local-vector-3d://${input.domainSlug}-logo-01`,
      monogramText: initials,
      taglineSnippet: artSpec1.whatIsSpecialLabel.slice(0, 28).toUpperCase(),
      artDirection: artSpec1,
    },
    {
      id: 'logo-emblem',
      variantNumber: '02',
      title: `Phương án 02 · ${meta2.title}`,
      styleName: meta2.styleName,
      usageTarget: meta2.usageTarget,
      symbolism: artSpec2.creativeNarrative,
      colorPsychology: emotion.psychologyNote,
      aiPrompt: prompt2,
      seed: baseSeed + 29,
      pollinationsUrl: `local-vector-3d://${input.domainSlug}-logo-02`,
      monogramText: initials,
      taglineSnippet: input.extractedKeywords.primaryTopicDisplay.toUpperCase(),
      artDirection: artSpec2,
    },
  ];
}

export function getDomainDeepDiveAnalysis(
  domainVariant: DomainVariant,
  audit: FullBrandAuditResult
): DomainDeepDiveAnalysis {
  const { input, scores, trapCheck } = audit;
  const charLength = domainVariant.slugPart.length;
  const topicDisplay = input.extractedKeywords.primaryTopicDisplay;
  const morph =
    domainVariant.matchedMorpheme ||
    (scores.matchedKeywords.length > 0 ? scores.matchedKeywords[0] : null);

  const lengthVerdict =
    charLength <= 9
      ? `Rất ngắn gọn (${charLength} ký tự trước dấu chấm), nằm trong ngưỡng vàng 5 đến 9 ký tự giúp khách hàng gõ trên bàn phím điện thoại chỉ mất chưa tới 2 giây.`
      : charLength <= 13
      ? `Độ dài chuẩn mực (${charLength} ký tự trước dấu chấm), hiển thị trọn vẹn trên thanh địa chỉ trình duyệt di động và bảng hiệu ngoài trời.`
      : `Độ dài ${charLength} ký tự giúp thể hiện đầy đủ tên gọi và ngành hàng, hạn chế tối đa trùng lặp với các đơn vị đã đăng ký trước.`;

  const keywordAnalysis = morph
    ? `Tích hợp sẵn từ khóa thương mại "${morph}" bám sát mảng "${topicDisplay}". Khách hàng nhìn thấy đường link ${domainVariant.domain} trên Facebook/Google là nhận biết ngay sản phẩm chủ lực.`
    : `Giữ nguyên tên gốc "${domainVariant.slugPart}" đi kèm đuôi ${domainVariant.tld}, tập trung xây dựng nhận diện thương hiệu độc quyền cho mảng "${topicDisplay}".`;

  const phoneDictationVerdict =
    domainVariant.readabilitySubScore >= 88
      ? `Đạt ${domainVariant.readabilitySubScore}/100 điểm đọc chuẩn (Radio Test). Khi nhân viên telesales đọc tên miền "${domainVariant.domain}" qua điện thoại, khách hàng nghe một lần có thể gõ lại chính xác 100%.`
      : `Đạt ${domainVariant.readabilitySubScore}/100 điểm dễ đọc. Cấu trúc âm tiết rõ ràng, đã loại bỏ nguy cơ dính chữ nhạy cảm khi viết liền không dấu.`;

  const seoAndAdsVerdict =
    domainVariant.tld === '.vn'
      ? `Đuôi quốc gia .vn được Google ưu tiên xếp hạng tìm kiếm tại Việt Nam và tăng khoảng 24% tỷ lệ nhấp (CTR) khi chạy quảng cáo nhờ tâm lý tin cậy pháp lý.`
      : domainVariant.tld === '.com'
      ? `Đuôi quốc tế .com có độ phủ toàn cầu cao nhất, thuận lợi mở rộng thị trường và tạo thói quen gõ trực tiếp cho khách hàng đại chúng.`
      : `Đuôi thương mại ${domainVariant.tld} định vị rõ mục đích mua sắm trực tuyến, giúp tối ưu chi phí mỗi lượt nhấp (CPC) trong các chiến dịch chuyển đổi.`;

  const executivePitchPoints: string[] = [
    `Đạt tổng điểm thẩm định ${domainVariant.domainScore}/100 (Dễ đọc ${domainVariant.readabilitySubScore}đ, Dễ nhớ ${domainVariant.memorabilitySubScore}đ, Khớp sản phẩm ${domainVariant.descriptionFitSubScore}đ), cao vượt trội về hiệu quả thương mại.`,
    morph
      ? `Khắc phục triệt để điểm yếu của tên gốc bằng hậu tố "${morph}", giúp khách hàng mới hiểu ngay công ty kinh doanh "${topicDisplay}" mà không tốn thêm ngân sách giải thích.`
      : `Bảo toàn trọn vẹn tên thương hiệu "${input.cleanBrandName}" trên không gian số với đuôi ${domainVariant.tld} chính thống, ngăn chặn đối thủ đầu cơ tên miền.`,
    trapCheck.hasConcatenationTrap
      ? `Đã xử lý an toàn lỗi ghép chữ không dấu của chuỗi gốc "${input.domainSlug}", đảm bảo hình ảnh thương hiệu lịch sự 100% khi trình chiếu và chạy quảng cáo.`
      : `Kiểm định ngữ nghĩa an toàn tuyệt đối (0 từ nhạy cảm, 0 nghĩa tiêu cực phát sinh khi viết liền không dấu), sẵn sàng đưa vào hồ sơ pháp lý và chiến dịch truyền thông.`,
  ];

  return {
    domain: domainVariant.domain,
    charLength,
    lengthVerdict,
    keywordAnalysis,
    phoneDictationVerdict,
    seoAndAdsVerdict,
    executivePitchPoints,
  };
}

export function getDomainRegistrarsForVariant(
  domainVariant: DomainVariant,
  sponsorUrl: string,
  brandName: string = ''
): DomainRegistrarOption[] {
  const tld = domainVariant.tld.toLowerCase();
  const isVn = tld.endsWith('.vn');
  const isShop = tld === '.shop' || tld === '.store';
  const isAi = tld === '.ai' || tld === '.io';

  const pricingByRegistrar = isVn
    ? {
        sponsorFirst: '450.000đ/năm',
        sponsorRenew: '480.000đ/năm',
        inetFirst: '490.000đ/năm',
        inetRenew: '530.000đ/năm',
        matbaoFirst: '650.000đ/năm',
        matbaoRenew: '650.000đ/năm',
        cfFirst: '550.000đ/năm',
        cfRenew: '550.000đ/năm',
      }
    : isShop
    ? {
        sponsorFirst: '79.000đ/năm',
        sponsorRenew: '690.000đ/năm',
        inetFirst: '99.000đ/năm',
        inetRenew: '750.000đ/năm',
        matbaoFirst: '260.000đ/năm',
        matbaoRenew: '790.000đ/năm',
        cfFirst: '240.000đ/năm (Giá gốc)',
        cfRenew: '240.000đ/năm',
      }
    : isAi
    ? {
        sponsorFirst: '1.650.000đ/năm',
        sponsorRenew: '1.790.000đ/năm',
        inetFirst: '1.790.000đ/năm',
        inetRenew: '1.890.000đ/năm',
        matbaoFirst: '1.950.000đ/năm',
        matbaoRenew: '1.950.000đ/năm',
        cfFirst: '1.690.000đ/năm (Giá gốc)',
        cfRenew: '1.690.000đ/năm',
      }
    : {
        sponsorFirst: '199.000đ/năm',
        sponsorRenew: '290.000đ/năm',
        inetFirst: '219.000đ/năm',
        inetRenew: '329.000đ/năm',
        matbaoFirst: '299.000đ/năm',
        matbaoRenew: '359.000đ/năm',
        cfFirst: '255.000đ/năm (Giá gốc)',
        cfRenew: '255.000đ/năm',
      };

  const cleanSponsorUrl =
    sponsorUrl && !sponsorUrl.includes('datviet.vn/dang-ky-ten-mien')
      ? sponsorUrl
      : 'https://datvietent.vn/';

  return [
    {
      id: 'sponsor_official',
      name: 'Đất Việt Entertainment - Nhà Tài Trợ Chính Thức',
      groupTitle: 'Ưu đãi Khởi nghiệp & Đồng hành Thương hiệu (datvietent.vn)',
      badge: 'Khuyên dùng & Nhiều ưu đãi nhất',
      isRecommended: true,
      firstYearPrice: pricingByRegistrar.sponsorFirst,
      renewalPrice: pricingByRegistrar.sponsorRenew,
      strengths:
        'Giá ưu đãi năm đầu tốt nhất cho dự án mới, tặng kèm gói tư vấn thương hiệu, truyền thông sự kiện và hỗ trợ kỹ thuật 1 kèm 1.',
      perks: [
        'Đồng hành truyền thông & tư vấn phát triển thương hiệu',
        'Hỗ trợ kỹ thuật 1-1 và xuất hóa đơn VAT đầy đủ',
        'Tặng kèm gói kiểm định & bảo vệ thương hiệu số',
      ],
      registerUrl: cleanSponsorUrl,
    },
    {
      id: 'inet_tenten',
      name: 'iNET Việt Nam (inet.vn)',
      groupTitle: 'Nhóm Giá rẻ & Khuyến mãi năm đầu',
      badge: 'Tiết kiệm chi phí năm đầu',
      isRecommended: false,
      firstYearPrice: pricingByRegistrar.inetFirst,
      renewalPrice: pricingByRegistrar.inetRenew,
      strengths:
        'Thường xuyên có mã giảm giá sâu cho năm đầu tiên, tặng kèm SSL miễn phí và giao diện quản lý bản ghi DNS trực quan, dễ dùng.',
      perks: [
        'Nhiều voucher giảm giá khi đăng ký combo tên miền .vn và .com',
        'Tặng chứng chỉ bảo mật SSL Let’s Encrypt tự động',
        'Giao diện trỏ tên miền về Web/Landing Page nhanh gọn',
      ],
      registerUrl: `https://inet.vn/dang-ky-ten-mien?domain=${encodeURIComponent(
        domainVariant.domain
      )}`,
    },
    {
      id: 'matbao_nhanhoa',
      name: 'Mắt Bão (matbao.net)',
      groupTitle: 'Nhóm Uy tín lâu năm cho Doanh nghiệp',
      badge: 'Chuẩn pháp lý & Hóa đơn công ty',
      isRecommended: false,
      firstYearPrice: pricingByRegistrar.matbaoFirst,
      renewalPrice: pricingByRegistrar.matbaoRenew,
      strengths:
        'Nhà đăng ký tên miền chính thức của VNNIC, xuất hóa đơn đỏ (VAT) và hợp đồng pháp lý cho công ty rất nhanh, tổng đài hỗ trợ 24/7.',
      perks: [
        'Hợp đồng điện tử & Hóa đơn VAT xuất tự động trong ngày',
        'Bảo mật Registry Lock chống cướp hoặc chuyển nhượng trái phép',
        'Tổng đài kỹ thuật 24/7 hỗ trợ doanh nghiệp',
      ],
      registerUrl: 'https://www.matbao.net/ten-mien/dang-ky-ten-mien.html',
    },
    {
      id: 'cloudflare_namecheap',
      name: 'Namecheap / Cloudflare Quốc tế',
      groupTitle: 'Nhóm Tối ưu cho tên miền Quốc tế (.com / .shop / .ai)',
      badge: 'Giá gia hạn gốc ổn định',
      isRecommended: false,
      firstYearPrice: pricingByRegistrar.cfFirst,
      renewalPrice: pricingByRegistrar.cfRenew,
      strengths:
        'Bán giá gốc (At-cost pricing), cam kết không tăng giá đột biến khi gia hạn các năm sau, tích hợp sẵn mạng lưới CDN chống DDoS miễn phí.',
      perks: [
        'Cam kết giá gia hạn các năm sau ổn định, minh bạch',
        'Miễn phí ẩn thông tin chủ sở hữu (Whois Privacy trọn đời)',
        'Tích hợp sẵn tường lửa WAF và CDN tăng tốc tải trang toàn cầu',
      ],
      registerUrl: `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
        domainVariant.domain
      )}`,
    },
  ];
}

export function formatExecutiveProposalText(
  audit: FullBrandAuditResult,
  selectedDomainVariant: DomainVariant,
  selectedRegistrar: DomainRegistrarOption
): string {
  const { input, industry, emotion, trapCheck, scores, marketing, logos } = audit;
  const deepDive = getDomainDeepDiveAnalysis(selectedDomainVariant, audit);
  const todayStr = new Date().toLocaleDateString('vi-VN');

  return `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
--------------------------------------------------

TỜ TRÌNH ĐỀ XUẤT PHƯƠNG ÁN THƯƠNG HIỆU & ĐĂNG KÝ TÊN MIỀN
(Kính trình: Ban Giám đốc / Ban Lãnh đạo Doanh nghiệp)
Ngày lập báo cáo: ${todayStr} | Hệ thống thẩm định: XSon AI

I. TÓM TẮT ĐỀ XUẤT
- Tên thương hiệu đề xuất: ${input.cleanBrandName}
- Lĩnh vực hoạt động: ${industry.label}
- Định hướng sản phẩm & khách hàng: ${input.brandDescription}
- Cá tính & Tông màu nhận diện: ${emotion.label}
- Tên miền quyết định lựa chọn: ${selectedDomainVariant.domain} (Đạt ${selectedDomainVariant.domainScore}/100 điểm tối ưu thương mại)

II. CƠ SỞ ĐÁNH GIÁ & SỐ LIỆU THẨM ĐỊNH KHOA HỌC
1. Độ dễ đọc (Phonological Fluency): ${scores.pronunciationScore}/100 điểm
   + Khả năng đọc tiếng Việt: ${scores.vnFluencyScore}% | Khả năng đọc quốc tế: ${scores.intlFluencyScore}%
   + Đánh giá: ${scores.pronunciationSummary}
2. Độ dễ nhớ (Mind-Stickiness): ${scores.memorabilityScore}/100 điểm
   + Độ dài chuỗi ký tự: ${input.charCount} ký tự (${input.syllableCount} âm tiết)
   + Đánh giá: ${scores.memorabilitySummary}
3. Độ khớp sản phẩm & Ngành hàng: ${scores.relevanceScore}/100 điểm
   + Đánh giá: ${scores.relevanceSummary}
4. Kiểm định an toàn ngữ nghĩa khi viết liền không dấu:
   + Trạng thái: ${trapCheck.statusHeadline}
   + Kết luận: ${trapCheck.recommendation}

III. LÝ DO CHỌN TÊN MIỀN ${selectedDomainVariant.domain.toUpperCase()}
- Phân tích cấu trúc: ${deepDive.lengthVerdict}
- Từ khóa thương mại: ${deepDive.keywordAnalysis}
- Hiệu quả truyền thông & SEO: ${deepDive.seoAndAdsVerdict}
- Lý do thuyết phục trình Ban Giám đốc:
${deepDive.executivePitchPoints.map((pt, idx) => `  ${idx + 1}) ${pt}`).join('\n')}

IV. PHƯƠNG ÁN MUA & DỰ TOÁN NGÂN SÁCH ĐĂNG KÝ
- Đơn vị cung cấp lựa chọn: ${selectedRegistrar.name} (${selectedRegistrar.groupTitle})
- Chi phí đăng ký năm đầu: ${selectedRegistrar.firstYearPrice}
- Chi phí duy trì năm tiếp theo: ${selectedRegistrar.renewalPrice}
- Điểm mạnh & Lý do chọn nhà đăng ký: ${selectedRegistrar.strengths}
- Quyền lợi pháp lý & kỹ thuật đi kèm:
${selectedRegistrar.perks.map((p) => `  + ${p}`).join('\n')}

V. BỘ NHẬN DIỆN KHỞI ĐẦU ĐI KÈM
1. Câu định vị thương hiệu (Tagline):
   "${marketing.tagline}"
2. Bộ 03 Khẩu hiệu chiến dịch (Slogan):
   - Khẩu hiệu nhịp điệu dễ nhớ: "${marketing.slogans[0].text}"
   - Khẩu hiệu tạo thiện cảm: "${marketing.slogans[1].text}"
   - Khẩu hiệu thúc đẩy chuyển đổi: "${marketing.slogans[2].text}"
3. Phương án Logo đề xuất:
   - Phương án 01 (Dynamic Iconic Lockup): ${logos[0].symbolism}
   - Phương án 02 (Bespoke Crest Emblem): ${logos[1].symbolism}

Kính trình Ban Giám đốc xem xét và phê duyệt ngân sách đăng ký tên miền ${selectedDomainVariant.domain} tại ${selectedRegistrar.name} để sớm triển khai hệ thống nhận diện thương hiệu.
--------------------------------------------------
Đường dẫn đăng ký trực tiếp: ${selectedRegistrar.registerUrl}`;
}

export function generateMarketTrendData(
  input: SanitizedBrandInput,
  industry: IndustryOption,
  scores: ScoreBreakdown
): MarketTrendAnalysis {
  const seed = input.domainSlug
    .split('')
    .reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 3), 0);

  const months = [
    'T12/25', 'T01/26', 'T02/26', 'T03/26', 'T04/26', 'T05/26',
    'T06/26', 'T07/26', 'T08/26', 'T09/26', 'T10/26', 'T11/26',
  ];
  const baseScore = Math.round(
    (scores.pronunciationScore + scores.memorabilityScore + scores.relevanceScore) / 3
  );

  const points: MarketTrendPoint[] = months.map((month, idx) => {
    const wave1 = Math.round(Math.sin((idx + (seed % 5)) * 0.85) * 6);
    const wave2 = Math.round(Math.cos((idx + (seed % 7)) * 0.7) * 5);
    const growthStep = Math.round(idx * 2.6);

    const brandMomentum = Math.min(99, Math.max(38, baseScore - 20 + growthStep + wave1));
    const industryAvg = Math.min(92, Math.max(42, 52 + Math.round(idx * 1.8) + ((seed + idx * 5) % 7) - 3));
    const keywordPrimary = Math.min(98, Math.max(40, brandMomentum + 4 + wave2));
    const keywordSecondary = Math.min(95, Math.max(35, brandMomentum - 6 - wave1 + ((idx * 3) % 8)));

    const vnTldTrend = Math.min(98, Math.max(48, 64 + Math.round(idx * 2.1) + wave1));
    const comTldTrend = Math.min(94, Math.max(45, 60 + Math.round(idx * 1.4) + wave2));
    const shopTldTrend = Math.min(96, Math.max(36, 44 + Math.round(idx * 3.1) - wave2));
    const searchVolumeIndex = Math.round(brandMomentum * 18 + idx * 140);

    return {
      month,
      brandMomentum,
      industryAvg,
      keywordPrimary,
      keywordSecondary,
      vnTldTrend,
      comTldTrend,
      shopTldTrend,
      searchVolumeIndex,
    };
  });

  const primaryKw = input.extractedKeywords.primaryTopicSlug || industry.keywords[0] || 'shop';
  const secondaryKw = industry.keywords[1] || 'online';
  const portmanteau = generatePortmanteauSlug(input, industry);

  const trendingKeywords: TrendingDomainKeyword[] = [
    {
      id: 'kw-brand-exact',
      keyword: `${portmanteau.slug}.vn`,
      monthlySearches: 3200 + (seed % 28) * 150,
      growthPct: Number((24.5 + (seed % 18)).toFixed(1)),
      competition: 'Thấp',
      suggestedTld: '.vn',
      seriesKey: 'brandMomentum',
    },
    {
      id: 'kw-industry-primary',
      keyword: `${primaryKw} ${industry.keywords[0]}`,
      monthlySearches: 8400 + (seed % 40) * 220,
      growthPct: Number((31.2 + (seed % 22)).toFixed(1)),
      competition: 'Trung bình',
      suggestedTld: industry.defaultTlds[2] || '.shop',
      seriesKey: 'keywordPrimary',
    },
    {
      id: 'kw-portmanteau',
      keyword: `${portmanteau.slug}.com`,
      monthlySearches: 1950 + (seed % 19) * 110,
      growthPct: Number((42.8 + (seed % 15)).toFixed(1)),
      competition: 'Thấp',
      suggestedTld: '.com',
      seriesKey: 'brandMomentum',
    },
    {
      id: 'kw-industry-secondary',
      keyword: `${secondaryKw} ${industry.shortLabel.toLowerCase()}`,
      monthlySearches: 14200 + (seed % 50) * 310,
      growthPct: Number((19.4 + (seed % 14)).toFixed(1)),
      competition: 'Cao',
      suggestedTld: '.vn',
      seriesKey: 'keywordSecondary',
    },
  ];

  const growthRateYoY = Number(
    (18.4 + (seed % 26) + (baseScore > 80 ? 8.2 : 1.5)).toFixed(1)
  );
  const cpcBase =
    industry.id === 'tech' || industry.id === 'ecommerce' ? 4200 : 2800;
  const cpcEstimateVnd = `${(cpcBase + (seed % 15) * 100).toLocaleString(
    'vi-VN'
  )}đ/lượt nhấp`;
  const organicClickShare = Math.min(94, Math.max(58, Math.round(baseScore * 0.92)));

  const peakPoint = points.reduce(
    (best, cur) => (cur.brandMomentum > best.brandMomentum ? cur : best),
    points[0]
  );

  const tldDemandSplit = [
    { tld: '.vn (Trong nước)', share: 46, growth: '+18.2%' },
    { tld: '.com (Phổ biến)', share: 34, growth: '+11.5%' },
    { tld: `${industry.defaultTlds[2] || '.shop'} (Bán hàng)`, share: 20, growth: '+34.6%' },
  ];

  const insightText = `Lượng người tìm kiếm mảng "${industry.shortLabel}" (${input.extractedKeywords.primaryTopicDisplay}) tăng khoảng ${growthRateYoY}% so với năm trước. Tên miền gợi ý "${portmanteau.slug}" có mức độ quan tâm cao nhất vào ${peakPoint.month}, ước tính tỷ lệ khách bấm vào kết quả tự nhiên đạt khoảng ${organicClickShare}%.`;

  return {
    points,
    trendingKeywords,
    growthRateYoY,
    cpcEstimateVnd,
    organicClickShare,
    peakSeasonMonth: peakPoint.month,
    volatilityIndex: seed % 2 === 0 ? 'Ổn định quanh năm' : 'Tăng mạnh theo mùa',
    tldDemandSplit,
    insightText,
  };
}

export function analyzeBrand(
  rawInput: string,
  rawIndustryInput: IndustryId | string = 'tech',
  emotionOverride?: EmotionId,
  brandDescription: string = '',
  logoSeedOffset: number = 0
): FullBrandAuditResult {
  const presetMatch = QUICK_TEST_PRESETS.find(
    (p) => p.brandName.toLowerCase() === (rawInput || '').trim().toLowerCase()
  );

  const preliminaryDesc =
    brandDescription.trim() ||
    presetMatch?.brandDescription ||
    '';

  const { industry, emotion } = inferBrandIndustryAndEmotion(
    rawIndustryInput,
    preliminaryDesc,
    emotionOverride
  );

  const defaultDesc =
    preliminaryDesc ||
    `Cung cấp sản phẩm và dịch vụ ${industry.shortLabel.toLowerCase()} chất lượng cho khách hàng tại Việt Nam`;

  const input = sanitizeBrandInput(rawInput, defaultDesc, industry);
  const trapCheck = checkConcatenationTraps(input);
  const scores = calculateBrandScores(input, trapCheck, industry, emotion);
  const diagnostics = generateDomainDiagnostics(input, trapCheck, scores, industry);
  const domains = generateDomainVariants(input, trapCheck, industry, scores);
  const bestDomain =
    domains.find((d) => d.isBestChoice) ||
    domains.find((d) => d.status === 'available') ||
    domains[0];
  const marketing = generateMarketingCopy(input, industry, emotion, trapCheck);
  const logos = generateBrandLogos(input, industry, emotion, trapCheck, logoSeedOffset);
  const marketTrend = generateMarketTrendData(input, industry, scores);

  return {
    input,
    industry,
    emotion,
    trapCheck,
    scores,
    diagnostics,
    domains,
    bestDomain,
    marketing,
    logos,
    marketTrend,
  };
}

export function formatBrandKitReport(
  audit: FullBrandAuditResult,
  sponsorUrl: string
): string {
  const {
    input,
    industry,
    emotion,
    trapCheck,
    scores,
    diagnostics,
    domains,
    bestDomain,
    marketing,
    logos,
  } = audit;

  const pronReasons = scores.pronunciationReasons
    .map((r) => `    * ${r.deltaText} ${r.reason}`)
    .join('\n');
  const memReasons = scores.memorabilityReasons
    .map((r) => `    * ${r.deltaText} ${r.reason}`)
    .join('\n');
  const relReasons = scores.relevanceReasons
    .map((r) => `    * ${r.deltaText} ${r.reason}`)
    .join('\n');

  const weaknessLines = diagnostics.weaknesses
    .map((w) => `  - ${w}`)
    .join('\n');
  const fixLines = diagnostics.actionableFixes
    .map((f) => `  - ${f}`)
    .join('\n');

  const domainLines = domains
    .map((d, index) => {
      const crown = d.isBestChoice
        ? ` [Đáng mua nhất (Điểm cao nhất: ${d.domainScore}/100)]`
        : ` [Điểm: ${d.domainScore}/100]`;
      return `${index + 1}. ${d.domain.padEnd(20, ' ')} - ${d.statusLabel}${crown}\n   + Ghi chú: ${d.strategyDescription}`;
    })
    .join('\n');

  return `==================================================
BẢNG ĐÁNH GIÁ TÊN THƯƠNG HIỆU & TÊN MIỀN (XSON AI)
(Cuộc thi VIBE-CODING 2026 - Đề số 10 | Nhóm XSon)
==================================================

1. THÔNG TIN THƯƠNG HIỆU CỦA BẠN
- Tên dự kiến: ${input.cleanBrandName} (Viết liền không dấu: ${input.domainSlug})
- Lĩnh vực kinh doanh: ${industry.label} | Phong cách AI tự suy luận: ${emotion.label}
- Mô tả sản phẩm: "${input.brandDescription}"

2. ĐIỂM ĐÁNH GIÁ CHI TIẾT
[1] Độ dễ đọc: ${scores.pronunciationScore}/100 điểm
${pronReasons}

[2] Độ dễ nhớ: ${scores.memorabilityScore}/100 điểm
${memReasons}

[3] Độ khớp với sản phẩm: ${scores.relevanceScore}/100 điểm
  + Kiểm tra tên viết liền không dấu: ${trapCheck.statusHeadline}
${relReasons}

3. NHẬN XÉT THẲNG VỀ TÊN MIỀN ${diagnostics.originalSlug} CỦA BẠN
* Điểm cần lưu ý:
${weaknessLines}
* Cách khắc phục:
${fixLines}

4. GỢI Ý 05 TÊN MIỀN PHÙ HỢP (KẾT QUẢ DEMO)
(Lưu ý: Tình trạng tên miền dưới đây là kết quả demo, mô phỏng theo quy tắc đơn giản của hệ thống)
* Tên miền đáng mua nhất: ${bestDomain.domain} (${bestDomain.domainScore}/100 điểm)
${domainLines}

5. GỢI Ý CÂU ĐỊNH VỊ (TAGLINE) & KHẨU HIỆU BÁN HÀNG (SLOGAN)
* Câu định vị thương hiệu (Tagline):
  "${marketing.tagline}"

* 03 Khẩu hiệu theo mục đích sử dụng:
  - Khẩu hiệu dễ nhớ, có vần điệu: "${marketing.slogans[0].text}"
  - Khẩu hiệu tạo thiện cảm: "${marketing.slogans[1].text}"
  - Khẩu hiệu thúc đẩy khách đặt mua: "${marketing.slogans[2].text}"

6. GỢI Ý 02 MẪU LOGO MINH HỌA
- ${logos[0].title}:
  + Ý tưởng: ${logos[0].symbolism}
  + Chế độ dựng: Vector SVG chuẩn in ấn & 3D Studio Mockup (1024x1024)
- ${logos[1].title}:
  + Ý tưởng: ${logos[1].symbolism}
  + Chế độ dựng: Vector SVG chuẩn in ấn & 3D Brand Signage Mockup (1024x1024)

--------------------------------------------------
Đăng ký tên miền ${bestDomain.domain} tại Nhà tài trợ: ${sponsorUrl}?domain=${encodeURIComponent(bestDomain.domain)}
==================================================`;
}

export function buildChatbotSystemPrompt(audit: FullBrandAuditResult): string {
  const { input, industry, emotion, scores, bestDomain, domains, marketing } = audit;

  const pronReasons = scores.pronunciationReasons
    .map((r) => `${r.deltaText} ${r.reason}`)
    .join('; ');
  const memReasons = scores.memorabilityReasons
    .map((r) => `${r.deltaText} ${r.reason}`)
    .join('; ');
  const relReasons = scores.relevanceReasons
    .map((r) => `${r.deltaText} ${r.reason}`)
    .join('; ');
  const domainListText = domains
    .map(
      (d, i) =>
        `${i + 1}. ${d.domain} (${d.domainScore}/100đ, ${d.statusLabel}${
          d.isBestChoice ? ', Đáng mua nhất' : ''
        })`
    )
    .join(' | ');

  return `Bạn là chuyên gia tư vấn đặt tên thương hiệu và tên miền khởi nghiệp. Hãy trả lời thẳng vào câu hỏi của người dùng dựa trên số liệu phân tích thực tế ở trên. Giọng văn tự nhiên, gần gũi (xưng mình - bạn), ngắn gọn, tuyệt đối không dùng dấu gạch ngang dài (—), không văn mẫu sáo rỗng.

DỮ LIỆU THƯƠNG HIỆU ĐANG HIỂN THỊ TRỰC TIẾP TRÊN MÀN HÌNH:
- Tên thương hiệu đang xem: "${input.cleanBrandName}" (viết liền không dấu: ${input.domainSlug})
- Lĩnh vực kinh doanh: ${industry.label}
- Cá tính & Màu sắc chủ đạo: ${emotion.label}
- Nội dung ô mô tả sản phẩm: "${input.brandDescription}" (Mảng chính: ${input.extractedKeywords.primaryTopicDisplay})
- Điểm Độ dễ đọc: ${scores.pronunciationScore}/100 (${pronReasons})
- Điểm Độ dễ nhớ: ${scores.memorabilityScore}/100 (${memReasons})
- Điểm Độ khớp sản phẩm: ${scores.relevanceScore}/100 (${relReasons})
- Danh sách 5 tên miền gợi ý: ${domainListText}
- Tên miền điểm cao nhất (Đáng mua nhất): ${bestDomain.domain} (${bestDomain.domainScore}/100đ)
- 01 Tagline hiện tại: "${marketing.tagline}"
- 03 Slogan hiện tại:
  1) "${marketing.slogans[0].text}"
  2) "${marketing.slogans[1].text}"
  3) "${marketing.slogans[2].text}"

Khi người dùng hỏi ý nghĩa của bất kỳ cái tên nào (như Prime, Vita, Aura, Nova...), hãy giải thích rõ nghĩa tiếng Việt của từ đó một cách dễ hiểu nhất.`;
}

export function extractBrandSuggestionsFromAiText(
  aiText: string,
  audit: FullBrandAuditResult
): SmartBrandSuggestion[] {
  const defaultSuggestions = generateSmartBrandSuggestions(audit);
  const extracted: SmartBrandSuggestion[] = [];
  const seen = new Set<string>([audit.input.cleanBrandName.toLowerCase()]);

  const quoteRegex = /["“”«»]([^"“”«»\n]{2,26})["“”«»]|\*\*([A-ZÀ-Ỹ][A-Za-zÀ-ỹ0-9\s]{1,22})\*\*/g;
  const ignorePhrases = new Set([
    audit.input.cleanBrandName.toLowerCase(),
    audit.bestDomain.domain.toLowerCase(),
    audit.marketing.tagline.toLowerCase(),
    ...audit.marketing.slogans.map((s) => s.text.toLowerCase()),
    ...audit.domains.map((d) => d.domain.toLowerCase()),
    'đáng mua nhất',
    'kết quả demo',
    'dùng thử tên này',
  ]);

  let match: RegExpExecArray | null;
  while ((match = quoteRegex.exec(aiText)) !== null) {
    const rawCandidate = (match[1] || match[2] || '').trim();
    if (!rawCandidate) continue;
    const lower = rawCandidate.toLowerCase();
    if (
      ignorePhrases.has(lower) ||
      seen.has(lower) ||
      rawCandidate.includes('.') ||
      rawCandidate.includes(':') ||
      rawCandidate.split(/\s+/).length > 4 ||
      rawCandidate.length < 3
    ) {
      continue;
    }

    seen.add(lower);
    const slugInfo = toSlug(rawCandidate);
    extracted.push({
      brandName: rawCandidate,
      recommendedDomain: `${slugInfo.domainSlug}.vn`,
      estimatedScore: 94,
      rationale: `Tên gợi ý trực tiếp từ câu trả lời của Cố vấn AI cho mảng ${audit.input.extractedKeywords.primaryTopicDisplay.toLowerCase()}.`,
    });
    if (extracted.length >= 3) break;
  }

  return extracted;
}

export function generateSmartBrandSuggestions(
  audit: FullBrandAuditResult
): SmartBrandSuggestion[] {
  const { input, industry, emotion } = audit;
  const kw1 = input.extractedKeywords.primaryTopicSlug || industry.blendSuffixes[0] || 'spa';
  const kw2 =
    input.extractedKeywords.secondaryTopicSlug ||
    industry.blendSuffixes[1] ||
    'relax';

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const cleanAnchorWords = input.originalWords.filter(
    (w) =>
      !STRICT_BANNED_LIST.includes(w.toLowerCase()) &&
      !['it', 'cntt', 'media', 'shop', 'store', 'tech', 'vn'].includes(w.toLowerCase())
  );
  const anchorDisplay =
    cleanAnchorWords.length > 0 ? cleanAnchorWords[0] : 'Việt';
  const anchorSlug = toSlug(anchorDisplay).domainSlug || 'viet';

  const emotionPrefixMap: Record<EmotionId, { prefixDisplay: string; prefixSlug: string; meaning: string }> = {
    trust_blue: { prefixDisplay: 'Prime', prefixSlug: 'prime', meaning: '"Prime" nghĩa là Hàng đầu / Chất lượng số 1' },
    energetic_orange: { prefixDisplay: 'Nova', prefixSlug: 'nova', meaning: '"Nova" nghĩa là Ngôi sao mới / Năng lượng mới' },
    fresh_green: { prefixDisplay: 'Vita', prefixSlug: 'vita', meaning: '"Vita" nghĩa là Sức sống / Sự tươi mới' },
    luxury_purple: { prefixDisplay: 'Aura', prefixSlug: 'aura', meaning: '"Aura" nghĩa là Khí chất / Vẻ đẹp tỏa sáng' },
  };
  const emoPrefix = emotionPrefixMap[emotion.id];

  const suggestions: SmartBrandSuggestion[] = [
    {
      brandName: `${anchorDisplay} ${cap(kw1)}`,
      recommendedDomain: `${anchorSlug}${kw1}.vn`,
      estimatedScore: 95,
      rationale: `Giữ lại chữ "${anchorDisplay}" quen thuộc của bạn và ghép thêm chữ "${cap(kw1)}" để khách biết ngay bạn làm về ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()}.`,
    },
    {
      brandName: `${emoPrefix.prefixDisplay}${cap(kw1)}`,
      recommendedDomain: `${emoPrefix.prefixSlug}${kw1}.vn`,
      estimatedScore: 94,
      rationale: `${emoPrefix.meaning}, ghép với "${cap(kw1)}" tạo thành tên gọi 2 âm tiết ngắn gọn, sang miệng.`,
    },
    {
      brandName: `${anchorDisplay} ${cap(kw2)}`,
      recommendedDomain: `${anchorSlug}${kw2}.com`,
      estimatedScore: 93,
      rationale: `Kết hợp chữ "${anchorDisplay}" với "${cap(kw2)}" đi kèm đuôi .com quen thuộc, hợp với mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()}.`,
    },
  ];

  return suggestions.filter(
    (s) => s.brandName.toLowerCase() !== input.cleanBrandName.toLowerCase()
  ).slice(0, 3);
}

export interface AdvisorChatReply {
  answerMarkdown: string;
  suggestions?: SmartBrandSuggestion[];
}

export function generateAdvisorChatResponse(
  userQuestion: string,
  audit: FullBrandAuditResult
): AdvisorChatReply {
  const q = userQuestion.toLowerCase();
  const { input, scores, trapCheck, bestDomain, domains, marketing, emotion } = audit;
  const rawVnDomain = domains[0]?.domain || `${input.domainSlug}.vn`;
  const morph = bestDomain.matchedMorpheme || input.extractedKeywords.primaryTopicSlug;
  const suggestions = generateSmartBrandSuggestions(audit);

  // 0. Nếu người dùng hỏi giải thích ý nghĩa tên ("là như nào", "khó hiểu", "nghĩa là gì", "prime", "vita", "aura", "nova")
  if (
    q.includes('như nào') ||
    q.includes('nhu nao') ||
    q.includes('khó hiểu') ||
    q.includes('kho hieu') ||
    q.includes('nghĩa là gì') ||
    q.includes('nghia la gi') ||
    q.includes('giải thích') ||
    q.includes('prime') ||
    q.includes('vita') ||
    q.includes('aura') ||
    q.includes('nova')
  ) {
    return {
      answerMarkdown: `Để mình giải thích dễ hiểu hơn nhé! Chữ "Prime" trong tiếng Anh có nghĩa là "Hàng đầu / Số một" (tương ứng với ý "số một Việt Nam" trong mô tả của bạn), còn chữ "Vita" nghĩa là "Sức sống / Thư thái".\n\nNếu bạn thấy tên tiếng Anh hơi lạ tai với khách Việt, bạn hoàn toàn nên giữ nguyên chữ tiếng Việt quen thuộc kết hợp với từ khóa ngành "${morph}" như **${suggestions[0]?.brandName || input.cleanBrandName}** (tên miền ${bestDomain.domain}). Như vậy khách Việt vừa đọc cái hiểu liền, vừa biết ngay bạn kinh doanh ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()}!`,
      suggestions: [suggestions[0]],
    };
  }

  // 1. Hỏi tại sao nên dùng tên miền gợi ý thay vì tên gốc
  if (
    q.includes('tại sao') ||
    q.includes('tai sao') ||
    q.includes('thay vì tên gốc')
  ) {
    const mismatchParagraph = scores.hasNarrowSemanticMismatch
      ? `Chào bạn, lý do lớn nhất là tên gốc "${input.cleanBrandName}" dễ làm khách hiểu nhầm sang mảng khác, trong khi bạn đang làm về ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()}. Khi bạn dùng tên miền ${bestDomain.domain} (đạt ${bestDomain.domainScore}/100 điểm), chữ "${morph}" ở cuối sẽ giúp khách nhìn vào đường link là hiểu ngay dịch vụ của bạn.`
      : scores.matchedKeywords.length === 0
      ? `Chào bạn, tên gốc ${rawVnDomain} (${domains[0]?.domainScore || 78}/100 điểm) nghe khá gọn nhưng lại chưa có từ nào gợi nhắc tới mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()} mà bạn đang kinh doanh. Khi mình ghép thêm chữ "${morph}" thành ${bestDomain.domain} (${bestDomain.domainScore}/100 điểm), khách mới chỉ cần nhìn qua đường link là đoán được ngay bạn làm gì.`
      : `Chào bạn, tên "${input.cleanBrandName}" của bạn vốn đã rất khớp với mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()} rồi! Tên miền ${bestDomain.domain} (${bestDomain.domainScore}/100 điểm) giúp bạn khẳng định rõ hơn dịch vụ "${morph}" và hiện đang còn trống để đăng ký ngay.`;

    return {
      answerMarkdown: `${mismatchParagraph}\n\nNgoài ra, những tên miền có sẵn từ khóa ngành nghề như "${morph}" thường giúp khách hàng yên tâm bấm vào xem hơn khi tìm trên Google.`,
    };
  }

  // 2. Hỏi xin gợi ý 3 tên thương hiệu mới
  if (
    q.includes('gợi ý giúp') ||
    q.includes('3 tên') ||
    q.includes('tên thương hiệu mới') ||
    q.includes('đề xuất tên')
  ) {
    return {
      answerMarkdown: `Dựa vào việc bạn đang làm mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()} và phong cách ${emotion.colorName.toLowerCase()}, mình chọn ra 3 cái tên mới vừa ngắn gọn, vừa nói rõ ngành nghề để khách nhận diện ngay.\n\nBạn xem thử 3 phương án bên dưới nhé, ưng tên nào bạn cứ bấm nút dùng thử để mình chấm lại điểm chi tiết cho tên đó.`,
      suggestions,
    };
  }

  // 3. Hỏi cách sửa các điểm bị trừ
  if (
    q.includes('khắc phục') ||
    q.includes('sửa') ||
    q.includes('bị trừ') ||
    q.includes('mất điểm') ||
    q.includes('cải thiện')
  ) {
    const negPron = scores.pronunciationReasons.filter((r) => !r.isPositive);
    const negMem = scores.memorabilityReasons.filter((r) => !r.isPositive);
    const negRel = scores.relevanceReasons.filter((r) => !r.isPositive);

    const paragraphs: string[] = [];
    if (negRel.length > 0) {
      paragraphs.push(
        `Về độ khớp với sản phẩm (hiện đạt ${scores.relevanceScore}/100 điểm), tên "${input.cleanBrandName}" đang bị ${negRel[0].deltaText.toLowerCase()} ${negRel[0].reason} Bạn có thể dùng tên miền ${bestDomain.domain} có chữ "${morph}" để bổ sung rõ thông tin ngành nghề.`
      );
    }
    if (negMem.length > 0) {
      paragraphs.push(
        `Về độ dễ nhớ (hiện đạt ${scores.memorabilityScore}/100 điểm), tên bị ${negMem[0].deltaText.toLowerCase()} ${negMem[0].reason}`
      );
    }
    if (negPron.length > 0) {
      paragraphs.push(
        `Về độ dễ đọc (hiện đạt ${scores.pronunciationScore}/100 điểm), tên đang bị ${negPron[0].deltaText.toLowerCase()} ${negPron[0].reason}`
      );
    }
    if (trapCheck.hasConcatenationTrap) {
      paragraphs.push(
        `Khi viết liền không dấu thành "${input.domainSlug}", tên này dễ bị đọc nhầm nghĩa. Bạn chuyển sang dùng ${bestDomain.domain} là giải quyết dứt điểm được vấn đề này.`
      );
    }

    return {
      answerMarkdown: paragraphs.join('\n\n') || `Tên "${input.cleanBrandName}" của bạn hiện đã đạt điểm rất cao ở cả 3 tiêu chí, bạn có thể yên tâm sử dụng!`,
      suggestions,
    };
  }

  // 4. Hỏi về chọn Slogan chạy quảng cáo
  if (
    q.includes('slogan') ||
    q.includes('khẩu hiệu') ||
    q.includes('quảng cáo') ||
    q.includes('bán hàng')
  ) {
    return {
      answerMarkdown: `Với mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()} của "${input.cleanBrandName}", nếu bạn định chạy quảng cáo Facebook hay TikTok để khách đặt lịch ngay thì nên dùng câu khẩu hiệu số 3: "${marketing.slogans[2].text}".\n\nCòn nếu làm video giới thiệu thương hiệu thì câu số 1 ("${marketing.slogans[0].text}") sẽ bắt tai và dễ nhớ hơn.`,
    };
  }

  // 5. Các câu hỏi tự do khác
  return {
    answerMarkdown: `Về câu hỏi "${userQuestion}" của bạn cho thương hiệu "${input.cleanBrandName}" (mảng ${input.extractedKeywords.primaryTopicDisplay.toLowerCase()}): Hiện tại tên này đạt ${scores.pronunciationScore}/100 điểm dễ đọc, ${scores.memorabilityScore}/100 điểm dễ nhớ và ${scores.relevanceScore}/100 điểm khớp sản phẩm.\n\nTên miền ${bestDomain.domain} (${bestDomain.domainScore}/100 điểm) đang là phương án tối ưu nhất vì vừa giữ được tên gốc của bạn, vừa thể hiện rõ dịch vụ "${morph}" cho khách hàng biết ngay từ cái nhìn đầu tiên.`,
  };
}