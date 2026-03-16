# Git Workflow – Membuat Branch `dev` dan Push Project (SSH)

Panduan ini menjelaskan cara:

* Setup identitas Git
* Menggunakan SSH dengan GitHub
* Membuat branch `dev`
* Push project dari lokal ke GitHub

---

# 1. Setup Identitas Git

Jika saat commit muncul error:

```
Author identity unknown
```

Set identitas Git terlebih dahulu.

```bash
git config --global user.name "NamaKamu"
git config --global user.email "emailkamu@example.com"
```

Contoh:

```bash
git config --global user.name "Syuhadak"
git config --global user.email "syuhadak@gmail.com"
```

Cek konfigurasi:

```bash
git config --global --list
```

---

# 2. Setup SSH untuk GitHub

### Cek SSH key

```bash
ls ~/.ssh
```

Jika belum ada, buat SSH key:

```bash
ssh-keygen -t ed25519 -C "emailkamu@example.com"
```

### Copy SSH key

```bash
cat ~/.ssh/id_ed25519.pub
```

Lalu tambahkan ke GitHub:

```
GitHub → Settings → SSH and GPG Keys → New SSH Key
```

### Test koneksi

```bash
ssh -T git@github.com
```

Jika berhasil akan muncul pesan welcome dari GitHub.

---

# 3. Hubungkan Repo Lokal ke GitHub (SSH)

Tambahkan remote repository:

```bash
git remote add origin git@github.com:username/nama-repo.git
```

Contoh:

```bash
git remote add origin git@github.com:syuhadak/gudangku.git
```

Cek remote:

```bash
git remote -v
```

---

# 4. Membuat Branch `branch_baru`

Buat dan pindah ke branch `branch_baru`:

```bash
git checkout -b branch_baru
```

Cek branch:

```bash
git branch
```

---

# 5. Menambahkan File Project

Tambahkan semua file:

```bash
git add .
```

Commit perubahan:

```bash
git commit -m "initial commit branch_baru"
```

---

# 6. Push ke Branch `branch_baru`

Push ke GitHub:

```bash
git push -u origin nama_branch
```

Setelah upstream tersimpan, push berikutnya cukup:

```bash
git push
```

---

# 7. Workflow Branch yang Disarankan

Struktur branch yang umum digunakan:

```
main        → production
dev         → development
feature/*   → fitur baru
hotfix/*    → perbaikan bug
```

Contoh membuat branch fitur:

```bash
git checkout -b feature/login
```

---

# 8. Jika Repo GitHub Sudah Ada Isi

Jika repo sudah ada file (misalnya README), lakukan pull terlebih dahulu:

```bash
git pull origin main --allow-unrelated-histories
```

Kemudian push kembali:

```bash
git push
```

---

# 9. Perintah Git yang Sering Dipakai

### Cek status repo

```bash
git status
```

### Tambah file

```bash
git add .
```

### Commit

```bash
git commit -m "pesan commit"
```

### Push

```bash
git push
```

### Pull update terbaru

```bash
git pull
```

---

# Selesai

