"use client";

import { useCustomizationStore } from "@/store/customization-store";
import { Button, Input } from "@/components/ui/primitives";

const PRESET_COLORS = [
  { name: "Deep Navy", hex: "#1e3a5f" },
  { name: "Charcoal", hex: "#2c3e50" },
  { name: "Cream", hex: "#f5f1e8" },
  { name: "White", hex: "#ffffff" },
  { name: "Soft Gray", hex: "#d1d5db" },
  { name: "Burgundy", hex: "#8b3a3a" },
  { name: "Forest Green", hex: "#1b4332" },
  { name: "Warm Beige", hex: "#d4a574" },
];

interface ColorPickerProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function ColorPicker({ onNext, onPrevious }: ColorPickerProps) {
  const { currentDesign, setBaseColor } = useCustomizationStore();
  const selected = currentDesign.baseColor;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Choose Your Color</h2>
      <p className="text-slate-600 mb-8">Select from our palette or enter a custom color.</p>

      {/* Preset colors */}
      <div className="mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">Preset Colors</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setBaseColor(color.hex)}
              className={`w-16 h-16 rounded-lg border-4 transition-all ${
                selected === color.hex
                  ? "border-slate-900 ring-2 ring-offset-2 ring-slate-900"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selected === color.hex && (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom color */}
      <div className="mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">Custom Color</h3>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Hex Code</label>
            <input
              type="color"
              value={selected}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-20 h-20 rounded-lg cursor-pointer border-2 border-slate-300"
            />
          </div>
          <Input
            label="Or paste hex code"
            value={selected}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#1e3a5f"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mb-8 p-8 rounded-lg border-2 border-slate-200 bg-slate-50">
        <p className="text-sm text-slate-600 mb-3">Color Preview</p>
        <div
          className="w-full h-32 rounded-lg border-2 border-slate-300 shadow-sm"
          style={{ backgroundColor: selected }}
        />
        <p className="text-sm text-slate-600 mt-3">Selected: {selected}</p>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
