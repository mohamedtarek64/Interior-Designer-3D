<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useFurnitureStore } from '@/stores';
import type { FurnitureAsset } from '@/types';

import '@/styles/components/toolbar-object-selector.css';

const furnitureStore = useFurnitureStore();

const search = ref('');
const selectedCategory = ref<string | null>(null);

watch(search, (value) => {
  furnitureStore.setSearchTerm(value);
});

watch(selectedCategory, (value) => {
  furnitureStore.setCategory(value);
});

const categories = computed(() => {
  const unique = new Set<string>();
  furnitureStore.furniture.forEach((item) => unique.add(item.category));
  return Array.from(unique);
});

const filteredFurniture = computed<FurnitureAsset[]>(() => furnitureStore.filteredFurniture);
</script>

<template>
  <section class="object-selector">
    <header class="object-selector__header">
      <h3>Furniture Library</h3>
      <input
        v-model="search"
        class="object-selector__search"
        type="search"
        placeholder="Search furniture"
      />
    </header>

    <nav class="object-selector__categories">
      <button
        type="button"
        class="object-selector__category"
        :class="{ 'object-selector__category--active': selectedCategory === null }"
        @click="selectedCategory = null"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="object-selector__category"
        :class="{ 'object-selector__category--active': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </nav>

    <ul class="object-selector__list">
      <li v-for="item in filteredFurniture" :key="item.id" class="object-selector__item">
        <img :src="item.thumbnail" :alt="item.name" />
        <div>
          <p class="object-selector__name">{{ item.name }}</p>
          <span class="object-selector__meta">{{ item.category }}</span>
        </div>
        <button type="button" class="object-selector__add">Add</button>
      </li>
    </ul>
  </section>
</template>
