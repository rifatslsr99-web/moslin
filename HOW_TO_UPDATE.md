# MOSLIN Website Update Guide

**For**: Future developers and maintainers  
**Last Updated**: October 15, 2026  
**Framework**: Next.js 14 + TypeScript + Tailwind CSS

---

## Quick Reference: Common Updates

### 1. Update Homepage Content

**File**: `src/app/page.tsx`

To change the hero message:
```typescript
// Find this in hero-section.tsx:
<h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-serif">
  Design It,<br />
  <span className="text-amber-600">Visualize It,</span>
  <br />
  Make It Yours
</h1>

// Edit the text directly
```

To add/remove sections:
```typescript
// In src/app/page.tsx, modify the imports and JSX
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { BenefitsSection } from "@/components/benefits-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      {/* Add new sections here */}
    </div>
  );
}
```

---

### 2. Update Colors & Design System

**File**: `src/app/globals.css`

Change the primary color:
```css
:root {
  --primary: #1e293b; /* Change this hex code */
  --accent: #d97706;   /* Or this one */
}
```

All components automatically use these CSS variables. Changes apply site-wide.

**For Tailwind Classes**: Edit `tailwind.config.ts` to extend color palette:
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        'moslin-primary': '#1e293b',
        'moslin-accent': '#d97706',
      }
    }
  }
}
```

---

### 3. Add New Customization Options

**File**: `src/components/studio/customization-panel.tsx`

Add a new category:
```typescript
const CUSTOMIZATION_OPTIONS = [
  {
    category: "Collar",
    type: "collar",
    options: ["Spread", "Point", "Button-down", "Mandarin", "Shawl"],
  },
  // ADD NEW CATEGORY HERE:
  {
    category: "New Feature",
    type: "newFeature",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];
```

**Update pricing** in `src/lib/pricing.ts`:
```typescript
const CUSTOMIZATION_FEES: Record<string, number> = {
  collar: 15,
  sleeve: 20,
  newFeature: 25,  // Add your fee here
};
```

---

### 4. Update Budget Tiers & Pricing

**File**: `src/lib/pricing.ts`

Change base prices:
```typescript
const BASE_PRICES: Record<string, Record<string, number>> = {
  Essential: {
    shirt: 150,    // Change price here
    blazer: 200,
    trousers: 120,
  },
  Exclusive: {
    shirt: 300,
    blazer: 450,
    // ...
  },
  Tailored: {
    // ...
  },
};
```

Change tax or shipping:
```typescript
const TAX_RATE = 0.08;        // Change from 8% to something else
const SHIPPING_COST = 15;     // Change from $15 flat rate
```

---

### 5. Update Product Categories

**File**: `src/components/studio/category-selector.tsx`

Add a new garment type:
```typescript
const CATEGORIES = [
  { name: "shirt", label: "Shirt", icon: "👕", description: "Casual or formal shirts" },
  { name: "blazer", label: "Blazer", icon: "🧥", description: "Professional blazers" },
  // ADD HERE:
  { name: "coat", label: "Coat", icon: "🧥", description: "Winter coats and outerwear" },
];
```

Also update pricing in `src/lib/pricing.ts` to include "coat".

---

### 6. Update Fabrics

**File**: `src/components/studio/fabric-selector.tsx`

Add new fabric options:
```typescript
const FABRICS = [
  {
    id: "cotton",
    name: "Premium Cotton",
    color: "Natural",
    upcharge: 0,
    description: "Breathable and comfortable for everyday wear",
  },
  // ADD HERE:
  {
    id: "polyester-blend",
    name: "Polyester Blend",
    color: "Various",
    upcharge: 20,
    description: "Wrinkle-resistant and easy to care for",
  },
];
```

---

### 7. Update Navigation Links

**File**: `src/components/common/header.tsx`

Add new navigation items:
```typescript
<nav className="hidden md:flex items-center gap-8">
  <Link href="/studio" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
    Create Design
  </Link>
  <Link href="/account" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
    My Account
  </Link>
  {/* ADD HERE: */}
  <Link href="/blog" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
    Blog
  </Link>
</nav>
```

---

### 8. Update Prices in Display

**File**: `src/components/studio/outfit-preview.tsx` (or any component showing prices)

The pricing automatically updates from the store:
```typescript
const { currentDesign } = useCustomizationStore();
const pricing = currentDesign.pricing;

// This displays automatically:
<span className="font-bold text-lg text-slate-900">${pricing.total}</span>
```

No manual changes needed if you update `pricing.ts`.

---

### 9. Add New Page

**Steps**:

1. Create new folder: `src/app/newpage/`
2. Create file: `src/app/newpage/page.tsx`
3. Add content:
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 font-serif">
          New Page Title
        </h1>
        {/* Your content here */}
      </div>
    </div>
  );
}
```

4. Add link in header (step 7 above)

---

### 10. Update Copy/Text Content

**Homepage hero**: `src/components/hero-section.tsx`  
**How it works**: `src/components/how-it-works.tsx`  
**Benefits**: `src/components/benefits-section.tsx`  
**Footer**: `src/components/common/footer.tsx`  

Just find the text in the component and edit it directly.

---

## Advanced Updates

### Update User Dashboard Content

**File**: `src/app/account/page.tsx`

Mock data can be replaced with API calls once Phase 2 is complete:

```typescript
// Currently uses mock data:
const recentDesigns = [
  { id: 1, name: "Navy Formal Shirt", category: "shirt", status: "saved" },
];

// Will become:
const { data: recentDesigns } = useSWR('/api/designs?limit=2', fetch);
```

---

### Update Order Tracking Steps

**File**: `src/app/account/orders/page.tsx`

Modify the production timeline:
```typescript
const ORDER_STATUSES = [
  { key: "design_confirmed", label: "Design Confirmed", completed: true },
  { key: "payment_received", label: "Payment Received", completed: true },
  // ...
  { key: "new_status", label: "New Status", completed: false },
];
```

---

### Update Account Dashboard Sections

**File**: `src/app/account/page.tsx`

Add new dashboard cards:
```typescript
{/* New section */}
<Card>
  <h3 className="font-bold text-slate-900 mb-4">New Feature</h3>
  <p className="text-slate-600">Description here</p>
  <Button className="mt-4">Action Button</Button>
</Card>
```

---

## Development Workflow

### Local Development
```bash
cd C:\Users\Lemon\moslin

# Start dev server
npm run dev

# Visit http://localhost:3000
# Changes auto-refresh in browser
```

### Making Changes Safely
```bash
# 1. Create a new branch (once Git is set up)
git checkout -b feature/my-update

# 2. Make your changes

# 3. Test locally
npm run dev

# 4. Build to check for errors
npm run build

# 5. Commit changes
git add .
git commit -m "Update: description of changes"

# 6. Push to GitHub
git push origin feature/my-update

# 7. Create Pull Request for review
```

---

## File Structure Quick Reference

```
src/
├── app/                          # Pages & routes
│   ├── page.tsx                  # Homepage
│   ├── studio/page.tsx           # Customization
│   ├── checkout/page.tsx         # Cart/Payment
│   ├── account/                  # Dashboard pages
│   ├── globals.css               # Global colors & styles
│   └── layout.tsx                # Root layout + Header/Footer
├── components/                   # Reusable components
│   ├── studio/                   # Customization UI
│   ├── common/                   # Header, Footer
│   ├── ui/                       # Button, Input, Card, Badge
│   └── hero-section.tsx          # Homepage sections
├── store/                        # Zustand state management
│   ├── customization-store.ts    # Design state
│   ├── cart-store.ts             # Shopping cart
│   └── user-store.ts             # User data
├── lib/
│   ├── pricing.ts                # Price calculations
│   └── validators.ts             # Input validation
└── types/
    └── index.ts                  # TypeScript types
```

---

## Common Issues & Solutions

### Issue: Changes not showing
**Solution**: 
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Type errors after editing
**Solution**:
```bash
npm run type-check
# Fix the errors shown
```

### Issue: Styling looks wrong
**Solution**:
1. Check if Tailwind class is spelled correctly
2. Verify CSS variables in `globals.css`
3. Clear cache: `rm -rf .next && npm run dev`

### Issue: Need to add custom font
**Solution**: In `src/app/layout.tsx`:
```typescript
import { NewFont } from "next/font/google";

const newFont = NewFont({
  variable: "--font-custom",
  subsets: ["latin"],
});

// Then use in JSX:
className={`${newFont.variable}`}
```

---

## Testing Your Changes

### Quick Test
```bash
npm run dev
# Visit http://localhost:3000
# Click through pages and features
```

### Build Test
```bash
npm run build
# If successful, no errors shown
```

### Type Check
```bash
npm run type-check
# Should show "No errors!"
```

---

## Adding New Packages

### Install a package
```bash
npm install package-name
```

### Add to specific part of app
1. Find where you need it
2. `import` at top of file
3. Use in code

### Examples:
```typescript
// Add icon library
npm install react-icons
import { FiHome } from "react-icons/fi";

// Add form validation
npm install zod
import { z } from "zod";

// Add data fetching
npm install swr
import useSWR from 'swr';
```

---

## Deployment Updates

### Test Build
```bash
npm run build
npm start
# Visit http://localhost:3000
```

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Or manually: vercel deploy --prod
```

### Rollback if Issues
```bash
# Revert last commit
git revert HEAD

# Or deploy previous version from Vercel dashboard
```

---

## Phase 2 Updates (Backend)

Once Phase 2 is complete, connect frontend to real API:

### Example: Replace mock data
```typescript
// OLD (mock):
const designs = [
  { id: 1, name: "Navy Shirt", ... }
];

// NEW (API):
import useSWR from 'swr';

export default function DesignsPage() {
  const { data: designs, error, isLoading } = useSWR('/api/designs');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading designs</div>;
  
  return (
    // Display designs
  );
}
```

---

## Documentation Files to Read First

1. **README.md** - Project overview
2. **SETUP.md** - How to set up locally
3. **API_DOCUMENTATION.md** - Backend endpoint specs (Phase 2)
4. **PHASE_2_PLAN.md** - What comes next
5. **COMPLETION_CHECKLIST.md** - What's been completed

---

## Quick Checklist Before Deploying

- [ ] `npm run build` completes without errors
- [ ] `npm run type-check` passes
- [ ] Tested locally with `npm run dev`
- [ ] Checked responsive design (mobile/tablet/desktop)
- [ ] Updated documentation if needed
- [ ] Committed changes with clear message
- [ ] Pushed to GitHub
- [ ] Vercel deployment complete

---

## Getting Help

### Check These Files First
- Component in question: `src/components/*/`
- Page: `src/app/*/page.tsx`
- Styling: `src/app/globals.css` or `tailwind.config.ts`
- State: `src/store/*.ts`
- Types: `src/types/index.ts`

### Common Questions
**Q: How do I change the font?**  
A: Update `src/app/layout.tsx` imports, then use in classes

**Q: How do I add a new feature?**  
A: Create component in `src/components/`, import in page, style with Tailwind

**Q: How do I update prices?**  
A: Edit `src/lib/pricing.ts`

**Q: How do I add a new page?**  
A: Create folder `src/app/newpage/` with `page.tsx` inside

**Q: How do I change colors everywhere?**  
A: Update CSS variables in `src/app/globals.css`

---

## Next Developer Onboarding (5 minutes)

1. Clone the repo
2. `npm install`
3. `npm run dev`
4. Visit http://localhost:3000
5. Open this file and follow the examples above

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-10-15 | Initial MVP launch |
| 1.1 | TBD | Phase 2 - Backend integration |
| 2.0 | TBD | Phase 3 - 3D & AI features |

---

## Emergency Support

**If something breaks:**

1. Check the error message
2. Read SETUP.md to verify environment
3. Try: `npm install && npm run build`
4. Still broken? Revert last commit: `git revert HEAD`

---

**Last Updated**: October 15, 2026  
**For Questions**: Contact development team  
**Brand Philosophy**: "Design It, Visualize It, Make It Yours" ✨
