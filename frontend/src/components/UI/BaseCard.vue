<script setup lang="ts">
const props = defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  elevated?: boolean;
}>();

const paddingClass = props.padding ? `base-card--${props.padding}` : 'base-card--md';
</script>

<template>
  <section
    class="base-card"
    :class="[
      paddingClass,
      { 'base-card--bordered': bordered, 'base-card--elevated': elevated },
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #0f172a;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.base-card--bordered {
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.base-card--elevated {
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.1);
}

.base-card--elevated:hover {
  transform: translateY(-2px);
}

.base-card--none {
  padding: 0;
}

.base-card--sm {
  padding: 1rem;
}

.base-card--md {
  padding: 1.5rem;
}

.base-card--lg {
  padding: 2.25rem;
}
</style>
