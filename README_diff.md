--- README.md (原始)
# ATELIER VÕ — Portfolio Kiến trúc Nhà ở Cao cấp

Website showcase kiến trúc với React + Vite + Tailwind CSS v4 + Framer Motion + Lenis.

## Yêu cầu

- **Node.js LTS (v18+)** — tải tại https://nodejs.org
- **VS Code** — tải tại https://code.visualstudio.com

## Chạy dự án

```bash
# 1. Mở terminal trong thư mục dự án
npm install      # chỉ chạy lần đầu
npm run dev      # khởi chạy tại http://localhost:5173
```

## Build production

```bash
npm run build    # xuất bản dựng vào thư mục dist/
npm run preview  # xem thử bản dựng
```

## Cấu trúc

```
├── index.html                  # trang gốc + font Italiana/Archivo
├── package.json
├── vite.config.js / tsconfig.json
└── src/
    ├── App.tsx                 # khung chính + khởi tạo Lenis
    ├── main.tsx                # điểm vào React
    ├── index.css               # theme Tailwind v4, grain, marquee, blur-up
    ├── components/
    │   ├── Hero.tsx            # banner 4K parallax toàn màn hình
    │   ├── Header.tsx          # nav cố định + menu mobile
    │   ├── Marquee.tsx         # dải chữ chạy
    │   ├── Manifesto.tsx       # triết lý 2 cột sticky + số đếm
    │   ├── Gallery.tsx         # lưới masonry + bộ lọc hạng mục
    │   ├── ProjectCard.tsx     # thẻ công trình, hover zoom
    │   ├── ProjectModal.tsx    # lightbox 4K, phím ← → Esc
    │   ├── Featured.tsx        # dự án tiêu biểu, parallax trong khung
    │   ├── Process.tsx         # quy trình 4 bước
    │   ├── Footer.tsx          # CTA + thông tin liên hệ
    │   ├── SmartImage.tsx      # lazy load + blur-up + priority LCP
    │   └── Reveal.tsx          # scroll-reveal dùng chung
    ├── data/projects.ts        # dữ liệu 9 công trình (đổi ảnh/nội dung tại đây)
    └── lib/
        ├── utils.ts            # cn(), formatNumber()
        └── lenis-context.tsx   # chia sẻ instance Lenis giữa các component
```

## Thay ảnh dự án

Ảnh hiện trỏ tới URL ngoài. Muốn lưu vĩnh viễn: tải ảnh về `public/images/`
rồi sửa hàm `img()` trong `src/data/projects.ts`.

## Extension VS Code đề xuất

Tailwind CSS IntelliSense · Prettier · ESLint · Auto Rename Tag ·
Path Intellisense · Image Preview · Error Lens · Material Icon Theme


+++ README.md (修改后)
# webnhadep — Atelier Võ | Portfolio Kiến trúc Nhà ở Cao cấp

Website showcase kiến trúc nhà ở cao cấp, tối ưu cho hình ảnh 4K:
cuộn mượt Lenis, hiệu ứng parallax, blur-up khi tải ảnh, lightbox xem ảnh
toàn màn hình, bộ lọc hạng mục (Hiện đại / Cổ điển / Tối giản).

## Tech stack

- React 18 + Vite 6
- Tailwind CSS v4
- Framer Motion (animation)
- Lenis (smooth scroll)
- TypeScript

## Cây thư mục — 23 file

```
webnhadep/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
├── README.md
└── src/
    ├── App.tsx                    ← khung chính + khởi tạo Lenis
    ├── main.tsx                   ← điểm vào React
    ├── index.css                  ← theme Tailwind v4, grain, keyframes
    ├── components/
    │   ├── Header.tsx             ← nav cố định + menu mobile
    │   ├── Hero.tsx               ← banner 4K parallax
    │   ├── Marquee.tsx            ← dải chữ chạy ngang
    │   ├── Manifesto.tsx          ← triết lý + số liệu đếm
    │   ├── Gallery.tsx            ← lưới masonry + bộ lọc
    │   ├── ProjectCard.tsx        ← thẻ công trình (hover zoom)
    │   ├── ProjectModal.tsx       ← lightbox 4K, phím ←/→/Esc
    │   ├── Featured.tsx           ← dự án nổi bật + parallax trong
    │   ├── Process.tsx            ← quy trình 4 bước
    │   ├── Footer.tsx             ← CTA lớn + liên hệ
    │   ├── SmartImage.tsx         ← lazy load + blur-up (mô phỏng next/image)
    │   └── Reveal.tsx             ← hiệu ứng trồi lên khi cuộn
    ├── data/
    │   └── projects.ts            ← dữ liệu 9 công trình + ảnh
    └── lib/
        ├── utils.ts               ← cn(), formatNumber()
        └── lenis-context.tsx      ← chia sẻ instance Lenis
```

## Chạy trên máy

Yêu cầu: **Node.js LTS (v18+)** — kiểm tra bằng `node -v`.

```bash
npm install     # chỉ lần đầu
npm run dev     # mở http://localhost:5173
npm run build   # build production vào thư mục dist/
```

> Đổi tên project trong `package.json`: sửa dòng
> `"name": "sandbox-workspace"` thành `"name": "webnhadep"`.

## Lưu ảnh về máy (khuyến khích)

Ảnh hiện trỏ tới máy chủ ngoài. Để chạy offline 100%:

1. Mở từng URL trong `src/data/projects.ts` → chuột phải → Save image
2. Tạo thư mục `public/images/` và lưu 10 ảnh vào
3. Sửa trong `src/data/projects.ts`:

```ts
const img = (ten: string) => `/images/${ten}`;
```

rồi thay id dài bằng tên file (ví dụ `img("doi-thong.png")`).

## Lỗi thường gặp

| Lỗi | Cách sửa |
|---|---|
| `npm: command not found` | Cài Node.js LTS, mở lại terminal |
| `Cannot find module './components/...'` | Thiếu file hoặc sai chữ hoa/thường tên thư mục |
| `Port 5173 already in use` | Tắt terminal cũ hoặc để Vite tự chọn port khác |
| Trang trắng, mất style | Kiểm tra `src/index.css` và import trong `main.tsx` |
