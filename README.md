# ServerlessBox - Dropbox Clone

ServerlessBox, AWS bulud ekosistemi (Amplify, Lambda, S3) və ReactJS istifadə edilərək hazırlanmış serverless fayl idarəetmə sistemidir. İstifadəçilər fayllarını buludda etibarlı şəkildə saxlaya, baxa və versiyalarını izləyə bilərlər.

## 🚀 Tətbiq URL
**[Canlı Baxış (Canlı tətbiq linki bura əlavə ediləcək)](#)**

## 🛠️ Texnoloji Stack
- **Frontend:** ReactJS, React Router DOM
- **Stil:** CSS (Modulyar struktur, hər komponentin öz css faylı var)
- **Backend/Hostinq:** AWS Amplify
- **Verilənlər Bazas / Storage:** Amazon S3 (Bucket Versioning aktiv edilib)
- **Logika:** AWS Lambda (Node.js) & API Gateway
- **Autentifikasiya:** AWS Cognito (Amplify Auth)

## 📌 Xüsusiyyətlər
- **Giriş/Qeydiyyat (Auth):** Təhlükəsiz istifadəçi girişi sistemi.
- **Fayl Yükləmə:** İstifadəçilər S3-ə birbaşa (presigned URL vasitəsilə) fayl yükləyə bilər.
- **Versiyalama (Versioning):** Eyni fayldan təkrar yükləndikdə versiyalar qorunur və izlənilir.
- **Modern UI/UX:** Responsive və istifadəçi dostu dizayn interfeysi.

## 📂 Layihə Strukturu
```text
my_dropbox/
│
├── public/
├── src/
│   ├── components/        # Yenidən istifadə edilə bilən React komponentləri
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── FileUpload.js
│   │   ├── FileUpload.css
│   │   ├── FileList.js
│   │   ├── FileList.css
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── App.js             # Əsas routing və layout
│   ├── App.css
│   ├── index.js           # Tətbiqin giriş nöqtəsi və Amplify konfiqurasiyası
│   └── index.css          # Qlobal dizayn dəyişənləri və stillər
│
├── aws/
│   └── lambda/
│       └── uploadFile.js  # Fayl yükləmə üçün Presigned URL yaradan Lambda funksiyası
│
├── aws-instructions.md    # AWS xidmətlərini qurmaq üçün təlimat
├── package.json
└── README.md
```

## ⚙️ Quraşdırma və Yerli (Local) İşə Salma

1. Asılılıqları yükləyin:
```bash
npm install
```

2. Tətbiqi işə salın:
```bash
npm start
```

## ☁️ AWS Quraşdırılması
Tətbiqin tam şəkildə işləməsi üçün AWS xidmətlərinin (S3, Lambda, API Gateway və Amplify) qurulması lazımdır. Zəhmət olmasa addım-addım təlimatlar üçün `aws-instructions.md` faylına baxın.
