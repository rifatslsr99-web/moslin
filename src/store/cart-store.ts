import { create } from "zustand";
import { Design } from "@/types";

export interface CartItem {
  designId: string;
  design: Design;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (design: Design, quantity?: number) => void;
  removeItem: (designId: string) => void;
  updateQuantity: (designId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (design: Design, quantity: number = 1) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.designId === design.id);

      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.designId === design.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...state.items, { designId: design.id, design, quantity }];
      }

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + (item.design.pricing?.total || 0) * item.quantity,
        0
      );

      return { items: updatedItems, totalItems, totalPrice };
    }),

  removeItem: (designId: string) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.designId !== designId);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + (item.design.pricing?.total || 0) * item.quantity,
        0
      );
      return { items: updatedItems, totalItems, totalPrice };
    });
  },

  updateQuantity: (designId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.designId !== designId);
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + (item.design.pricing?.total || 0) * item.quantity,
          0
        );
        return { items: updatedItems, totalItems, totalPrice };
      }

      const updatedItems = state.items.map((item) =>
        item.designId === designId ? { ...item, quantity } : item
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + (item.design.pricing?.total || 0) * item.quantity,
        0
      );

      return { items: updatedItems, totalItems, totalPrice };
    });
  },

  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }),

  getTotal: () => get().totalPrice,
}));
