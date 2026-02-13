<script setup lang="ts">
</script>

<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}
</style>
