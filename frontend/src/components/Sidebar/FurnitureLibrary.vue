<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useFurnitureStore, useSceneStore } from '@/stores';
import type { FurnitureAsset } from '@/types';

import '@/styles/components/furniture-library.css';

const furnitureStore = useFurnitureStore();
const sceneStore = useSceneStore();
const search = ref('');
const activeCategory = ref<string | null>(null);

watch(search, (value) => {
  furnitureStore.setSearchTerm(value);
});

watch(activeCategory, (value) => {
  furnitureStore.setCategory(value);
});

const categories = computed(() => {
  const unique = new Set<string>();
  furnitureStore.furniture.forEach((item) => unique.add(item.category));
  return Array.from(unique);
});

const furnitureList = computed<FurnitureAsset[]>(() => furnitureStore.filteredFurniture);

const addFurnitureToScene = (assetId: string) => {
  const instance = sceneStore.addFurnitureFromAsset(assetId, {
    position: { x: 0, y: 0, z: 0 },
  });
  sceneStore.setSelectedFurniture(instance.id);
};
</script>

<template>
  <section class="library">
    <header class="library__header">
      <h3>Furniture Library</h3>
      <input
        v-model="search"
        class="library__search"
        type="search"
        placeholder="Search furniture"
      />
    </header>

    <nav class="library__categories">
      <button
        type="button"
        class="library__category"
        :class="{ 'library__category--active': activeCategory === null }"
        @click="activeCategory = null"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="library__category"
        :class="{ 'library__category--active': activeCategory === category }"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </nav>

    <ul class="library__list">
      <li v-for="item in furnitureList" :key="item.id" class="library__item">
        <img :src="item.thumbnail" :alt="item.name" />
        <div class="library__details">
          <span class="library__name">{{ item.name }}</span>
          <span class="library__meta">{{ item.category }}</span>
        </div>
        <button type="button" class="library__add" @click="addFurnitureToScene(item.id)">
          Add
        </button>
      </li>
    </ul>
  </section>
</template>
