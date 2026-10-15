"use client";

import { useCustomizationStore } from "@/store/customization-store";
import { Card, Button } from "@/components/ui/primitives";
import { BUDGET_TIERS } from "@/types";

const BUDGETS = [
  {
    tier: "Essential",
    price: "$150 - $300",
    description: "Perfect for basics and everyday wear",
    features: ["Premium fabrics", "5+ customization options", "Standard fit"],
    icon: "👕",
  },
  {
    tier: "Exclusive",
    price: "$300 - $600",
    description: "For special occasions and elevated style",
    features: ["Luxury fabrics", "20+ customization options", "Premium embroidery"],
    icon: "💎",
  },
  {
    tier: "Tailored",
    price: "$600+",
    description: "Bespoke luxury for the discerning",
    features: ["Finest materials", "Unlimited customizations", "Premium finishes"],
    icon: "👑",
  },
];

interface BudgetSelectorProps {
  onNext: () => void;
}

export default function BudgetSelector({ onNext }: BudgetSelectorProps) {
  const { currentDesign, setBudget } = useCustomizationStore();
  const selected = currentDesign.budget;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Select Your Budget</h2>
      <p className="text-slate-600 mb-8">
        Choose a tier that matches your style and customization needs.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {BUDGETS.map((budget) => (
          <button
            key={budget.tier}
            onClick={() => setBudget(budget.tier)}
            className={`text-left transition-all rounded-xl border-2 p-6 ${
              selected === budget.tier
                ? "border-slate-900 bg-slate-50 shadow-lg"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-4xl mb-4">{budget.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{budget.tier}</h3>
            <p className="text-amber-600 font-semibold mb-2">{budget.price}</p>
            <p className="text-slate-600 text-sm mb-4">{budget.description}</p>
            <ul className="space-y-1 mb-4">
              {budget.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="text-green-500">✓</span> {feature}
                </li>
              ))}
            </ul>
            {selected === budget.tier && (
              <div className="text-sm font-semibold text-slate-900 bg-white rounded px-3 py-1 inline-block">
                Selected
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" disabled>
          Back
        </Button>
        <Button onClick={onNext} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}
