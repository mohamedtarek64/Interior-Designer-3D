import { onBeforeUnmount, onMounted, ref } from 'vue';

import { useThree, type ThreeRuntime } from './useThree';

interface RaycasterOptions {
  onHover?: (objectId: string | null) => void;
  onSelect?: (objectId: string | null, event: PointerEvent) => void;
}

export function useRaycaster(
  target: () => HTMLElement | null,
  runtime?: ThreeRuntime,
  options: RaycasterOptions = {},
) {
  const context = runtime ?? useThree();
  const { raycaster, renderer } = context;
  const hoveredObjectId = ref<string | null>(null);

  const handlePointerMove = (event: PointerEvent) => {
    const element = target();
    if (!element) {
      return;
    }
    raycaster.updatePointer(event, element);
    const hits = raycaster.cast();
    const firstHit = hits[0];
    const id = firstHit?.object?.name ?? null;
    hoveredObjectId.value = id;
    options.onHover?.(id);
  };

  const handlePointerDown = (event: PointerEvent) => {
    const element = target();
    if (!element) {
      return;
    }
    raycaster.updatePointer(event, element);
    const hits = raycaster.cast();
    const id = hits[0]?.object?.name ?? null;
    if (id) {
      hoveredObjectId.value = id;
    }
    options.onSelect?.(id ?? null, event);
  };

  const attachListeners = () => {
    const element = renderer.domElement;
    if (!element) {
      requestAnimationFrame(attachListeners);
      return;
    }
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerdown', handlePointerDown);
  };

  onMounted(() => {
    attachListeners();
  });

  onBeforeUnmount(() => {
    const element = renderer.domElement;
    if (!element) {
      return;
    }
    element.removeEventListener('pointermove', handlePointerMove);
    element.removeEventListener('pointerdown', handlePointerDown);
  });

  return {
    hoveredObjectId,
  };
}
