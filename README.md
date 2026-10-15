# MOSLIN - Premium Custom Fashion Platform

## Overview

MOSLIN is a premium modern-heritage custom fashion website where customers design and personalize their own clothing. The brand philosophy is **"Design It, Visualize It, Make It Yours."**

Instead of browsing pre-designed collections, customers create unique outfits by selecting every detail—from fabric and color to collar styles, sleeves, cuffs, buttons, and embroidery.

## Key Features

### 🎨 Customization Studio
- **Budget Selection**: Choose from Essential ($150–300), Exclusive ($300–600), or Tailored ($600+) tiers
- **Garment Selection**: Shirts, blazers, trousers, dresses, skirts, and more
- **Fabric Library**: Premium materials including cotton, silk, linen, wool, and cashmere
- **Color Picker**: Preset colors or custom hex input
- **50+ Customization Options**:
  - Collar styles (spread, point, button-down, mandarin, shawl)
  - Sleeve options (short, 3/4, long, rolled, cap)
  - Cuffs, buttons, pockets, fit, length
  - Embroidery and special details
  - Monogram and initials

### 💎 Smart Features
- **Real-time Price Calculation**: Dynamic pricing based on selections
- **2D Outfit Preview**: Visual representation of your design
- **Design Persistence**: Auto-save drafts locally and to database
- **Design Management**: Save, edit, duplicate, and organize designs
- **Measurement Tracking**: Store body measurements for perfect fit
- **Order Tracking**: Real-time production status (7-step timeline)

### 💳 Flexible Payment
- **25% Advance Payment**: Secure your design immediately
- **75% Balance on Production**: Pay the remainder when manufacturing begins
- **Transparent Pricing**: Complete breakdown of all costs

### 👤 Customer Account
- Dashboard with quick access to designs and orders
- Saved designs and wishlist
- Order history with production tracking
- Saved measurements and visual guides
- Payment history

## Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (customization, cart, user)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (future implementation)
- **Payments**: Stripe (25%/75% split payment flow)
- **Hosting**: Vercel (recommended) or AWS
- **Storage**: AWS S3 for design images and fabric swatches

## Project Structure

```
moslin/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (marketing)/
│   │   │   └── page.tsx              # Homepage
│   │   ├── studio/                   # Customization studio
│   │   │   └── page.tsx
│   │   ├── checkout/                 # Payment & order
│   │   │   └── page.tsx
│   │   ├── account/                  # User dashboard
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── designs/page.tsx      # Saved designs
│   │   │   ├── orders/page.tsx       # Order history & tracking
│   │   │   └── measurements/page.tsx # Body measurements
│   │   ├── api/                      # Backend endpoints
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── studio/
│   │   │   ├── budget-selector.tsx
│   │   │   ├── category-selector.tsx
│   │   │   ├── fabric-selector.tsx
│   │   │   ├── color-picker.tsx
│   │   │   ├── customization-panel.tsx
│   │   │   ├── outfit-preview.tsx
│   │   │   └── design-summary.tsx
│   │   ├── common/
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/
│   │   │   └── primitives.tsx        # Button, Input, Select, Card, Badge
│   │   ├── hero-section.tsx
│   │   ├── how-it-works.tsx
│   │   └── benefits-section.tsx
│   ├── store/
│   │   ├── customization-store.ts    # Zustand store for design state
│   │   ├── cart-store.ts             # Shopping cart state
│   │   └── user-store.ts             # User authentication & profile
│   ├── lib/
│   │   ├── pricing.ts                # Pricing calculation engine
│   │   └── validators.ts             # Input validation (zod)
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   └── styles/                       # Additional CSS modules
├── prisma/
│   └── schema.prisma                 # Database schema
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.local                        # Environment variables
```

## Database Schema

### Core Models
- **User**: Authentication and profile
- **Design**: Custom outfit designs (stores customizations as JSON)
- **Order**: Orders with pricing and status
- **Measurement**: Saved body measurements
- **Fabric**: Available fabric options
- **CustomizationOption**: Predefined customization choices
- **Accessory**: Complementary items (future feature)

## Design System

### Typography
- **Headings**: Playfair Display (serif) - premium, elegant feel
- **Body**: Inter (sans-serif) - clean, readable
- **Line Height**: 1.6+ for generous readability

### Color Palette
- **Primary**: Deep navy/slate (#1e293b)
- **Accent**: Amber/gold (#d97706)
- **Success**: Green (#10b981)
- **Neutral**: Whites, light grays, beige

### Layout
- Mobile-first responsive design
- Max-width: 1280px for content
- Generous whitespace (2–4rem margins)
- 12-column grid system

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/moslin/moslin.git
cd moslin

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npx prisma migrate dev --name init
npx prisma db seed # (optional: seed sample data)

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints (MVP)

```
Authentication
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout

User
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/measurements
POST   /api/user/measurements

Designs
GET    /api/designs
POST   /api/designs
GET    /api/designs/:id
PUT    /api/designs/:id
DELETE /api/designs/:id
POST   /api/designs/:id/duplicate

Orders
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
GET    /api/orders/:id/status

Checkout
POST   /api/checkout/create-payment-intent
POST   /api/checkout/confirm-payment

Reference Data
GET    /api/fabrics
GET    /api/customization-options
GET    /api/pricing/calculate
```

## Development Workflow

### Running Tests
```bash
npm run test              # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Linting & Formatting
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix issues
npm run format           # Format with Prettier
```

### Type Checking
```bash
npm run type-check       # Check TypeScript
```

## Deployment

### Vercel (Recommended)
```bash
# Connect your GitHub repo to Vercel
# Environment variables are configured in Vercel dashboard
npm run build
vercel deploy
```

### Docker
```bash
docker build -t moslin .
docker run -p 3000:3000 moslin
```

## Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: ISR (Incremental Static Regeneration) for homepage
- **Database**: Indexed queries, connection pooling
- **Lighthouse Target**: 80+ across all metrics

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Focus indicators

## Security

- Environment variable management
- SQL injection prevention (Prisma)
- CSRF protection
- XSS prevention
- Secure payment handling (Stripe)
- Rate limiting (future)

## Future Enhancements (Phase 2+)

- **3D Preview**: Three.js integration for interactive outfit visualization
- **Virtual Try-On**: AR technology for fitting
- **AI Recommendations**: Smart accessory and color suggestions
- **Subscription Plans**: Loyalty and bulk ordering
- **Collaboration**: Share designs with friends
- **Sustainability Tracking**: Carbon footprint per design
- **Custom Patterns**: Upload and use custom fabric patterns
- **Video Guides**: How-to measurement and styling videos

## Production Workflow

1. **Design Confirmation** → Customer approves final design
2. **Payment** → 25% advance payment collected via Stripe
3. **Measurement Verification** → QA team verifies measurements
4. **Production** → Artisans handcraft the garment
5. **Quality Check** → Final inspection and packaging
6. **Packaging** → Branded packaging and shipping label
7. **Shipping** → Order ships, customer tracks delivery
8. **Delivery** → Customer receives bespoke creation

## Support & Contact

- **Email**: support@moslin.com
- **FAQ**: /faq
- **Terms of Service**: /terms
- **Privacy Policy**: /privacy

## License

MOSLIN is proprietary software. All rights reserved.

## Contributing

Internal team only. Contributions via pull requests require review and approval.

---

**MOSLIN**: Design It. Visualize It. Make It Yours. ✨
