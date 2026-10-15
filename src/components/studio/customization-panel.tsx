"use client";

import { useState } from "react";
import { useCustomizationStore } from "@/store/customization-store";
import { Button } from "@/components/ui/primitives";
import DraggableOption from "./draggable-option";

const CUSTOMIZATION_OPTIONS = [
  {
    category: "Collar",
    type: "collar",
    options: ["Spread", "Point", "Button-down", "Mandarin", "Shawl"],
  },
  {
    category: "Sleeves",
    type: "sleeve",
    options: ["Short", "3/4", "Long", "Rolled", "Cap"],
  },
  {
    category: "Cuffs",
    type: "cuff",
    options: ["Single", "French", "Barrel", "Convertible"],
  },
  {
    category: "Buttons",
    type: "button",
    options: ["Mother of Pearl", "Horn", "Wood", "Metal", "Custom"],
  },
  {
    category: "Pockets",
    type: "pocket",
    options: ["None", "Single Welt", "Double Welt", "Patch", "Hidden"],
  },
  {
    category: "Fit",
    type: "fit",
    options: ["Slim", "Regular", "Relaxed", "Athletic"],
  },
  {
    category: "Length",
    type: "length",
    options: ["Cropped", "Regular", "Extended", "Custom"],
  },
  {
    category: "Embroidery",
    type: "embroidery",
    options: ["None", "Monogram", "Logo", "Pattern", "Custom Design"],
  },
];

interface CustomizationPanelProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function CustomizationPanel({ onNext, onPrevious }: CustomizationPanelProps) {
  const { currentDesign, setCustomization } = useCustomizationStore();
  const customizations = currentDesign.customizations || {};
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Customize Details</h2>
      <p className="text-slate-600 mb-8">
        Fine-tune every aspect of your design. Explore options that match your style.
      </p>

      <div className="space-y-3 mb-8">
        {CUSTOMIZATION_OPTIONS.map((category) => (
          <div key={category.type} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() =>
                setExpandedCategory(expandedCategory === category.type ? null : category.type)
              }
              className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">{category.category}</span>
                {customizations[category.type] && (
                  <span className="text-sm bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-medium">
                    {customizations[category.type]}
                  </span>
                )}
              </div>
              <span className={`text-slate-600 transition-transform ${expandedCategory === category.type ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {expandedCategory === category.type && (
              <div className="px-6 py-4 bg-white border-t border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {category.options.map((option) => (
                    <DraggableOption
                      key={option}
                      type={category.type}
                      value={option}
                      label={option}
                      isSelected={customizations[category.type] === option}
                      onClick={() => setCustomization(category.type, option)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Special options */}
      <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Special Details</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Add monogram or initials (optional)"
            onChange={(e) => setCustomization("initials", e.target.value)}
            className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>
          Review Design
        </Button>
      </div>
    </div>
  );
}
