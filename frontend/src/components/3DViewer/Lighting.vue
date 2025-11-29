<script setup lang="ts">
import { onMounted } from 'vue';

import { useThree } from '@/composables/useThree';

const { lightManager } = useThree();

onMounted(() => {
  lightManager.setupDefaultLights();
});
</script>

<template>
  <slot />
</template>
