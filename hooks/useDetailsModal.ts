import {create} from "zustand";


interface DetailsModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDetailsModal = create<DetailsModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useDetailsModal;