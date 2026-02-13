<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  closeOnBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleBackdropClick = () => {
  if (props.closeOnBackdrop !== false) {
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <transition name="base-modal">
      <div v-if="isOpen" class="base-modal__backdrop" @click.self="handleBackdropClick">
        <div
          class="base-modal__content"
          :class="`base-modal__content--${size || 'md'}`"
        >
          <button class="base-modal__close" @click="emit('close')">
            <span class="material-symbols-outlined">close</span>
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.base-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.base-modal__content {
  position: relative;
  background: #ffffff;
  border-radius: 28px;
  width: 100%;
  padding: 2.5rem;
  box-shadow: 0 40px 100px rgba(15, 23, 42, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

.base-modal__content--sm {
  max-width: 440px;
}

.base-modal__content--md {
  max-width: 640px;
}

.base-modal__content--lg {
  max-width: 960px;
}

.base-modal__close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border: none;
  background: #f1f5f9;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.base-modal__close:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.base-modal-enter-from,
.base-modal-leave-to {
  opacity: 0;
}

.base-modal-enter-from .base-modal__content,
.base-modal-leave-to .base-modal__content {
  transform: translateY(16px) scale(0.96);
}

.base-modal-enter-active,
.base-modal-leave-active {
  transition: opacity 0.25s ease;
}

.base-modal-enter-active .base-modal__content,
.base-modal-leave-active .base-modal__content {
  transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
