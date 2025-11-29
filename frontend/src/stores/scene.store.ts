import { defineStore } from 'pinia';

import type { FurnitureInstance, SceneState, Vector3 } from '@/types';

const defaultCamera: SceneState['camera'] = {
  position: { x: 4, y: 3, z: 6 },
  target: { x: 0, y: 0, z: 0 },
  fov: 45,
  near: 0.1,
  far: 500,
};

const defaultLighting: SceneState['lighting'] = {
  environment: 'studio-soft',
  exposure: 1,
  lights: [
    {
      id: 'key-light',
      type: 'directional',
      position: { x: 5, y: 8, z: 5 },
      intensity: 1.2,
      color: '#ffffff',
    },
  ],
};

const initialState: SceneState = {
  camera: defaultCamera,
  furniture: [],
  lighting: defaultLighting,
  gridEnabled: true,
  snapping: true,
  selectedFurnitureId: null,
};

export const useSceneStore = defineStore('scene', {
  state: () => structuredClone(initialState) as SceneState,
  getters: {
    furnitureCount: (state) => state.furniture.length,
    getFurnitureById: (state) => (id: string) =>
      state.furniture.find((item) => item.id === id) ?? null,
    selectedFurniture: (state) =>
      state.selectedFurnitureId
        ? state.furniture.find((item) => item.id === state.selectedFurnitureId) ?? null
        : null,
  },
  actions: {
    resetScene() {
      Object.assign(this, structuredClone(initialState));
    },
    addFurniture(instance: FurnitureInstance) {
      this.furniture.push(instance);
    },
    addFurnitureFromAsset(
      assetId: string,
      options: Partial<Omit<FurnitureInstance, 'assetId'>> = {},
    ) {
      const instance: FurnitureInstance = {
        id: options.id ?? `${assetId}-${Date.now()}`,
        assetId,
        position: options.position ?? { x: 0, y: 0, z: 0 },
        rotation: options.rotation ?? { x: 0, y: 0, z: 0, order: 'XYZ' },
        scale: options.scale ?? { x: 1, y: 1, z: 1 },
        materialOverrides: options.materialOverrides,
        metadata: options.metadata,
      };
      this.furniture.push(instance);
      return instance;
    },
    updateFurniturePosition(id: string, position: Vector3) {
      const item = this.furniture.find((f) => f.id === id);
      if (item) {
        item.position = { ...position };
      }
    },
    updateFurnitureRotation(id: string, rotation: FurnitureInstance['rotation']) {
      const item = this.furniture.find((f) => f.id === id);
      if (item) {
        item.rotation = { ...rotation };
      }
    },
    updateFurnitureScale(id: string, scale: Vector3) {
      const item = this.furniture.find((f) => f.id === id);
      if (item) {
        item.scale = { ...scale };
      }
    },
    removeFurniture(id: string) {
      this.furniture = this.furniture.filter((item) => item.id !== id);
      if (this.selectedFurnitureId === id) {
        this.selectedFurnitureId = this.furniture[0]?.id ?? null;
      }
    },
    toggleGrid(state?: boolean) {
      this.gridEnabled = typeof state === 'boolean' ? state : !this.gridEnabled;
    },
    toggleSnapping(state?: boolean) {
      this.snapping = typeof state === 'boolean' ? state : !this.snapping;
    },
    setSelectedFurniture(id: string | null) {
      this.selectedFurnitureId = id;
    },
    ensureDemoContent() {
      if (this.furniture.length > 0) {
        return;
      }
      const chair = this.addFurnitureFromAsset('chair-001', {
        id: 'demo-chair',
        position: { x: -1.2, y: 0, z: 0 },
      });
      this.addFurnitureFromAsset('sofa-001', {
        id: 'demo-sofa',
        position: { x: 1.4, y: 0, z: -0.3 },
        scale: { x: 1.1, y: 1.1, z: 1.1 },
      });
      this.selectedFurnitureId = chair.id;
    },
  },
});
