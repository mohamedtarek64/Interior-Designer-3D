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
      <BaseCard v-for="design in designs" :key="design.id" elevated>
        <img :src="design.preview" :alt="design.name" class="my-designs__preview" />
        <div>
          <h2>{{ design.name }}</h2>
          <p>Updated {{ new Date(design.updatedAt).toLocaleDateString() }}</p>
        </div>
        <div class="my-designs__actions">
          <BaseButton size="sm" variant="secondary" @click="openDesign(design.id)">Open</BaseButton>
          <BaseButton size="sm" variant="ghost">Export</BaseButton>
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
  gap: 2.5rem;
}

.my-designs__header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
}

.my-designs__header h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: #0f172a;
}

.my-designs__header p {
  margin: 0.45rem 0 0;
  color: #475569;
}

.my-designs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.75rem;
}

.my-designs__preview {
  width: 100%;
  border-radius: 12px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.my-designs__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.my-designs__empty {
  text-align: center;
  gap: 1rem;
}

@media (max-width: 720px) {
  .my-designs__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
