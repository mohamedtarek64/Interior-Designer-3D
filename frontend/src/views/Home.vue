<script setup lang="ts">
import { BaseButton, BaseCard } from '@/components/UI';

import '@/styles/pages/home.css';

const features = [
  {
    title: 'Real-time 3D Scene',
    description:
      'Manipulate lighting, cameras, and materials with live feedback powered by Three.js.',
  },
  {
    title: 'Curated Furniture Library',
    description: 'Start with ready-made templates and expand with your own GLB models.',
  },
  {
    title: 'Share & Export',
    description:
      'Capture screenshots or export scene data for collaboration—all without leaving the browser.',
  },
];
</script>

<template>
  <div class="home-view">
    <section class="home-view__hero">
      <div class="home-view__hero-content">
        <h1>Design immersive interiors in minutes.</h1>
        <p>
          Drag-and-drop furniture, tweak materials, and capture stunning visuals with our 3D editor.
        </p>
        <div class="home-view__cta">
          <BaseButton as="router-link" to="/editor" size="lg">
            Launch Editor
          </BaseButton>
          <BaseButton as="router-link" to="/gallery" variant="ghost" size="lg">
            Explore Gallery
          </BaseButton>
        </div>
      </div>
      <div class="home-view__hero-visual" />
    </section>

    <section class="home-view__features">
      <BaseCard v-for="feature in features" :key="feature.title" bordered elevated>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </BaseCard>
    </section>
  </div>
</template>
