# MOSLIN API Documentation

## Overview

This document outlines the API endpoints that will be implemented in Phase 2. The MVP currently uses client-side state management with Zustand. Backend API integration will follow this specification.

## Base URL
```
Production: https://api.moslin.com/v1
Development: http://localhost:3000/api
```

## Authentication
All endpoints (except signup/login) require a Bearer token in the Authorization header:
```
Authorization: Bearer {access_token}
```

---

## Authentication Endpoints

### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "Sarah",
  "lastName": "Anderson"
}

Response (201):
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "Sarah",
  "lastName": "Anderson",
  "accessToken": "eyJhbGc...",
  "refreshToken": "refresh_token_here"
}

Error (400):
{
  "error": "Email already exists"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "Sarah",
  "lastName": "Anderson",
  "accessToken": "eyJhbGc...",
  "refreshToken": "refresh_token_here"
}

Error (401):
{
  "error": "Invalid email or password"
}
```

### Logout
```
POST /api/auth/logout
Authorization: Bearer {access_token}

Response (200):
{
  "message": "Successfully logged out"
}
```

### Refresh Token
```
POST /api/auth/refresh
Content-Type: application/json

Request:
{
  "refreshToken": "refresh_token_here"
}

Response (200):
{
  "accessToken": "new_access_token"
}
```

---

## User Endpoints

### Get Profile
```
GET /api/user/profile
Authorization: Bearer {access_token}

Response (200):
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "Sarah",
  "lastName": "Anderson",
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

### Update Profile
```
PUT /api/user/profile
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "firstName": "Sarah",
  "lastName": "Anderson"
}

Response (200):
{
  "id": "user_123",
  "email": "user@example.com",
  "firstName": "Sarah",
  "lastName": "Anderson",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

### Get Measurements
```
GET /api/user/measurements
Authorization: Bearer {access_token}

Response (200):
{
  "id": "measurement_123",
  "userId": "user_123",
  "chest": 38,
  "waist": 32,
  "hips": 38,
  "inseam": 30,
  "shoulderWidth": 16,
  "armLength": 32,
  "neckSize": 15.5,
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}

Response (404):
{
  "error": "Measurements not found"
}
```

### Save/Update Measurements
```
POST /api/user/measurements
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "chest": 38,
  "waist": 32,
  "hips": 38,
  "inseam": 30,
  "shoulderWidth": 16,
  "armLength": 32,
  "neckSize": 15.5
}

Response (200):
{
  "id": "measurement_123",
  "userId": "user_123",
  "chest": 38,
  "waist": 32,
  "hips": 38,
  "inseam": 30,
  "shoulderWidth": 16,
  "armLength": 32,
  "neckSize": 15.5,
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

---

## Design Endpoints

### List Designs
```
GET /api/designs?status=saved&limit=10&offset=0
Authorization: Bearer {access_token}

Query Parameters:
- status: "draft" | "saved" | "inCart" | "ordered" (optional)
- limit: number (default: 20, max: 100)
- offset: number (default: 0)

Response (200):
{
  "items": [
    {
      "id": "design_123",
      "userId": "user_123",
      "name": "Navy Formal Shirt",
      "category": "shirt",
      "budget": "Exclusive",
      "fabricId": "fabric_silk",
      "baseColor": "#1e3a5f",
      "customizations": {
        "collar": "spread",
        "sleeve": "long",
        "cuff": "french"
      },
      "previewImage": "https://s3.amazonaws.com/...",
      "status": "saved",
      "createdAt": "2026-10-15T04:30:20Z",
      "updatedAt": "2026-10-15T04:30:20Z"
    }
  ],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

### Get Design
```
GET /api/designs/:id
Authorization: Bearer {access_token}

Response (200):
{
  "id": "design_123",
  "userId": "user_123",
  "name": "Navy Formal Shirt",
  "category": "shirt",
  "budget": "Exclusive",
  "fabricId": "fabric_silk",
  "baseColor": "#1e3a5f",
  "customizations": {
    "collar": "spread",
    "sleeve": "long",
    "cuff": "french"
  },
  "previewImage": "https://s3.amazonaws.com/...",
  "status": "saved",
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}

Error (404):
{
  "error": "Design not found"
}
```

### Create Design
```
POST /api/designs
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "name": "Navy Formal Shirt",
  "category": "shirt",
  "budget": "Exclusive",
  "fabricId": "fabric_silk",
  "baseColor": "#1e3a5f",
  "customizations": {
    "collar": "spread",
    "sleeve": "long",
    "cuff": "french"
  }
}

Response (201):
{
  "id": "design_123",
  "userId": "user_123",
  "name": "Navy Formal Shirt",
  "category": "shirt",
  "budget": "Exclusive",
  "fabricId": "fabric_silk",
  "baseColor": "#1e3a5f",
  "customizations": {...},
  "status": "draft",
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

### Update Design
```
PUT /api/designs/:id
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "name": "Updated Name",
  "customizations": {
    "collar": "button-down"
  }
}

Response (200):
{
  "id": "design_123",
  ...updated fields...
}
```

### Delete Design
```
DELETE /api/designs/:id
Authorization: Bearer {access_token}

Response (204):
No content

Error (404):
{
  "error": "Design not found"
}
```

### Duplicate Design
```
POST /api/designs/:id/duplicate
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "name": "Navy Formal Shirt - Copy"
}

Response (201):
{
  "id": "design_456",
  "userId": "user_123",
  "name": "Navy Formal Shirt - Copy",
  ...same as original...
}
```

---

## Order Endpoints

### List Orders
```
GET /api/orders?status=in_production&limit=10
Authorization: Bearer {access_token}

Query Parameters:
- status: "draft" | "pending_payment" | "paid" | "in_production" | "delivered" (optional)
- limit: number (default: 20, max: 100)
- offset: number (default: 0)

Response (200):
{
  "items": [
    {
      "id": "order_123",
      "userId": "user_123",
      "designs": [
        {
          "id": "design_123",
          "name": "Navy Formal Shirt",
          ...
        }
      ],
      "status": "in_production",
      "totalPrice": 1068,
      "advancePayment": 267,
      "remainingBalance": 801,
      "productionStartDate": "2026-10-16T00:00:00Z",
      "estimatedDelivery": "2026-10-28T00:00:00Z",
      "createdAt": "2026-10-15T04:30:20Z",
      "updatedAt": "2026-10-15T04:30:20Z"
    }
  ],
  "total": 5
}
```

### Get Order
```
GET /api/orders/:id
Authorization: Bearer {access_token}

Response (200):
{
  "id": "order_123",
  "userId": "user_123",
  "designs": [...],
  "status": "in_production",
  "totalPrice": 1068,
  "advancePayment": 267,
  "remainingBalance": 801,
  "productionStartDate": "2026-10-16T00:00:00Z",
  "estimatedDelivery": "2026-10-28T00:00:00Z",
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

### Create Order
```
POST /api/orders
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "designIds": ["design_123", "design_456"]
}

Response (201):
{
  "id": "order_123",
  "userId": "user_123",
  "designs": [...],
  "status": "draft",
  "totalPrice": 1068,
  "advancePayment": 267,
  "remainingBalance": 801,
  "createdAt": "2026-10-15T04:30:20Z",
  "updatedAt": "2026-10-15T04:30:20Z"
}
```

### Get Order Status
```
GET /api/orders/:id/status
Authorization: Bearer {access_token}

Response (200):
{
  "id": "order_123",
  "status": "in_production",
  "currentStep": 3,
  "steps": [
    {
      "step": 1,
      "name": "Design Confirmed",
      "completed": true,
      "completedAt": "2026-10-15T04:30:20Z"
    },
    {
      "step": 2,
      "name": "Payment Received",
      "completed": true,
      "completedAt": "2026-10-15T05:00:00Z"
    },
    {
      "step": 3,
      "name": "In Production",
      "completed": false,
      "startedAt": "2026-10-16T00:00:00Z"
    }
    ...
  ]
}
```

---

## Checkout Endpoints

### Create Payment Intent
```
POST /api/checkout/create-payment-intent
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "orderIds": ["order_123"],
  "amount": 267
}

Response (200):
{
  "clientSecret": "pi_1234_secret_5678",
  "publishableKey": "pk_test_...",
  "amount": 267,
  "currency": "usd"
}
```

### Confirm Payment
```
POST /api/checkout/confirm-payment
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "paymentIntentId": "pi_1234",
  "orderIds": ["order_123"]
}

Response (200):
{
  "orderId": "order_123",
  "status": "paid",
  "message": "Payment successful. Check your email for confirmation.",
  "invoiceUrl": "https://s3.amazonaws.com/invoices/...",
  "nextSteps": "Your design will enter production within 24 hours."
}

Error (400):
{
  "error": "Payment failed",
  "details": "Card declined"
}
```

---

## Reference Data Endpoints

### Get Fabrics
```
GET /api/fabrics?limit=50
Authorization: Bearer {access_token}

Query Parameters:
- limit: number (default: 100)
- offset: number (default: 0)

Response (200):
{
  "items": [
    {
      "id": "fabric_cotton",
      "name": "Premium Cotton",
      "color": "Natural",
      "priceAdjustment": 0,
      "imageUrl": "https://s3.amazonaws.com/...",
      "description": "Breathable and comfortable for everyday wear"
    },
    {
      "id": "fabric_silk",
      "name": "Silk Blend",
      "color": "Neutral",
      "priceAdjustment": 50,
      "imageUrl": "https://s3.amazonaws.com/...",
      "description": "Luxurious and elegant for special occasions"
    }
  ],
  "total": 6
}
```

### Get Customization Options
```
GET /api/customization-options?type=collar
Authorization: Bearer {access_token}

Query Parameters:
- type: "collar" | "sleeve" | "cuff" | "button" | "pocket" | "fit" | "length" | "embroidery" (optional)

Response (200):
{
  "items": [
    {
      "id": "custom_collar_1",
      "type": "collar",
      "name": "Spread Collar",
      "priceAdjustment": 0
    },
    {
      "id": "custom_collar_2",
      "type": "collar",
      "name": "Button-Down Collar",
      "priceAdjustment": 15
    }
  ]
}
```

### Calculate Pricing
```
POST /api/pricing/calculate
Authorization: Bearer {access_token}
Content-Type: application/json

Request:
{
  "budget": "Exclusive",
  "category": "shirt",
  "fabricUpcharge": 50,
  "customizations": {
    "collar": "spread",
    "sleeve": "long",
    "cuff": "french"
  },
  "accessoriesPrice": 0
}

Response (200):
{
  "basePrice": 300,
  "fabricUpcharge": 50,
  "customizationFees": 40,
  "accessoriesPrice": 0,
  "subtotal": 390,
  "tax": 31.2,
  "shipping": 15,
  "total": 436.2,
  "advancePayment": 109.05,
  "remainingBalance": 327.15
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required",
  "message": "Please provide a valid access token"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found",
  "resource": "design",
  "id": "design_123"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong on our end. Please try again later."
}
```

---

## Rate Limiting

All endpoints are rate-limited to:
- **Authenticated Users**: 1000 requests per hour
- **Public Endpoints**: 100 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634298620
```

---

## Pagination

List endpoints support pagination:
```
GET /api/designs?limit=10&offset=20

Response:
{
  "items": [...],
  "total": 42,
  "limit": 10,
  "offset": 20,
  "hasMore": true
}
```

---

## Webhook Events (Future)

When implemented, webhooks will be sent for:
- `order.created`
- `order.payment_received`
- `order.production_started`
- `order.shipped`
- `order.delivered`
- `design.saved`
- `design.deleted`

---

## Testing the API

### Using cURL
```bash
# Get user profile
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/user/profile

# Create design
curl -X POST http://localhost:3000/api/designs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Shirt",
    "category": "shirt",
    "budget": "Essential"
  }'
```

### Using Postman
- Import the API collection
- Set base URL to `http://localhost:3000/api`
- Add Bearer token to Authorization header
- Test endpoints

---

## Implementation Timeline

**Phase 2** (Weeks 1-2):
- Authentication endpoints
- User profile endpoints
- Database integration

**Phase 2** (Weeks 3-4):
- Design CRUD endpoints
- Order endpoints
- Pricing calculations

**Phase 3** (Weeks 1-2):
- Stripe integration
- Payment endpoints
- Email notifications

**Phase 3** (Weeks 3-4):
- Webhook integration
- Analytics
- Admin endpoints

---

**Last Updated**: October 15, 2026  
**Status**: Ready for Phase 2 Backend Development
