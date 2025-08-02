# Multi-Agent Architectures - Open Source Collaboration Platform

A modern, responsive web application for discovering and sharing multi-agent AI architectures. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Grid-based Architecture Display**: Responsive grid layout showcasing different multi-agent architectures
- **Smooth Modal System**: Detailed architecture views with smooth fade-in/fade-out animations
- **Advanced Search & Filtering**: Search by title, description, tags, or author with category and sort filtering
- **Performance Metrics**: Visual performance indicators for scalability, complexity, and reliability
- **Responsive Design**: Mobile-first design that works across all devices
- **Modern UI**: Clean, modern interface with indigo blue color scheme and smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image Optimization
- **Icons**: Heroicons (SVG)
- **Deployment**: Static Site Generation (SSG)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/awesome-multi-agent-architectures.git
cd awesome-multi-agent-architectures
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── Header.tsx        # Navigation header
│   ├── SearchBar.tsx     # Search functionality
│   ├── FilterPanel.tsx   # Category and sort filters
│   ├── ArchitectureGrid.tsx    # Grid layout
│   ├── ArchitectureCard.tsx    # Individual architecture cards
│   └── ArchitectureModal.tsx   # Detailed modal view
├── data/
│   └── architectures.ts  # Sample architecture data
├── types/
│   └── index.ts          # TypeScript definitions
└── utils/
    └── helpers.ts        # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: RGB(10, 110, 255) - Indigo blue
- **Primary Light**: RGB(66, 153, 255)
- **Primary Dark**: RGB(8, 88, 204)
- **Background**: White (#FFFFFF)
- **Surface**: Light gray (#F8F9FA)
- **Text Primary**: Dark gray (#1A202C)
- **Text Secondary**: Medium gray (#4A5568)

### Components
- **Border Radius**: 8px for cards, 6px for buttons
- **Shadows**: Subtle drop shadows with soft blur
- **Transitions**: 200-300ms ease-in-out for hover effects
- **Typography**: Inter font with proper hierarchy

## 📱 Responsive Design

- **Mobile**: Single column grid, collapsible navigation
- **Tablet**: 2-column grid, adjusted spacing
- **Desktop**: 3-4 column grid, full navigation
- **Large Desktop**: Up to 4-5 columns with max-width container

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Sample Architectures

The application includes 5 sample multi-agent architectures:

1. **Multi-Agent Reasoning Chain**: Sequential agent collaboration
2. **Hierarchical Agent Network**: Manager-worker agent structure
3. **Distributed Agent Swarm**: Peer-to-peer agent communication
4. **Specialized Agent Pipeline**: Domain-specific agent workflows
5. **Adaptive Agent Ensemble**: Dynamic agent selection system

## 🚀 Deployment

The application is optimized for static site generation and can be deployed to:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the design aesthetics of prompt.chat
- Built with modern web technologies for optimal performance
- Designed for accessibility and user experience

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ by the Multi-Agent Architectures Community 