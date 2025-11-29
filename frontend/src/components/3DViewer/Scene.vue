<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as THREE from 'three';

import { createThreeRuntime, provideThree } from '@/composables/useThree';
import { useObjects, useRaycaster } from '@/composables';
import { useFurnitureStore, useSceneStore } from '@/stores';
import type { FurnitureInstance, Vector3 } from '@/types';
import ModelInspector from './ModelInspector.vue';

import '@/styles/components/scene.css';

const sceneStore = useSceneStore();
const furnitureStore = useFurnitureStore();

const containerRef = ref<HTMLDivElement | null>(null);
const viewerRef = ref<HTMLDivElement | null>(null);

const runtime = createThreeRuntime({
  cameraPosition: new THREE.Vector3(6, 4, 8),
  lookAt: new THREE.Vector3(0, 1, 0),
});

provideThree(runtime);

const { renderer, sceneManager, camera, registerAfterRender } = runtime;
const { addObject, removeObject, loadFurnitureAsset, clear, getObject, objects } =
  useObjects(runtime);

const selectionHelper = new THREE.BoxHelper(new THREE.Mesh(), new THREE.Color('#2563eb'));
selectionHelper.visible = false;
sceneManager.add(selectionHelper);

const sceneReady = ref(false);

const pendingLoads = new Map<string, Promise<void>>();
const actionDisposers: Array<() => void> = [];
let isDisposed = false;
const hoveredAssetLabel = ref<string | null>(null);
const lookAtTarget = new THREE.Vector3();
const groundPlane = createGroundPlane();
sceneManager.add(groundPlane);
const isFullscreen = ref(false);

const updateFullscreenState = () => {
  isFullscreen.value = document.fullscreenElement === viewerRef.value;
};

const hasEnvironmentAsset = () =>
  sceneStore.furniture.some((instance) => {
    const asset = furnitureStore.furniture.find((item) => item.id === instance.assetId);
    return asset?.isEnvironment;
  });

const updateGroundVisibility = () => {
  groundPlane.visible = !hasEnvironmentAsset();
};

const applyTransforms = (object: THREE.Object3D, instance: FurnitureInstance) => {
  object.position.set(instance.position.x, instance.position.y, instance.position.z);
  object.rotation.set(
    instance.rotation.x,
    instance.rotation.y,
    instance.rotation.z,
    instance.rotation.order ?? 'XYZ',
  );
  object.scale.set(instance.scale.x, instance.scale.y, instance.scale.z);
};

const frameEnvironment = (object: THREE.Object3D) => {
  object.updateWorldMatrix(true, true);
  let box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) {
    return;
  }

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxDimension = Math.max(size.x, size.y, size.z) || 1;
  const targetSpan = 14;
  const scale = targetSpan / maxDimension;
  object.scale.setScalar(scale);

  object.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(object);
  box.getCenter(center);
  const offsetToOrigin = center.clone();
  object.position.sub(offsetToOrigin);
  object.updateMatrixWorld(true);

  box = new THREE.Box3().setFromObject(object);
  const min = box.min.clone();
  if (min.y !== 0) {
    object.position.y -= min.y;
    object.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(object);
  }

  const finalCenter = box.getCenter(new THREE.Vector3());
  const radius = box.getSize(new THREE.Vector3()).length() * 0.5 || 5;
  const cameraOffset = new THREE.Vector3(1.3, 1, 1.2).normalize().multiplyScalar(radius * 1.8);

  sceneStore.camera.position = {
    x: finalCenter.x + cameraOffset.x,
    y: Math.max(finalCenter.y + cameraOffset.y, radius * 0.8),
    z: finalCenter.z + cameraOffset.z,
  };
  sceneStore.camera.target = {
    x: finalCenter.x,
    y: finalCenter.y,
    z: finalCenter.z,
  };
  sceneStore.camera.fov = THREE.MathUtils.clamp(radius * 4.5, 35, 70);
  sceneStore.camera.near = Math.max(radius * 0.02, 0.1);
  sceneStore.camera.far = radius * 5;
};

const ensureObject = (instance: FurnitureInstance) => {
  if (pendingLoads.has(instance.id)) {
    return pendingLoads.get(instance.id)!;
  }

  const task = (async () => {
    let object = getObject(instance.id);
    const asset = furnitureStore.furniture.find((item) => item.id === instance.assetId);
    if (!object) {
      const model = await loadFurnitureAsset(instance.assetId);
      if (isDisposed) {
        return;
      }
      model.name = instance.id;
      addObject(instance.id, model);
      object = model;
    }
    if (!object || isDisposed) {
      return;
    }
    if (asset?.isEnvironment) {
      frameEnvironment(object);
    } else {
      applyTransforms(object, instance);
    }
  })()
    .catch((error) => {
      console.warn(`[Scene] Failed to load asset "${instance.assetId}"`, error);
    })
    .finally(() => {
      pendingLoads.delete(instance.id);
    });

  pendingLoads.set(instance.id, task);
  return task;
};

const syncAllFurniture = async () => {
  await Promise.all(sceneStore.furniture.map((instance) => ensureObject(instance)));
};

const updateSelectionHelper = () => {
  const id = sceneStore.selectedFurnitureId;
  if (!id) {
    selectionHelper.visible = false;
    return;
  }
  const object = getObject(id);
  if (!object) {
    selectionHelper.visible = false;
    return;
  }
  selectionHelper.visible = true;
  selectionHelper.setFromObject(object);
};

const registerStoreListeners = () => {
  actionDisposers.push(
    sceneStore.$onAction(({ name, args, after }) => {
      if (name === 'addFurnitureFromAsset') {
        after((instance: FurnitureInstance) => {
          if (!instance) {
            return;
          }
          ensureObject(instance).then(() => {
            sceneStore.setSelectedFurniture(instance.id);
            updateSelectionHelper();
            updateGroundVisibility();
          });
        });
      } else if (name === 'addFurniture') {
        const [instance] = args as [FurnitureInstance];
        after(() => {
          if (instance) {
            ensureObject(instance).then(() => {
              updateSelectionHelper();
              updateGroundVisibility();
            });
          }
        });
      } else if (name === 'removeFurniture') {
        const [id] = args as [string];
        after(() => {
          removeObject(id);
          updateSelectionHelper();
          updateGroundVisibility();
        });
      } else if (name === 'updateFurniturePosition') {
        const [id, position] = args as [string, Vector3];
        after(() => {
          const object = getObject(id);
          if (object) {
            object.position.set(position.x, position.y, position.z);
            updateSelectionHelper();
          }
        });
      } else if (name === 'updateFurnitureRotation') {
        const [id, rotation] = args as [string, FurnitureInstance['rotation']];
        after(() => {
          const object = getObject(id);
          if (object) {
            object.rotation.set(
              rotation.x,
              rotation.y,
              rotation.z,
              rotation.order ?? 'XYZ',
            );
            updateSelectionHelper();
          }
        });
      } else if (name === 'updateFurnitureScale') {
        const [id, scale] = args as [string, Vector3];
        after(() => {
          const object = getObject(id);
          if (object) {
            object.scale.set(scale.x, scale.y, scale.z);
            updateSelectionHelper();
          }
        });
      } else if (name === 'resetScene') {
        after(() => {
          clear();
          selectionHelper.visible = false;
          updateGroundVisibility();
        });
      }
    }),
  );
};

function createGroundPlane() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
      color: '#1c2535',
      metalness: 0.05,
      roughness: 0.8,
    }),
  );
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.name = 'Ground';
  return ground;
}

let resizeObserver: ResizeObserver | null = null;

const resolveLabel = (id: string | null) => {
  if (!id) {
    return null;
  }
  const instance = sceneStore.getFurnitureById(id);
  if (!instance) {
    return null;
  }
  const asset = furnitureStore.furniture.find((item) => item.id === instance.assetId);
  return asset?.name ?? instance.assetId;
};

const { hoveredObjectId } = useRaycaster(() => renderer.domElement, runtime, {
  onSelect: (id) => {
    if (id) {
      sceneStore.setSelectedFurniture(id);
      updateSelectionHelper();
      hoveredAssetLabel.value = resolveLabel(id);
    }
  },
  onHover: (id) => {
    hoveredAssetLabel.value = resolveLabel(id);
  },
});

watch(
  () => sceneStore.gridEnabled,
  (enabled) => {
    sceneManager.toggleGrid(enabled);
  },
  { immediate: true },
);

watch(
  () => sceneStore.selectedFurnitureId,
  () => {
    updateSelectionHelper();
    hoveredAssetLabel.value = null;
  },
);

registerAfterRender(() => {
  if (selectionHelper.visible && sceneStore.selectedFurnitureId) {
    const object = getObject(sceneStore.selectedFurnitureId);
    if (object) {
      selectionHelper.setFromObject(object);
    }
  }
});

const applyCameraSettings = () => {
  const { position, target, fov, near, far } = sceneStore.camera;
  camera.position.set(position.x, position.y, position.z);
  lookAtTarget.set(target.x, target.y, target.z);
  camera.lookAt(lookAtTarget);
  let needsUpdate = false;
  if (camera.fov !== fov) {
    camera.fov = fov;
    needsUpdate = true;
  }
  if (typeof near === 'number' && camera.near !== near) {
    camera.near = Math.max(near, 0.01);
    needsUpdate = true;
  }
  if (typeof far === 'number' && camera.far !== far) {
    camera.far = Math.max(far, camera.near + 1);
    needsUpdate = true;
  }
  if (needsUpdate) {
    camera.updateProjectionMatrix();
  }
};

watch(
  () => ({
    position: { ...sceneStore.camera.position },
    target: { ...sceneStore.camera.target },
    fov: sceneStore.camera.fov,
  }),
  () => {
    applyCameraSettings();
  },
  { deep: true, immediate: true },
);

onMounted(async () => {
  const container = containerRef.value;
  if (!container) {
    return;
  }

  renderer.init(container);
  resizeObserver = new ResizeObserver(() => {
    renderer.resize();
    if (container.clientWidth && container.clientHeight) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    }
  });
  resizeObserver.observe(container);
  document.addEventListener('fullscreenchange', onFullscreenChange);
  updateFullscreenState();

  sceneManager.addGrid(20, 20);

  registerStoreListeners();
  await syncAllFurniture();
  if (isDisposed) {
    return;
  }
  updateGroundVisibility();
  applyCameraSettings();
  updateSelectionHelper();
  hoveredAssetLabel.value = resolveLabel(sceneStore.selectedFurnitureId ?? null);

  renderer.start(sceneManager.scene, camera);
  sceneReady.value = true;
});

const toggleFullscreen = () => {
  const viewer = viewerRef.value;
  if (!viewer) {
    return;
  }
  if (!document.fullscreenElement) {
    viewer.requestFullscreen().catch(() => undefined);
  } else {
    document.exitFullscreen().catch(() => undefined);
  }
};

const onFullscreenChange = () => updateFullscreenState();

const overlayLabel = computed(() => {
  return (
    hoveredAssetLabel.value ?? resolveLabel(sceneStore.selectedFurnitureId ?? null) ?? hoveredObjectId.value
  );
});

onBeforeUnmount(() => {
  isDisposed = true;
  resizeObserver?.disconnect();
  actionDisposers.forEach((dispose) => dispose());
  pendingLoads.clear();
  clear();
  sceneManager.remove(groundPlane);
  document.removeEventListener('fullscreenchange', onFullscreenChange);
});
</script>

<template>
  <div ref="viewerRef" :class="['viewer', { 'viewer--fullscreen': isFullscreen }]">
    <div ref="containerRef" class="viewer__canvas">
      <slot />
    </div>
    <ModelInspector :is-fullscreen="isFullscreen" />
    <button type="button" class="viewer__action" @click="toggleFullscreen">
      {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
    </button>
    <div v-if="overlayLabel" class="viewer__hover-label">
      {{ overlayLabel }}
    </div>
    <div v-if="!sceneReady" class="viewer__loading">Initializing scene…</div>
  </div>
</template>
