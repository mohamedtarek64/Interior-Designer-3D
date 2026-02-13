<script setup lang="ts">
import { ref, computed } from 'vue';

import { BaseCard, BaseButton } from '@/components/UI';

import '@/styles/pages/gallery.css';

type GalleryItem = {
  id: string;
  title: string;
  author: string;
  preview: string;
  category: string;
  likes: number;
};

const activeFilter = ref('all');

const gallery = ref<GalleryItem[]>([
  { id: 'g-001', title: 'Scandinavian Loft', author: 'Amina Hassan', preview: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop', category: 'living', likes: 234 },
  { id: 'g-002', title: 'Industrial Kitchen', author: 'Hassan Ali', preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', category: 'kitchen', likes: 189 },
  { id: 'g-003', title: 'Minimal Bedroom', author: 'Salma Youssef', preview: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop', category: 'bedroom', likes: 312 },
  { id: 'g-004', title: 'Modern Office Space', author: 'Omar Tarek', preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', category: 'office', likes: 156 },
  { id: 'g-005', title: 'Bohemian Living Room', author: 'Lina Nader', preview: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop', category: 'living', likes: 278 },
  { id: 'g-006', title: 'Luxury Bathroom', author: 'Karim Saad', preview: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop', category: 'bathroom', likes: 145 },
  { id: 'g-007', title: 'Cozy Reading Nook', author: 'Nour Ahmed', preview: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop', category: 'living', likes: 198 },
  { id: 'g-008', title: 'Chef\'s Kitchen', author: 'Yara Mahmoud', preview: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=400&fit=crop', category: 'kitchen', likes: 267 },
  { id: 'g-009', title: 'Master Suite', author: 'Tarek Mohamed', preview: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', category: 'bedroom', likes: 342 },
]);

const categories = [
  { key: 'all', label: 'All' },
  { key: 'living', label: 'Living Room' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'office', label: 'Office' },
];

const filteredGallery = computed(() => {
  if (activeFilter.value === 'all') return gallery.value;
  return gallery.value.filter(item => item.category === activeFilter.value);
});
</script>

<template>
  <div class="gallery-view">
    <header class="gallery-view__header">
      <div>
        <p class="gallery-view__eyebrow">Community</p>
        <h1>Design Gallery</h1>
        <p class="gallery-view__subtitle">Discover stunning interior layouts created by designers around the world.</p>
      </div>
    </header>

    <nav class="gallery-view__filters">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="filter-chip"
        :class="{ active: activeFilter === cat.key }"
        @click="activeFilter = cat.key"
      >
        {{ cat.label }}
      </button>
    </nav>

    <section class="gallery-view__grid">
      <BaseCard
        v-for="item in filteredGallery"
        :key="item.id"
        elevated
        class="gallery-view__card"
      >
        <div class="gallery-view__image-wrapper">
          <img :src="item.preview" :alt="item.title" class="gallery-view__image" />
          <div class="gallery-view__overlay">
            <BaseButton variant="secondary" size="sm">View Design</BaseButton>
          </div>
        </div>
        <div class="gallery-view__meta">
          <div>
            <h2>{{ item.title }}</h2>
            <p>By {{ item.author }}</p>
          </div>
          <div class="gallery-view__likes">
            <span class="material-symbols-outlined">favorite</span>
            {{ item.likes }}
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
