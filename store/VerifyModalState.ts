
import { create } from "zustand";

interface VerifyModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useVerifyModal = create<VerifyModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));
