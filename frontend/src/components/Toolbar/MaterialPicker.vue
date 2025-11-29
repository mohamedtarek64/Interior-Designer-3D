<script setup lang="ts">
import { computed, ref } from 'vue';

import { useFurnitureStore } from '@/stores';

import '@/styles/components/toolbar-material-picker.css';

const furnitureStore = useFurnitureStore();
const selectedCategory = ref<'wood' | 'marble' | 'fabric' | 'metal' | 'all'>('all');

const materials = computed(() =>
  selectedCategory.value === 'all'
    ? furnitureStore.materials
    : furnitureStore.materials.filter((material) => material.category === selectedCategory.value),
);

const categories = ['all', 'wood', 'marble', 'fabric', 'metal'] as const;
</script>

<template>
  <section class="material-picker">
    <header class="material-picker__header">
      <h3>Materials</h3>
      <div class="material-picker__categories">
        <button
          v-for="category in categories"
          :key="category"
          class="material-picker__category"
          :class="{ 'material-picker__category--active': selectedCategory === category }"
          type="button"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </header>

    <div class="material-picker__grid">
      <button
        v-for="material in materials"
        :key="material.id"
        class="material-picker__item"
        type="button"
      >
        <div
          class="material-picker__preview"
          :style="{ backgroundImage: `url(${material.texture})` }"
        />
        <div class="material-picker__meta">
          <span class="material-picker__name">{{ material.name }}</span>
          <span class="material-picker__id">{{ material.id }}</span>
        </div>
      </button>
    </div>
  </section>
</template>
