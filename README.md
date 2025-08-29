# 🛰️ Project AURA – Cyber-Financial Threat Fusion Platform

![AURA Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) 
![Version](https://img.shields.io/badge/Version-1.0.0-blue) 
![React](https://img.shields.io/badge/React-18.3.1-61dafb) 
![Three.js](https://img.shields.io/badge/Three.js-0.168.0-000000) 
![Gemini](https://img.shields.io/badge/LLM-Gemini-ff9800)

**Project AURA** is a real-time **cyber threat visualization & analysis platform** with an integrated **Gemini-powered chatbot**.

---

## ✨ Features

- 🌍 **3D Globe Visualization**: Interactive display of global threat activity  
- 🔥 **Real-Time Threat Feed**: Stream of simulated cyber events  
- 📊 **Threat Analytics**: Severity classification, geo-mapping, trend detection  
- 🤖 **AI Assistant (Gemini)**: Floating chatbot that answers queries about threats & trends  

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite + TypeScript
- Three.js + @react-three/fiber + drei
- Tailwind CSS + shadcn/ui
- React Query, Framer Motion

**Backend**
- Node.js + Express
- Google Gemini API (`@google/generative-ai`)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url> aura
cd aura
npm install
2. Setup Environment Variables
Frontend (.env.local)
env
Copy code
VITE_API_URL=http://localhost:3000
Backend (server/.env)
env
Copy code
GOOGLE_API_KEY=your_gemini_api_key_here
PORT=3000
👉 Get a key at Google AI Studio.

3. Run the Backend (Chat API)
bash
Copy code
cd server
npm install
node index.js
➡️ API runs at http://localhost:3000

4. Run the Frontend
bash
Copy code
npm run dev
➡️ App runs at http://localhost:5173

🤖 Using the Chatbot
Click the floating 🤖 bot icon (bottom-right corner).

Ask questions like:

“What are today’s top threat sources?”

“Show me severity trends.”

Gemini responds with insights in real time.

📦 Scripts
bash
Copy code
# Frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build

# Backend
node index.js      # Start chat API
📊 Architecture
mermaid
Copy code
graph TD
  subgraph Frontend
    A[React Dashboard] --> B[3D Globe]
    A --> C[Heatmap]
    A --> D[Threat Stats]
    A --> E[ChatDock]
  end

  subgraph Backend
    F[Express API] --> G[Gemini LLM]
  end

  E --> F
🔧 Troubleshooting
"Failed to fetch" error

Backend not running? Start with node index.js

Check .env.local → VITE_API_URL=http://localhost:3000

Chatbot replies empty

Wrong/missing Gemini API key

Test backend with:

bash
Copy code
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello Gemini"}]}'
🤝 Contributing
Fork the repo

Create a feature branch

Commit changes

Push and open a PR 🚀

📄 License
MIT License – see LICENSE

PROJECT AURA – Transforming cybersecurity with real-time visualization & AI insights.
