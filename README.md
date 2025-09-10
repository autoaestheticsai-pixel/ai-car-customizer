# AutoAesthetics - AI Car Customizer

A modern, production-ready SaaS platform for AI-powered car customization visualization. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚗 **AI-Powered Visualization**: Upload your car image and describe modifications to get photorealistic results
- 🎨 **Modern UI**: Dark theme with glassmorphism effects, smooth animations, and responsive design
- 🔒 **Privacy-First**: Images are processed securely and never stored permanently
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast**: Optimized for performance with Next.js 14 and modern web standards
- 🔍 **SEO-Ready**: Complete metadata, sitemap, and robots.txt configuration

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Gemini API key (optional for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd auto-aesthetics
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```text
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AmbientBackground.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Pages

- **/** - Home page with hero, features, and CTA
- **/visualizer** - Core AI car customization tool
- **/pricing** - Pricing plans (auth coming in v1.5)
- **/gallery** - Showcase of community creations
- **/about** - Company information and mission
- **/contact** - Contact form and information
- **/404** - Custom 404 page

## API Routes

- **/api/generate** - AI image generation endpoint
- **/api/contact** - Contact form submission

## Configuration

### Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key
- `SITE_URL` - Your production site URL
- `NEXT_PUBLIC_SITE_URL` - Public site URL for client-side

### Customization

The theme can be customized in `tailwind.config.js`:

```javascript
colors: {
  brand: {
    black: '#0B0F14',
    mid: '#121821', 
    metal: '#A7A9AC',
    blue: '#00B8FF',
    blueGlow: '#35E4FF',
  },
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- ESLint for code quality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email <support@autoaesthetics.com> or create an issue on GitHub.

---

Built with ❤️ for car enthusiasts
