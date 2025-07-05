# 📎 Dokumentasi Teknis: Website URL Shortener

## 🎯 Tujuan
Sebuah layanan yang mengubah URL panjang menjadi pendek, dan saat diakses akan mengarahkan kembali ke URL aslinya.

---

## 🧩 Komponen Utama

### 1. Frontend
- Form input untuk URL panjang
- Tombol untuk memendekkan
- Menampilkan hasil URL pendek

### 2. Backend
- Terima request URL panjang
- Generate short code
- Simpan ke database
- Redirect saat short code diakses

### 3. Database
Struktur tabel dasar:
```sql
CREATE TABLE short_urls (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE,
  long_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```
---

## 🔁 Alur Kerja

1. User mengisi URL panjang
2. Backend generate short code (random atau base62 dari ID)
3. Simpan `short_code` ↔ `long_url` ke database
4. Balikkan URL pendek ke user
5. Saat URL pendek diakses, cari `short_code` dan redirect ke `long_url`

---

## ✨ Fitur Tambahan & Implementasinya

### 1. 📊 Statistik Klik

**Tujuan:** Mencatat jumlah klik dan data terkait.

**Tabel Click Logs:**

```sql
CREATE TABLE click_logs (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR,
  ip_address VARCHAR,
  user_agent TEXT,
  clicked_at TIMESTAMP DEFAULT NOW()
);
```

**Pada saat redirect:**

* Catat IP dan User-Agent
* Insert log ke `click_logs`
* Redirect ke URL panjang

**Hitung jumlah klik:**

```sql
SELECT COUNT(*) FROM click_logs WHERE short_code = 'xYz12A';
```

---

### 2. ⏳ Masa Aktif URL (Expiry)

**Tujuan:** URL kedaluwarsa otomatis.

**Tambahkan kolom:**

```sql
ALTER TABLE short_urls ADD COLUMN expiry_date TIMESTAMP;
```

**Logika saat redirect:**

* Jika `expiry_date < NOW()`, tampilkan error 410 Gone
* Jika masih aktif, redirect

---

### 3. ✏️ Kustomisasi Short Code

**Tujuan:** Pengguna bisa memilih alias sendiri (misal: `short.ly/my-brand`)

**Langkah:**

* Tambah field `custom_code` (atau gunakan `short_code`)
* Cek apakah sudah ada:

```sql
SELECT * FROM short_urls WHERE short_code = 'my-brand';
```

* Validasi karakter & reserved word
* Simpan jika tersedia

---

### 4. 🔐 Proteksi dengan Password

**Tujuan:** Hanya yang tahu password bisa akses.

**Tambahkan kolom:**

```sql
ALTER TABLE short_urls ADD COLUMN password_hash TEXT;
```

**Langkah:**

* Saat membuat, hash password (misal: bcrypt)
* Saat akses:

  * Tampilkan input password jika ada hash
  * Bandingkan password (hash compare)
  * Jika benar, redirect
  * Jika salah, tampilkan error 403

---

### 5. 📷 QR Code Otomatis

**Tujuan:** Generate QR code dari URL pendek.

**Contoh (Python):**

```python
import qrcode
img = qrcode.make("https://short.ly/xYz12A")
img.save("qr_xYz12A.png")
```

**Tampilkan ke user:**

* Sebagai gambar
* Atau link unduh

---

### 6. 🛡️ Rate Limiting (Anti Spam)

**Tujuan:** Membatasi jumlah pemendekan URL per IP/user.

**Contoh logika:**

* Simpan log request per IP (misalnya di Redis)
* Batasi max 10 request per menit

---
## 📄 Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // atau mysql / sqlite
  url      = env("DATABASE_URL")
}

model ShortUrl {
  id           String     @id @default(cuid())
  shortCode    String     @unique
  longUrl      String
  customAlias  String?    @unique
  passwordHash String?    // Bcrypt hash
  expiryDate   DateTime?  // NULL = tidak kadaluarsa
  createdAt    DateTime   @default(now())

  // Relasi ke log klik
  clickLogs    ClickLog[]

  @@index([shortCode])
  @@index([expiryDate])
}

model ClickLog {
  id         String   @id @default(cuid())
  shortCode  String
  ipAddress  String?
  userAgent  String?
  clickedAt  DateTime @default(now())

  shortUrl   ShortUrl @relation(fields: [shortCode], references: [shortCode], onDelete: Cascade)

  @@index([shortCode])
  @@index([clickedAt])
}
```

---

## 💡 Penjelasan Schema

### Tabel `ShortUrl`

* `shortCode`: kode pendek (otomatis/random atau custom)
* `customAlias`: alias buatan user (opsional)
* `passwordHash`: hash bcrypt untuk proteksi (opsional)
* `expiryDate`: kapan URL tidak bisa diakses lagi (opsional)
* `createdAt`: tanggal pembuatan
* Relasi ke banyak `ClickLog` (statistik klik)

### Tabel `ClickLog`

* Menyimpan log klik
* Berisi IP, User-Agent, dan waktu klik
* Berelasi ke `ShortUrl` melalui `shortCode`

---

## 🧪 Contoh Query Prisma

**1. Buat URL pendek:**

```ts
await prisma.shortUrl.create({
  data: {
    shortCode: 'xYz12A',
    longUrl: 'https://example.com/article',
    passwordHash: hashPassword, // optional
    expiryDate: new Date('2025-12-31'),
    customAlias: 'my-custom-link', // optional
  },
});
```

**2. Redirect + log klik:**

```ts
const short = await prisma.shortUrl.findUnique({
  where: { shortCode: 'xYz12A' },
});

if (short?.expiryDate && short.expiryDate < new Date()) {
  throw new Error("Link expired");
}

// Cek password jika ada, sebelum redirect...

await prisma.clickLog.create({
  data: {
    shortCode: short.shortCode,
    ipAddress: clientIP,
    userAgent: userAgentString,
  },
});
```

**3. Hitung klik:**

```ts
const count = await prisma.clickLog.count({
  where: { shortCode: 'xYz12A' },
});
```

---
