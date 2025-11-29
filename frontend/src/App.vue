<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import AuthLayout from '@/components/Layout/AuthLayout.vue';
import MainLayout from '@/components/Layout/MainLayout.vue';

const layoutRegistry = {
  main: MainLayout,
  auth: AuthLayout,
} as const;

const route = useRoute();

const activeLayout = computed(() => {
  const layoutKey = route.meta.layout as keyof typeof layoutRegistry | undefined;
  return layoutKey ? layoutRegistry[layoutKey] : MainLayout;
});
</script>

<template>
  <component :is="activeLayout">
    <RouterView />
  </component>
</template>
