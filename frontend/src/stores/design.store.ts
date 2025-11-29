import { defineStore } from 'pinia';

import type { DesignDetail } from '@/types';
import { saveSceneToJson, loadSceneFromJson } from '@/composables/sceneDownload';
import { designLibrary } from '@/data';

interface DesignState {
  designs: DesignDetail[];
  activeDesign: DesignDetail | null;
  loading: boolean;
}

export const useDesignStore = defineStore('design', {
  state: (): DesignState => ({
    designs: designLibrary,
    activeDesign: null,
    loading: false,
  }),
  getters: {
    hasActiveDesign: (state) => state.activeDesign !== null,
  },
  actions: {
    async fetchDesigns() {
      this.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        this.designs = designLibrary;
      } finally {
        this.loading = false;
      }
    },
    setActiveDesign(design: DesignDetail | null) {
      this.activeDesign = design;
      if (design) {
        loadSceneFromJson(design.scene);
      }
    },
    loadDesignById(id: string) {
      const design = this.designs.find((item) => item.id === id);
      if (!design) {
        return false;
      }
      this.setActiveDesign(design);
      return true;
    },
    saveCurrentScene(name: string) {
      const sceneJson = saveSceneToJson();
      const design: DesignDetail = {
        id: `design-${Date.now()}`,
        name,
        previewImage: '/assets/images/sofa.png',
        updatedAt: new Date().toISOString(),
        scene: sceneJson,
      };
      this.designs = [design, ...this.designs];
      this.setActiveDesign(design);
    },
  },
});
