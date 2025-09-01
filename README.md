# 🛰️ Project AURA – Cyber-Financial Threat Fusion Platform

![AURA Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) 
![Version](https://img.shields.io/badge/Version-1.0.0-blue) 
![React](https://img.shields.io/badge/React-18.3.1-61dafb) 
![Three.js](https://img.shields.io/badge/Three.js-0.168.0-000000) 
![Gemini](https://img.shields.io/badge/LLM-Gemini-ff9800)

**Project AURA** is a cutting-edge real-time **cyber threat visualization and analysis platform** enhanced with an integrated **Gemini-powered chatbot assistant**. It combines live threat feeds, 3D visualization, intelligent analytics, and AI-driven assistance for cybersecurity insights.

---

## ✨ Features

### 🔍 Real-Time Threat Monitoring
- Continuous live data stream of simulated cyber threats  
- Automated categorization by type & severity  
- Integration of multiple intelligence sources  

### 🌍 Advanced Visualization
- Interactive **3D globe** with animated threat connections  
- **3D heatmap** for time-based severity trends  
- Real-time particle & energy effects  
- Fully responsive design  

### 📊 Intelligence & Analytics
- Real-time aggregation of threat metrics  
- Pattern recognition & trend detection  
- Severity mapping with advanced classification  
- Region/country-based analysis  

### 🤖 AI Assistant (AURA)
- Floating chatbot icon (bottom-right)  
- Gemini API integration through secure Node.js proxy  
- Answers queries like *“What are the top threat sources today?”* or *“Summarize severity trends”*  
- Contextual, concise, and domain-aware responses  

---

## 🛠️ Tech Stack

### Frontend
- **React 18 + Vite** (TypeScript)  
- **Three.js + @react-three/fiber + drei** (3D rendering)  
- **Tailwind CSS + shadcn/ui** (UI/Styling)  
- **Framer Motion** (animations)  
- **React Query, Zod** (state & validation)  

### Backend
- **Node.js + Express**  
- **Gemini API** (`@google/generative-ai`)  

---

## ⚡ Quick Guide

1. **Clone repo & install**
   ```bash
   git clone <your-repo-url> aura
   cd aura
   npm install


2. **Set environment variables**

Frontend (.env.local)
VITE_API_URL=http://localhost:3000


Backend (server/.env)

GOOGLE_API_KEY=your_gemini_api_key_here
PORT=3000

3.  **Run backend**

cd server
npm install
node index.js
Backend API available at → http://localhost:3000/chat

**Run frontend**

npm run dev
Open → http://localhost:5173

**Scripts**
# Frontend
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build

# Backend
node index.js      # Run Gemini chat API


## 📊 Architecture

```mermaid
graph TD
  subgraph Frontend
    A[AuraDashboard] --> B[ThreatStats]
    A --> C[ThreatGlobe]
    A --> D[LiveTicker]
    A --> E[ThreatHeatmap]
    A --> F[ChatDock]
  end

  subgraph Backend
    X[Express API] --> Y[Gemini LLM]
  end

  F --> X



