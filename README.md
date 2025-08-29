# PROJECT AURA - Cyber-Financial Threat Fusion Platform

![AURA Dashboard](https://img.shields.io/badge/Status-Active-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-61dafb) ![Three.js](https://img.shields.io/badge/Three.js-0.168.0-000000)

A cutting-edge real-time cyber threat monitoring and visualization platform that combines advanced 3D graphics, live data streaming, and intelligent threat analysis to provide comprehensive security insights.

## 🌟 Features

### Real-Time Threat Monitoring
- **Live Data Stream**: Continuous monitoring of global cyber threats
- **Geographic Visualization**: 3D globe with animated threat connections
- **Threat Classification**: Automated categorization of attack types and severity levels
- **Multi-Source Intelligence**: Integration of various threat intelligence feeds

### Advanced Visualization
- **3D Interactive Globe**: Real-time visualization of global threat landscape
- **3D Heatmap**: Time-based severity analysis with day/hour granularity
- **Animated Effects**: Dynamic visual effects for threat events
- **Responsive Design**: Optimized for various screen sizes and devices

### Intelligence Analytics
- **Threat Statistics**: Real-time aggregation of threat metrics
- **Pattern Recognition**: Identification of attack patterns and trends
- **Severity Mapping**: Advanced severity classification system
- **Geographic Analysis**: Country and region-based threat analysis

## 🏗️ Architecture

<lov-mermaid>
graph TB
    subgraph "Frontend Layer"
        A[React Dashboard] --> B[3D Globe Visualization]
        A --> C[Threat Statistics]
        A --> D[Live Ticker]
        A --> E[3D Heatmap]
    end
    
    subgraph "Visualization Engine"
        B --> F[Three.js/React-Three-Fiber]
        E --> F
        F --> G[WebGL Renderer]
    end
    
    subgraph "Data Processing"
        H[Mock Data Generator] --> I[Threat Event Processor]
        I --> J[Severity Classifier]
        I --> K[Geographic Mapper]
    end
    
    subgraph "State Management"
        L[React State] --> M[Event Store]
        M --> N[Real-time Updates]
    end
    
    H --> A
    J --> A
    K --> A
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style I fill:#e8f5e8
</lov-mermaid>

## 🚀 Technology Stack

### Core Framework
- **React 18.3.1**: Modern React with concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool and dev server

### 3D Graphics & Visualization
- **Three.js 0.168.0**: Advanced 3D graphics library
- **@react-three/fiber 8.18.0**: React renderer for Three.js
- **@react-three/drei 9.122.0**: Useful helpers for React Three Fiber

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icons

### State & Data Management
- **React Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation

## 📊 Data Flow

<lov-mermaid>
sequenceDiagram
    participant DG as Data Generator
    participant EP as Event Processor
    participant DS as Dashboard State
    participant TG as Threat Globe
    participant TH as Threat Heatmap
    participant TS as Threat Stats
    participant LT as Live Ticker
    
    DG->>EP: Generate Threat Event
    EP->>EP: Process & Classify
    EP->>DS: Update Event Store
    DS->>TG: Stream Events
    DS->>TH: Update Heatmap Data
    DS->>TS: Calculate Statistics
    DS->>LT: Add to Feed
    
    Note over TG,LT: Real-time UI Updates
</lov-mermaid>

## 🎯 Component Architecture

<lov-mermaid>
graph TD
    A[AuraDashboard] --> B[ThreatStats]
    A --> C[ThreatGlobe]
    A --> D[LiveTicker]
    A --> E[ThreatHeatmap]
    
    C --> F[Globe3D]
    C --> G[ThreatConnections]
    C --> H[EnergyCore]
    C --> I[ParticleSystem]
    
    E --> J[Heatmap3D]
    E --> K[HeatmapBar]
    E --> L[AxisLabels]
    
    B --> M[StatCard]
    B --> N[SystemStatus]
    
    D --> O[EventFeed]
    D --> P[EventItem]
    
    style A fill:#ff6b6b
    style C fill:#4ecdc4
    style E fill:#45b7d1
    style B fill:#96ceb4
    style D fill:#feca57
</lov-mermaid>

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn/pnpm equivalent)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd project-aura

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser and navigate to
# http://localhost:5173
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run build:dev    # Build for development environment
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 🎮 Usage Guide

### Dashboard Overview

The AURA dashboard consists of four main components:

1. **Left Panel - Threat Statistics**
   - Real-time threat metrics
   - System status indicators
   - Top threat types and source countries

2. **Center Panel - 3D Visualization**
   - Toggle between Globe and Heatmap views
   - Interactive 3D threat visualization
   - Real-time threat connections and effects

3. **Right Panel - Live Ticker**
   - Chronological threat event feed
   - Detailed threat information
   - Color-coded severity indicators

4. **Header - System Controls**
   - View toggle buttons
   - Analysis tools
   - System status and timestamp

### 3D Globe Visualization

<lov-mermaid>
graph LR
    A[Threat Event] --> B[Geographic Mapping]
    B --> C[3D Positioning]
    C --> D[Visual Effects]
    D --> E[Connection Lines]
    D --> F[Particle Effects]
    D --> G[Energy Pulses]
    
    style A fill:#ff9ff3
    style E fill:#54a0ff
    style F fill:#5f27cd
    style G fill:#00d2d3
</lov-mermaid>

**Features:**
- **Real-time Connections**: Animated lines between source and destination
- **Threat Particles**: Dynamic particle effects for active threats
- **Energy Core**: Central pulsating energy source
- **Geographic Accuracy**: Precise latitude/longitude positioning

### 3D Heatmap Analysis

<lov-mermaid>
graph TB
    A[Threat Events] --> B[Time Extraction]
    B --> C[Day/Hour Mapping]
    C --> D[Severity Aggregation]
    D --> E[3D Bar Rendering]
    E --> F[Color Mapping]
    
    subgraph "Severity Scale"
        G[Low: 1] --> H[Medium: 3]
        H --> I[High: 7]
        I --> J[Critical: 10]
    end
    
    D --> G
    F --> K[Visual Output]
    
    style A fill:#ff6b6b
    style E fill:#4ecdc4
    style K fill:#45b7d1
</lov-mermaid>

**Features:**
- **Time-based Analysis**: 7-day × 24-hour grid visualization
- **Severity Mapping**: Color-coded severity levels
- **Interactive Controls**: Zoom, rotate, and pan capabilities
- **Peak Detection**: Identifies high-severity time periods

## 🎨 Customization

### Theming

The application uses a comprehensive design system defined in:
- `src/index.css`: CSS custom properties and global styles
- `tailwind.config.ts`: Tailwind CSS configuration
- Component-specific styling with semantic tokens

### Adding New Threat Types

```typescript
// In AuraDashboard.tsx - generateThreatEvent function
const attackTypes = [
  'DDoS', 'Malware', 'Phishing', 'Ransomware', 
  'Data Breach', 'Your-New-Type'
];
```

### Customizing Visualizations

```typescript
// Modify globe appearance in ThreatGlobe.tsx
const globeRadius = 50; // Adjust globe size
const threatConnectionOpacity = 0.8; // Connection transparency
const particleCount = 1000; // Particle density
```

## 📈 Performance Optimization

### Event Management
- **Event Limitation**: Maximum 100 events in memory
- **Efficient Updates**: React state optimization
- **Memory Management**: Automatic cleanup of old events

### 3D Rendering
- **LOD System**: Level-of-detail for distant objects
- **Frustum Culling**: Render only visible elements
- **Efficient Geometries**: Optimized 3D meshes

### Bundle Optimization
- **Code Splitting**: Lazy loading of components
- **Tree Shaking**: Elimination of unused code
- **Asset Optimization**: Compressed textures and models

## 🔧 Configuration

### Environment Variables

```env
# Development
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3001

# Production
VITE_API_URL=https://api.aura-platform.com
VITE_WS_URL=wss://ws.aura-platform.com
```

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  }
});
```

## 🧪 Testing

### Unit Testing
```bash
npm run test          # Run unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Integration Testing
```bash
npm run test:e2e      # End-to-end tests
npm run test:visual   # Visual regression tests
```

## 📦 Deployment

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Deployment Platforms
- **Vercel**: Optimized for React applications
- **Netlify**: Static site hosting with CDN
- **AWS S3 + CloudFront**: Scalable cloud deployment

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community**: Amazing 3D graphics library
- **React Team**: Revolutionary frontend framework
- **shadcn**: Beautiful component library
- **Tailwind CSS**: Utility-first CSS framework
- **Open Source Community**: Continuous inspiration and support

## 📞 Support

For support, questions, or feature requests:
- 📧 Email: support@aura-platform.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**PROJECT AURA** - Transforming cybersecurity through intelligent visualization and real-time threat intelligence.#   A U R A 
 
 
