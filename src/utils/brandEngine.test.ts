import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeBrandInput,
  checkConcatenationTraps,
  analyzeBrand,
  formatBrandKitReport,
  extractDescriptionKeywords,
  generateAdvisorChatResponse,
  buildChatbotSystemPrompt,
  extractBrandSuggestionsFromAiText,
  getDomainDeepDiveAnalysis,
  getDomainRegistrarsForVariant,
  formatExecutiveProposalText,
  INDUSTRIES,
} from './brandEngine';

test('Step 1: sanitizeBrandInput strips protocols, www, and TLD extensions accurately', () => {
  const res = sanitizeBrandInput(
    'https://www.myshop.com/products',
    'Nền tảng bán lẻ trực tuyến thông minh'
  );
  assert.equal(res.cleanBrandName, 'myshop');
  assert.equal(res.wasSanitized, true);
  assert.equal(res.domainSlug, 'myshop');
  assert.ok(res.sanitizedNote && res.sanitizedNote.includes('myshop'));
});

test('Step 1: Vietnamese đ/Đ and diacritics are converted properly into slug and hyphenSlug', () => {
  const res = sanitizeBrandInput(
    'Đất Việt Media',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  assert.equal(res.domainSlug, 'datvietmedia');
  assert.equal(res.hyphenSlug, 'dat-viet-media');
  assert.deepEqual(res.words, ['dat', 'viet', 'media']);
});

test('Step 2: Detects Vietnamese accent-loss trap in "Váy Đầm Xinh" -> vaydamxinh', () => {
  const input = sanitizeBrandInput(
    'Váy Đầm Xinh',
    'Shop thời trang thiết kế chuyên váy đầm dự tiệc nữ tính cho phái đẹp'
  );
  const trap = checkConcatenationTraps(input);
  assert.equal(trap.isSafe, false);
  assert.equal(trap.hasConcatenationTrap, true);
  assert.ok(trap.detectedTraps.some((t) => t.substring === 'dam'));
});

test('Step 2: Detects Peter Norvig English concatenation trap in "Choose Spain" -> choosespain', () => {
  const input = sanitizeBrandInput(
    'Choose Spain',
    'Cổng thông tin đặt tour du lịch và trải nghiệm văn hóa Tây Ban Nha'
  );
  const trap = checkConcatenationTraps(input);
  assert.equal(trap.isSafe, false);
  assert.equal(trap.hasConcatenationTrap, true);
  assert.ok(trap.detectedTraps.some((t) => t.substring === 'pain'));
});

test('Step 2 & Indicator 3: Strict NSFW filter catches "PenisBig over", drops relevanceScore < 15, and triggers red unsafe alert', () => {
  const audit = analyzeBrand(
    'PenisBig over',
    'tech',
    'trust_blue',
    'Nền tảng phần mềm quản lý bán hàng AI cho chủ shop nhỏ'
  );
  assert.equal(audit.trapCheck.isSafe, false);
  assert.equal(audit.trapCheck.isSevereNsfw, true);
  assert.ok(
    audit.trapCheck.statusHeadline.includes('Tên có chứa từ nhạy cảm, không nên dùng để mở shop'),
    `Expected red NSFW alert, got: ${audit.trapCheck.statusHeadline}`
  );
  assert.ok(
    audit.scores.relevanceScore < 15,
    `Expected relevanceScore < 15 for NSFW input, got ${audit.scores.relevanceScore}`
  );
  // Ensure suggested domains sanitized out the vulgar word
  assert.ok(
    audit.domains.every((d) => !d.domain.includes('penis')),
    'Suggested domain variants must not contain NSFW substring "penis"'
  );
});

test('Step 3 & 4: Computes 3 scores with penalty reasons, domain diagnostics, and crowns exactly 1 best domain variant', () => {
  const audit = analyzeBrand(
    'Đất Việt Media',
    'tech',
    'trust_blue',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  assert.ok(audit.scores.pronunciationReasons.length >= 1);
  assert.ok(audit.scores.memorabilityReasons.length >= 1);
  assert.ok(audit.scores.relevanceReasons.length >= 1);
  assert.ok(audit.diagnostics.weaknesses.length >= 1);
  assert.ok(audit.diagnostics.actionableFixes.length >= 1);

  const crownedDomains = audit.domains.filter((d) => d.isBestChoice);
  assert.equal(crownedDomains.length, 1);
  assert.equal(crownedDomains[0].status, 'available');
  assert.equal(audit.logos.length, 2);
});

test('Step 4: Generates Portmanteau domain variants (davimedia.vn for Đất Việt Media, freshop.com for FreshBite)', () => {
  const datViet = analyzeBrand('Đất Việt Media', 'tech', 'trust_blue');
  assert.ok(datViet.domains.some((d) => d.domain === 'davimedia.vn'));

  const freshBite = analyzeBrand('FreshBite', 'fnb', 'fresh_green');
  assert.ok(freshBite.domains.some((d) => d.domain === 'freshop.com'));
});

test('Upgrade 1: Semantic Keyword Mapper extracts standard morphemes (media, event, digital) and NEVER truncates "truyền" to "truy"', () => {
  const extracted = extractDescriptionKeywords(
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam',
    INDUSTRIES[0]
  );
  assert.ok(extracted.slugTokens.includes('media'));
  assert.ok(!extracted.slugTokens.includes('truy'), 'Must never slice 4 chars to produce "truy"');

  const vuaIt = analyzeBrand(
    'Vua it',
    'tech',
    'trust_blue',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  assert.ok(
    vuaIt.domains.every((d) => !d.domain.includes('truy.')),
    'No generated domain should contain truncated "truy"'
  );
  assert.ok(
    vuaIt.domains.some((d) => d.domain === 'vuaitmedia.vn' || d.domain === 'vuamedia.vn'),
    'Should generate smooth semantic domain vuaitmedia.vn or vuamedia.vn'
  );
});

test('Upgrade 2: Strict Relevance Score (Trừ 18đ narrow mismatch for "Vua it") and Weighted DomainScore crowns description-enriched domain over raw domain', () => {
  const vuaIt = analyzeBrand(
    'Vua it',
    'tech',
    'trust_blue',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  assert.equal(vuaIt.scores.hasNarrowSemanticMismatch, true);
  assert.ok(
    vuaIt.scores.relevanceScore >= 70 && vuaIt.scores.relevanceScore <= 82,
    `Expected relevanceScore around 72-80 for narrow mismatch "Vua it", got ${vuaIt.scores.relevanceScore}`
  );
  assert.ok(
    vuaIt.scores.relevanceReasons.some((r) => r.deltaText === 'Trừ 18đ'),
    'Should include Trừ 18đ penalty reason explaining narrow IT meaning vs media/events description'
  );

  const rawCom = vuaIt.domains.find((d) => d.domain === 'vuait.com');
  const bestDomain = vuaIt.domains.find((d) => d.isBestChoice);
  assert.ok(rawCom, 'Should include raw vuait.com variant');
  assert.ok(bestDomain, 'Should crown a best domain');
  assert.notEqual(
    bestDomain.domain,
    'vuait.com',
    'Raw vuait.com without description keyword must not win the crown when description is media/events'
  );
  assert.ok(
    bestDomain.domainScore > rawCom.domainScore,
    `Best domain (${bestDomain.domain}: ${bestDomain.domainScore}) must score higher than raw vuait.com (${rawCom.domainScore})`
  );
  assert.ok(
    bestDomain.bestFitExplanation && bestDomain.bestFitExplanation.includes('Ghép thêm chữ'),
    'Crowned domain must include natural bestFitExplanation'
  );
});

test('Upgrade 3: Context-Aware AI Brand Advisor Chatbot generates tailored answers, Live Context System Prompt, and extracts brand suggestions', () => {
  const vuaIt = analyzeBrand(
    'Vua it',
    'tech',
    'trust_blue',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  const whyDomainReply = generateAdvisorChatResponse(
    'Tại sao nên mua tên miền gợi ý thay vì tên gốc?',
    vuaIt
  );
  assert.ok(whyDomainReply.answerMarkdown.includes('Chào bạn'));
  assert.ok(whyDomainReply.answerMarkdown.includes('tên miền'));

  const suggestReply = generateAdvisorChatResponse(
    'Gợi ý giúp mình 3 tên mới hợp với sản phẩm hơn',
    vuaIt
  );
  assert.ok(suggestReply.suggestions && suggestReply.suggestions.length === 3);
  assert.ok(suggestReply.suggestions[0].brandName.length > 2);
  assert.ok(suggestReply.suggestions[0].recommendedDomain.endsWith('.vn'));

  const systemPrompt = buildChatbotSystemPrompt(vuaIt);
  assert.ok(systemPrompt.includes('Vua it'));
  assert.ok(systemPrompt.includes('Độ dễ đọc'));
  assert.ok(systemPrompt.includes('Danh sách 5 tên miền gợi ý'));

  const extracted = extractBrandSuggestionsFromAiText(
    'Mình gợi ý bạn dùng thử tên **Vua Media** hoặc **Vua Event** để sát mảng truyền thông hơn.',
    vuaIt
  );
  assert.ok(extracted.length >= 2);
  assert.equal(extracted[0].brandName, 'Vua Media');
});

test('Step 5 & 6: Generates 1 Tagline + 3 Slogans + 2 Bespoke Logos (zero image.pollinations.ai URLs) and formats humanized Brand Kit clipboard text', () => {
  const audit = analyzeBrand('Đất Việt Media', 'tech', 'trust_blue');
  assert.ok(audit.marketing.tagline.length > 5);
  assert.equal(audit.marketing.slogans.length, 3);
  assert.equal(audit.logos.length, 2);

  const report = formatBrandKitReport(audit, 'https://datviet.vn');
  assert.ok(report.includes('BẢNG ĐÁNH GIÁ TÊN THƯƠNG HIỆU & TÊN MIỀN'));
  assert.ok(report.includes('KẾT QUẢ DEMO'));
  assert.ok(report.includes('Đáng mua nhất (Điểm cao nhất:'));
  assert.ok(report.includes('GỢI Ý 02 MẪU LOGO MINH HỌA'));
  assert.equal(
    JSON.stringify(audit).includes('image.pollinations.ai'),
    false,
    'Must not contain any image.pollinations.ai URLs'
  );
  assert.equal(
    report.includes('image.pollinations.ai'),
    false,
    'Clipboard report must not contain any image.pollinations.ai URLs'
  );
});

test('Humanize Rules: Zero em-dashes (—) and zero banned AI buzzwords in generated output', () => {
  const audit = analyzeBrand(
    'Vua it',
    'tech',
    'trust_blue',
    'Công ty truyền thông, tổ chức sự kiện và giải pháp thương hiệu số hàng đầu tại Việt Nam'
  );
  const report = formatBrandKitReport(audit, 'https://datviet.vn');
  const chat1 = generateAdvisorChatResponse('Tại sao nên mua tên miền gợi ý thay vì tên gốc?', audit);
  const chat2 = generateAdvisorChatResponse('Gợi ý giúp mình 3 tên mới hợp với sản phẩm hơn', audit);

  const fullText = [
    JSON.stringify(audit),
    report,
    chat1.answerMarkdown,
    chat2.answerMarkdown,
  ].join('\n');

  assert.equal(fullText.includes('—'), false, 'Output must never contain em-dash (—)');

  const bannedBuzzwords = [
    'kiến tạo',
    'vươn tầm',
    'định hình tương lai',
    'bứt phá giới hạn',
    'tiên phong',
    'giải pháp toàn diện',
    'nâng tầm trải nghiệm',
    'chìa khóa thành công',
    'trong thế giới số ngày nay',
    'tối ưu hóa chuyển đổi',
  ];
  for (const word of bannedBuzzwords) {
    assert.equal(
      fullText.toLowerCase().includes(word),
      false,
      `Output must not contain banned AI cliché "${word}"`
    );
  }
});

test('Upgrade v2.1 & v2.2: 12 Subject-Specific Logo Motifs (including Automotive auto_car), 4 Domain Registrars, Deep-Dive Analysis, and 5-Part Executive Proposal', () => {
  // 1. Automotive / Car -> auto_car motif (Sports Car & Alloy Wheel)
  const autoAudit = analyzeBrand(
    'Việt Speed Auto',
    'Ô tô & Độ xe thể thao',
    undefined,
    'Chuyên độ xe hơi, mâm đúc thể thao, lốp ô tô tốc độ cao và bảo dưỡng gara'
  );
  assert.equal(autoAudit.logos[0].artDirection.motifCategory, 'auto_car');
  assert.equal(autoAudit.logos[0].artDirection.layoutType, 'iconic_monogram');
  assert.equal(autoAudit.logos[1].artDirection.layoutType, 'crest_emblem');
  assert.ok(autoAudit.input.extractedKeywords.slugTokens.includes('auto'));

  // 2. Free-text Nha khoa thẩm mỹ -> dental_medical morphemes + medical_tooth logo motif
  const dentalAudit = analyzeBrand(
    'Aura Smile',
    'Nha khoa thẩm mỹ',
    undefined,
    'Phòng khám chuyên bọc răng sứ thẩm mỹ và niềng răng trong suốt'
  );
  assert.equal(dentalAudit.industry.label, 'Nha khoa thẩm mỹ');
  assert.ok(dentalAudit.input.extractedKeywords.slugTokens.includes('dental'));
  assert.equal(dentalAudit.logos[0].artDirection.motifCategory, 'medical_tooth');

  // 3. Free-text Quán cà phê -> fnb + fresh_green emotion + coffee_cup logo motif
  const cafeAudit = analyzeBrand(
    'Mộc Brew',
    'Quán cà phê & Trà',
    undefined,
    'Quán cà phê rang xay nguyên chất và trà trái cây tươi mát'
  );
  assert.equal(cafeAudit.industry.id, 'fnb');
  assert.equal(cafeAudit.emotion.id, 'fresh_green');
  assert.equal(cafeAudit.logos[0].artDirection.motifCategory, 'coffee_cup');

  // 4. Free-text Phụ kiện thú cưng -> pet_care morphemes + pet_paw logo motif
  const petAudit = analyzeBrand(
    'Happy Paw',
    'Phụ kiện thú cưng',
    undefined,
    'Cửa hàng thức ăn và phụ kiện chó mèo đáng yêu'
  );
  assert.ok(petAudit.input.extractedKeywords.slugTokens.includes('pet'));
  assert.equal(petAudit.logos[0].artDirection.motifCategory, 'pet_paw');

  // 5. Real Estate -> realestate_building motif
  const bdsAudit = analyzeBrand(
    'An Phú Home',
    'Bất động sản & Nội thất',
    undefined,
    'Phân phối căn hộ chung cư, biệt thự và thiết kế nội thất cao cấp'
  );
  assert.equal(bdsAudit.logos[0].artDirection.motifCategory, 'realestate_building');

  // 6. Domain Deep-Dive & 4 Reputable Registrars Comparison
  const deepDive = getDomainDeepDiveAnalysis(autoAudit.bestDomain, autoAudit);
  assert.equal(deepDive.domain, autoAudit.bestDomain.domain);
  assert.equal(deepDive.executivePitchPoints.length, 3);

  const registrars = getDomainRegistrarsForVariant(
    autoAudit.bestDomain,
    'https://datviet.vn/dang-ky-ten-mien',
    autoAudit.input.cleanBrandName
  );
  assert.equal(registrars.length, 4);
  assert.equal(registrars[0].id, 'sponsor_official');
  assert.equal(registrars[0].badge, 'Khuyên dùng & Nhiều ưu đãi nhất');
  assert.equal(registrars[1].id, 'inet_tenten');
  assert.equal(registrars[2].id, 'matbao_nhanhoa');
  assert.equal(registrars[3].id, 'cloudflare_namecheap');

  // 7. 5-Section Executive Proposal Document
  const proposalText = formatExecutiveProposalText(
    autoAudit,
    autoAudit.bestDomain,
    registrars[0]
  );
  assert.ok(proposalText.includes('TỜ TRÌNH ĐỀ XUẤT PHƯƠNG ÁN THƯƠNG HIỆU & ĐĂNG KÝ TÊN MIỀN'));
  assert.ok(proposalText.includes('I. TÓM TẮT ĐỀ XUẤT'));
  assert.ok(proposalText.includes('II. CƠ SỞ ĐÁNH GIÁ'));
  assert.ok(proposalText.includes('III. LÝ DO CHỌN TÊN MIỀN'));
  assert.ok(proposalText.includes('IV. PHƯƠNG ÁN MUA & DỰ TOÁN NGÂN SÁCH'));
  assert.ok(proposalText.includes('V. BỘ NHẬN DIỆN KHỞI ĐẦU ĐI KÈM'));
  assert.equal(proposalText.includes('—'), false, 'Proposal must not contain em-dash');
});



