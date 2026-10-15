// Design and customization types
export interface Customizations {
  collar?: string;
  sleeve?: string;
  sleeveLength?: string;
  cuff?: string;
  button?: string;
  pocket?: string;
  fit?: string;
  length?: string;
  embroidery?: string;
  border?: string;
  initials?: string;
  [key: string]: string | undefined;
}

export interface Design {
  id: string;
  userId: string;
  name: string;
  category: string;
  budget: "Essential" | "Exclusive" | "Tailored";
  fabricId?: string;
  baseColor: string;
  customizations: Customizations;
  previewImage?: string;
  status: "draft" | "saved" | "inCart" | "ordered";
  pricing?: PricingBreakdown;
  createdAt: Date;
  updatedAt: Date;
}

// Fabric type
export interface Fabric {
  id: string;
  name: string;
  color: string;
  priceAdjustment: number;
  imageUrl: string;
  description?: string;
}

// Order types
export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "measuring"
  | "in_production"
  | "quality_check"
  | "packaging"
  | "shipped"
  | "delivered";

export interface Order {
  id: string;
  userId: string;
  designs: Design[];
  status: OrderStatus;
  advancePaymentAmount: number;
  remainingBalance: number;
  totalPrice: number;
  productionStartDate?: Date;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Measurement type
export interface Measurement {
  id: string;
  userId: string;
  chest?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  shoulderWidth?: number;
  armLength?: number;
  neckSize?: number;
  createdAt: Date;
  updatedAt: Date;
}

// User type
export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Cart item
export interface CartItem {
  designId: string;
  design: Design;
  quantity: number;
}

// Pricing
export interface PricingBreakdown {
  basePrice: number;
  fabricUpcharge: number;
  customizationFees: number;
  accessoriesPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  advancePayment: number; // 25% of total
  remainingBalance: number; // 75% of total
}

// Budget tier prices (base prices)
export const BUDGET_TIERS = {
  Essential: { min: 150, max: 300 },
  Exclusive: { min: 300, max: 600 },
  Tailored: { min: 600, max: 2000 },
} as const;

// Customization options available
export const CUSTOMIZATION_TYPES = [
  "collar",
  "sleeve",
  "sleeveLength",
  "cuff",
  "button",
  "pocket",
  "fit",
  "length",
  "embroidery",
  "border",
  "initials",
] as const;
