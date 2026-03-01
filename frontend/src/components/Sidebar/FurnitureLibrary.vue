<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFurnitureStore, useSceneStore } from '@/stores';
import type { FurnitureAsset } from '@/types';
import '@/styles/components/furniture-library.css';

const furnitureStore = useFurnitureStore();
const sceneStore = useSceneStore();
const search = ref('');
const activeCategory = ref<string | null>(null);
const activeTab = ref<'furniture' | 'construction'>('furniture');

watch(search, (value) => {
  furnitureStore.setSearchTerm(value);
});

watch(activeCategory, (value) => {
  furnitureStore.setCategory(value);
});

const constructionCategories = ['windows', 'doors', 'stairs', 'walls', 'floors'];

const filteredListByTab = computed(() => {
  return furnitureStore.furniture.filter(item => {
    const isConstruction = constructionCategories.includes(item.category.toLowerCase());
    return activeTab.value === 'construction' ? isConstruction : !isConstruction;
  });
});

const categories = computed(() => {
  const unique = new Set<string>();
  filteredListByTab.value.forEach((item) => unique.add(item.category));
  return Array.from(unique);
});

const furnitureList = computed<FurnitureAsset[]>(() => {
  let list = filteredListByTab.value;
  
  if (activeCategory.value) {
    list = list.filter(item => item.category === activeCategory.value);
  }
  
  if (search.value) {
    const query = search.value.toLowerCase();
    list = list.filter(item => item.name.toLowerCase().includes(query));
  }
  
  return list;
});

const addFurnitureToScene = (assetId: string) => {
  const instance = sceneStore.addFurnitureFromAsset(assetId, {
    position: { x: 0, y: 0, z: 0 },
  });
  sceneStore.setSelectedFurniture(instance.id);
};
</script>

<template>
  <div class="library">
    <div class="library__tabs">
      <button
        class="library__tab"
        :class="{ active: activeTab === 'furniture' }"
        @click="activeTab = 'furniture'"
      >
        <span class="material-symbols-outlined">chair</span>
        Furniture
      </button>
      <button
        class="library__tab"
        :class="{ active: activeTab === 'construction' }"
        @click="activeTab = 'construction'"
      >
        <span class="material-symbols-outlined">door_front</span>
        Build
      </button>
    </div>

    <div class="library__search-wrapper">
      <span class="material-symbols-outlined search-icon">search</span>
      <input
        v-model="search"
        class="library__search"
        type="search"
        placeholder="Search catalog..."
      />
    </div>

    <div class="library__categories">
      <button
        class="category-chip"
        :class="{ active: activeCategory === null }"
        @click="activeCategory = null"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="category-chip"
        :class="{ active: activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="library__scroll-area">
      <div v-if="furnitureList.length" class="library__grid">
        <div
          v-for="item in furnitureList"
          :key="item.id"
          class="catalog-item"
          @click="addFurnitureToScene(item.id)"
        >
          <div class="catalog-item__preview">
            <img :src="item.thumbnail" :alt="item.name" loading="lazy" />
            <div class="catalog-item__add-overlay">
              <span class="material-symbols-outlined">add</span>
            </div>
          </div>
          <div class="catalog-item__info">
            <span class="catalog-item__name">{{ item.name }}</span>
            <span class="catalog-item__category">{{ item.category }}</span>
          </div>
        </div>
      </div>
      <div v-else class="library__empty">
        <span class="material-symbols-outlined">search_off</span>
        <p>No items found</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Inherited styles from global css or specific css file */
/* Moved fully to external CSS file for cleaner separation as per project structure */
</style>
