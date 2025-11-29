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
</script>

<template>
  <div class="design-showcase">
    <section v-if="featuredDesign" class="design-showcase__hero">
      <div class="design-showcase__hero-content">
        <p class="design-showcase__eyebrow">Featured Design</p>
        <h1>{{ featuredDesign.name }}</h1>
        <p class="design-showcase__description">
          Explore our curated interiors and jump straight into the editor to customize them for your next
          project.
        </p>
        <div class="design-showcase__hero-actions">
          <BaseButton variant="primary" size="lg" @click="viewDesign(featuredDesign.id)">
            View Design
          </BaseButton>
          <BaseButton variant="ghost" size="lg" @click="router.push({ name: 'my-designs' })">
            Manage Designs
          </BaseButton>
        </div>
        <p class="design-showcase__meta">
          Updated {{ new Date(featuredDesign.updatedAt).toLocaleDateString() }}
        </p>
      </div>
      <div class="design-showcase__hero-preview">
        <img :src="featuredDesign.previewImage" :alt="featuredDesign.name" />
        <span class="design-showcase__preview-label">Modern apartment preset</span>
      </div>
    </section>

    <section class="design-showcase__grid">
      <header class="design-showcase__grid-header">
        <h2>Ready-made scenes</h2>
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
              <BaseButton size="sm" variant="secondary" @click="viewDesign(design.id)">
                View
              </BaseButton>
              <BaseButton size="sm" variant="ghost" @click="router.push({ name: 'my-designs' })">
                Manage
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  </div>
</template>
