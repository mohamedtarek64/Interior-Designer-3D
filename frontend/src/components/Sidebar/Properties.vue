<script setup lang="ts">
import { computed, watch } from 'vue';

import { BaseButton, BaseInput } from '@/components/UI';
import { useFurnitureStore, useSceneStore } from '@/stores';
import type { FurnitureInstance } from '@/types';

import '@/styles/components/properties-panel.css';

const sceneStore = useSceneStore();
const furnitureStore = useFurnitureStore();

const selectedId = computed({
  get: () => sceneStore.selectedFurnitureId,
  set: (value: string | null) => sceneStore.setSelectedFurniture(value),
});

const selectedInstance = computed<FurnitureInstance | null>(() => sceneStore.selectedFurniture);

const selectedAsset = computed(() => {
  if (!selectedInstance.value) {
    return null;
  }
  return furnitureStore.furniture.find((asset) => asset.id === selectedInstance.value?.assetId);
});

const selectedDisplayName = computed(() => {
  if (selectedAsset.value) {
    return selectedAsset.value.name;
  }
  if (selectedInstance.value) {
    return selectedInstance.value.assetId;
  }
  return '';
});

const selectedIdModel = computed({
  get: () => selectedId.value ?? '',
  set: (value: string) => {
    sceneStore.setSelectedFurniture(value === '' ? null : value);
  },
});

watch(
  () => sceneStore.furniture.map((item) => item.id),
  (ids) => {
    if (!ids.length) {
      sceneStore.setSelectedFurniture(null);
      return;
    }
    if (!sceneStore.selectedFurnitureId || !ids.includes(sceneStore.selectedFurnitureId)) {
      sceneStore.setSelectedFurniture(ids[0] ?? null);
    }
  },
  { immediate: true },
);

const updatePosition = (axis: keyof FurnitureInstance['position'], value: string) => {
  if (!selectedInstance.value) {
    return;
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return;
  }
  const newPosition = { ...selectedInstance.value.position, [axis]: numeric };
  sceneStore.updateFurniturePosition(selectedInstance.value.id, newPosition);
};

const removeSelected = () => {
  if (!selectedInstance.value) {
    return;
  }
  sceneStore.removeFurniture(selectedInstance.value.id);
};
</script>

<template>
  <section class="properties">
    <header class="properties__header">
      <div class="properties__title">
        <h3>Properties</h3>
        <p v-if="selectedDisplayName" class="properties__subtitle">{{ selectedDisplayName }}</p>
      </div>
      <div class="properties__controls">
        <select v-model="selectedIdModel" class="properties__selector">
          <option value="">Select object</option>
          <option v-for="item in sceneStore.furniture" :key="item.id" :value="item.id">
            {{ item.id }}
          </option>
        </select>
        <BaseButton
          size="sm"
          variant="ghost"
          :disabled="!selectedInstance"
          type="button"
          @click="removeSelected"
        >
          Remove
        </BaseButton>
      </div>
    </header>

    <div v-if="selectedInstance" class="properties__panel">
      <section>
        <h4>Transform</h4>
        <div class="properties__group">
          <BaseInput
            :model-value="selectedInstance.position.x.toFixed(2)"
            label="Position X"
            type="number"
            helper="meters"
            @change="updatePosition('x', ($event.target as HTMLInputElement).value)"
          />
          <BaseInput
            :model-value="selectedInstance.position.y.toFixed(2)"
            label="Position Y"
            type="number"
            helper="meters"
            @change="updatePosition('y', ($event.target as HTMLInputElement).value)"
          />
          <BaseInput
            :model-value="selectedInstance.position.z.toFixed(2)"
            label="Position Z"
            type="number"
            helper="meters"
            @change="updatePosition('z', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </section>

      <section>
        <h4>Materials</h4>
        <p v-if="selectedAsset">
          Default materials:
          <strong>{{ selectedAsset.materials.join(', ') }}</strong>
        </p>
      </section>
    </div>

    <p v-else class="properties__empty">Select an object in the scene to edit its properties.</p>
  </section>
</template>
