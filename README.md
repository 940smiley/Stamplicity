# Stamplicity 🦢

**AI-Powered Stamp Identification, Valuation & eBay Listing Platform**

Stamplicity is a comprehensive platform for stamp collectors that combines AI-powered identification, automated valuation, and seamless eBay listing capabilities.

## Features

### Current (v1.0)
- ✅ **AI Stamp Identification** - Upload stamp images for automatic identification
- ✅ **Gemini-Powered Valuation** - Get estimated values using Google's Gemini AI
- ✅ **Stamp Logging** - Track your collection with sortable gallery
- ✅ **eBay Auction Recommendations** - Get suggestions for listing strategy
- ✅ **Swan-Themed UI** - Elegant, modern interface

### Roadmap
- 🚧 **YOLOv8 Object Detection** - Advanced AI stamp detection
- 🚧 **Cloud Storage Integration** - OneDrive, Google Drive, iCloud support
- 🚧 **eBay API Integration** - Direct listing to eBay
- 🚧 **Offline Listing Mode** - Create listings without network latency
- 🚧 **Background Removal** - Clean stamp images automatically
- 🚧 **Catalog Integration** - Match stamps against known catalogs
- 📋 **Multi-platform** - iOS, Windows, Linux apps

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/940smiley/Stamplicity.git
cd Stamplicity
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite 6
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS with custom swan theme

## Project Structure

```
Stamplicity/
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── StampUploader.tsx
│   │   ├── StampCard.tsx
│   │   ├── StampLog.tsx
│   │   └── ...
│   ├── services/        # API services
│   │   └── geminiService.ts
│   ├── App.tsx          # Main app component
│   ├── index.tsx        # Entry point
│   ├── types.ts         # TypeScript types
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Contributing

Contributions are welcome! This is part of a larger consolidation effort to enhance Stamplicity with features from multiple repositories.

### Development Workflow

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with ❤️ for stamp collectors
- Powered by Google Gemini AI
- Part of the Philately & Collectibles consolidation project

---

**Version**: 1.0.0  
**Last Updated**: December 2025
