# MOSLIN Phase 2 Implementation Plan

**Phase**: Backend & Authentication  
**Estimated Duration**: 2-3 weeks  
**Start Date**: After Phase 1 approval  
**Dependencies**: Phase 1 MVP complete ✅

---

## Phase 2 Goals

1. ✅ User Authentication System
2. ✅ Database Persistence
3. ✅ Payment Processing (Stripe)
4. ✅ API Endpoints
5. ✅ Email Notifications
6. ✅ Production Deployment

---

## Week 1: Authentication & Database

### Task 1.1: NextAuth.js Setup
**Files to Create/Modify**:
- `src/app/api/auth/[...nextauth].ts` - NextAuth configuration
- `.env.local` - NextAuth secrets
- `src/lib/auth.ts` - Auth helper functions

**Implementation**:
```typescript
// Email/password provider
// Google OAuth (optional)
// JWT with refresh tokens
// Session management
```

**Acceptance Criteria**:
- [ ] Users can sign up with email/password
- [ ] Login redirects to dashboard
- [ ] Logout clears session
- [ ] Protected routes require authentication
- [ ] Password hashing with bcryptjs

### Task 1.2: PostgreSQL Connection
**Files to Create/Modify**:
- `.env.local` - DATABASE_URL
- `prisma/schema.prisma` - Already designed ✅
- `src/lib/db.ts` - Database client

**Implementation**:
```bash
# Run migrations
npx prisma migrate deploy

# Verify connection
npx prisma studio
```

**Acceptance Criteria**:
- [ ] PostgreSQL running locally
- [ ] Migrations applied
- [ ] Prisma Studio accessible
- [ ] Sample data seeded

### Task 1.3: User Endpoints
**Endpoints to Create**:
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Authenticate
- `POST /api/auth/logout` - Clear session
- `GET /api/user/profile` - Get logged-in user
- `PUT /api/user/profile` - Update user info

**Implementation**:
- Use NextAuth for session management
- Hash passwords with bcryptjs
- Return JWT tokens
- Handle validation errors

**Tests**:
- [ ] Sign up with email/password
- [ ] Login with credentials
- [ ] Logout clears session
- [ ] Profile endpoint requires auth
- [ ] Duplicate email rejected

---

## Week 2: Design & Order Persistence

### Task 2.1: Design Endpoints
**Endpoints to Create**:
- `GET /api/designs` - List user's designs
- `POST /api/designs` - Create new design
- `GET /api/designs/:id` - Get single design
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design
- `POST /api/designs/:id/duplicate` - Clone design

**Database Queries**:
```typescript
// Save design with customizations as JSON
// Load designs with filters (status, created date)
// Update design metadata
// Soft delete for audit trail
```

**Connect to Frontend**:
- Replace Zustand mock with API calls
- Save design on "Save Design" button
- Auto-save draft every 30 seconds
- Sync with localStorage for offline fallback

**Tests**:
- [ ] Create design with all fields
- [ ] List returns paginated results
- [ ] Duplicate creates independent copy
- [ ] Update only affected fields
- [ ] Delete removes from database

### Task 2.2: Order & Checkout Endpoints
**Endpoints to Create**:
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - List user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/status` - Get production status
- `POST /api/checkout/create-payment-intent` - Stripe payment
- `POST /api/checkout/confirm-payment` - Confirm payment

**Database Schema Additions**:
- OrderItem join table for order-design relationship
- Payment table for transaction tracking
- OrderStatusHistory for timeline

**Implementation**:
```typescript
// Create order from cart items
// Calculate final pricing
// Generate payment intent
// Process 25% advance payment
// Create order record
// Send confirmation email
```

**Tests**:
- [ ] Order created with correct pricing
- [ ] Payment intent generated
- [ ] Order status initialized
- [ ] Email notification sent
- [ ] Remaining balance calculated

### Task 2.3: Measurements Endpoints
**Endpoints to Create**:
- `GET /api/user/measurements` - Get saved measurements
- `POST /api/user/measurements` - Save measurements
- `PUT /api/user/measurements` - Update measurements

**Implementation**:
- Link to user via userId
- Validate measurement ranges
- Return with auto-calculated BMI (optional)

**Tests**:
- [ ] Measurements saved with user
- [ ] Validation rejects invalid values
- [ ] Update replaces previous measurements

---

## Week 3: Stripe Integration & Email

### Task 3.1: Stripe Payment Processing
**Setup**:
- [ ] Create Stripe account
- [ ] Get API keys
- [ ] Add to .env.local
- [ ] Install stripe package (`npm install stripe @stripe/react-stripe-js`)

**Implementation Files**:
- `src/app/api/checkout/create-payment-intent.ts`
- `src/app/api/checkout/confirm-payment.ts`
- `src/app/api/webhooks/stripe.ts`

**Features**:
```typescript
// Create PaymentIntent for 25% advance
// Handle payment confirmation
// Webhook for payment events
// Invoice generation
// Refund handling
```

**Acceptance Criteria**:
- [ ] Payment intent created successfully
- [ ] Stripe webhook receives events
- [ ] Payment confirmation updates order status
- [ ] Invoice generated and stored
- [ ] Error handling for declined cards

### Task 3.2: Email Notifications
**Setup**:
- [ ] SendGrid account & API key
- [ ] Install `@sendgrid/mail` package

**Email Templates**:
- Welcome email (after signup)
- Order confirmation (after purchase)
- Payment receipt (advance payment received)
- Production started
- Quality check complete
- Ready to ship
- Delivery confirmation

**Implementation**:
- `src/lib/email.ts` - Email service
- Template system (HTML/plain text)
- Scheduled email sending

**Tests**:
- [ ] Email sent on signup
- [ ] Order confirmation includes details
- [ ] Links in emails work
- [ ] Unsubscribe option included

### Task 3.3: Webhooks & Background Jobs
**Stripe Webhooks**:
- `payment_intent.succeeded` - Mark order as paid
- `payment_intent.payment_failed` - Notify user
- `charge.refunded` - Process refund

**Production Status Updates** (Future - Queue system):
- Manual webhook or scheduled job
- Update order status based on production step
- Send email notifications on status change

---

## Week 3-4: Refinement & Testing

### Task 4.1: Error Handling & Validation
**Implementation**:
- [ ] API error standardization (400, 401, 403, 404, 500)
- [ ] Input validation with Zod
- [ ] Rate limiting
- [ ] Logging system

### Task 4.2: Performance & Security
**Optimization**:
- [ ] Database query optimization
- [ ] Connection pooling (PgBouncer)
- [ ] Caching strategy (Redis for future)
- [ ] CORS configuration

**Security**:
- [ ] HTTPS everywhere
- [ ] SQL injection prevention (Prisma ORM ✅)
- [ ] CSRF protection (NextAuth handles)
- [ ] Secure password storage (bcryptjs ✅)
- [ ] Environment variables secured

### Task 4.3: Testing
**Unit Tests**:
```bash
npm run test
```
- Pricing calculations
- Auth functions
- Validation logic

**Integration Tests**:
- API endpoints
- Database operations
- Stripe integration (test mode)

**E2E Tests**:
- Complete user flow signup → design → checkout

### Task 4.4: Deployment Prep
**Environment Setup**:
- [ ] Production .env variables
- [ ] Database migration strategy
- [ ] Backup plan
- [ ] Monitoring setup

**Vercel Deployment**:
```bash
npm run build
vercel deploy --prod
```

---

## Implementation Checklist

### Authentication (Week 1)
- [ ] NextAuth.js configured
- [ ] Email/password provider working
- [ ] Password hashing implemented
- [ ] Session management functional
- [ ] Protected routes enforced
- [ ] Login/signup pages functional

### Database (Week 1)
- [ ] PostgreSQL connected
- [ ] Migrations applied
- [ ] All models created
- [ ] Relationships defined
- [ ] Indexes added
- [ ] Test data seeded

### API Endpoints (Week 2-3)
- [ ] Auth endpoints (5)
- [ ] User endpoints (3)
- [ ] Design endpoints (6)
- [ ] Order endpoints (4)
- [ ] Checkout endpoints (2)
- [ ] Measurement endpoints (3)
- [ ] Total: 23 endpoints

### Payments (Week 3)
- [ ] Stripe account active
- [ ] API keys configured
- [ ] Payment intent creation
- [ ] Payment confirmation
- [ ] Webhook handling
- [ ] Invoice generation

### Email (Week 3)
- [ ] SendGrid configured
- [ ] Templates created (7)
- [ ] Email service working
- [ ] Test emails sent
- [ ] Unsubscribe logic

### Testing (Week 3-4)
- [ ] Unit tests written
- [ ] Integration tests passing
- [ ] E2E tests complete
- [ ] Manual testing verified
- [ ] Security audit passed

### Deployment (End of Phase 2)
- [ ] Production build successful
- [ ] Environment variables set
- [ ] Database migrated
- [ ] SSL certificate active
- [ ] Monitoring configured
- [ ] Backup system active

---

## Dependencies to Add

```json
{
  "next-auth": "^4.24.0",
  "prisma": "^5.0.0",
  "@prisma/client": "^5.0.0",
  "stripe": "^13.0.0",
  "@stripe/react-stripe-js": "^2.0.0",
  "@sendgrid/mail": "^7.7.0",
  "bcryptjs": "^2.4.3",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0",
  "jest": "^29.7.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.0"
}
```

---

## File Structure After Phase 2

```
moslin/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth].ts         # ✨ NEW
│   │   │   ├── user/
│   │   │   │   ├── profile.ts                # ✨ NEW
│   │   │   │   └── measurements.ts           # ✨ NEW
│   │   │   ├── designs/
│   │   │   │   ├── route.ts                  # ✨ NEW
│   │   │   │   └── [id]/route.ts             # ✨ NEW
│   │   │   ├── orders/
│   │   │   │   ├── route.ts                  # ✨ NEW
│   │   │   │   └── [id]/route.ts             # ✨ NEW
│   │   │   ├── checkout/
│   │   │   │   ├── create-payment-intent.ts  # ✨ NEW
│   │   │   │   └── confirm-payment.ts        # ✨ NEW
│   │   │   └── webhooks/
│   │   │       └── stripe.ts                 # ✨ NEW
│   │   ├── auth/
│   │   │   ├── login/page.tsx                # ✨ NEW
│   │   │   └── signup/page.tsx               # ✨ NEW
│   │   └── ...existing pages...
│   ├── lib/
│   │   ├── auth.ts                           # ✨ NEW
│   │   ├── db.ts                             # ✨ NEW
│   │   ├── email.ts                          # ✨ NEW
│   │   ├── stripe.ts                         # ✨ NEW
│   │   └── ...existing...
│   └── ...
├── prisma/
│   ├── schema.prisma                         # ✅ (update relations)
│   └── migrations/                           # ✨ NEW
├── __tests__/                                # ✨ NEW
│   ├── unit/
│   └── integration/
├── .env.local                                # ✅ (update with new keys)
└── ...
```

---

## Success Metrics for Phase 2

✅ **Authentication**
- Users can sign up, login, logout
- Password reset flow works
- Sessions persist across requests

✅ **Data Persistence**
- Designs saved to database
- Orders created and tracked
- Measurements stored per user

✅ **Payments**
- 25% advance payment collected
- Payment confirmation emails sent
- Stripe webhooks updating order status

✅ **API Quality**
- All endpoints documented
- Error handling consistent
- Response times < 500ms
- 95%+ test coverage

✅ **Deployment**
- Production build succeeds
- Environment variables secured
- Database migrations automated
- Monitoring/alerting active

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Stripe API changes | Monitor Stripe docs, pin SDK version |
| Database locks | Connection pooling, query optimization |
| Email delivery issues | Retry logic, fallback queuing |
| Payment failures | Comprehensive error handling, user communication |
| Data loss | Automated backups, migration testing |
| Auth vulnerabilities | OWASP top 10 review, security audit |

---

## Communication & Handoff

**For Incoming Developer**:
1. Read this file and Phase 1 docs
2. Set up local environment (see SETUP.md)
3. Review API_DOCUMENTATION.md for endpoint specs
4. Start with Task 1.1 (NextAuth setup)
5. Run tests after each feature

**Weekly Checklist**:
- [ ] All tasks for week completed
- [ ] Tests passing
- [ ] Code reviewed
- [ ] No blockers for next week

---

## Post-Phase 2

After Phase 2 completion:
- MVP has working backend
- Real payments processing
- User data persisting
- Ready for Phase 3 (AI/3D features)
- Production deployment possible

**Estimated Timeline**: 2-3 weeks for experienced developer  
**Complexity**: Medium (23 API endpoints, Stripe integration, email service)  
**Dependencies**: Stripe account, SendGrid account, PostgreSQL instance

---

**Next Phase**: Phase 3 - AI Features & 3D Preview (3 weeks)
