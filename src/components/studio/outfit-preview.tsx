"use client";

import { useCustomizationStore } from "@/store/customization-store";
import { Badge } from "@/components/ui/primitives";

export default function OutfitPreview() {
  const { currentDesign, isPreviewVisible, setPreviewVisible } = useCustomizationStore();
  const pricing = currentDesign.pricing;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Preview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 aspect-square flex items-center justify-center p-6">
          {isPreviewVisible ? (
            <div className="text-center">
              <div
                className="w-32 h-40 mx-auto mb-4 rounded-lg shadow-md"
                style={{
                  backgroundColor: currentDesign.baseColor || "#2c3e50",
                  opacity: 0.8,
                }}
              />
              <p className="text-slate-600 font-medium text-sm">
                {currentDesign.category ? `${currentDesign.category.toUpperCase()}` : "Select garment"}
              </p>
              {currentDesign.fabricId && (
                <p className="text-slate-500 text-xs mt-1">
                  Fabric: {currentDesign.fabricId}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <p className="text-sm">3D Preview Coming Soon</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase">Budget</p>
            <p className="text-slate-900 font-semibold">{currentDesign.budget}</p>
          </div>

          {currentDesign.category && (
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Garment</p>
              <p className="text-slate-900 font-semibold capitalize">{currentDesign.category}</p>
            </div>
          )}

          {currentDesign.baseColor && (
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase">Color</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border border-slate-300"
                  style={{ backgroundColor: currentDesign.baseColor }}
                />
                <p className="text-slate-900 font-mono text-sm">{currentDesign.baseColor}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Card */}
      {pricing && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-900 mb-4">Pricing Breakdown</h3>

          <div className="space-y-2 text-sm mb-4 pb-4 border-b border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-600">Base Price</span>
              <span className="font-semibold text-slate-900">${pricing.basePrice}</span>
            </div>
            {pricing.fabricUpcharge > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Fabric Upcharge</span>
                <span className="font-semibold text-slate-900">+${pricing.fabricUpcharge}</span>
              </div>
            )}
            {pricing.customizationFees > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Customizations</span>
                <span className="font-semibold text-slate-900">+${pricing.customizationFees}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">Tax (8%)</span>
              <span className="font-semibold text-slate-900">${pricing.tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-semibold text-slate-900">${pricing.shipping}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-slate-900">Total Price</span>
              <span className="font-bold text-lg text-slate-900">${pricing.total}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
              <p className="font-semibold text-amber-900 mb-1">Payment Plan</p>
              <div className="space-y-1 text-amber-800">
                <div className="flex justify-between">
                  <span>Advance Payment (25%)</span>
                  <span className="font-semibold">${pricing.advancePayment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Balance Due (75%)</span>
                  <span className="font-semibold">${pricing.remainingBalance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Toggle */}
      <button
        onClick={() => setPreviewVisible(!isPreviewVisible)}
        className="w-full text-sm text-slate-600 hover:text-slate-900 py-2 border border-slate-200 rounded-lg transition-colors"
      >
        {isPreviewVisible ? "Hide Preview" : "Show Preview"}
      </button>
    </div>
  );
}
