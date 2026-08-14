# 🚀 DocMorph AI

> AI-powered document assistant and file conversion platform.

DocMorph AI is a full-stack web application that combines **AI-powered document analysis** with **file conversion tools** in a single platform.

The project is being developed with a focus on clean architecture, reusable components, and practical document-processing features.

---

## ✨ Features

### 🤖 AI Document Assistant

* 📤 Upload documents
* 📄 Extract text from PDF files
* ✨ Generate AI-powered document summaries
* 💬 Chat with uploaded documents
* 🧠 Powered by Google Gemini

### 🖼️ Image Converter

Currently supported:

* JPG → PNG
* PNG → JPG
* JPEG → PNG
* PNG → WebP
* WebP → JPG

### 📄 PDF Converter

Supported / in development:

* PDF → JPG
* JPG → PDF

### 📝 Word Converter

Supported / in development:

* Word → PDF
* PDF → Word

---

## 🏗️ Project Architecture

```text
DocMorph AI
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/
│   │   │   │   └── UploadBox.tsx
│   │   │   │
│   │   │   ├── converters/
│   │   │   │   ├── ConverterCard.tsx
│   │   │   │   ├── ConverterHub.tsx
│   │   │   │   ├── ConverterLayout.tsx
│   │   │   │   ├── ImageConverter.tsx
│   │   │   │   ├── PdfConverter.tsx
│   │   │   │   └── WordConverter.tsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Hero.tsx
│   │   │       └── Navbar.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── ImageConverterPage.tsx
│   │   │   ├── PdfConverterPage.tsx
│   │   │   └── WordConverterPage.tsx
│   │   │
│   │   ├── services/
│   │   │   └── converter.service.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── converted/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* React Dropzone

### Backend

* Node.js
* Express.js
* Multer
* Axios
* Sharp
* PDF processing libraries
* LibreOffice conversion support

### AI

* Google Gemini API
* `@google/genai`

---

## 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ├── AI Document Upload
 │
 └── File Converter
       │
       ▼
    Axios API
       │
       ▼
Express Backend
       │
       ├── PDF Services
       ├── Image Services
       ├── Word Services
       └── AI Services
              │
              ▼
         Gemini API
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd docmorph-ai-step1
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create:

```text
server/.env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Never commit `.env` to GitHub.

Make sure `.gitignore` contains:

```text
.env
node_modules/
uploads/*
converted/*
```

---

## ▶️ Running the Project

### Start Backend

From:

```text
server/
```

run:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

From:

```text
client/
```

run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧠 AI Workflow

The document assistant currently follows this flow:

```text
Upload PDF
     ↓
Multer
     ↓
PDF Text Extraction
     ↓
Extracted Text
     ↓
Google Gemini
     ↓
AI Summary
     ↓
Frontend
```

The project also includes a conversational document workflow for interacting with uploaded document content.

---

## 🔄 Converter Architecture

Converters use a shared frontend service:

```text
Converter Component
       ↓
converter.service.ts
       ↓
POST /convert
       ↓
convert.controller.js
       ↓
Conversion Service
       ↓
Converted File
       ↓
Browser Download
```

Reusable React components are used for converter layouts and cards to avoid duplicated UI code.

---

## 🎯 Planned Features

### PDF

* [ ] PDF → JPG
* [ ] JPG → PDF
* [ ] PDF → Word
* [ ] Merge PDF
* [ ] Split PDF
* [ ] Compress PDF
* [ ] Rotate PDF

### Word

* [x] Word → PDF
* [ ] PDF → Word

### Images

* [x] JPG → PNG
* [x] PNG → JPG
* [x] JPEG → PNG
* [x] PNG → WebP
* [x] WebP → JPG
* [ ] Image compression
* [ ] Image resizing

### AI

* [x] Document summarization
* [x] Chat with document
* [ ] Document translation
* [ ] Document explanation
* [ ] AI rewriting
* [ ] OCR

### Platform

* [ ] Authentication
* [ ] User dashboard
* [ ] Conversion history
* [ ] Download history
* [ ] Production deployment
* [ ] Custom domain

---

## 🔒 Security

The project is currently in development.

Before production deployment, additional security measures will be implemented, including:

* File type validation
* File size limits
* Secure file handling
* API rate limiting
* Authentication
* Environment variable protection
* Temporary file cleanup

---

## 📈 Development Status

```text
AI Assistant        ████████████████░░░░
Image Converter     ████████████████░░░░
PDF Converter       ████████████░░░░░░░░
Word Converter      ████████████░░░░░░░░
UI Architecture     ██████████████████░░
Authentication      ░░░░░░░░░░░░░░░░░░░░
Deployment          ░░░░░░░░░░░░░░░░░░░░
```

DocMorph AI is actively under development.

---

## 👨‍💻 Developer

**Abhranil Roy**

B.Tech CSE Student

Interested in:

* Artificial Intelligence
* Machine Learning
* Full-Stack Development
* Cybersecurity
* Software Engineering

---

## ⭐ Project Goal

The goal of DocMorph AI is to build a unified platform where users can:

> **Upload → Understand → Convert → Download**

documents without needing multiple separate tools.

---

## 📜 License

This project is currently intended for educational and portfolio development.
