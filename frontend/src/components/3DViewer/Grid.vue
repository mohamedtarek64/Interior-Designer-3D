<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useSceneState } from '@/composables/useScene';
import { useThree } from '@/composables/useThree';

const { sceneManager } = useThree();
const { gridEnabled } = useSceneState();

const setupGrid = () => {
  sceneManager.addGrid(20, 20);
  sceneManager.toggleGrid(gridEnabled.value);
};

onMounted(() => {
  setupGrid();
});

watch(
  () => gridEnabled.value,
  (enabled) => {
    sceneManager.toggleGrid(enabled);
  },
);
</script>

<template>
  <slot />
</template>
