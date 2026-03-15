# SportSphere | The Global Guardian of Athletic Infrastructure

SportSphere is an institutional-grade sports venue management and health-informed booking ecosystem. Engineered for the modern elite athlete and arena owner, it seamlessly bridges the gap between commercial efficiency, professional aesthetics, and personal health safety.

---

## 🌟 Major Innovation (UCSC Special)
### **Health-Informed Booking Ecosystem**
Unlike traditional booking platforms, SportSphere introduces a health-first approach to sports engagement:
- **Integrated Health Dashboard**: Users input biometrics (Age, Weight, Height) to receive instant physical assessments.
- **Smart BMI Analysis**: Automatic categorization of Body Mass Index to guide sport selection.
- **Cardio Safety Zones**: Algorithmic calculation of Target Heart Rate zones to prevent overexertion.
- **Smart Recommendations**: Intelligent suggestions for suitable sports based on the user's current physical profile (e.g., Low-impact recommendations for higher BMI categories).
- **Major Clinical Reporting**: Generates professional PDF progression reports with historical data tables for long-term health tracking.

---

## 🚀 Key Features

### 1. Multi-Platform Distribution
SportSphere is designed to live where you play:
- **Android Ready**: Direct APK installation for mobile-first users.
- **Windows Desktop**: Portable ZIP distribution for arena management desks.
- **iOS Optimized**: Guided Progressive Web App (PWA) setup for iPhone users.
- **PWA v6**: Service Worker powered offline support and home screen installation.

### 2. Elite Booking Engine (v4)
- **61+ Premium Centers**: Comprehensive database of arenas across Sri Lanka (Colombo, Kandy, Galle, etc.).
- **Smart Filters**: Advanced search by sport type (Pickleball, Padel, Futsal, etc.), city, and indoor/outdoor status.
- **Real-Time Duration Selector**: Dynamic slot booking from 1 to 5 hours with instant subtotal calculation.
- **Secure Payments**: Integrated mock payment gateway (Visa/Mastercard) and "Pay Later" institutional options.

### 3. Professional Dashboards
- **User Portal**: Personalized space to track active reservations, health metrics, and "Match Day Memories."
- **Center Portal**: High-level owner interface featuring:
  - **Revenue Analytics**: Real-time line graphs for weekly yield tracking.
  - **Utilization Stats**: Intelligent occupancy monitoring.
  - **Operational Control**: System lockdown protocols and rapid booking overrides.

### 4. AI Smart Assistant (SSB Engine)
- **On-Page Intelligence**: The SportSphere Brain (SSB) provides instant support for venue queries and sports-related logic.
- **Multilingual**: Intelligent processing for both English and Sinhala queries.

### 5. Institutional Documentation
- **Pro Receipts**: Automatic generation of professional, branded PDF receipts for all transactions.
- **Health Reports**: Major PDF reports for progression tracking.

---

## 🛠️ Technology Stack & Architecture

### **Frontend Aesthetics**
- **Core**: Modern Vanilla JavaScript (Single Page Application logic).
- **Design System**: High-Aesthetic Vibrant Dark Mode with **Glassmorphism**.
- **Responsive Layer**: CSS3 Grid & Flexbox optimized for 4K displays down to mobile devices.
- **Mapping**: Integrated Google Maps API for interactive venue location previews.

### **Cloud Infrastructure (Firebase)**
- **Authentication**: Secure Google OAuth and Email/Password flows with 1-hour rolling sessions.
- **Firestore (NoSQL Database)**:
  - `users/{uid}/health_history`: Stores sub-collection records of fitness assessments.
  - `memories`: Global and user-bound media metadata.
- **Cloud Storage**: Secure bucket storage for high-resolution sports memories.
- **Hosting**: Distributed via GitHub Pages with auto-deploy pipelines.

---

## 📁 Project Structure
```text
├── assets/             # Mockups, Icons, and APK/Windows binaries
├── css/                # Core Design System (style.css)
├── js/
│   ├── firebase-config.js # Global DB & Auth configuration
│   ├── booking.js        # Core Engine (61 centers, slot logic)
│   ├── ai-brain.js       # SSB Artificial Intelligence logic
│   ├── main.js           # UI animations, ROI calculators, Charts
│   └── mode-controller.js# Offline/Online system states
├── index.html          # Main Launchpad
├── user-dashboard.html # Player Portal
├── center-dashboard.html # Owner Portal
├── user-auth.html      # Authentication Gateway
└── sw.js               # PWA Service Worker (v8)
```

---

## 📥 Deployment Instructions
1. **Clone**: `git clone https://github.com/izzath28/group-34--final-project.git`
2. **Setup**: Update `js/firebase-config.js` with your specific Firebase project credentials.
3. **Run**: Use a Live Server to open `index.html`. The Service Worker will automatically cache the local assets for PWA functionality.

---
© 2026 SportSphere Elite Infrastructure. Bridging performance and safety for the future of athletics.
