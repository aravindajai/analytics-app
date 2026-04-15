# 📊 Analytics Dashboard App

A full-stack analytics dashboard that fetches sales data from Google Sheets and visualizes it using interactive charts.

Built for showcasing:

- 📈 Data visualization
- 🔄 Real-time updates
- ⚡ Full-stack integration (React + FastAPI)
- ☁️ Google Sheets as a database

---

## ✨ Features

- 📊 Daily, Weekly, Monthly analytics
- 🔄 Auto-refresh every 60 seconds
- 🌗 Light / Dark mode toggle
- 📤 Export data as CSV
- 📈 Interactive charts (Line, Bar, Area)
- ⚡ FastAPI backend with Pandas processing

---

## 🖼️ Preview

### ☀️ Light Mode

### 🌙 Dark Mode

---

## 🏗️ Tech Stack

### Frontend

- React (Vite)
- Recharts
- Axios

### Backend

- FastAPI
- Pandas
- gspread (Google Sheets API)

---

## 📁 Project Structure

```python
analytics-app/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.py
│   └── credentials.json   ❗ (YOU MUST ADD THIS)
│
├── frontend/
│   ├── src/
│   └── index.html
│
├── assets/
│   ├── light.png
│   └── dark.png
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/analytics-app.git
cd analytics-app

---

## ⚙️ Backend Setup (FastAPI)

cd backend
pip install \-r requirements.txt

### ▶️ Run Backend

uvicorn app.main:app \--reload

Backend runs at:
👉 [http://localhost:8000](http://localhost:8000/)

---

## 💻 Frontend Setup (React)

cd frontend
npm install
npm run dev

Frontend runs at:
👉 [http://localhost:5173](http://localhost:5173/)

---

## 🔐 Google Sheets Setup (IMPORTANT)

This app uses **Google Sheets as a database** via a Service Account.
You must configure this manually.

---

### 🧩 Step 1: Create Google Cloud Project

- Go to: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Click **New Project**
- Name it: `analytics-app`
- Click **Create**

---

### 🔌 Step 2: Enable APIs

Go to:
👉 APIs & Services → Library

Enable BOTH:

- ✅ Google Sheets API
- ✅ Google Drive API

---

### 👤 Step 3: Create Service Account

Go to:
👉 IAM & Admin → Service Accounts

- Click **Create Service Account**
- Fill details:

Name: analytics-app-service
Role: Editor

- Click **Done**

---

### 🔑 Step 4: Generate credentials.json

- Open your Service Account
- Go to **Keys**
- Click:

👉 Add Key → JSON

- Download the file

---

### 📂 Step 5: Add credentials.json

- Rename the downloaded file to:

credentials.json

- Place it inside:

backend/

---

### 📊 Step 6: Create Google Sheet

- Go to Google Sheets
- Create a new sheet
- Rename it EXACTLY:

SalesData

⚠️ Must match backend code:

client.open("SalesData")

---

### 🧾 Step 7: Add Sample Data

Paste this into your sheet:

| date | sales | leads |
| --- | --- | --- |
| 2026-01-01 | 120 | 15 |
| 2026-01-02 | 200 | 25 |
| 2026-01-03 | 150 | 18 |
| 2026-01-04 | 300 | 40 |
| 2026-01-05 | 250 | 30 |

---

### 🔗 Step 8: Share Sheet with Service Account

Open your `credentials.json` and copy:

"client\_email": "your-service-account@project.iam.gserviceaccount.com"

Now:

- Open your Google Sheet
- Click **Share**
- Paste the email
- Give **Editor access**

---

✅ **THIS STEP IS CRITICAL**

Otherwise you will get:

gspread.exceptions.SpreadsheetNotFound

---

## 📡 API Endpoint

### GET `/api/analytics`

Example response:

{
  "daily": \[...\],
  "weekly": \[...\],
  "monthly": \[...\],
  "total\_sales": 1020,
  "total\_leads": 128
}

---

## ⚠️ Common Errors & Fixes

### ❌ CORS Error

Access-Control-Allow-Origin error

👉 Fix: Add this in FastAPI (`main.py`):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
---

### ❌ SpreadsheetNotFound

👉 Fix:

- Sheet name must be EXACT: `SalesData`
- Share sheet with service account email

---

### ❌ 403 Error

👉 Fix:

- Enable **Google Drive API** in Cloud Console

---

## 🎯 What This Project Demonstrates

- Full-stack integration (React + FastAPI)
- Using Google Sheets as a backend database
- Data aggregation using Pandas
- Real-time dashboards
- Clean UI/UX with charts

---

## 🔥 Future Improvements

- 🔐 Authentication system
- 📊 Advanced filters (region, product, etc.)
- ⚡ WebSocket real-time updates
- 🗄️ Database integration (PostgreSQL)
- ☁️ Deployment (Vercel + Render)

---

## 🧠 Author

**Aravind Ajai**

---

## 📄 License

MIT License
