import { computed } from 'vue';

import { useSceneStore } from '@/stores';

export function useSceneState() {
  const sceneStore = useSceneStore();

  const furniture = computed(() => sceneStore.furniture);
  const gridEnabled = computed(() => sceneStore.gridEnabled);
  const snapping = computed(() => sceneStore.snapping);

  return {
    store: sceneStore,
    furniture,
    gridEnabled,
    snapping,
  };
}
