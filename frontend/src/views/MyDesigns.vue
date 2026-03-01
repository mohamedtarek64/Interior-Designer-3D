<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton, BaseCard, BaseInput } from '@/components/UI';
import { useDesignStore } from '@/stores';

import '@/styles/pages/my-designs.css';

const router = useRouter();
const designStore = useDesignStore();

const searchQuery = ref('');

const designs = computed(() => {
  let list = designStore.designs.map((design) => ({
    id: design.id,
    name: design.name,
    updatedAt: design.updatedAt,
    preview: design.previewImage,
  }));
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(d => d.name.toLowerCase().includes(query));
  }
  
  return list;
});

const openDesign = (designId: string) => {
  router.push({ name: 'design-detail', params: { id: designId } });
};

const createNewDesign = () => {
  router.push('/editor');
};
</script>

<template>
  <div class="my-designs">
    <header class="my-designs__header">
      <div class="header-content">
        <h1>My Projects</h1>
        <p>Manage your interior design portfolio.</p>
      </div>
      <div class="header-actions">
        <div class="search-wrapper">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            v-model="searchQuery" 
            type="search" 
            placeholder="Search projects..." 
            class="search-input"
          />
        </div>
        <BaseButton @click="createNewDesign">
          <span class="material-symbols-outlined">add</span>
          New Project
        </BaseButton>
      </div>
    </header>

    <div v-if="designs.length" class="my-designs__grid">
      <BaseCard 
        v-for="design in designs" 
        :key="design.id" 
        elevated 
        class="project-card"
        @click="openDesign(design.id)"
      >
        <div class="project-card__preview">
          <img :src="design.preview" :alt="design.name" loading="lazy" />
          <div class="project-card__overlay">
            <BaseButton variant="secondary" size="sm">Open Editor</BaseButton>
          </div>
        </div>
        <div class="project-card__body">
          <div class="project-card__info">
            <h3>{{ design.name }}</h3>
            <span class="project-date">Edited {{ new Date(design.updatedAt).toLocaleDateString() }}</span>
          </div>
          <button class="project-card__menu" @click.stop>
            <span class="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </BaseCard>
    </div>

    <div v-else-if="searchQuery" class="my-designs__empty">
      <div class="empty-state">
        <span class="material-symbols-outlined empty-icon">search_off</span>
        <h3>No projects found</h3>
        <p>We couldn't find any projects matching "{{ searchQuery }}"</p>
        <BaseButton variant="ghost" @click="searchQuery = ''">Clear Search</BaseButton>
      </div>
    </div>

    <div v-else class="my-designs__empty">
      <div class="empty-state">
        <div class="empty-illustration">
          <span class="material-symbols-outlined">folder_open</span>
        </div>
        <h3>Start your first project</h3>
        <p>Create stunning 3D interiors in minutes. No experience required.</p>
        <BaseButton size="lg" @click="createNewDesign">
          <span class="material-symbols-outlined">add_circle</span>
          Create New Project
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles moved to external file */
</style>
