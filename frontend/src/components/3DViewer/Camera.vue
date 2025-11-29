<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useCameraState } from '@/composables/useCamera';
import { useThree } from '@/composables/useThree';

const { camera } = useThree();
const { cameraPosition, cameraTarget, fov } = useCameraState();

const applyState = () => {
  camera.position.copy(cameraPosition.value);
  camera.lookAt(cameraTarget.value);
  camera.fov = fov.value;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  applyState();
});

watch([cameraPosition, cameraTarget, fov], applyState);
</script>

<template>
  <slot />
</template>
