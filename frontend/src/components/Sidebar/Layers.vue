<script setup lang="ts">
import { computed } from 'vue';

import { useSceneStore } from '@/stores';

import '@/styles/components/layers-panel.css';

const sceneStore = useSceneStore();

const furnitureLayers = computed(() =>
  sceneStore.furniture.map((item) => ({
    id: item.id,
    name: item.assetId,
  })),
);

const selectLayer = (id: string) => {
  sceneStore.setSelectedFurniture(id);
};

const removeLayer = (id: string) => {
  sceneStore.removeFurniture(id);
};
</script>

<template>
  <section class="layers">
    <header class="layers__header">
      <h3>Layers</h3>
      <div class="layers__actions">
        <button type="button">Add</button>
        <button type="button">Group</button>
      </div>
    </header>

    <ul class="layers__list">
      <li
        v-for="layer in furnitureLayers"
        :key="layer.id"
        class="layers__item"
        :class="{ 'layers__item--active': sceneStore.selectedFurnitureId === layer.id }"
        @click="selectLayer(layer.id)"
      >
        <div>
          <strong>{{ layer.name }}</strong>
          <small>{{ layer.id }}</small>
        </div>
        <div class="layers__toggles">
          <button type="button" @click.stop="removeLayer(layer.id)">🗑️</button>
        </div>
      </li>
    </ul>
  </section>
</template>
