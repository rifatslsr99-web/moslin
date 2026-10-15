"use client";

import { useCustomizationStore } from "@/store/customization-store";
import { Button } from "@/components/ui/primitives";

const FABRICS = [
  {
    id: "cotton",
    name: "Premium Cotton",
    color: "Natural",
    upcharge: 0,
    description: "Breathable and comfortable for everyday wear",
  },
  {
    id: "silk",
    name: "Silk Blend",
    color: "Neutral",
    upcharge: 50,
    description: "Luxurious and elegant for special occasions",
  },
  {
    id: "linen",
    name: "Fine Linen",
    color: "Cream",
    upcharge: 40,
    description: "Lightweight and perfect for warm weather",
  },
  {
    id: "wool",
    name: "Merino Wool",
    color: "Charcoal",
    upcharge: 60,
    description: "Warm and durable for cooler seasons",
  },
  {
    id: "cashmere",
    name: "Cashmere Blend",
    color: "Soft",
    upcharge: 150,
    description: "Ultra-soft and premium luxury material",
  },
  {
    id: "linen-cotton",
    name: "Linen-Cotton Mix",
    color: "Natural",
    upcharge: 30,
    description: "Best of both worlds: comfort and elegance",
  },
];

interface FabricSelectorProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function FabricSelector({ onNext, onPrevious }: FabricSelectorProps) {
  const { currentDesign, setFabric } = useCustomizationStore();
  const selected = currentDesign.fabricId;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Select Your Fabric</h2>
      <p className="text-slate-600 mb-8">Choose premium materials that suit your style and budget.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {FABRICS.map((fabric) => (
          <button
            key={fabric.id}
            onClick={() => setFabric(fabric.id, fabric.upcharge)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selected === fabric.id ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900">{fabric.name}</h3>
                <p className="text-sm text-slate-600">{fabric.color}</p>
              </div>
              <div className="text-right">
                {fabric.upcharge > 0 && (
                  <p className="text-sm font-semibold text-amber-600">+${fabric.upcharge}</p>
                )}
                {fabric.upcharge === 0 && <p className="text-sm text-slate-500">Base price</p>}
              </div>
            </div>
            <p className="text-sm text-slate-600">{fabric.description}</p>
            {selected === fabric.id && (
              <div className="mt-3 text-sm font-semibold text-slate-900">✓ Selected</div>
            )}
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
