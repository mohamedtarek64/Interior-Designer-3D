<script setup lang="ts">
import { BaseButton, BaseCard } from '@/components/UI';

import '@/styles/pages/home.css';

const features = [
  {
    icon: '3d_rotation',
    title: 'Real-time 3D Scene',
    description:
      'Manipulate lighting, cameras, and materials with live feedback powered by Three.js.',
  },
  {
    icon: 'inventory_2',
    title: 'Curated Furniture Library',
    description: 'Start with ready-made templates and expand with your own GLB models.',
  },
  {
    icon: 'ios_share',
    title: 'Share & Export',
    description:
      'Capture screenshots or export scene data for collaboration—all without leaving the browser.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Select a Template',
    description: 'Start from a blank canvas or choose from our professionally staged room templates.',
  },
  {
    number: '02',
    title: 'Customize Space',
    description: 'Drag and drop furniture, adjust wall colors, and experiment with different floor textures.',
  },
  {
    number: '03',
    title: 'Perfect Lighting',
    description: 'Fine-tune ambient, point, and directional lights to create the perfect mood for your render.',
  },
  {
    number: '04',
    title: 'Export & Share',
    description: 'Download high-quality 4K renders or share your interactive 3D link with clients.',
  },
];

const stats = [
  { label: 'Active Users', value: '12K+' },
  { label: '3D Objects', value: '500+' },
  { label: 'Scenes Created', value: '45K+' },
  { label: 'Renderings', value: '100K+' },
];
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="home-view__hero">
      <div class="home-view__hero-content">
        <h1>Design immersive interiors in minutes.</h1>
        <p>
          Drag-and-drop furniture, tweak materials, and capture stunning visuals with our professional 3D cloud editor.
        </p>
        <div class="home-view__cta">
          <BaseButton as="router-link" to="/editor" size="lg">
            Launch Editor
          </BaseButton>
          <BaseButton as="router-link" to="/gallery" variant="secondary" size="lg">
            Explore Gallery
          </BaseButton>
        </div>
      </div>
      <div class="home-view__hero-visual">
        <div class="visual-badge">
          <span class="material-symbols-outlined">auto_awesome</span>
          <span>Powered by AI Rendering</span>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="home-view__stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </section>

    <!-- Features Section -->
    <section class="home-view__features">
      <BaseCard v-for="feature in features" :key="feature.title" bordered elevated class="feature-card">
        <div class="feature-icon">
          <span class="material-symbols-outlined">{{ feature.icon }}</span>
        </div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </BaseCard>
    </section>

    <!-- How it Works Section -->
    <section class="home-view__how">
      <div class="section-header">
        <p class="eyebrow">The Process</p>
        <h2>How it works</h2>
      </div>
      <div class="steps-grid">
        <div v-for="step in steps" :key="step.number" class="step-item">
          <span class="step-number">{{ step.number }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="home-view__final-cta">
      <div class="cta-card">
        <h2>Ready to design your dream space?</h2>
        <p>Join thousands of designers and architects using Interior Designer 3D.</p>
        <BaseButton as="router-link" to="/register" variant="primary" size="lg">
          Get Started for Free
        </BaseButton>
      </div>
    </section>
  </div>
</template>
