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
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.base-card--bordered {
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.base-card--elevated {
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
}

.base-card--elevated:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.15);
  border-color: rgba(37, 99, 235, 0.1);
}

.base-card--none {
  padding: 0;
}

.base-card--sm {
  padding: 1.25rem;
}

.base-card--md {
  padding: 2rem;
}

.base-card--lg {
  padding: 3rem;
}
</style>
