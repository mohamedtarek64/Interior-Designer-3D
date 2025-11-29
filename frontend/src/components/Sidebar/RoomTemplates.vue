<script setup lang="ts">
import { computed } from 'vue';

import { bedroomTemplate, kitchenTemplate, livingRoomTemplate } from '@/data';
import { BaseButton } from '@/components/UI';
import { useSceneStore } from '@/stores';

import '@/styles/components/room-templates.css';

const templates = computed(() => [bedroomTemplate, livingRoomTemplate, kitchenTemplate]);
const sceneStore = useSceneStore();

const applyTemplate = (templateId: string) => {
  const template = templates.value.find((item) => item.id === templateId);
  if (!template) {
    return;
  }
  const createdIds: string[] = [];

  template.furniture.forEach((assetId, index) => {
    const instance = sceneStore.addFurnitureFromAsset(assetId, {
      position: {
        x: index * 1.5 - template.furniture.length / 2,
        y: 0,
        z: 0,
      },
    });
    createdIds.push(instance.id);
  });
  if (createdIds.length) {
    sceneStore.setSelectedFurniture(createdIds[createdIds.length - 1] ?? null);
  }
};
</script>

<template>
  <section class="room-templates">
    <h3>Room Templates</h3>
    <div class="room-templates__list">
      <article v-for="template in templates" :key="template.id" class="room-templates__card">
        <header>
          <h4>{{ template.name }}</h4>
          <p>{{ template.description }}</p>
        </header>
        <dl>
          <div>
            <dt>Furniture</dt>
            <dd>{{ template.furniture.join(', ') }}</dd>
          </div>
          <div>
            <dt>Floor</dt>
            <dd>{{ template.floorMaterial }}</dd>
          </div>
          <div>
            <dt>Walls</dt>
            <dd>{{ template.wallMaterial }}</dd>
          </div>
        </dl>
        <BaseButton size="sm" variant="secondary" @click="applyTemplate(template.id)">
          Apply Template
        </BaseButton>
      </article>
    </div>
  </section>
</template>
