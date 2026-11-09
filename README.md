# XSon AI - Hệ thống Thẩm định Thương hiệu, Kiểm tra Tên miền & Khởi tạo Ngôn ngữ Tiếp thị

> **Cuộc thi:** VIBE-CODING 2026 - FPT Polytechnic  
> **Bảng thi:** Bảng A - Công nghệ  
> **Đề bài:** Đề số 10 - Kiểm tra & Gợi ý Tên thương hiệu + Tên miền  
> **Đội thi:** Nhóm XSon  
> **Link Demo Online:** https://yazfboy.github.io/XSon-AI/  
> **Link GitHub Repo:** https://github.com/yazfboy/XSon-AI  

---

## 1. Giới thiệu bài toán & Giá trị thực tiễn
Khi khởi nghiệp online hoặc ra mắt nhãn hàng mới, người làm thương hiệu cần đánh giá xem tên dự kiến đã dễ đọc, dễ nhớ hay chưa, có khớp với mô tả sản phẩm không, có vô tình tạo ra từ nhạy cảm khi viết liền thành tên miền không dấu hay không, và nên mua tên miền ở đâu tối ưu chi phí nhất để trình Ban Giám đốc phê duyệt.

**XSon AI** giải quyết trọn vẹn bài toán đó với kiến trúc kết hợp giữa **Mô hình ngôn ngữ lớn (Real LLM API)** và **Thuật toán Ngôn ngữ học định lượng (Deterministic NLP Engine)**.

---

## 2. Hoàn thành 05 yêu cầu chức năng của Đề số 10 & Mở rộng
1. **Nhập thông tin thương hiệu (Yêu cầu 1):**
   - Nhập tên thương hiệu mong muốn, tự nhập lĩnh vực kinh doanh và mô tả chi tiết về sản phẩm/khách hàng mục tiêu.
   - Tích hợp 05 kịch bản mẫu (Quick Test) để giám khảo kiểm thử nhanh các ca bình thường và ca biên.
2. **AI đánh giá đa chiều & Gợi ý 05 biến thể tên miền (Yêu cầu 2):**
   - Chấm điểm (0-100) cho 3 tiêu chí: **Độ dễ đọc** (kèm nút nghe phát âm *Radio Test* Việt/Anh), **Độ dễ nhớ**, và **Độ khớp với sản phẩm**.
   - Giải trình rõ từng điểm cộng và **lý do bị trừ điểm**; nhận xét điểm cần lưu ý của tên miền gốc và cách khắc phục.
   - Gợi ý **05 biến thể tên miền** (`.vn`, `.com`, `.shop` và biến thể ghép từ khóa sản phẩm), chấm điểm xếp hạng và đánh dấu tên miền **Đáng mua nhất (Điểm cao nhất)**.
3. **Kiểm tra tình trạng tên miền ở chế độ Demo & So sánh nơi mua (Yêu cầu 3):**
   - Kiểm tra trạng thái *Còn trống / Đã có người mua* theo quy tắc tất định, ghi rõ nhãn **"kết quả demo"** trên giao diện.
   - Khi click chọn một tên miền, hệ thống mở bảng phân tích sâu và so sánh giá/ưu đãi của 4 nhà đăng ký uy tín (Nhà tài trợ Đất Việt, iNET, Mắt Bão, Namecheap).
4. **AI gợi ý 03 Slogan, 01 Tagline, 02 Mẫu Logo & Mô phỏng Google SEO (Yêu cầu 4):**
   - Tách biệt rõ **01 câu Tagline** (định vị cốt lõi dài hạn) và **03 câu Slogan** chiến dịch (theo 3 hướng: Vần điệu, Cảm xúc, Thúc đẩy mua hàng).
   - **AI Đạo diễn & Thiết kế 02 mẫu Logo:** Tự động phân tích sản phẩm trong phần mô tả để vẽ biểu tượng đặc trưng ngành hàng (hỗ trợ cả Vector SVG chuẩn in ấn và 3D Studio Mockup Render).
   - Mô phỏng trực tiếp thanh địa chỉ trình duyệt và kết quả tìm kiếm Google (SERP Preview).
5. **Copy toàn bộ thông tin, Xuất Tờ trình Giám đốc & Nút CTA "Đăng ký tên miền" (Yêu cầu 5):**
   - Nút **Copy toàn bộ thông tin** sao chép trọn bộ hồ sơ đánh giá vào Clipboard; hỗ trợ xuất và in PDF **Tờ trình Đề xuất gửi Ban Giám đốc**.
   - Nút kêu gọi hành động **"Đăng ký tên miền"** và các nút **"Mua ngay"** dẫn trực tiếp về trang web Nhà tài trợ (`https://datvietent.vn/`).

---

## 3. Công nghệ sử dụng
- **Frontend & UI/UX:** React 19, TypeScript, Vite, TailwindCSS, GSAP & ScrollTrigger, Lenis Smooth Scroll, Lucide Icons, Recharts.
- **Backend / API Layer:** Node.js, Express (`server.ts`), `@google/genai` SDK.
- **Đồ họa & Âm thanh:** HTML5 High-DPI Canvas & Dynamic SVG Engine, Web Speech API (`window.speechSynthesis`).

---

## 4. Tích hợp AI thật, Kiểm soát đầu ra (Tiêu chí A3 Bảng A) & Phân định phần Mock
### 4.1. Phần tích hợp AI thật (Real AI Integration)
1. **Cơ chế gọi AI Đa tầng có Xoay vòng khóa (Multi-Key Auto-Rotation & Failover):**
   - **Tầng 1 (Google Gemini API - `gemini-2.5-flash` / `gemini-2.0-flash`):** Hỗ trợ nạp danh sách nhiều API Key và tự động xoay vòng (failover) sang Key tiếp theo nếu một Key hết hạn mức (quota 429).
   - **Tầng 2 (OpenAI-compatible LLM qua Pollinations API):** Đảm bảo tính năng Chatbot Cố vấn AI và sinh nội dung sáng tạo vẫn hoạt động bằng LLM thật ngay cả trên môi trường tĩnh (GitHub Pages) hoặc khi chưa cấu hình khóa riêng.
2. **Kiểm soát đầu ra của AI (Output Control & Guardrails):**
   - **Ép kiểu cấu trúc (Structured JSON Schema):** Mọi phản hồi sinh Tagline, Slogan và kịch bản đạo diễn Logo từ Gemini đều bị ràng buộc chặt qua `responseSchema` (`Type.OBJECT`), đảm bảo không sinh văn bản tự do làm vỡ giao diện.
   - **Truyền ngữ cảnh thực tế (Live Context Grounding):** Chatbot Cố vấn AI nhận trực tiếp toàn bộ thông số đang chấm điểm trên màn hình vào `systemInstruction`, giúp câu trả lời bám sát dữ liệu thực tế thay vì trả lời chung chung.
   - **Hậu kiểm ngôn ngữ & Chặn từ nhạy cảm (Sanitization & Safety Guardrail):** Kiểm tra đầu vào/đầu ra qua bộ lọc từ nhạy cảm (`STRICT_BANNED_LIST`), kiểm tra bẫy bỏ dấu tiếng Việt và làm sạch ký tự định dạng thừa (`sanitizeHumanText`).

### 4.2. Phần Mock (Mô phỏng theo đúng yêu cầu số 3 của đề bài)
- **Tình trạng tên miền (Còn trống / Đã có người mua):** Thực hiện đúng yêu cầu đề bài *"Kiểm tra tình trạng tên miền ở chế độ demo (mock theo quy tắc đơn giản, ghi rõ kết quả demo)"*. Quy tắc: Tên trùng thương hiệu lớn (`shopee, fpt, google...`) hoặc tên gốc `<= 4` ký tự đuôi `.com/.vn` được mô phỏng là *Đã có người mua*; các biến thể khác tính qua hàm băm mã ASCII cố định để kết quả luôn nhất quán.

---

## 5. Hướng dẫn cài đặt & Cách chạy
### Cách 1: Truy cập bản triển khai Online
- Link trực tiếp: **https://yazfboy.github.io/XSon-AI/**

### Cách 2: Chạy từ Source ZIP tại máy (Local)
Yêu cầu cài đặt **Node.js 18+**:
```bash
# 1. Cài đặt thư viện (đã cấu hình sẵn .npmrc hỗ trợ legacy-peer-deps)
npm install --legacy-peer-deps

# 2. Chạy ứng dụng (Khởi động đồng thời Express AI Server + Vite Frontend)
npm run dev