# 🎓 UniHub / EventSync — Campus Events & Engagement Platform

> **A Flagship Campus Activities Coordination Ecosystem operated under RM Enterprises.**  
> **Founded & Designed by Manya Kalia.**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express_REST_API-339933?logo=nodedotjs)

---

## 🌟 Executive Summary / Overview

**UniHub (EventSync)** is an all-in-one, full-stack campus event management, student engagement, and society coordination ecosystem. It bridges the gap between **Students**, **University Clubs & Societies**, and **University Administration/Moderators**. 

Whether it is a 36-hour Hackathon, an Inter-College Cultural Fest, or a Sports Championship, UniHub streamlines event discovery, student registrations, instant digital pass generation, club onboarding approvals, and campus-wide notice broadcasts.

---

## 📐 System Architecture

UniHub is built using a **Client-Server Architecture** with a dual storage mechanism (Express REST API Backend + Client-Side Fallback LocalStorage Sync).

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                   UniHub Web Client (React 19)                 │
 │  ┌─────────────────┬───────────────────┬──────────────────────┐ │
 │  │ Student Portal  │  Club Lead Panel  │ Admin Moderator Hub  │ │
 │  └────────┬────────┴─────────┬─────────┴──────────┬───────────┘ │
 └───────────┼──────────────────┼────────────────────┼─────────────┘
             │ (REST API Fetch) │ (JWT Auth / POST)  │ (PATCH / POST)
             ▼                  ▼                    ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │             Node.js + Express.js REST API Server                │
 │                     (Port 5000 / /api/v1)                       │
 ├─────────────────┬───────────────────┬───────────────────────────┤
 │  Event Routes   │    Club Routes    │      Auth & Notices       │
 └────────┬────────┴─────────┬─────────┴─────────────┬─────────────┘
          ▼                  ▼                       ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                   JSON File Database System                     │
 │                     (server/data/db.json)                       │
 └─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### **Frontend (Web Application)**
- **Core Framework / Library**: React 19 (Hooks, Functional Components, Custom State Management)
- **Build Tool**: Vite 8 (Hot Module Replacement, lightning-fast bundling)
- **Styling & Theme Engine**: Vanilla CSS with Design System Tokens, CSS Custom Properties, Glassmorphism, Dark/Light theme switching.
- **Iconography**: Lucide React (`lucide-react`)
- **Document Export**: `jsPDF` for dynamic PDF Event Ticket & Detail generation.
- **Interactive UI Components**: Canvas Particle Animations (`InteractiveFestBackground`), Live Gen-Z Toast Engine, Device Simulator Previewer.

### **Backend (REST API Server)**
- **Runtime Environment**: Node.js (ES Modules)
- **Web Framework**: Express.js 4.x
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Cross-Origin Resource Sharing**: CORS middleware enabled for seamless frontend API integration
- **Database Engine**: Persistent JSON File Storage (`server/data/db.json`) managed by synchronous file-system read/write streams.

---

## 🔑 Key Features & User Roles

UniHub supports **3 distinct user roles**, each tailored with dedicated interfaces and workflows:

### 1. 🎓 Student & Public User Portal
- **Interactive Event Discovery**: Browse events grouped by categories (*Tech, Cultural, Sports, Workshops, Hackathons, Gaming*).
- **Real-Time Search & Filtering**: Instant title, club, and keyword filtering with live result counts.
- **Detailed Event View**: View comprehensive event schedules, eligibility guidelines, prize pools, requirements, and venue maps.
- **1-Click Registration & Pass Generation**: Fast student registration generating a unique Digital Entry Pass (`ES-XXXXXX`) with custom QR styling.
- **🎟️ My Passes & Tickets Vault**: Access, preview, and download digital tickets and passes anytime directly from the header navigation.
- **📄 PDF Export**: Export detailed event brochures and passes as downloadable PDF documents via `jsPDF`.
- **✨ Gen-Z Live Toast Notifications**: Dynamic live toasts alerting students about trending events and low capacity seats.
- **📱 Device Simulator**: Toggle between Mobile, Tablet, and Desktop viewport modes to preview responsive UI layouts.
- **🏫 Club Application Form**: Students can apply to establish new campus societies with administrative review.

---

### 2. 💃 Club Lead / Host Portal (`/login`)
- **Dedicated Dashboard**: Custom portal accessible by verified club leads (*Stacatos, CU Arcs, IEEE, etc.*).
- **Event Proposal Creation**: Submit new event proposals specifying event title, date, time, venue, capacity limit, category, banner URL, rules, prizes, and custom registration links.
- **Registration & Attendance Tracking**: Real-time counter monitoring total registrants and waiting queue counts.
- **Participant Data Export**: Export event registration rosters directly for attendance verification.
- **Club Profile Customization**: Update society display name, emoji logo, banner image, official description, and list core executive team members.

---

### 3. 🛡️ Admin / Moderator Portal (`/login`)
- **Moderation Queue**: Review incoming event proposals submitted by clubs; approve to publish live or reject/delete.
- **Single-Window Club Onboarding**: Review applications submitted by students to start new clubs. Approving automatically generates club credentials and initializes society profiles.
- **Campus Bulletin Board**: Create and broadcast urgent campus notices, policy updates, and security alerts.
- **Platform Analytics**: High-level system dashboard displaying active events, total registrations across campus, total clubs, and pending moderation tasks.

---

## 🔐 Credentials & Demo Accounts

For testing and demonstration, use the pre-configured credentials below:

| Role | Username | Password | Privileges / Description |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin` | `password` | Full moderation, club approvals, notice board management |
| **Club Lead (Dance)** | `stacatos` | `password` | Manage Stacatos Dance Society & submit events |
| **Club Lead (Sports)** | `cu_arcs` | `password` | Manage CU Arcs Sports Association & submit events |
| **Club Lead (Tech)** | `ieee` | `password` | Manage IEEE Tech Society & submit events |

---

## 📡 REST API Endpoint Documentation

The backend server runs on `http://localhost:5000/api/v1` by default.

### **Health Check**
- `GET /health` — Returns server online status and timestamp.

### **Authentication**
- `POST /auth/login` — Authenticates admin/club users and issues JWT token.

### **Events API**
- `GET /events` — Query parameters: `category`, `search`, `status` (`approved` / `pending`).
- `GET /events/:id` — Fetch detailed event object.
- `POST /events` — Submit a new event proposal.
- `PATCH /events/:id/status` — Approve, reject, or pending status change (Admin).
- `POST /events/:id/register` — Student event registration & pass issuance.
- `DELETE /events/:id` — Delete an event.

### **Clubs API**
- `GET /clubs` — Fetch list of all active campus clubs.
- `POST /clubs` — Create/add a new club directly.
- `GET /clubs/requests` — View pending club registration applications.
- `POST /clubs/requests` — Submit a new club establishment application.

### **Notices API**
- `GET /notices` — Fetch all published campus notices.
- `POST /notices` — Publish a new campus notice.

---

## 📂 Project Directory Structure

```
UniHub/
├── index.html                  # Main HTML entry point
├── package.json                # Frontend dependencies & scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Complete project documentation
├── server/                     # Express REST API Backend
│   ├── index.js                # Server entry point & route mounting
│   ├── package.json            # Backend dependencies
│   ├── data/
│   │   ├── db.json             # JSON file database
│   │   └── store.js            # Database read/write helpers & seed data
│   └── routes/
│       ├── authRoutes.js       # Auth & JWT routes
│       ├── clubRoutes.js       # Club & request management routes
│       ├── eventRoutes.js      # Event creation, registration, & approval
│       └── noticeRoutes.js     # Campus bulletin routes
└── src/                        # React Frontend Source Code
    ├── App.jsx                 # Core App layout & global state coordination
    ├── App.css                 # App-specific layout styles
    ├── index.css               # Design system, CSS variables & theme tokens
    ├── main.jsx                # React root render entry
    ├── api/
    │   └── client.js           # REST API client with fallback handlers
    ├── components/
    │   ├── Header.jsx          # Top navigation bar with theme & modal triggers
    │   ├── HeroSection.jsx     # Banner & platform stats spotlight
    │   ├── EventGrid.jsx       # Event browsing cards, search & category filters
    │   ├── EventCard.jsx       # Individual event item card
    │   ├── EventDetailModal.jsx# Full event modal & student registration form
    │   ├── MyPassesModal.jsx   # Ticket vault & pass manager modal
    │   ├── AdminDashboard.jsx  # Admin moderation & bulletin control panel
    │   ├── ClubDashboard.jsx   # Club lead event manager & profile editor
    │   ├── Login.jsx           # Unified login & club application modal
    │   ├── AboutUs.jsx         # Venture details & RM Enterprises credits
    │   ├── MottoSection.jsx    # Platform mission & vision breakdown
    │   ├── DeviceSimulator.jsx # Viewport responsive simulator
    │   ├── GenZLiveToast.jsx   # Live interactive campus toast engine
    │   ├── InteractiveFestBackground.jsx # Particle canvas background
    │   └── TypewriterTitle.jsx # Animated title component
    └── utils/
        ├── mockData.js         # Fallback seed data & mock storage
        └── pdfGenerator.js     # jsPDF brochure & pass exporter
```

---

## ⚡ Local Setup & Installation Guide

Follow these steps to run UniHub on your local development machine:

### **Prerequisites**
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)

---

### **1️⃣ Frontend Setup**
```bash
cd UniHub

# Install frontend dependencies
npm install

# Start Vite Development Server
npm run dev
```
> The frontend application will run at: `http://localhost:5173`

---

### **2️⃣ Backend Setup (Express REST API)**
In a separate terminal window:

```bash
cd server

# Install backend dependencies
npm install

# Start Backend Express Server
npm run dev
```
> The backend server will run at: `http://localhost:5000`

---

## 🏢 Enterprise & Operational Credits

- **Platform Name**: EventSync / UniHub
- **Parent Venture**: **RM Enterprises**
- **Founder & Architect**: **Manya Kalia**
- **Core Mission**: Empowering campus culture, streamlining event logistics, and driving student engagement with state-of-the-art web technology.

---

&copy; 2026 **UniHub / EventSync** &bull; An **RM Enterprises** Venture. All rights reserved.
