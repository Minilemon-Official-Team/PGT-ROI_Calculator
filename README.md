# 🧮 ML-ROI Calculator for Business Preparation

Repository ini berisikan project files yang digunakan dalam pembuatan aplikasi **ML-ROI Calculator for Business Preparation**

---

## Project Overview  

**ML-ROI Calculator** adalah alat bantu berbasis web yang dirancang untuk membantu pelaku **UMKM di Indonesia** memproyeksikan potensi laba atas investasi (*Return on Investment*).  
Dengan antarmuka sederhana dan hasil perhitungan instan, aplikasi ini cocok untuk:  

🏪 Pengusaha pemula  
🎓 Mahasiswa yang belajar kewirausahaan  
💼 Individu yang ingin memahami dasar proyeksi finansial usaha  

## Fitur

- Hitung total pengeluaran dan pemasukan
- Analisis profit margin (untung/rugi)
- Tracking arus kas bulanan
- Visualisasi grafik profit-loss
- Export laporan keuangan sederhana

---

## Prerequisites  
- Node.js v18+  
- npm atau yarn  
- Code Editor (misalnya Visual Studio Code)  

---

## First Steps  

1. **Fork repository** ini dengan menekan tombol **Fork** di bagian atas halaman.  
2. Buka terminal atau command prompt, lalu jalankan perintah berikut untuk melakukan clone:  

   ```bash
   # Contoh
   git clone https://github.com/Minilemon-Official-Team/PGT-ROI_Calculator
   ```

   > Link repository Anda dapat dilihat dengan menekan tombol **Code** berwarna hijau di halaman fork Anda, lalu salin URL HTTPS yang disediakan.

3. Masuk ke folder repository:  
   ```bash
   cd PGT-ROI_Calculator
   ```

4. Install dependencies untuk frontend dan backend:  
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

5. Jalankan aplikasi:  
   - Frontend:  
     ```bash
     cd client
     npm start
     ```
   - Backend:  
     ```bash
     cd server
     npm run dev
     ```

   Akses aplikasi di browser melalui `http://localhost:3000`

---

## Stay Up-to-Date  

Tambahkan remote repository utama untuk memastikan fork Anda tetap sinkron:  
```bash
git remote add upstream https://github.com/playground-team/ml-roi-calculator.git
```

Untuk memperbarui fork Anda dengan repository utama:  
```bash
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main
```

> 💡 Alternatif: Anda juga dapat menekan tombol **Sync fork** di GitHub, kemudian melakukan *fetch/pull* di perangkat Anda.

---

## Good Practices  

- Jika ingin menambahkan fitur atau melakukan perubahan, **buat branch baru** terlebih dahulu:  
  ```bash
  git checkout -b fitur-anda
  ```
- **Jangan langsung melakukan perubahan di branch `main`**, karena digunakan untuk sinkronisasi dengan repository utama.  
- Gunakan penamaan file dan folder yang konsisten agar mudah dipahami kontributor lain.  

---

## Project Structure  

```
ml-roi-calculator/
├── client/          # Front-End (React.js)
│   ├── src/         # File utama React components, pages, utils, dsb.
│   └── public/      # Static assets
│
├── server/          # Back-End (Express.js)
│   ├── routes/      # Endpoint API
│   ├── controllers/ # Logika utama kalkulasi ROI
│   └── config/      # Pengaturan server dan environment
│
└── README.md        # Dokumentasi proyek
```

---

## Note  

- Pastikan koneksi internet stabil saat pertama kali melakukan `npm install`.  
- Aplikasi ini bersifat **open-source** — siapa pun dapat memodifikasi, mengembangkan, dan menggunakannya untuk tujuan edukasi atau sosial.  

---

## 🧑‍💻 Kontributor  

Proyek ini dikembangkan oleh **Playground Team** bersama kontributor komunitas.  
Kami menyambut siapa pun yang ingin ikut berpartisipasi — baik dalam **pengembangan, desain, riset, maupun dokumentasi**.  

---

## 🌍 Visi  

> *“Membangun teknologi terbuka untuk kolaborasi tanpa batas.”*  

---

## License  

Proyek ini dirilis di bawah lisensi **MIT License**.  
Anda bebas menggunakan dan memodifikasi proyek ini dengan tetap mencantumkan kredit kepada **Minilemon - Playground Team**.  
