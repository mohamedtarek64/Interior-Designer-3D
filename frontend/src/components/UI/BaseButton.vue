<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const props = defineProps<{
  variant?: Variant;
  size?: Size;
  block?: boolean;
  as?: 'button' | 'a' | 'router-link';
  to?: string;
  disabled?: boolean;
}>();

const classes = computed(() => {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';

  return [
    'base-button',
    `base-button--${variant}`,
    `base-button--${size}`,
    { 'base-button--block': props.block, 'is-disabled': props.disabled },
  ];
});
</script>

<template>
  <component
    :is="as === 'router-link' ? 'RouterLink' : as ?? 'button'"
    :class="classes"
    :to="as === 'router-link' ? to : undefined"
    :disabled="as === 'button' ? disabled : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.base-button--block {
  width: 100%;
}

.base-button--primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3);
}

.base-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.4);
  filter: brightness(1.1);
}

.base-button--secondary {
  background: #ffffff;
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.base-button--secondary:hover {
  background: #f8fafc;
  border-color: rgba(15, 23, 42, 0.2);
  transform: translateY(-2px);
}

.base-button--ghost {
  background: transparent;
  color: #475569;
}

.base-button--ghost:hover {
  background: rgba(15, 23, 42, 0.05);
  color: #0f172a;
}

.base-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.base-button--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.base-button--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(1);
}
</style>
