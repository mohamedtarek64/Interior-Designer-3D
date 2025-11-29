<script setup lang="ts">
import { computed, ref } from 'vue';

import { useSceneStore, useUIStore } from '@/stores';

import '@/styles/components/toolbar-tools.css';

const tools = [
  { id: 'select', label: 'Select', icon: '🖱️' },
  { id: 'move', label: 'Move', icon: '↕️' },
  { id: 'rotate', label: 'Rotate', icon: '⟲' },
  { id: 'scale', label: 'Scale', icon: '⬒' },
];

const activeTool = ref('select');

const sceneStore = useSceneStore();
const uiStore = useUIStore();

const snappingEnabled = computed(() => sceneStore.snapping);
const gridEnabled = computed(() => sceneStore.gridEnabled);
const sidebarCollapsed = computed(() => uiStore.sidebarCollapsed);

const toggleSnapping = () => {
  sceneStore.toggleSnapping();
};

const toggleGrid = () => {
  sceneStore.toggleGrid();
};

const toggleSidebar = () => {
  uiStore.toggleSidebar();
};
</script>

<template>
  <section class="tools">
    <header class="tools__header">
      <h3>Tools</h3>
      <div class="tools__toggles">
        <button
          type="button"
          class="tools__toggle"
          :class="{ 'tools__toggle--active': snappingEnabled }"
          @click="toggleSnapping"
        >
          Snapping
        </button>
        <button
          type="button"
          class="tools__toggle"
          :class="{ 'tools__toggle--active': gridEnabled }"
          @click="toggleGrid"
        >
          Grid
        </button>
        <button
          type="button"
          class="tools__toggle"
          :class="{ 'tools__toggle--active': !sidebarCollapsed }"
          @click="toggleSidebar"
        >
          Sidebar
        </button>
      </div>
    </header>

    <div class="tools__grid">
      <button
        v-for="tool in tools"
        :key="tool.id"
        type="button"
        class="tools__button"
        :class="{ 'tools__button--active': activeTool === tool.id }"
        @click="activeTool = tool.id"
      >
        <span class="tools__icon">{{ tool.icon }}</span>
        <span>{{ tool.label }}</span>
      </button>
    </div>
  </section>
</template>
