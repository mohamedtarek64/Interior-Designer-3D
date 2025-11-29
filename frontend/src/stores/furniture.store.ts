import { defineStore } from 'pinia';

import {
  chairs,
  beds,
  decor,
  sofas,
  tables,
  woodMaterials,
  marbleMaterials,
  fabricMaterials,
  metalMaterials,
} from '@/data';
import type { FurnitureAsset, FurnitureCategory, MaterialDefinition } from '@/types';

interface FurnitureState {
  furniture: FurnitureAsset[];
  materials: MaterialDefinition[];
  searchTerm: string;
  selectedCategory: string | null;
}

const furnitureFromData: FurnitureAsset[] = [...chairs, ...tables, ...sofas, ...beds, ...decor].map((item) => ({
  ...item,
  category: item.category as FurnitureCategory,
}));

const materialsFromData: MaterialDefinition[] = [
  ...woodMaterials.map((material) => ({ ...material, category: 'wood' as const })),
  ...marbleMaterials.map((material) => ({ ...material, category: 'marble' as const })),
  ...fabricMaterials.map((material) => ({ ...material, category: 'fabric' as const })),
  ...metalMaterials.map((material) => ({ ...material, category: 'metal' as const })),
];

export const useFurnitureStore = defineStore('furniture', {
  state: (): FurnitureState => ({
    furniture: furnitureFromData,
    materials: materialsFromData,
    searchTerm: '',
    selectedCategory: null,
  }),
  getters: {
    filteredFurniture(state): FurnitureAsset[] {
      const term = state.searchTerm.toLowerCase();
      return state.furniture.filter((item) => {
        const matchesTerm =
          !term ||
          item.name.toLowerCase().includes(term) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term));
        const matchesCategory =
          !state.selectedCategory || item.category === state.selectedCategory;
        return matchesTerm && matchesCategory;
      });
    },
    materialsById(state): Record<string, MaterialDefinition> {
      return state.materials.reduce<Record<string, MaterialDefinition>>((acc, material) => {
        acc[material.id] = material;
        return acc;
      }, {});
    },
  },
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
    setCategory(category: string | null) {
      this.selectedCategory = category;
    },
    addFurniture(item: FurnitureAsset) {
      this.furniture.push(item);
    },
  },
});
