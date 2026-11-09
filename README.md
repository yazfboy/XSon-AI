# XSon AI - He thong Tham dinh Thuong hieu, Kiem tra Ten mien & Khoi tao Ngon ngu Tiep thi

> **Cuoc thi:** VIBE-CODING 2026 - FPT Polytechnic  
> **De bai:** De so 10 - Kiem tra & Goi y Ten thuong hieu + Ten mien  
> **Doi thi:** Nhom XSon  

---

## 1. Giới thiệu bài toán & Giá trị thực tiễn
Khi khởi nghiệp online hoặc ra mắt nhãn hàng mới, nhân sự phụ trách Thương hiệu/Marketing thường gặp khó khăn trong việc đánh giá khách quan xem tên thương hiệu đã dễ đọc, dễ nhớ hay chưa, có bị hiểu lầm khi viết liền thành tên miền không dấu hay không, và nên mua tên miền ở đâu tối ưu chi phí nhất để trình Ban Giám đốc phê duyệt.

**XSon AI** giải quyết trọn vẹn quy trình đó trong một Mini App duy nhất: từ thẩm định ngôn ngữ học, phát hiện rủi ro ghép chữ tên miền, gợi ý 05 biến thể tên miền kèm so sánh nhà đăng ký, khởi tạo Tagline/Slogan & 02 mẫu Logo đặc trưng ngành hàng, cho đến xuất Tờ trình Đề xuất hoàn chỉnh gửi Giám đốc.

---

## 2. Năm (05) tính năng cốt lõi theo Đề số 10 & Điểm mở rộng
1. **Nhập thông tin thương hiệu linh hoạt (Yêu cầu 1):**
   - Nhập tên thương hiệu mong muốn, tự nhập lĩnh vực kinh doanh và mô tả ngắn gọn về sản phẩm/khách hàng mục tiêu.
   - Tích hợp 05 kịch bản mẫu (Quick Test) để kiểm thử nhanh các tình huống thực tế và trường hợp biên.
2. **AI đánh giá đa chiều & Gợi ý 05 biến thể tên miền (Yêu cầu 2):**
   - Chấm điểm trên thang 0-100 cho 3 chỉ số: **Độ dễ đọc** (kèm tính năng phát âm giọng nói *Radio Test*), **Độ dễ nhớ**, và **Độ khớp với sản phẩm**.
   - Giải trình minh bạch từng điểm cộng và **lý do bị trừ điểm** nếu chưa đạt 100/100; chẩn đoán điểm thiếu sót của tên miền gốc và cách khắc phục.
   - Gợi ý **05 biến thể tên miền** (`.vn`, `.com`, `.shop` và các biến thể ghép từ khóa sản phẩm chuẩn), tự động chấm điểm xếp hạng và chọn ra tên miền **Đáng mua nhất (Điểm cao nhất)**.
3. **Kiểm tra tình trạng tên miền ở chế độ Demo & So sánh nơi mua (Yêu cầu 3):**
   - Kiểm tra trạng thái *Còn trống / Đã đăng ký* theo quy tắc tất định (deterministic rule), ghi rõ nhãn **"kết quả demo"** trên giao diện.
   - Khi click chọn một tên miền, hệ thống mở bảng chi tiết và so sánh giá/ưu đãi của các nhà đăng ký uy tín (Nhà tài trợ chính thức, iNET/Tenten, Mắt Bão, Cloudflare).
4. **AI gợi ý 03 Slogan, 01 Tagline, 02 Mẫu Logo & Mô phỏng Google SEO (Yêu cầu 4):**
   - Tách biệt rõ **01 câu Tagline** (định vị cốt lõi dài hạn) và **03 câu Slogan** chiến dịch (theo 3 hướng: Vần điệu, Cảm xúc, Thúc đẩy mua hàng).
   - **AI Đạo diễn & Thiết kế 02 mẫu Logo:** Tự động phân tích sản phẩm trong phần mô tả để vẽ biểu tượng đặc trưng ngành hàng (hỗ trợ cả chế độ Vector chuẩn in ấn và 3D Mockup Render).
   - Mô phỏng trực tiếp giao diện thanh địa chỉ trình duyệt và kết quả tìm kiếm Google (SERP Preview).
5. **Copy toàn bộ thông tin, Xuất Tờ trình Giám đốc & Nút CTA "Đăng ký tên miền" (Yêu cầu 5):**
   - Nút **Copy toàn bộ thông tin** sao chép trọn bộ hồ sơ thương hiệu vào Clipboard; hỗ trợ xem và in/xuất PDF **Tờ trình Đề xuất gửi Ban Giám đốc**.
   - Nút kêu gọi hành động **"Đăng ký tên miền"** dẫn trực tiếp về trang web Nhà tài trợ.
   - Tích hợp **Chatbot Cố vấn AI** hỗ trợ giải đáp chuyên sâu theo ngữ cảnh thực tế đang hiển thị trên màn hình.

---

## 3. Công nghệ sử dụng
- **Frontend & UI/UX:** React 19, TypeScript, Vite, TailwindCSS, GSAP & ScrollTrigger (hiệu ứng xuất hiện theo cuộn trang), Lenis Smooth Scroll, Lucide Icons.
- **Đồ họa & Âm thanh:** HTML5 High-DPI Canvas & Dynamic SVG Engine (dựng Logo Vector và 3D Mockup), Web Speech API (`window.speechSynthesis` cho tính năng nghe đọc thử Việt/Anh).
- **AI & Xử lý ngôn ngữ tự nhiên (NLP):** Kết hợp LLM API thời gian thực và bộ xử lý thuật toán ngôn ngữ học tại trình duyệt.

---

## 4. Phân định rõ phần dùng AI thật, phần Thuật toán & phần Mock
1. **Phần dùng AI thật (Real LLM Integration):**
   - **Chatbot Cố vấn Thương hiệu:** Gọi trực tiếp API mô hình ngôn ngữ lớn (qua endpoint LLM `https://text.pollinations.ai/openai` hoặc Google Gemini API khi cấu hình API Key) kèm toàn bộ ngữ cảnh điểm số trên màn hình để trả lời câu hỏi tự do của người dùng.
   - **AI Biên đạo Ngôn ngữ & Ý tưởng Logo:** Phân tích văn bản mô tả sản phẩm tự do của người dùng để trích xuất ngữ nghĩa, lên ý tưởng biểu tượng/bảng màu Logo và tinh chỉnh Tagline/Slogan.
2. **Phần Thuật toán Ngôn ngữ học (Deterministic NLP Engine chạy tại client):**
   - Tính toán định lượng Điểm Dễ đọc, Điểm Dễ nhớ, Điểm Khớp sản phẩm, kiểm tra an toàn bỏ dấu tiếng Việt / tách từ nhạy cảm và thuật toán ghép từ tên miền để đảm bảo tốc độ phản hồi tức thì (< 50ms) và hoạt động ổn định ngay cả khi mất kết nối mạng.
3. **Phần Mock (Mô phỏng theo yêu cầu số 3 của đề bài):**
   - **Kiểm tra tình trạng tên miền (Còn trống / Đã đăng ký):** Mô phỏng theo quy tắc tất định (Tên miền trùng thương hiệu lớn như `shopee, fpt, google...` hoặc tên gốc `<= 4` ký tự đuôi `.com/.vn` được mô phỏng là *Đã đăng ký*; các biến thể khác tính qua hàm băm mã ASCII của chuỗi ký tự để kết quả luôn nhất quán mỗi lần tra cứu). Đã gắn nhãn rõ ràng **"kết quả demo"** trên giao diện.
   - **Bảng giá nhà đăng ký tên miền:** Dữ liệu giá tham khảo phục vụ mục đích demo so sánh và lập dự toán.

---

## 5. Hướng dẫn cài đặt & Cách chạy
### Cách 1: Truy cập bản chạy trực tuyến (Online Demo)
- Mở trực tiếp đường dẫn: (https://yazfboy.github.io/XSon-AI/)

### Cách 2: Chạy trực tiếp từ Source ZIP tại máy (Local)
Yêu cầu máy tính đã cài đặt **Node.js** (phiên bản 18+):
```bash
# Bước 1: Giải nén file ZIP và mở terminal tại thư mục dự án
npm install

# Bước 2: Khởi chạy ứng dụng ở chế độ phát triển
npm run dev