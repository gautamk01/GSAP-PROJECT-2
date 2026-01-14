# GSAP Animation Project 2

A stunning React-based web application showcasing advanced scroll-driven animations using GSAP (GreenSock Animation Platform), featuring interactive Lottie animations and smooth scrolling effects.

🌐 **[Live Demo](https://gautamk01.github.io/GSAP-PROJECT-2/)**

## 📖 Overview

This project is a modern, interactive web experience that demonstrates the power of GSAP animations combined with React. It features multiple animated slides with Lottie characters that respond dynamically to scroll behavior, creating an engaging and immersive user experience.

## ✨ Animation Effects

### 1. **Smooth Scroll Integration**

- **Lenis Smooth Scroll**: Implemented buttery-smooth scrolling throughout the entire application
- Synchronized with GSAP's ScrollTrigger for seamless animation playback
- Lag smoothing for optimal performance

### 2. **Hero Section Animations**

- **Dynamic Image Scaling**: Hero image responsively scales down from full size to 150-300px (based on viewport) as user scrolls
- **Lottie Duck Animation**:
  - Scroll-controlled frame-by-frame animation (3 pixels per frame)
  - Directional awareness: Duck flips horizontally based on scroll direction (up/down)
  - Vertical offset animation as user scrolls into the About section
  - Responsive offset calculation for different screen sizes
- **Intelligent Animation Pause**: Duck animation pauses during vertical movement to prevent conflicts

### 3. **Popeye Slide Animation**

- **Horizontal Slide-In**: Container slides from right (100%) to center (0%) in the first 50% of scroll progress
- **Independent Character Movement**: Popeye walks independently across the screen (200vw movement) in the second 50% of scroll progress
- **Scroll-Driven Frame Animation**: Lottie animation frames controlled by scroll distance
- **Directional Flip**: Character flips horizontally based on scroll direction
- **Fade-In Effect**: Smooth opacity transition during the first 15% of scroll progress
- **Synchronized Fade-Out**: Fades out when Thank You slide approaches

### 4. **Music Man Slide Animation**

- **Opposite Horizontal Entry**: Slides from left (-100%) to center (0%)
- **Two-Phase Movement**:
  - Phase 1 (0-50%): Container positioning
  - Phase 2 (50-100%): Character walks right across the screen (200vw)
- **Frame-by-Frame Animation**: Scroll-controlled Lottie playback
- **Mirror Flip**: Character orientation changes with scroll direction
- **Coordinated Fade-Out**: Synchronized with Popeye slide when Thank You appears

### 5. **Thank You Slide Animation**

- **Full Journey Animation**: Tourists car travels from left (-100%) to right (+200%)
- **Rapid Fade-In**: Quick opacity transition in the first 10% of scroll
- **Continuous Motion**: Single-phase continuous horizontal movement
- **Scroll-Synced Animation**: Lottie frames advance with scroll distance

### 6. **Advanced ScrollTrigger Features**

- **Scrub Animation**: All animations are smoothly scrubbed (value: 1) for precise control
- **Progress-Based Calculations**: Animations calculated based on scroll progress percentage
- **Multiple Trigger Points**: Different sections trigger at different scroll positions
- **Viewport-Aware Triggers**: Start/end points calibrated for optimal viewing experience

### 7. **Performance Optimizations**

- **useRef for Non-Reactive State**: Scroll direction tracked without triggering re-renders
- **Conditional Animation Updates**: Animations only update when necessary
- **Single Event Listener**: Centralized scroll tracking per component
- **useGSAP Hook**: Proper GSAP cleanup and lifecycle management

### 8. **Responsive Animation Behavior**

- **Adaptive Target Widths**: Different scaling targets for mobile (150px), tablet (200px), and desktop (300px)
- **Dynamic Offset Calculations**: Animation distances adjust based on viewport size
- **Breakpoint-Aware Logic**: Different multipliers for screens < 768px

## 🛠️ Technologies Used

- **React** (v19.2.0) - UI framework
- **GSAP** (v3.14.2) - Advanced animation library
- **@gsap/react** (v2.1.2) - React hooks for GSAP
- **ScrollTrigger** - GSAP plugin for scroll-driven animations
- **Lenis** (v1.3.17) - Smooth scrolling library
- **Lottie React** (v2.4.1) - Lottie animation renderer
- **Vite** (v7.2.4) - Build tool and dev server

## 📁 Project Structure

```
pr2/
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Hero section with duck animation
│   │   ├── About.jsx           # About section
│   │   ├── PopeyeSlide.jsx     # Popeye walking animation slide
│   │   ├── MusicManSlide.jsx   # Music man animation slide
│   │   ├── ThankYouSlide.jsx   # Final slide with tourists
│   │   └── Nav.jsx             # Navigation component
│   ├── assets/
│   │   ├── Duck.json           # Lottie animation data
│   │   ├── Popeye Walking.json
│   │   ├── Music Man.json
│   │   └── Tourists by car.json
│   ├── styles/
│   │   └── App.css             # Main stylesheet
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── public/
│   └── img/                    # Static images
├── index.html                  # HTML template
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gautamk01/GSAP-PROJECT-2.git
cd GSAP-PROJECT-2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Key Features

- **Scroll-Controlled Animations**: All animations are driven by scroll progress
- **Responsive Design**: Adapts to different screen sizes with optimized animations
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience
- **Interactive Characters**: Lottie animations that respond to scroll direction
- **Performance Optimized**: Efficient rendering with React hooks and GSAP best practices
- **Modular Architecture**: Clean component-based structure for maintainability

## 🌐 Deployment

This project is configured for deployment to GitHub Pages. To deploy:

```bash
npm run deploy
```

The site will be available at: **[https://gautamk01.github.io/GSAP-PROJECT-2/](https://gautamk01.github.io/GSAP-PROJECT-2/)**

## 👤 Author

**Gautam K**

- GitHub: [@gautamk01](https://github.com/gautamk01)

## 🙏 Acknowledgments

- GSAP by GreenSock for the powerful animation library
- Lottie by Airbnb for the animation format
- Lenis for smooth scrolling capabilities

---

⭐ If you found this project interesting, please consider giving it a star!
