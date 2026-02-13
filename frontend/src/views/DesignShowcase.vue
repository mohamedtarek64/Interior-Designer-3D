<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton, BaseCard } from '@/components/UI';
import { useDesignStore } from '@/stores';

import '@/styles/pages/design-showcase.css';

const designStore = useDesignStore();
const router = useRouter();

onMounted(() => {
  if (!designStore.designs.length) {
    designStore.fetchDesigns();
  }
});

const designs = computed(() => designStore.designs);
const featuredDesign = computed(() => designs.value[0] ?? null);

const viewDesign = (designId: string) => {
  router.push({ name: 'design-detail', params: { id: designId } });
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Interior Architect',
    text: 'This tool has completely transformed how I present designs to clients. The 3D previews are stunning.',
    avatar: 'S',
  },
  {
    name: 'Ahmed Khaled',
    role: 'Real Estate Developer',
    text: 'We use Interior Designer 3D for virtual staging. It saves us thousands on physical staging costs.',
    avatar: 'A',
  },
  {
    name: 'Maria Santos',
    role: 'Homeowner',
    text: 'Even without a design background, I was able to plan my entire apartment renovation. Incredible!',
    avatar: 'M',
  },
];
</script>

<template>
  <div class="design-showcase">
    <!-- Hero -->
    <section v-if="featuredDesign" class="design-showcase__hero">
      <div class="design-showcase__hero-content">
        <p class="design-showcase__eyebrow">Featured Design</p>
        <h1>{{ featuredDesign.name }}</h1>
        <p class="design-showcase__description">
          Explore our curated interiors and jump straight into the editor to customize them for your next project.
        </p>
        <div class="design-showcase__hero-actions">
          <BaseButton variant="primary" size="lg" @click="viewDesign(featuredDesign.id)">
            <span class="material-symbols-outlined" style="font-size: 20px;">visibility</span>
            View Design
          </BaseButton>
          <BaseButton variant="secondary" size="lg" @click="router.push({ name: 'my-designs' })">
            Manage Designs
          </BaseButton>
        </div>
        <div class="design-showcase__stats-row">
          <div class="mini-stat">
            <span class="material-symbols-outlined">palette</span>
            <span>12 Materials</span>
          </div>
          <div class="mini-stat">
            <span class="material-symbols-outlined">weekend</span>
            <span>8 Objects</span>
          </div>
          <div class="mini-stat">
            <span class="material-symbols-outlined">lightbulb</span>
            <span>3 Lights</span>
          </div>
        </div>
      </div>
      <div class="design-showcase__hero-preview">
        <img :src="featuredDesign.previewImage" :alt="featuredDesign.name" />
        <span class="design-showcase__preview-label">
          <span class="material-symbols-outlined">verified</span>
          Staff Pick
        </span>
      </div>
    </section>

    <!-- Grid -->
    <section class="design-showcase__grid">
      <header class="design-showcase__grid-header">
        <div>
          <p class="design-showcase__eyebrow">Templates</p>
          <h2>Ready-made scenes</h2>
        </div>
        <p>Kick-start your layout with professionally staged environments.</p>
      </header>

      <div class="design-showcase__grid-list">
        <BaseCard
          v-for="design in designs"
          :key="design.id"
          elevated
          class="design-showcase__card"
        >
          <figure>
            <img :src="design.previewImage" :alt="design.name" />
          </figure>
          <div class="design-showcase__card-body">
            <h3>{{ design.name }}</h3>
            <p class="design-showcase__card-meta">
              Updated {{ new Date(design.updatedAt).toLocaleDateString() }}
            </p>
            <div class="design-showcase__card-actions">
              <BaseButton size="sm" variant="primary" @click="viewDesign(design.id)">
                Open
              </BaseButton>
              <BaseButton size="sm" variant="ghost" @click="router.push({ name: 'my-designs' })">
                Clone
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="design-showcase__testimonials">
      <div class="section-header">
        <p class="design-showcase__eyebrow">Reviews</p>
        <h2>Loved by designers</h2>
      </div>
      <div class="testimonials-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
          <p class="testimonial-text">"{{ t.text }}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">{{ t.avatar }}</div>
            <div>
              <strong>{{ t.name }}</strong>
              <span>{{ t.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
