<script setup lang="ts">
import { ref } from 'vue';

import '@/styles/components/toolbar-color-picker.css';

const colors = [
  '#ffffff',
  '#f8fafc',
  '#e2e8f0',
  '#d1d5db',
  '#94a3b8',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#0ea5e9',
  '#22c55e',
  '#facc15',
  '#ef4444',
];

const selectedColor = ref(colors[0]);
</script>

<template>
  <section class="color-picker">
    <header class="color-picker__header">
      <h3>Accent Color</h3>
      <span class="color-picker__value">{{ selectedColor }}</span>
    </header>
    <div class="color-picker__grid">
      <button
        v-for="color in colors"
        :key="color"
        type="button"
        class="color-picker__swatch"
        :class="{ 'color-picker__swatch--selected': selectedColor === color }"
        :style="{ backgroundColor: color }"
        @click="selectedColor = color"
      />
    </div>
  </section>
</template>
