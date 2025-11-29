import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';

interface ModalState {
  export: boolean;
  share: boolean;
  screenshot: boolean;
}

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  activePanel: 'library' | 'properties' | 'layers';
  modals: ModalState;
}

const initialState: UIState = {
  theme: 'light',
  sidebarCollapsed: false,
  activePanel: 'library',
  modals: {
    export: false,
    share: false,
    screenshot: false,
  },
};

export const useUIStore = defineStore('ui', {
  state: () => structuredClone(initialState) as UIState,
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    setTheme(theme: Theme) {
      this.theme = theme;
      document.documentElement.dataset.theme = theme;
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    openModal(modal: keyof ModalState) {
      this.modals[modal] = true;
    },
    closeModal(modal: keyof ModalState) {
      this.modals[modal] = false;
    },
    setActivePanel(panel: UIState['activePanel']) {
      this.activePanel = panel;
    },
    resetUI() {
      Object.assign(this, structuredClone(initialState));
    },
  },
});
