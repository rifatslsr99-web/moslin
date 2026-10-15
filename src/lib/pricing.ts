import { BUDGET_TIERS, PricingBreakdown, Customizations } from "@/types";

// Base prices by category and budget tier
const BASE_PRICES: Record<string, Record<string, number>> = {
  Essential: {
    shirt: 150,
    blazer: 200,
    trousers: 120,
    dress: 180,
    skirt: 140,
  },
  Exclusive: {
    shirt: 300,
    blazer: 450,
    trousers: 280,
    dress: 400,
    skirt: 320,
  },
  Tailored: {
    shirt: 600,
    blazer: 900,
    trousers: 550,
    dress: 800,
    skirt: 700,
  },
};

// Customization fees
const CUSTOMIZATION_FEES: Record<string, number> = {
  collar: 15,
  sleeve: 20,
  cuff: 10,
  button: 5,
  pocket: 8,
  fit: 0, // No charge for fit selection
  length: 12,
  embroidery: 30,
  border: 25,
  initials: 15,
};

const TAX_RATE = 0.08; // 8% tax
const SHIPPING_COST = 15; // Flat shipping

export function getBasePrice(budget: string, category: string): number {
  return BASE_PRICES[budget]?.[category] || BASE_PRICES["Essential"]["shirt"];
}

export function calculateCustomizationFees(customizations: Customizations): number {
  let total = 0;
  Object.entries(customizations).forEach(([key, value]) => {
    if (value && CUSTOMIZATION_FEES[key]) {
      total += CUSTOMIZATION_FEES[key];
    }
  });
  return total;
}

export function calculatePricing(
  budget: string,
  category: string,
  fabricUpcharge: number = 0,
  customizations: Customizations = {},
  accessoriesPrice: number = 0
): PricingBreakdown {
  const basePrice = getBasePrice(budget, category);
  const customizationFees = calculateCustomizationFees(customizations);

  const subtotal = basePrice + fabricUpcharge + customizationFees + accessoriesPrice;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  // 25% advance payment, 75% remaining
  const advancePayment = Math.round(total * 0.25 * 100) / 100;
  const remainingBalance = Math.round((total - advancePayment) * 100) / 100;

  return {
    basePrice,
    fabricUpcharge,
    customizationFees,
    accessoriesPrice,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: SHIPPING_COST,
    total: Math.round(total * 100) / 100,
    advancePayment,
    remainingBalance,
  };
}

export function getCustomizationFee(type: string): number {
  return CUSTOMIZATION_FEES[type] || 0;
}
