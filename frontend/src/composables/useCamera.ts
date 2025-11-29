import { computed } from 'vue';
import * as THREE from 'three';

import { useSceneStore } from '@/stores';

export function useCameraState() {
  const sceneStore = useSceneStore();

  const cameraPosition = computed(() => new THREE.Vector3(
    sceneStore.camera.position.x,
    sceneStore.camera.position.y,
    sceneStore.camera.position.z,
  ));

  const cameraTarget = computed(() => new THREE.Vector3(
    sceneStore.camera.target.x,
    sceneStore.camera.target.y,
    sceneStore.camera.target.z,
  ));

  const fov = computed(() => sceneStore.camera.fov);

  return {
    cameraPosition,
    cameraTarget,
    fov,
  };
}
