<script setup lang="ts">
const props = defineProps<{
  size?: number;
  text?: string;
}>();

const dimension = props.size ?? 40;
</script>

<template>
  <div class="base-loader">
    <span
      class="base-loader__spinner"
      role="status"
      aria-live="polite"
      :style="{ width: `${dimension}px`, height: `${dimension}px` }"
    />
    <p v-if="text" class="base-loader__text">{{ text }}</p>
  </div>
</template>

<style scoped>
.base-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #1f2937;
}

.base-loader__spinner {
  display: inline-block;
  border: 3px solid rgba(37, 99, 235, 0.15);
  border-top-color: rgba(37, 99, 235, 0.9);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.base-loader__text {
  font-size: 0.9rem;
  color: #475569;
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
