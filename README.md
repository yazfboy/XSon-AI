# XSon AI - Cuộc thi Vibe Coding 2026

## 1. Thông tin chung

| Hạng mục | Nội dung |
|---|---|
| Tên đội thi | Nhóm XSon |
| Bảng thi | Bảng A - Công nghệ |
| Đề bài bốc thăm | Đề số 10 - Kiểm tra & Gợi ý Tên thương hiệu + Tên miền |
| Demo online | https://yazfboy.github.io/XSon-AI/ |
| Video demo (<= 02 phút) | https://youtu.be/I3Il41fmXKU?si=yifbEDxEmPe02sku |
| Source ZIP | https://github.com/yazfboy/XSon-AI/archive/refs/heads/main.zip |
| Minh chứng dùng AI | Kèm trực tiếp tại Mục 10 trong README này |
| Bảng kiểm thử | Kèm trực tiếp tại Mục 11 trong README này |

## 2. Tính năng chính

- **Tính năng 1 - Nhập thông tin thương hiệu linh hoạt:** Cho phép nhập tên thương hiệu mong muốn, tự nhập lĩnh vực kinh doanh và mô tả chi tiết về sản phẩm, khách hàng mục tiêu cùng điểm khác biệt. Tự động làm sạch chuỗi nếu người dùng nhập nhầm đường dẫn URL vào ô tên thương hiệu và tích hợp 05 kịch bản mẫu để kiểm thử nhanh.
- **Tính năng 2 - AI đánh giá đa chiều và gợi ý 05 biến thể tên miền:** Chấm điểm định lượng trên thang 100 cho Độ dễ đọc, Độ dễ nhớ và Độ khớp với sản phẩm dựa trên các nghiên cứu ngôn ngữ học của Laham 2012, BRAINSUP 2013, Deri & Knight 2015 và Peter Norvig 2009. Liệt kê rõ lý do cộng điểm hoặc trừ điểm, hỗ trợ nghe phát âm thử bằng giọng nói Việt/Anh, chẩn đoán điểm thiếu sót của tên miền gốc và gợi ý 05 biến thể tên miền đa dạng đuôi .vn, .com, .shop kèm xếp hạng tên miền Đáng mua nhất.
- **Tính năng 3 - Kiểm tra tình trạng tên miền ở chế độ demo và so sánh nơi mua:** Kiểm tra trạng thái Còn trống hoặc Đã có người mua theo quy tắc băm mã ASCII cố định và danh sách thương hiệu lớn, hiển thị rõ nhãn kết quả demo trên giao diện. Khi chọn một tên miền bất kỳ, hệ thống mở bảng phân tích chuyên sâu và so sánh chi phí năm đầu, phí gia hạn cùng ưu đãi tại 04 nhà đăng ký uy tín gồm Nhà tài trợ Đất Việt, iNET, Mắt Bão và Namecheap.
- **Tính năng 4 - AI gợi ý 03 slogan, 01 câu tagline, 02 mẫu logo và mô phỏng Google SEO:** Tách biệt rõ 01 câu Tagline định vị cốt lõi và 03 câu Slogan theo ba hướng gồm câu có vần điệu dễ nhớ, câu tạo thiện cảm và câu thúc đẩy đặt hàng. AI đóng vai trò đạo diễn hình ảnh phân tích mô tả sản phẩm để vẽ 02 mẫu Logo mang biểu tượng đặc trưng ngành hàng ở cả định dạng Vector SVG chuẩn in ấn và 3D Mockup Render, đi kèm khung mô phỏng thanh địa chỉ trình duyệt, kết quả tìm kiếm Google và biểu đồ xu hướng từ khóa.
- **Tính năng 5 - Nút copy toàn bộ thông tin, xuất tờ trình Giám đốc, Chatbot cố vấn và nút Đăng ký tên miền:** Nút Copy toàn bộ thông tin sao chép trọn bộ hồ sơ đánh giá vào bộ nhớ tạm. Hỗ trợ xuất và in PDF Tờ trình đề xuất phương án thương hiệu và dự toán tên miền để nhân sự phụ trách trình Ban Giám đốc duyệt. Tích hợp Chatbot cố vấn AI theo ngữ cảnh ở góc màn hình và nút kêu gọi hành động Đăng ký tên miền dẫn trực tiếp về trang Nhà tài trợ tại https://datvietent.vn/.

## 3. Công nghệ sử dụng

| Lớp | Công nghệ |
|---|---|
| Giao diện | React 19 + TypeScript + Vite 8 + Tailwind CSS v4 |
| Thư viện | @google/genai 2.32, GSAP 3.13, Lenis 1.3, Three.js 0.176, Recharts 2.15, Lucide React 1.16, Express 4.21 |
| Lưu trữ | State quản lý trực tiếp trên trình duyệt kết hợp Web Speech API và HTML5 Canvas/SVG |
| Triển khai | GitHub Pages tại https://yazfboy.github.io/XSon-AI/ |

## 4. Tích hợp AI

- **Chế độ đang dùng**: API thật kết hợp thuật toán xử lý ngôn ngữ tự nhiên tại trình duyệt và Mock tình trạng tên miền theo yêu cầu đề bài.
  - API thật: Google Gemini `gemini-2.5-flash` và `gemini-2.0-flash` có cơ chế tự động xoay vòng qua danh sách 03 khóa API khi hết hạn mức, kết hợp tầng dự phòng qua cổng ngôn ngữ lớn tương thích chuẩn OpenAI tại `https://text.pollinations.ai/openai`.
  - Mock: Phần kiểm tra tình trạng tên miền còn trống hay đã có người mua hiển thị rõ dòng *"Lưu ý: Tình trạng tên miền dưới đây là kết quả demo (mô phỏng theo quy tắc đơn giản của hệ thống)"* theo đúng yêu cầu số 3 của Đề 10.
- **Mục đích**: Phân tích ngữ nghĩa mô tả sản phẩm của người dùng, kiểm soát đầu ra bằng JSON Schema để khởi tạo Tagline, Slogan, kịch bản thiết kế Logo và trả lời câu hỏi tư vấn chuyên sâu theo đúng dữ liệu đang hiển thị trên màn hình.
- **Bảo mật khoá API**: Không ghi khoá thật trong mã nguồn nộp. Đặt khoá trong biến môi trường `.env` đã được chặn bởi `.gitignore` và cung cấp tệp cấu hình mẫu `.env.example`.

Biến môi trường trong tệp `.env`:

```env
GEMINI_API_KEY="KHOA_API_1,KHOA_API_2,KHOA_API_3"
APP_URL="http://localhost:3000"
5. Cài đặt và chạy local
Yêu cầu: Trình duyệt hiện đại; Node.js >= 18.
Cách chạy dự án React + TypeScript (Vite)
Bash
npm install --legacy-peer-deps
npm run dev      # chạy ứng dụng tại http://localhost:3000
npm run build    # đóng gói bản production ra thư mục dist/
6. Cấu trúc thư mục
Text
XSon-AI/
├── index.html
├── src/
│   ├── components/
│   │   ├── BrandAdvisorChatbot.tsx
│   │   ├── BrandLogoStudioSection.tsx
│   │   ├── DemoConfigModal.tsx
│   │   ├── DomainVariantsCard.tsx
│   │   ├── ExecutiveProposalSection.tsx
│   │   ├── HeroWarpCanvas.tsx
│   │   ├── IsometricExplodedView.tsx
│   │   ├── MarketingAndPreviewSection.tsx
│   │   ├── MarketTrendBentoSection.tsx
│   │   ├── PhoneticValuationCard.tsx
│   │   └── ScientificModal.tsx
│   ├── utils/
│   │   └── brandEngine.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── server.ts
├── vite.config.ts
├── package.json
├── .npmrc
├── .env.example
└── README.md
7. Truy cập và phân quyền
Không yêu cầu đăng nhập; người dùng truy cập trực tiếp vào giao diện thẩm định thương hiệu và kiểm tra tên miền.
Nút Cấu hình Demo trên thanh điều hướng cho phép thay đổi nhanh đường dẫn trang Nhà tài trợ và bật tắt chế độ gọi Cloud AI.
Nút Về phương pháp chấm điểm mở cửa sổ tra cứu công thức toán học và cơ sở nghiên cứu của 04 bài báo khoa học.
8. Giới hạn hiện tại
Tình trạng tên miền còn trống hay đã đăng ký đang vận hành ở chế độ mô phỏng theo đúng yêu cầu số 3 của đề bài, chưa đấu nối trực tiếp vào cổng tra cứu WHOIS thời gian thực của VNNIC.
Kiểm tra trùng lặp thương hiệu hiện tại mới đối chiếu trên danh sách các nhãn hiệu lớn phổ biến tại Việt Nam và quốc tế, chưa kết nối trực tiếp cơ sở dữ liệu của Cục Sở hữu trí tuệ.
9. Nguồn tham khảo
Laham, S. M., Koval, P., & Alter, A. L. 2012. The name-pronunciation effect: Why people like Mr. Smith more than Mr. Colquhoun. Journal of Experimental Social Psychology, 48, 752-756.
Özbal, G., Pighin, D., & Strapparava, C. 2013. BRAINSUP: Brainstorming Support for Creative Sentence Generation. Proceedings of ACL 2013, 1446-1455.
Deri, A., & Knight, K. 2015. How to Make a Frenemy: Multitape FSTs for Portmanteau Generation. Proceedings of NAACL-HLT 2015, 206-210.
Norvig, P. 2009. Natural Language Corpus Data. Chapter 14 in Beautiful Data, O'Reilly Media, 219-242.
Google Fonts, Lucide Icons, Tailwind CSS, GSAP, Three.js, Recharts.
10. Minh chứng dùng AI để xây dựng sản phẩm
Nhóm thực hiện quy trình phát triển có kiểm chứng, liên tục thử nghiệm thực tế để phát hiện vấn đề kỹ thuật và điều hướng AI sửa lỗi qua 05 vòng cải thiện:
Vòng 1 - Chuyển hóa 04 bài báo nghiên cứu thành khung chấm điểm:
Mục tiêu & Yêu cầu cho AI: Xây dựng hàm tính điểm độ dễ đọc, độ dễ nhớ và gợi ý 05 tên miền dựa trên 04 tài liệu khoa học về xử lý ngôn ngữ tự nhiên.
Vấn đề phát hiện khi thử: Bản đầu tiên chỉ có lựa chọn ngành hàng cố định, chưa biết sản phẩm cụ thể bán gì và không giải thích được vì sao tên thương hiệu bị trừ điểm.
Yêu cầu sửa & Kết quả: Bổ sung ô tự nhập Lĩnh vực kinh doanh, ô Miêu tả chi tiết sản phẩm, thêm cột điểm thứ 3 là Độ khớp với sản phẩm và liệt kê rõ từng lý do cộng trừ điểm dưới mỗi tiêu chí.
Vòng 2 - Phát hiện và chặn lỗ hổng từ nhạy cảm 18+ khi kiểm thử:
Vấn đề phát hiện khi thử: Khi nhập thử từ tục tĩu tiếng Anh PenisBig over ở phiên bản đầu, hệ thống vẫn chấm 95/100 điểm và báo an toàn ngữ nghĩa.
Yêu cầu sửa & Kết quả: Tích hợp bộ lọc từ cấm nghiêm ngặt STRICT_BANNED_LIST và danh sách bẫy mất dấu tiếng Việt VI_TRAPS. Khi thử lại với PenisBig over, hệ thống lập tức hạ điểm Độ khớp sản phẩm xuống 9/100, bật cảnh báo đỏ và loại bỏ từ nhạy cảm khỏi các tên miền gợi ý.
Vòng 3 - Sửa lỗi cắt chữ tiếng Việt vô nghĩa và lỗi phân loại nhầm ngành:
Vấn đề phát hiện khi thử: Khi nhập tên Vua it với mô tả Công ty truyền thông, tổ chức sự kiện, AI cắt máy móc 4 chữ cái đầu của từ truyền thành truy tạo ra tên miền vô nghĩa vuaittruy.vn. Ngoài ra khi nhập Massage VN ở lĩnh vực Dịch vụ, hệ thống gán nhầm chữ dịch vụ vào mảng giáo dục và gợi ý massageedu.vn.
Yêu cầu sửa & Kết quả: Xóa bỏ hàm cắt chuỗi máy móc, xây dựng bộ từ điển ánh xạ ngữ nghĩa SEMANTIC_KEYWORD_MAPPER để chuyển thành hậu tố chuẩn như vuaitmedia.vn, vuadigital.vn, đồng thời tách từ khóa dịch vụ khỏi nhóm giáo dục và bổ sung nhóm ngành Massage, Spa & Chăm sóc thư giãn.
Vòng 4 - Xử lý lỗi giới hạn API ảnh ngoài và khử văn mẫu AI:
Vấn đề phát hiện khi thử: Việc gọi ảnh từ image.pollinations.ai bị giới hạn 45 giây mỗi ảnh khiến khung Logo hiện thông báo lỗi Free limit reached, đồng thời văn bản trên giao diện lạm dụng dấu gạch ngang dài —.
Yêu cầu sửa & Kết quả: Loại bỏ hoàn toàn việc gọi ảnh tĩnh bên ngoài, xây dựng bộ AI đạo diễn kết hợp 28 biểu tượng Vector SVG và 3D Canvas theo đúng sản phẩm trong mô tả như bánh xe ô tô, tách cà phê, đóa sen spa, ống kính máy quay. Chuyển toàn bộ giao diện sang gam màu sáng và loại bỏ dấu gạch ngang dài cùng từ ngữ sáo rỗng.
Vòng 5 - Bổ sung cơ chế xoay vòng 03 khóa API, bảng so sánh nơi mua thật và Tờ trình Giám đốc:
Mục tiêu & Yêu cầu sửa: Để phục vụ nhân sự làm thương hiệu trình sếp duyệt và đảm bảo AI luôn hoạt động khi đem chấm thi, nhóm bổ sung thuật toán tự động xoay vòng 03 khóa Gemini API kết hợp cổng LLM dự phòng, gắn đường dẫn thật cho 04 nhà đăng ký gồm Đất Việt https://datvietent.vn/, iNET, Mắt Bão, Namecheap, đồng thời thêm tính năng xuất Tờ trình đề xuất gửi Ban Giám đốc và khử trùng lặp danh sách 05 tên miền.
11. Bảng kiểm thử
Mã ca	Loại ca	Dữ liệu và bước thử	Kỳ vọng	Kết quả thực tế	Đạt/Chưa đạt
TC01	Bình thường 1	Nhập tên Ngân food, lĩnh vực Đồ ăn, mô tả Doanh nghiệp cung cấp suất ăn học đường rồi bấm Kiểm tra tên này.	Chấm điểm 3 tiêu chí chính xác; gợi ý 05 tên miền không trùng lặp kèm nhãn kết quả demo; tạo 01 Tagline, 03 Slogan, 02 Logo ngành ẩm thực; chọn nơi mua và Copy toàn bộ thông tin hoạt động tốt.	Đạt 99đ Dễ đọc, 98đ Dễ nhớ, 96đ Khớp sản phẩm; gợi ý 05 tên miền khác nhau gồm nganfood.vn, nganfood.com, nganfood.shop, nganfresh.vn, nganfoodfresh.vn; các nút Mua ngay dẫn đúng về https://datvietent.vn/.	Đạt
TC02	Bình thường 2	Nhập tên Massage VN, lĩnh vực Dịch vụ, mô tả Công ty mát-xa số một Việt Nam rồi bấm Kiểm tra tên này.	Nhận diện đúng mảng dịch vụ mát-xa, spa & thư giãn trị liệu; chấm điểm độ khớp cao; gợi ý tên miền có hậu tố spa, relax và vẽ Logo hoa sen thư giãn.	Nhận diện đúng mảng dịch vụ mát-xa, spa & thư giãn trị liệu (không bị nhầm sang giáo dục); chấm điểm khớp sản phẩm > 90/100; gợi ý massagespa.vn, massagerelax.vn.	Đạt
TC03	Đầu vào không hợp lệ 1	Bỏ trống ô tên thương hiệu hoặc chỉ nhập ký tự đặc biệt @@@###, hoặc nhập cả đường dẫn https://www.freshbite.com/shop vào ô tên thương hiệu.	Không bị lỗi dừng ứng dụng; nếu nhập đường dẫn web thì tự động tách bỏ https://www. và .com/shop để lấy tên gốc freshbite, không sinh ra freshbite.com.com.	Ứng dụng hoạt động ổn định, tự động lọc sạch tiền tố và hậu tố URL thừa, hiển thị thông báo đã làm sạch chuỗi và phân tích đúng tên freshbite.	Đạt
TC04	Đầu vào không hợp lệ 2	Nhập từ tục tĩu tiếng Anh PenisBig over, lĩnh vực Công nghệ & AI, mô tả Công ty phần mềm AI.	Bộ lọc từ cấm phát hiện từ nhạy cảm penis, đánh tụt điểm Độ khớp sản phẩm xuống dưới 15/100, bật cảnh báo đỏ và loại bỏ từ nhạy cảm khỏi tên miền đề xuất.	Điểm Độ khớp sản phẩm hạ xuống 9/100, hiện cảnh báo đỏ Tên có chứa từ nhạy cảm, không nên dùng để mở shop và chỉ gợi ý các tên miền sạch thay thế.	Đạt
TC05	Ca biên 1	Nhập tên tiếng Việt dễ dính bẫy khi bỏ dấu Váy Đầm Xinh hoặc nhập tên trùng thương hiệu lớn Shopee.	Với Váy Đầm Xinh: Cảnh báo chữ Đầm khi mất dấu thành dam trong vaydamxinh dễ gây đọc nhầm và gợi ý vay-dam-xinh.shop. Với Shopee: Báo .vn và .com đã có người mua kèm lưu ý bản quyền.	Hộp kiểm tra an toàn bật cảnh báo cam cho vaydamxinh, trừ 14-15đ và gợi ý biến thể gạch ngang an toàn. Với Shopee, hiển thị đúng Đã có người mua (Kết quả demo).	Đạt
TC06	Ca sự cố 2	Gửi câu hỏi bất kỳ vào Chatbot Cố vấn AI khi khóa API đầu tiên hết hạn mức hoặc khi chạy trên môi trường web tĩnh GitHub Pages https://yazfboy.github.io/XSon-AI/.	Hệ thống tự động xoay vòng sang khóa API tiếp theo hoặc chuyển sang cổng LLM dự phòng trên trình duyệt mà không làm treo giao diện.	Chatbot phản hồi câu trả lời tư vấn tự nhiên sau 1-3 giây trên trang https://yazfboy.github.io/XSon-AI/, tạo kèm nút Dùng thử tên này hoạt động mượt mà.	Đạt
12. Hồ sơ bàn giao
Source ZIP chứa toàn bộ mã nguồn sạch và tệp README.md đã điền đầy đủ 12 mục này; chỉ kèm cấu hình mẫu .env.example và .npmrc, không chứa khóa API thật.
Triển khai trực tuyến hoạt động tại: https://yazfboy.github.io/XSon-AI/
Video tối đa 2 phút thể hiện thao tác thực tế và đầy đủ 5 tính năng của Đề số 10.
Minh chứng dùng AI và bảng 06 ca kiểm thử Bảng A đã được tích hợp trực tiếp tại Mục 10 và Mục 11 trong tệp README.md này.
Ứng dụng không yêu cầu tài khoản đăng nhập; tích hợp sẵn 05 nút kịch bản dữ liệu mẫu ngay trên giao diện chính để Ban Giám khảo kiểm thử tức thì.