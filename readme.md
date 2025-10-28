<div align="center">
  
  # Sistem Informasi Manajemen Klinik (SIM Klinik) 🏥
  
  Aplikasi web manajemen data klinik yang dikembangkan menggunakan tumpukan modern **Laravel**, **Inertia.js**, dan **React (TSX)**.
  
  <p align="center">
    <a href="https://php.net"><img src="https://img.shields.io/badge/PHP-^8.2-777BB4?style=for-the-badge&logo=php" alt="PHP Version"></a>
    <a href="https://laravel.com"><img src="https://img.shields.io/badge/Backend-Laravel%2011/12-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel Version"></a>
    <a href="https://inertiajs.com/"><img src="https://img.shields.io/badge/Stack-Inertia.js-9553E2?style=for-the-badge&logo=inertia" alt="Inertia.js"></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/Frontend-React%20(TSX)-61DAFB?style=for-the-badge&logo=react" alt="React (TSX)"></a>
  </p>

</div>

---

## 📌 Tentang Proyek

**Sistem Informasi Manajemen Klinik (SIM Klinik)** adalah aplikasi web *full-stack* yang memanfaatkan kekuatan *routing* dan *controller* Laravel di sisi *backend* sambil memberikan pengalaman pengguna yang sangat responsif, layaknya *Single Page Application* (SPA).

Proyek ini dibangun menggunakan **Breeze with Inertia Stack**, yang terdiri dari: **L**aravel (Backend), **I**nertia.js (Glue Layer), dan **R**eact dengan **TypeScript (TSX)** (Frontend UI).

## ✨ Fitur Utama

Aplikasi ini berfokus pada manajemen data master klinik, dengan fitur utama:

* **Modern SPA:** Pengalaman pengguna yang cepat tanpa *reload* halaman penuh berkat Inertia.js.
* **Authentication & Authorization:** Sistem login yang aman, dibangun menggunakan Laravel Breeze.
* **Manajemen Pegawai:** CRUD lengkap untuk data staf dan dokter.
* **Manajemen Pasien:** CRUD lengkap untuk data detail pasien.
* **Manajemen Poli:** CRUD data jenis layanan Poliklinik yang tersedia.
* **Typed Frontend:** Menggunakan **TypeScript (.tsx)** untuk meningkatkan kualitas kode dan mengurangi *bug* di sisi klien.

## 📸 Tampilan Aplikasi (Screenshots)

**Wajib Diisi:** Tambahkan screenshot aplikasi Anda di sini untuk menunjukkan UI/UX modern dari Inertia + React Anda.

| Halaman Login | Dashboard | Form Data Pegawai |
| :---: | :---: | :---: |
| ![Login Screen]([LINK_SCREENSHOT_LOGIN]) | ![Dashboard Screen]([LINK_SCREENSHOT_DASHBOARD]) | ![Form Screen]([LINK_SCREENSHOT_FORM]) |

## 🛠️ Tumpukan Teknologi

| Kategori | Teknologi | Detail Implementasi |
| :--- | :--- | :--- |
| **Backend** | **Laravel 12** | Framework PHP modern untuk API, Model, dan Routing. |
| **Frontend Framework** | **React** | Library UI modern untuk membangun komponen interaktif. |
| **Tipe Data** | **TypeScript (TSX)** | Digunakan di sisi *frontend* untuk tipe data yang lebih kuat. |
| **Glue Layer** | **Inertia.js** | Menghubungkan Laravel Controller ke React Components. |
| **Styling** | **Tailwind CSS** | (Asumsi default Breeze) Utility-first CSS framework. |
| **Database** | MySQL | Database relasional. |
| **Bundler** | **Vite** | Tool modern untuk *asset* bundling yang sangat cepat. |

## 🚀 Panduan Instalasi (Development Setup)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

* **PHP:** Versi 8.3 atau lebih tinggi.
* **Composer:** Versi terbaru.
* **Node.js & NPM/Yarn:** Versi terbaru (direkomendasikan menggunakan NPM/Yarn untuk *packages* React).
* **Database:** MySQL atau MariaDB.

### Langkah-Langkah Instalasi

1.  **Clone** Repositori:
    ```sh
    git clone https://github.com/michailtjhang/klinik_app.git
    cd klinik_app
    ```

2.  **Instalasi Dependensi PHP:**
    ```sh
    composer install
    ```

3.  **Konfigurasi Environment:**
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```
    
4.  **Konfigurasi Database:**
    Edit file `.env` dan atur detail koneksi database Anda:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=[NAMA_DB_ANDA]
    DB_USERNAME=[USERNAME_ANDA]
    DB_PASSWORD=[PASSWORD_ANDA]
    ```

5.  **Migrasi Database:**
    ```sh
    php artisan migrate
    ```

6.  **Instalasi & Build Frontend Assets (Inertia/React):**
    Instal paket Node.js, dan jalankan Vite *dev server* secara terpisah:
    ```sh
    npm install
    
    # Jalankan server Vite di terminal terpisah (harus berjalan bersama server Laravel)
    npm run dev 
    ```

7.  **Jalankan Server Laravel:**
    ```sh
    php artisan serve
    ```

8.  Akses aplikasi di: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## 📂 Struktur Proyek

Struktur folder utama yang mencerminkan arsitektur Laravel + Inertia.js + React/TSX:

```
klinik_app/
├── app/
│   ├── Http/Controllers/   # Controller yang me-return Inertia Responses
│   └── Models/             # Model Eloquent
├── database/
│   ├── migrations/         # Skema tabel database
│   └── seeders/
├── resources/
│   ├── js/                 # Root untuk assets frontend
│   │   ├── Components/     # Komponen React (tsx/jsx) yang dapat digunakan kembali
│   │   ├── Layouts/        # Tata letak utama aplikasi
│   │   ├── Pages/          # React Components yang dipanggil oleh Inertia/Controller
│   │   └── app.tsx         # Inisialisasi Inertia dan React
│   └── views/              # Hanya berisi app.blade.php (Inertia Root)
├── routes/
│   └── web.php             # Definisi rute Inertia
└── vite.config.js          # Konfigurasi Vite
```

## 🤝 Kontribusi

Kami sangat menghargai kontribusi, *pull request*, dan saran fitur. Silakan ikuti panduan standar GitHub: **Fork**, buat *branch* baru, *commit* perubahan, dan buat **Pull Request** ke *branch* `main`.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [**Nama Lisensi, misal: MIT License**].

## 📧 Kontak

Michail Tjhang - [michail.tjhang@gmail.com](mailto:michail.tjhang@gmail.com)

Link Proyek: [https://github.com/michailtjhang/klinik_app](https://github.com/michailtjhang/klinik_app)