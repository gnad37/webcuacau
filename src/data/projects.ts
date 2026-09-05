export type Category = "nha1" | "nha2" | "nha3";

export interface Project {
  id: string;
  index: string; 
  name: string;
  category: Category;
  location: string;
  year: string;
  area: string;
  architect: string;
  status: string;
  /** Ảnh chất lượng cao — SmartImage sẽ lo lazy-load + blur-up */
  src: string;
  ratio: "portrait" | "landscape";
  tagline: string;
  description: string;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  nha1: "Biệt thự Lô góc", // Dành cho a4, a5
  nha2: "Biệt thự Đồi",   // Dành cho a6, a7
  nha3: "Villa Mặt tiền", // Dành cho a2, a3, a8, a9
};

// Cấu hình thanh Bộ lọc (Filters)
export const FILTERS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tất cả dự án" },
  { value: "nha1", label: "Biệt thự Lô góc" },
  { value: "nha2", label: "Biệt thự Đồi" },
  { value: "nha3", label: "Villa Mặt tiền" },
];
 
export const PROJECTS: Project[] = [
  // --- NHÀ 1 (a4) ---
  {
    id: "nha1-toan-canh-ngay",
    index: "01",
    name: "Biệt thự Lô góc - Toàn cảnh ban ngày",
    category: "nha1", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "350 m²",
    architect: "Hoàng Hải Đăng",
    status: "Đã bàn giao",
    src: "/a4.webp", 
    ratio: "landscape", 
    tagline: "Mái ấm bình yên giữa lòng đô thị",
    description: "Công trình là một nốt trầm tĩnh lặng giữa khu phố sầm uất, nổi bật với hệ mái Nhật vát dốc thanh lịch và tông màu xám lạnh. Thiết kế lùi sâu giúp tạo ra một khoảng sân trước rộng rãi, kết hợp hệ tường rào đảm bảo sự riêng tư tuyệt đối cho gia chủ."
  },

  // --- NHÀ 3 (a3 - Ép dọc) ---
  {
    id: "nha3-chinh-dien",
    index: "02",
    name: "Villa Mặt tiền - Góc nhìn chính diện",
    category: "nha3", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "320 m²",
    architect: "Hoàng Hải Đăng",
    status: "Mới",
    src: "/a3.webp", 
    ratio: "portrait",  
    tagline: "Sự cân bằng hoàn hảo của hình khối",
    description: "Góc chụp chính diện tôn vinh hệ mái Nhật bề thế và cấu trúc đối xứng của công trình. Các bậc thềm rộng trải dài kết hợp dải đèn LED âm tạo cảm giác chào đón, dẫn dắt ánh nhìn vào không gian nội thất ấm áp bên trong."
  },

  // --- NHÀ 2 (a6) ---
  {
    id: "nha2-tong-quan",
    index: "03",
    name: "Biệt thự Đồi - Tổng quan kiến trúc",
    category: "nha2", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "400 m²",
    architect: "Hoàng Hải Đăng",
    status: "Đang thi công",
    src: "/a6.webp", 
    ratio: "landscape",
    tagline: "Sự bề thế vươn mình giữa thiên nhiên",
    description: "Góc nhìn từ trên cao bao quát toàn bộ khối lượng đồ sộ của công trình. Hệ thống rào chắn được thiết kế đồng bộ với ngôn ngữ kiến trúc của ngôi nhà, kết hợp khoảng sân lát gạch xám rộng rãi tạo nên một tổng thể quy mô và an ninh."
  },

  // --- NHÀ 3 (a9 - Ép dọc) ---
  {
    id: "nha3-chi-tiet",
    index: "04",
    name: "Villa Mặt tiền - Chi tiết vật liệu",
    category: "nha3", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "320 m²",
    architect: "Hoàng Hải Đăng",
    status: "Mới",
    src: "/a9.webp", 
    ratio: "portrait", 
    tagline: "Vẻ đẹp từ sự nguyên bản của vật liệu",
    description: "Góc nhìn cận cảnh tôn vinh các chi tiết cấu tạo cao cấp của mặt tiền. Điểm nhấn chính là mảng tường được ốp đá marble tối màu với những đường vân rạn tự nhiên. Dưới tác động của hệ thống đèn downlight gắn trần, bề mặt đá thô cứng trở nên có chiều sâu và sang trọng hơn."
  },

  // --- NHÀ 1 (a5) ---
  {
    id: "nha1-phoi-canh-dem",
    index: "05",
    name: "Biệt thự Lô góc - Phối cảnh đêm",
    category: "nha1", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "350 m²",
    architect: "Hoàng Hải Đăng",
    status: "Đã bàn giao",
    src: "/a5.webp", 
    ratio: "landscape", 
    tagline: "Sự chuyển mình lung linh dưới ánh đèn",
    description: "Khi màn đêm buông xuống, công trình nổi bật với hệ thống chiếu sáng được tính toán tỉ mỉ. Các vệt sáng hắt lên từ chân tường rào và ánh đèn vàng ấm từ khe hắt mái giúp ngôi nhà giữ được vẻ rực rỡ nhưng không gây chói mắt cho không gian xung quanh."
  },

  // --- NHÀ 2 (a7) ---
  {
    id: "nha2-ve-dem",
    index: "06",
    name: "Biệt thự Đồi - Giai điệu Mái Nhật",
    category: "nha2", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "400 m²",
    architect: "Hoàng Hải Đăng",
    status: "Đang thi công",
    src: "/a7.webp", 
    ratio: "landscape",
    tagline: "Chốn lui về bình yên khi màn đêm buông",
    description: "Khi ráng chiều phai nhạt, công trình thực sự lột xác dưới lớp vỏ bọc ánh sáng nghệ thuật. Hệ thống đèn sân vườn là nét cọ phác họa nên những vệt hắt bóng tinh tế lên thảm thực vật nhiệt đới, hoàn toàn hòa điệu với bóng tối mờ ảo của dải đồi núi điệp trùng phía xa."
  },

  // --- NHÀ 3 (a2) ---
  {
    id: "nha3-goc-nghieng",
    index: "07",
    name: "Villa Mặt tiền - Góc nhìn chéo",
    category: "nha3", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "320 m²",
    architect: "Hoàng Hải Đăng",
    status: "Mới",
    src: "/a2.webp", 
    ratio: "landscape",
    tagline: "Nét khỏe khoắn trong từng đường nét",
    description: "Góc chụp nghiêng phô diễn độ vươn của hệ mái hiên che nắng, đồng thời khoe khéo cách xử lý vật liệu ốp tường. Không gian đệm trước sảnh được mở rộng tối đa, tạo sự giao thoa mượt mà giữa bên trong nhà và khu vực đỗ xe bên ngoài."
  },

  // --- NHÀ 3 (a8) ---
  {
    id: "nha3-canh-quan",
    index: "08",
    name: "Villa Mặt tiền - Cảnh quan sảnh trước",
    category: "nha3", 
    location: "Phan Thiết, Bình Thuận",
    year: "2026",
    area: "320 m²",
    architect: "Hoàng Hải Đăng",
    status: "Mới",
    src: "/a8.webp", 
    ratio: "landscape",
    tagline: "Không gian sống hòa quyện cùng thiên nhiên",
    description: "Những dải bồn hoa thấp được bố trí khéo léo bao quanh chân công trình, kết hợp với các trụ đèn nấm sân vườn tạo ra một lối đi dẫn hướng mềm mại, cân bằng lại sự vuông vức, nam tính của khối nhà chính."
  },
];
 
export const HERO_IMAGE = "/a7.webp";