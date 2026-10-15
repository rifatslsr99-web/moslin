# MOSLIN Setup Guide

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/moslin"

# Stripe (get keys from https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# NextAuth
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3 (optional, for production)
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_S3_BUCKET="moslin-designs"
AWS_REGION="us-east-1"
```

### 2. Database Setup

```bash
# Install PostgreSQL if not already installed
# On Windows: https://www.postgresql.org/download/windows/
# On Mac: brew install postgresql
# On Linux: sudo apt-get install postgresql

# Create the MOSLIN database
createdb moslin

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed sample data
npx prisma db seed
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Features by Page

### Homepage (`/`)
- Hero section with brand messaging
- 6-step "How It Works" guide
- Benefits showcase (personalization, quality, sustainability, etc.)
- Call-to-action buttons linking to studio

### Customization Studio (`/studio`)
**6-Step Flow:**
1. **Budget Selection** - Choose tier (Essential, Exclusive, Tailored)
2. **Category Selection** - Pick garment type
3. **Fabric Selection** - Choose material with upcharge info
4. **Color Picker** - Select from presets or custom hex
5. **Customizations** - 8+ customization categories
6. **Review** - Approve design, set name, proceed to checkout

**Features:**
- Real-time price calculation
- 2D outfit preview with color visualization
- Live customization updates
- Save design for later
- Add to cart

### Checkout (`/checkout`)
- Cart summary with all items
- Billing information form
- Order summary with payment plan breakdown
- 25% advance payment processing
- Order confirmation

### Account Dashboard (`/account`)
- Quick access buttons (Create, Designs, Orders, Measurements)
- Recent designs preview
- Recent orders preview
- Profile card with email
- Measurements quick access
- Stats (total designs, orders, member since)

### My Designs (`/account/designs`)
- Grid view of all saved designs
- Filter by status (All, Saved, Draft, Ordered)
- Edit, duplicate, delete actions
- Design metadata (category, budget, creation date)
- Create new design CTA

### My Orders (`/account/orders`)
- Complete order details
- 8-step production timeline with progress indicator
- Payment status tracking
- Advance payment received ✓
- Remaining balance pending status
- Invoice and spec sheet download options
- Delivery/order date tracking

### Measurements (`/account/measurements`)
- 7 key body measurements (chest, waist, hips, inseam, shoulder width, arm length, neck)
- Visual guidance for each measurement
- Tips for accurate measuring
- Save measurements for future orders
- Auto-populate for new designs

## Key Components

### Studio Components
- `budget-selector.tsx` - Tier selection with feature comparison
- `category-selector.tsx` - Garment type picker
- `fabric-selector.tsx` - Material selection with pricing
- `color-picker.tsx` - Hex input + preset colors
- `customization-panel.tsx` - Accordion of options
- `outfit-preview.tsx` - Live preview + pricing sidebar
- `design-summary.tsx` - Final review before checkout

### Common Components
- `header.tsx` - Navigation bar with logo and CTA
- `footer.tsx` - Brand footer with links
- `hero-section.tsx` - Landing page hero
- `how-it-works.tsx` - 6-step process guide
- `benefits-section.tsx` - Value propositions

### UI Primitives
- `Button` - Multiple variants (primary, secondary, outline, ghost)
- `Input` - Text input with label and error support
- `Select` - Dropdown with options
- `Card` - Container component
- `Badge` - Status labels

## Zustand Stores

### `customization-store.ts`
Manages the current design being created:
- Budget, category, fabric, color selection
- Customizations object
- Real-time pricing
- Auto-calculated advance/remaining balance
- Save and load designs
- Reset functionality

### `cart-store.ts`
Manages shopping cart:
- Add/remove items
- Update quantities
- Calculate total price
- Clear cart on checkout

### `user-store.ts`
Manages user state:
- Authenticated user data
- Saved measurements
- Loading state

## Pricing System

### Base Prices by Tier
```
Essential:  Shirt $150, Blazer $200, Trousers $120, Dress $180, Skirt $140
Exclusive:  Shirt $300, Blazer $450, Trousers $280, Dress $400, Skirt $320
Tailored:   Shirt $600, Blazer $900, Trousers $550, Dress $800, Skirt $700
```

### Additional Charges
```
Fabric upcharge: $0–150 depending on material
Customizations: $5–30 per option (collar, sleeves, embroidery, etc.)
Tax: 8%
Shipping: $15 flat rate
```

### Payment Split
```
Total Price = Base + Fabric + Customizations + Tax + Shipping
Advance Payment = 25% of total
Remaining Balance = 75% of total
```

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma studio      # Open Prisma Studio (UI for database)
npx prisma migrate dev # Create new migration
npx prisma db push     # Push schema to database
npx prisma db seed     # Run seed script

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
npm run format          # Format with Prettier

# Testing (when implemented)
npm run test            # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Design System Reference

### Colors
```
Primary (Navy):    #1e293b / #334155
Accent (Gold):     #d97706 / #f59e0b
Success (Green):   #10b981
Warning (Amber):   #f59e0b
Error (Red):       #ef4444
Neutral Light:     #f8fafc
Neutral Border:    #e2e8f0
```

### Typography
```
Serif (Headings):     Playfair Display
Sans-serif (Body):    Inter
Line Height:          1.6
Font Weight (Bold):   600
```

### Spacing
```
Mobile:   1rem
Tablet:   2rem
Desktop:  3rem
Max Width: 1280px
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
```bash
# Verify PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Check connection string in .env.local
# Format: postgresql://user:password@localhost:5432/dbname
```

### Port Already in Use
```bash
# Change the port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
npm run type-check      # Check for errors
npm install            # Reinstall dependencies
```

## Next Steps

1. **Database**: Set up PostgreSQL and run migrations
2. **Environment**: Configure .env.local with Stripe keys
3. **Development**: Run `npm run dev` and test the flow
4. **Authentication**: Implement NextAuth.js login (Phase 2)
5. **Payments**: Integrate Stripe payment processing
6. **API**: Build backend endpoints for CRUD operations
7. **Testing**: Add unit and integration tests
8. **Deployment**: Deploy to Vercel or AWS

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Stripe Docs](https://stripe.com/docs)

---

For questions or issues, reach out to the development team.
