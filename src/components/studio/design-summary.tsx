"use client";

import { useState } from "react";
import { useCustomizationStore } from "@/store/customization-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/primitives";
import Link from "next/link";

interface DesignSummaryProps {
  onPrevious: () => void;
}

export default function DesignSummary({ onPrevious }: DesignSummaryProps) {
  const { currentDesign, resetDesign } = useCustomizationStore();
  const { addItem } = useCartStore();
  const [designName, setDesignName] = useState("My MOSLIN Design");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const pricing = currentDesign.pricing;

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      // Simulate saving to backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSaveMessage("✓ Design saved successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Failed to save design");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToCart = () => {
    const designToAdd = {
      ...currentDesign,
      name: designName,
      status: "inCart" as const,
    } as any;
    addItem(designToAdd, 1);
    resetDesign();
    window.location.href = "/checkout";
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Review Your Design</h2>
      <p className="text-slate-600 mb-8">Everything looks great! Ready to proceed or save for later?</p>

      {/* Design Summary Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left: Design Details */}
        <div className="space-y-6">
          {/* Design Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Design Name</label>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
              placeholder="My Custom Design"
            />
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Design Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Budget Tier</span>
                <span className="font-semibold text-slate-900">{currentDesign.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Garment</span>
                <span className="font-semibold text-slate-900 capitalize">{currentDesign.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Color</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded border border-slate-300"
                    style={{ backgroundColor: currentDesign.baseColor }}
                  />
                  <span className="font-mono text-sm">{currentDesign.baseColor}</span>
                </div>
              </div>
              {currentDesign.fabricId && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Fabric</span>
                  <span className="font-semibold text-slate-900 capitalize">{currentDesign.fabricId}</span>
                </div>
              )}
            </div>

            {/* Customizations */}
            {Object.keys(currentDesign.customizations || {}).length > 0 && (
              <>
                <div className="border-t border-slate-300 pt-4">
                  <h4 className="font-semibold text-slate-900 mb-3">Customizations</h4>
                  <div className="space-y-2">
                    {Object.entries(currentDesign.customizations || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-slate-600 capitalize">{key}</span>
                        <span className="font-semibold text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Pricing & Actions */}
        <div className="space-y-6">
          {pricing && (
            <div className="bg-white border-2 border-slate-900 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Final Pricing</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span>${pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span>${pricing.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span>${pricing.shipping}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span className="text-amber-600">${pricing.total}</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
                  <p className="text-xs font-semibold text-amber-900 mb-2">Payment Terms</p>
                  <div className="space-y-1 text-sm text-amber-900">
                    <div className="flex justify-between">
                      <span>Pay Now (25%)</span>
                      <span className="font-bold">${pricing.advancePayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pay on Production (75%)</span>
                      <span className="font-bold">${pricing.remainingBalance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {saveMessage && (
                <div className="bg-green-50 border border-green-200 text-green-900 px-4 py-2 rounded text-sm">
                  {saveMessage}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              Proceed to Checkout
            </Button>
            <Button
              onClick={handleSaveDesign}
              variant="outline"
              size="lg"
              className="w-full"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Design"}
            </Button>
            <Link href="/account/designs" className="block">
              <Button variant="ghost" size="lg" className="w-full">
                View My Designs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-4 pt-8 border-t border-slate-200">
        <Button variant="outline" onClick={onPrevious} className="flex-1">
          Back
        </Button>
      </div>
    </div>
  );
}
