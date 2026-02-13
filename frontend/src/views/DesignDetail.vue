<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { BaseButton, BaseCard } from '@/components/UI';
import { ThreeScene, Camera, Controls, Lighting, Grid } from '@/components/3DViewer';
import { useDesignStore, useSceneStore } from '@/stores';

import '@/styles/pages/design-detail.css';

const route = useRoute();
const router = useRouter();
const designStore = useDesignStore();
const sceneStore = useSceneStore();

const loading = ref(true);
const design = computed(() =>
  designStore.designs.find((item) => item.id === route.params.id) ?? designStore.activeDesign,
);

const loadDesign = async (designId: string) => {
  if (!designStore.designs.length) {
    await designStore.fetchDesigns();
  }

  const found = designStore.loadDesignById(designId);
  if (!found) {
    router.replace({ name: 'not-found' });
    return;
  }
  loading.value = false;
};

onMounted(() => {
  const id = route.params.id as string | undefined;
  if (!id) {
    router.replace({ name: 'not-found' });
    return;
  }
  loadDesign(id);
});

onBeforeUnmount(() => {
  sceneStore.resetScene();
  designStore.setActiveDesign(null);
});
</script>

<template>
  <div class="design-detail" v-if="!loading && design">
    <header class="design-detail__header">
      <div>
        <p class="design-detail__eyebrow">Interior preset</p>
        <h1>{{ design.name }}</h1>
        <p class="design-detail__meta">
          <span class="material-symbols-outlined" style="font-size: 18px;">schedule</span>
          Updated {{ new Date(design.updatedAt).toLocaleDateString() }}
        </p>
      </div>
      <div class="design-detail__header-actions">
        <BaseButton variant="ghost" @click="router.back()">
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
          Back
        </BaseButton>
        <BaseButton variant="primary">
          <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
          Edit in Editor
        </BaseButton>
      </div>
    </header>

    <section class="design-detail__content">
      <BaseCard padding="lg" elevated class="design-detail__viewer-card">
        <ThreeScene>
          <Camera />
          <Controls />
          <Lighting />
          <Grid />
        </ThreeScene>
      </BaseCard>

      <aside class="design-detail__info">
        <BaseCard bordered padding="md">
          <h2>
            <span class="material-symbols-outlined" style="font-size: 22px; color: #3b82f6;">summarize</span>
            Scene summary
          </h2>
          <ul>
            <li><strong>Furniture objects:</strong> <span>{{ sceneStore.furnitureCount }}</span></li>
            <li><strong>Grid snapping:</strong> <span>{{ sceneStore.snapping ? 'Enabled' : 'Disabled' }}</span></li>
            <li><strong>Lighting preset:</strong> <span>{{ sceneStore.lighting.environment }}</span></li>
          </ul>
        </BaseCard>

        <BaseCard bordered padding="md">
          <h2>
            <span class="material-symbols-outlined" style="font-size: 22px; color: #3b82f6;">rocket_launch</span>
            Next steps
          </h2>
          <p>
            Clone this preset into the editor to tweak furniture positions, try different materials, or export
            renders for your presentation deck.
          </p>
          <BaseButton variant="secondary" size="sm" style="margin-top: 1rem;">
            Clone to Editor
          </BaseButton>
        </BaseCard>

        <BaseCard bordered padding="md">
          <h2>
            <span class="material-symbols-outlined" style="font-size: 22px; color: #3b82f6;">share</span>
            Share
          </h2>
          <p>Share this design with your team or clients for feedback.</p>
          <BaseButton variant="ghost" size="sm" style="margin-top: 1rem;">
            Copy Share Link
          </BaseButton>
        </BaseCard>
      </aside>
    </section>
  </div>

  <div v-else class="design-detail__loading">
    <div class="loading-spinner"></div>
    <p>Loading design…</p>
  </div>
</template>
