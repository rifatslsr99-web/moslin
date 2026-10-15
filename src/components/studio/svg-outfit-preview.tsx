"use client";

import { useCustomizationStore } from "@/store/customization-store";
import ShirtSVG from "./garment-svgs/shirt";

/**
 * Enhanced outfit preview with SVG garment visualization
 * Replaces the simple colored rectangle with an interactive SVG shirt
 */
export default function SVGOutfitPreview() {
  const { currentDesign } = useCustomizationStore();
  const customizations = currentDesign.customizations || {};

  return (
    <div className="bg-slate-100 aspect-square flex items-center justify-center p-6 relative rounded-xl">
      {currentDesign.category?.toLowerCase() === "shirt" ? (
        <div className="w-full h-full flex items-center justify-center">
          {/* SVG Garment with integrated drop zones */}
          <ShirtSVG baseColor={currentDesign.baseColor || "#2c3e50"} />
        </div>
      ) : (
        // Fallback for non-shirt categories
        <div className="text-center">
          <div
            className="w-32 h-40 rounded-lg shadow-md mx-auto mb-4"
            style={{
              backgroundColor: currentDesign.baseColor || "#2c3e50",
              opacity: 0.8,
            }}
          />
          <p className="text-slate-600 font-medium text-sm">
            {currentDesign.category
              ? `${currentDesign.category.toUpperCase()}`
              : "Select garment"}
          </p>
          {currentDesign.fabricId && (
            <p className="text-slate-500 text-xs mt-1">
              Fabric: {currentDesign.fabricId}
            </p>
          )}
        </div>
      )}

      {/* Category label overlay */}
      {currentDesign.category?.toLowerCase() === "shirt" && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-slate-600 font-medium text-sm">
            {currentDesign.category.toUpperCase()}
          </p>
          {currentDesign.fabricId && (
            <p className="text-slate-500 text-xs mt-1">
              Fabric: {currentDesign.fabricId}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
