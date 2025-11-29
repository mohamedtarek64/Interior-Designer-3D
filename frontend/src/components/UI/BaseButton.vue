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
  gap: 0.5rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
}

.base-button--block {
  width: 100%;
}

.base-button--primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #f8fafc;
}

.base-button--secondary {
  background: rgba(15, 23, 42, 0.12);
  color: #1f2937;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: none;
}

.base-button--ghost {
  background: transparent;
  color: #2563eb;
  box-shadow: none;
}

.base-button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.3);
}

.base-button--secondary:hover {
  background: rgba(15, 23, 42, 0.16);
}

.base-button--ghost:hover {
  color: #1d4ed8;
}

.base-button--sm {
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
}

.base-button--md {
  padding: 0.55rem 1.2rem;
  font-size: 0.95rem;
}

.base-button--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.05rem;
}

.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
