
export type Category = "modern" | "classic" | "minimalist";

export interface Project {
  id: string;
  index: string; // số thứ tự kiểu bản vẽ: 01, 02...
  name: string;
  category: Category;
  location: string;
  year: string;
  area: string;
  architect: string;
  status: string;
  /** Ảnh 4K gốc — SmartImage sẽ lo lazy-load + blur-up */
  src: string;
  ratio: "portrait" | "landscape";
  tagline: string;
  description: string;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  modern: "Hiện đại",
  classic: "Cổ điển",
  minimalist: "Tối giản",
};

const img = (id: string) =>
  `https://image.qwenlm.ai/generated-images/${id}/_result.png`;

export const PROJECTS: Project[] = [
  {
    id: "doi-thong",
    index: "01",
    name: "Biệt thự Đồi Thông",
    category: "modern",
    location: "Đà Lạt, Lâm Đồng",
    year: "2024",
    area: "420 m²",
    architect: "KTS. Võ Trọng Nghĩa",
    status: "Đã hoàn thành",
    src: img("e33f8b59-2d46-4454-9eed-d7cb46e243a0"),
    ratio: "portrait",
    tagline: "Ngôi nhà lơ lửng giữa rừng sương",
    description:
      "Đặt trên sườn đồi thông ở cao độ 1.500 m, công trình là ba khối bê tông giật cấp bám theo địa hình, mỗi khối xoay một góc khác nhau để mở trọn tầm nhìn ra thung lũng sương. Hệ kính cao sát trần xoá mờ ranh giới trong – ngoài, để ánh đèn vàng mỗi hoàng hôn trở thành một phần của rừng.",
  },
  {
    id: "vuon-gio",
    index: "02",
    name: "Nhà Vườn Gió",
    category: "minimalist",
    location: "Hội An, Quảng Nam",
    year: "2023",
    area: "180 m²",
    architect: "KTS. Trần Minh Châu",
    status: "Đã hoàn thành",
    src: img("728e4cc8-7e72-49b4-b17d-7d79f6445797"),
    ratio: "portrait",
    tagline: "Ít hơn, để gió ở lại nhiều hơn",
    description:
      "Một sân trong duy nhất trở thành trái tim của ngôi nhà: sỏi trắng cào vân, một gốc tùng thế, và những bức tường vôi phẳng lặng thu bóng nắng. Toàn bộ không gian sống quây quanh khoảng trống ấy — nơi gió Lào được lọc mềm trước khi tràn vào phòng khách.",
  },
  {
    id: "song-han",
    index: "03",
    name: "Dinh thự Sông Hàn",
    category: "classic",
    location: "Đà Nẵng",
    year: "2022",
    area: "650 m²",
    architect: "KTS. Lê Vĩnh Phúc",
    status: "Đã hoàn thành",
    src: img("5e1a2c2d-db75-4449-b82a-4854a4c80b31"),
    ratio: "landscape",
    tagline: "Tỷ lệ vàng bên bờ sông",
    description:
      "Mặt tiền đá vôi đối xứng tuyệt đối với hàng cột thức Ionic, ban công sắt rèn thủ công và sân tiền trải sỏi rửa. Chúng tôi phục dựng tinh thần dinh thự Pháp đầu thế kỷ, nhưng giấu bên trong nó một hệ nhà thông minh và sàn nâng chống ngập hiện đại.",
  },
  {
    id: "casa-anh-sang",
    index: "04",
    name: "Casa Ánh Sáng",
    category: "modern",
    location: "Hà Nội",
    year: "2024",
    area: "310 m²",
    architect: "KTS. Võ Trọng Nghĩa",
    status: "Đã hoàn thành",
    src: img("ffc6e75c-1f07-40a8-9c3e-18ddb25c5d4f"),
    ratio: "portrait",
    tagline: "Bê tông biết kể chuyện bằng bóng đổ",
    description:
      "Giữa khu phố chật, ngôi nhà ống được cắt rỗng theo phương đứng: năm giếng trời lệch tầng rót những cột nắng di chuyển suốt ngày dài. Tường bê tông vân gỗ mộc giữ nguyên dấu ván khuôn, cầu thang thép bản mỏng như nét vẽ lơ lửng trong khoảng thông tầng.",
  },
  {
    id: "tinh-vien",
    index: "05",
    name: "Tĩnh Viện",
    category: "minimalist",
    location: "Huế",
    year: "2023",
    area: "240 m²",
    architect: "KTS. Trần Minh Châu",
    status: "Đã hoàn thành",
    src: img("f1c3a3f7-1f07-4fee-ad38-c14a0e499d07"),
    ratio: "landscape",
    tagline: "Một vòng trăng soi mặt nước",
    description:
      "Viên gạch men trăng khuyết — 'nguyệt môn' — đứng giữa hồ tĩnh, soi bóng thành một vầng trăng trọn vẹn. Pavilion thiền bằng gỗ xám và đá Thanh đặt nép dưới tán cây sứ cổ, nơi gia chủ ngồi nghe mưa Huế rơi trên mái đồng hun.",
  },
  {
    id: "nguyet-que",
    index: "06",
    name: "Lâu đài Nguyệt Quế",
    category: "classic",
    location: "Quận 2, TP. Hồ Chí Minh",
    year: "2021",
    area: "780 m²",
    architect: "KTS. Lê Vĩnh Phúc",
    status: "Đã hoàn thành",
    src: img("f2f1607a-52c2-48d6-8940-7717539e7045"),
    ratio: "portrait",
    tagline: "Đại sảnh của những vòm ánh sáng",
    description:
      "Thông tầng kép với cầu thang đá cẩm thạch xoắn uốn quanh giếng trời hình elip, lan can sắt dát đồng do thợ Huế chạm tay trong 14 tháng. Sàn gỗ sồi ghép xương cá và đèn chùm pha lê Bohemia hoàn tất bản giao hưởng tân cổ điển.",
  },
  {
    id: "tren-may",
    index: "07",
    name: "Nhà Trên Mây",
    category: "modern",
    location: "Sa Pa, Lào Cai",
    year: "2025",
    area: "360 m²",
    architect: "KTS. Võ Trọng Nghĩa",
    status: "Đang thi công",
    src: img("1517a998-590b-4491-8a7c-2656314da046"),
    ratio: "landscape",
    tagline: "Sống ở ranh giới của biển mây",
    description:
      "Khối đá bazan địa phương và kính nhô ra khỏi mép núi, sàn phòng khách treo trên ruộng bậc thang 9 m. Mỗi bình minh, mây tràn qua thung lũng và ngôi nhà trở thành một con tàu giữa đại dương trắng — trải nghiệm mà chúng tôi gọi là 'neo đậu trên trời'.",
  },
  {
    id: "hang-duong",
    index: "08",
    name: "Biệt thự Hàng Dương",
    category: "classic",
    location: "Vũng Tàu",
    year: "2022",
    area: "520 m²",
    architect: "KTS. Lê Vĩnh Phúc",
    status: "Đã hoàn thành",
    src: img("c27817c1-662c-4464-9c5c-519c9c725d37"),
    ratio: "portrait",
    tagline: "Hành lang vòm và gió biển Đông",
    description:
      "Dãy hành lang vòm lặp nhịp như phím đàn ôm lấy mặt tiền hướng biển, mái ngói đất nung và con tiện trắng gợi nhớ kiến trúc nghỉ dưỡng Đông Dương 1930. Hàng dương cổ thụ được giữ nguyên — ngôi nhà được vẽ vòng qua từng gốc cây.",
  },
  {
    id: "khong-gian-trang",
    index: "09",
    name: "Không Gian Trắng",
    category: "minimalist",
    location: "Cần Thơ",
    year: "2024",
    area: "200 m²",
    architect: "KTS. Trần Minh Châu",
    status: "Đã hoàn thành",
    src: img("5dbbf68a-5948-426a-a98e-24be53b45755"),
    ratio: "landscape",
    tagline: "Bóng nắng là món nội thất duy nhất",
    description:
      "Toàn bộ ngôi nhà chỉ có một màu trắng và một chiếc ghế. Sân trong cong mềm như dải lụa hứng trọn nắng miền Tây — bóng đổ thay đổi hình dạng mỗi giờ, trở thành tác phẩm sắp đặt duy nhất mà gia chủ cần. Một tuyên ngôn về sự đủ.",
  },
];

export const HERO_IMAGE = img("3c482d52-15a9-4cd8-823a-dc429a092af7");

export const FILTERS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "modern", label: "Hiện đại" },
  { value: "classic", label: "Cổ điển" },
  { value: "minimalist", label: "Tối giản" },
];
