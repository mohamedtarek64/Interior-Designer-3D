<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton, BaseCard } from '@/components/UI';
import { useDesignStore } from '@/stores';

const router = useRouter();
const designStore = useDesignStore();

const designs = computed(() =>
  designStore.designs.map((design) => ({
    id: design.id,
    name: design.name,
    updatedAt: design.updatedAt,
    preview: design.previewImage,
  })),
);

const openDesign = (designId: string) => {
  router.push({ name: 'design-detail', params: { id: designId } });
};
</script>

<template>
  <div class="my-designs">
    <header class="my-designs__header">
      <div>
        <h1>My Designs</h1>
        <p>Manage and reopen scenes you created previously.</p>
      </div>
      <BaseButton as="router-link" to="/editor">Create New Design</BaseButton>
    </header>

    <section v-if="designs.length" class="my-designs__grid">
      <BaseCard v-for="design in designs" :key="design.id" elevated class="my-designs__card">
        <div class="my-designs__preview-wrapper">
          <img :src="design.preview" :alt="design.name" class="my-designs__preview" />
        </div>
        <div class="my-designs__body">
          <h2>{{ design.name }}</h2>
          <p>Updated {{ new Date(design.updatedAt).toLocaleDateString() }}</p>
          <div class="my-designs__actions">
            <BaseButton size="sm" variant="primary" @click="openDesign(design.id)">Open</BaseButton>
            <BaseButton size="sm" variant="secondary">Export</BaseButton>
          </div>
        </div>
      </BaseCard>
    </section>

    <BaseCard v-else bordered class="my-designs__empty">
      <h2>No designs yet</h2>
      <p>Get started by launching the editor and saving your first scene.</p>
      <BaseButton as="router-link" to="/editor">Launch Editor</BaseButton>
    </BaseCard>
  </div>
</template>

<style scoped>
.my-designs {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem;
}

.my-designs__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  padding-bottom: 2rem;
}

.my-designs__header h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.my-designs__header p {
  margin: 0.75rem 0 0;
  color: #64748b;
  font-size: 1.1rem;
}

.my-designs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.my-designs__card {
  padding: 0 !important;
}

.my-designs__preview-wrapper {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
}

.my-designs__preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.my-designs__card:hover .my-designs__preview {
  transform: scale(1.1);
}

.my-designs__body {
  padding: 1.5rem 2rem;
}

.my-designs__body h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.my-designs__body p {
  margin: 0.25rem 0 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.my-designs__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.my-designs__empty {
  text-align: center;
  padding: 6rem 2rem;
  background: white;
  border-radius: 40px;
  border: 2px dashed #e2e8f0;
}

.my-designs__empty h2 {
  font-size: 2rem;
  color: #0f172a;
}

.my-designs__empty p {
  color: #64748b;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .my-designs {
    padding: 2rem;
  }

  .my-designs__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}
</style>
