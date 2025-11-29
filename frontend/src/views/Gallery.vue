<script setup lang="ts">
import { ref } from 'vue';

import { BaseCard } from '@/components/UI';

import '@/styles/pages/gallery.css';

type GalleryItem = {
  id: string;
  title: string;
  author: string;
  preview: string;
};

const gallery = ref<GalleryItem[]>([
  { id: 'g-001', title: 'Scandinavian Loft', author: 'Amina', preview: '/assets/images/sofa.png' },
  { id: 'g-002', title: 'Industrial Kitchen', author: 'Hassan', preview: '/assets/images/table.png' },
  { id: 'g-003', title: 'Minimal Bedroom', author: 'Salma', preview: '/assets/images/bed.png' },
]);
</script>

<template>
  <div class="gallery-view">
    <header class="gallery-view__header">
      <h1>Community Gallery</h1>
      <p>Discover interior layouts created by the community.</p>
    </header>

    <section class="gallery-view__grid">
      <BaseCard
        v-for="item in gallery"
        :key="item.id"
        bordered
        elevated
        class="gallery-view__card"
      >
        <img :src="item.preview" :alt="item.title" class="gallery-view__image" />
        <div class="gallery-view__meta">
          <h2>{{ item.title }}</h2>
          <p>By {{ item.author }}</p>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
