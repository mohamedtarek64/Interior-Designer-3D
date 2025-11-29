<script setup lang="ts">
import { BaseButton, BaseCard } from '@/components/UI';
</script>

<template>
  <div class="not-found">
    <BaseCard bordered elevated class="not-found__card">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <BaseButton as="router-link" to="/">Back to home</BaseButton>
    </BaseCard>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found__card {
  text-align: center;
  gap: 1rem;
  max-width: 420px;
}

.not-found h1 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  color: #0f172a;
}

.not-found p {
  margin: 0;
  color: #475569;
}
</style>
