# ⚡ Backend API App

A simple, beginner-friendly, and mobile-responsive **React + Vite** web application that connects to a backend API endpoint, displays connection status in real-time, safely handles loading & error states, and renders the exact API response payload.

---

## 🚀 Features

- 📱 **Mobile-Friendly & Android Native**: Responsive glassmorphic card design, ready for both web and Android Mobile App (`.apk`).
- ⚡ **Auto Fetch**: Automatically calls the backend API using a `GET` request on page load.
- 🔄 **Interactive Re-fetch**: Includes a **Check Backend** / **Try Again** button to refresh data on demand.
- 🛡️ **Safe Response Handling**: Safely parses both `JSON` and `text` responses.
- 🚦 **Status Indicator**: Clear connection status badges (`Connected ✅`, `Connection Failed ❌`, `Loading... ⏳`).
- 🤖 **Automated APK Build**: GitHub Actions workflow (`build-apk.yml`) to automatically compile downloadable Android `.apk` files.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (CSS Variables, Flexbox, Glassmorphism)
- **HTTP Client**: Native `Fetch API`

---

## 📁 Code Structure

```text
shubh/
├── .github/
│   └── workflows/
│       ├── build.yml           # GitHub Actions build & test workflow
│       └── deploy-pages.yml    # GitHub Pages deployment workflow
├── src/
│   ├── api.js                 # Backend API fetch logic & response parsing
│   ├── App.jsx                # Main UI component & state management
│   ├── App.css                # Mobile-first styling & animations
│   └── main.jsx               # Application entry point
├── index.html                 # HTML template with Google Fonts
├── package.json               # Dependencies & build scripts
├── vite.config.js             # Vite configuration & API proxy
└── README.md                  # Project documentation
```

---

## ⚙️ Quick Start

### 1. Clone & Install
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/backend-api-app.git

# Navigate into directory
cd backend-api-app

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:3001`).

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 API Endpoint Configuration

The API client logic is separated inside [`src/api.js`](src/api.js):

```javascript
const API_URL = "https://battle-helmet-nothing-girls.trycloudflare.com";

export async function checkBackend() {
  // Fetches GET /api/hello
  ...
}
```

To connect to a different backend server, simply update the `API_URL` variable in `src/api.js` or update the target in `vite.config.js`.

---

## 🤖 GitHub Actions Setup

This project includes automated CI/CD workflows:

- **Build Workflow** (`.github/workflows/build.yml`): Runs `npm run build` on every `push` or `pull_request` to `main`.
- **Deploy to GitHub Pages** (`.github/workflows/deploy-pages.yml`): Automatically deploys the built web app to your `github.io` domain.

To enable GitHub Pages:
1. Push your repository to GitHub.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Source**, select **GitHub Actions**.

---

## 📜 License

MIT License © 2026
