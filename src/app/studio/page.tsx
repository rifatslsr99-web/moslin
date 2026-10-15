"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { useCustomizationStore } from "@/store/customization-store";
import { Button } from "@/components/ui/primitives";
import BudgetSelector from "@/components/studio/budget-selector";
import CategorySelector from "@/components/studio/category-selector";
import FabricSelector from "@/components/studio/fabric-selector";
import ColorPicker from "@/components/studio/color-picker";
import CustomizationPanel from "@/components/studio/customization-panel";
import OutfitPreview from "@/components/studio/outfit-preview";
import DesignSummary from "@/components/studio/design-summary";

const STEPS = ["budget", "category", "fabric", "color", "customizations", "review"] as const;

export default function StudioPage() {
  const { currentStep, setCurrentStep, currentDesign, setCustomization } = useCustomizationStore();
  const currentStepIndex = STEPS.indexOf(currentStep as any);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Check if the drop target is a drop zone
    const activeData = active?.data as any;
    const overData = over?.data as any;

    if (over.id && activeData?.type && overData?.type) {
      // Only apply if dropping on a compatible zone
      if (activeData.type === overData.type) {
        setCustomization(activeData.type, activeData.value);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif">
              Create Your MOSLIN
            </h1>
            <p className="text-slate-600">Design it, visualize it, make it yours.</p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8 flex gap-2 overflow-x-auto">
            {STEPS.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(step)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    index === currentStepIndex
                      ? "bg-slate-900 text-white"
                      : index < currentStepIndex
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {index + 1}
                </button>
                {index < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 ${index < currentStepIndex ? "bg-green-500" : "bg-slate-300"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                {currentStep === "budget" && <BudgetSelector onNext={handleNext} />}
                {currentStep === "category" && (
                  <CategorySelector onNext={handleNext} onPrevious={handlePrevious} />
                )}
                {currentStep === "fabric" && (
                  <FabricSelector onNext={handleNext} onPrevious={handlePrevious} />
                )}
                {currentStep === "color" && (
                  <ColorPicker onNext={handleNext} onPrevious={handlePrevious} />
                )}
                {currentStep === "customizations" && (
                  <CustomizationPanel onNext={handleNext} onPrevious={handlePrevious} />
                )}
                {currentStep === "review" && (
                  <DesignSummary onPrevious={handlePrevious} />
                )}
              </div>
            </div>

            {/* Right: Preview */}
            <div className="lg:col-span-1">
              <OutfitPreview />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
