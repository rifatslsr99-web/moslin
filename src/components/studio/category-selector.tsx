"use client";

import { useCustomizationStore } from "@/store/customization-store";
import { Button } from "@/components/ui/primitives";

const CATEGORIES = [
  { name: "shirt", label: "Shirt", icon: "👕", description: "Casual or formal shirts" },
  { name: "blazer", label: "Blazer", icon: "🧥", description: "Professional blazers" },
  { name: "trousers", label: "Trousers", icon: "👖", description: "Pants and trousers" },
  { name: "dress", label: "Dress", icon: "👗", description: "Elegant dresses" },
  { name: "skirt", label: "Skirt", icon: "👚", description: "Skirts and wraps" },
];

interface CategorySelectorProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function CategorySelector({ onNext, onPrevious }: CategorySelectorProps) {
  const { currentDesign, setCategory } = useCustomizationStore();
  const selected = currentDesign.category;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Choose Your Garment</h2>
      <p className="text-slate-600 mb-8">What would you like to create today?</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => setCategory(category.name)}
            className={`p-6 rounded-lg border-2 transition-all text-center ${
              selected === category.name
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-bold text-slate-900 mb-1">{category.label}</h3>
            <p className="text-sm text-slate-600">{category.description}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}
