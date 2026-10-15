import { create } from "zustand";
import { Design, Customizations } from "@/types";
import { calculatePricing } from "@/lib/pricing";

interface CustomizationState {
  // Current design being edited
  currentDesign: Partial<Design> & {
    pricing?: ReturnType<typeof calculatePricing>;
  };

  // UI state
  currentStep: "budget" | "category" | "fabric" | "color" | "customizations" | "review";
  isPreviewVisible: boolean;

  // Actions
  setBudget: (budget: string) => void;
  setCategory: (category: string) => void;
  setFabric: (fabricId: string, fabricUpcharge: number) => void;
  setBaseColor: (color: string) => void;
  setCustomization: (key: string, value: string) => void;
  updateCustomizations: (customizations: Customizations) => void;
  setCurrentStep: (step: CustomizationState["currentStep"]) => void;
  setPreviewVisible: (visible: boolean) => void;
  resetDesign: () => void;
  saveDesign: (name: string) => Design | null;
  loadDesign: (design: Design) => void;

  // Getters
  getTotalPrice: () => number;
  getAdvancePayment: () => number;
  getRemainingBalance: () => number;
}

const initialDesign: Partial<Design> & { pricing?: ReturnType<typeof calculatePricing> } = {
  id: "",
  userId: "",
  name: "New Design",
  category: "",
  budget: "Essential" as const,
  baseColor: "#2C3E50",
  customizations: {},
  status: "draft" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useCustomizationStore = create<CustomizationState>((set, get) => ({
  currentDesign: initialDesign,
  currentStep: "budget",
  isPreviewVisible: true,

  setBudget: (budget: string) =>
    set((state) => ({
      currentDesign: {
        ...state.currentDesign,
        budget: budget as "Essential" | "Exclusive" | "Tailored",
      },
    })),

  setCategory: (category: string) =>
    set((state) => ({
      currentDesign: {
        ...state.currentDesign,
        category,
      },
    })),

  setFabric: (fabricId: string, fabricUpcharge: number) =>
    set((state) => {
      const design = state.currentDesign;
      const pricing = calculatePricing(
        design.budget || "Essential",
        design.category || "",
        fabricUpcharge,
        design.customizations || {},
        0
      );
      return {
        currentDesign: {
          ...design,
          fabricId,
          pricing,
        },
      };
    }),

  setBaseColor: (color: string) =>
    set((state) => ({
      currentDesign: {
        ...state.currentDesign,
        baseColor: color,
      },
    })),

  setCustomization: (key: string, value: string) =>
    set((state) => {
      const customizations = {
        ...state.currentDesign.customizations,
        [key]: value,
      };
      const pricing = calculatePricing(
        state.currentDesign.budget || "Essential",
        state.currentDesign.category || "",
        0,
        customizations,
        0
      );
      return {
        currentDesign: {
          ...state.currentDesign,
          customizations,
          pricing,
        },
      };
    }),

  updateCustomizations: (customizations: Customizations) =>
    set((state) => {
      const pricing = calculatePricing(
        state.currentDesign.budget || "Essential",
        state.currentDesign.category || "",
        0,
        customizations,
        0
      );
      return {
        currentDesign: {
          ...state.currentDesign,
          customizations,
          pricing,
        },
      };
    }),

  setCurrentStep: (step: CustomizationState["currentStep"]) =>
    set({ currentStep: step }),

  setPreviewVisible: (visible: boolean) =>
    set({ isPreviewVisible: visible }),

  resetDesign: () =>
    set({
      currentDesign: initialDesign,
      currentStep: "budget",
    }),

  saveDesign: (name: string) => {
    const state = get().currentDesign;
    if (!state.category || !state.budget) {
      console.warn("Cannot save design: missing category or budget");
      return null;
    }
    const designToSave = {
      ...state,
      name,
      status: "saved" as const,
    };
    // Here you'd typically make an API call to save to the database
    return designToSave as Design;
  },

  loadDesign: (design: Design) => {
    const pricing = calculatePricing(
      design.budget || "Essential",
      design.category || "",
      0,
      design.customizations || {},
      0
    );
    set({
      currentDesign: {
        ...design,
        pricing,
      },
      currentStep: "review",
    });
  },

  getTotalPrice: () => get().currentDesign.pricing?.total || 0,

  getAdvancePayment: () => get().currentDesign.pricing?.advancePayment || 0,

  getRemainingBalance: () => get().currentDesign.pricing?.remainingBalance || 0,
}));
