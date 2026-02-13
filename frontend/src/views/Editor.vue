<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useSceneStore, useFurnitureStore } from '@/stores';

import { ThreeScene, Camera, Controls, Lighting, Grid } from '@/components/3DViewer';
import { FurnitureLibrary, PropertiesPanel, LayersPanel } from '@/components/Sidebar';
import { ToolsPanel, ObjectSelector } from '@/components/Toolbar';

const sceneStore = useSceneStore();
const furnitureStore = useFurnitureStore();

const activeTab = ref<'furniture' | 'layers'>('furniture');

onMounted(() => {
  // Initialize editor state if needed
});

onBeforeUnmount(() => {
  sceneStore.resetScene();
});

const handleUndo = () => {
  // Implement undo
};

const handleRedo = () => {
  // Implement redo
};
</script>

<template>
  <div class="editor-view">
    <!-- Top Toolbar -->
    <header class="editor-view__toolbar">
      <div class="toolbar-brand">
        <span class="material-symbols-outlined">architecture</span>
        <span>Editor 3D</span>
      </div>
      
      <div class="toolbar-actions">
        <ToolsPanel />
        <div class="toolbar-divider"></div>
        <button class="icon-button" @click="handleUndo" title="Undo">
          <span class="material-symbols-outlined">undo</span>
        </button>
        <button class="icon-button" @click="handleRedo" title="Redo">
          <span class="material-symbols-outlined">redo</span>
        </button>
      </div>

      <div class="toolbar-status">
        <ObjectSelector />
        <button class="save-button">
          <span class="material-symbols-outlined">save</span>
          Save
        </button>
      </div>
    </header>

    <div class="editor-view__layout">
      <!-- Left Sidebar: Assets & Selection -->
      <aside class="editor-view__sidebar editor-view__sidebar--left">
        <nav class="sidebar-tabs">
          <button 
            :class="{ active: activeTab === 'furniture' }" 
            @click="activeTab = 'furniture'"
          >
            Furniture
          </button>
          <button 
            :class="{ active: activeTab === 'layers' }" 
            @click="activeTab = 'layers'"
          >
            Scene
          </button>
        </nav>
        
        <div class="sidebar-content">
          <FurnitureLibrary v-if="activeTab === 'furniture'" />
          <LayersPanel v-else />
        </div>
      </aside>

      <!-- Main Scene -->
      <main class="editor-view__scene">
        <ThreeScene>
          <Camera />
          <Controls />
          <Lighting />
          <Grid />
        </ThreeScene>
      </main>

      <!-- Right Sidebar: Properties -->
      <aside class="editor-view__sidebar editor-view__sidebar--right">
        <PropertiesPanel />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.editor-view {
  height: calc(100vh - 64px); /* Subtract Header height */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f1f5f9;
}

.editor-view__toolbar {
  height: 56px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 20;
}

.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #0f172a;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toolbar-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  margin: 0 0.5rem;
}

.toolbar-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.2s;
}

.icon-button:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.save-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.save-button:hover {
  background: #1d4ed8;
}

.editor-view__layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.editor-view__sidebar {
  width: 320px;
  background: white;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
}

.editor-view__sidebar--left {
  border-left: none;
}

.sidebar-tabs {
  display: flex;
  padding: 0.5rem;
  background: #f8fafc;
  gap: 0.5rem;
}

.sidebar-tabs button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-tabs button.active {
  background: white;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.editor-view__scene {
  flex: 1;
  position: relative;
  background-color: #000;
}

@media (max-width: 1024px) {
  .editor-view__sidebar {
    width: 260px;
  }
}
</style>
