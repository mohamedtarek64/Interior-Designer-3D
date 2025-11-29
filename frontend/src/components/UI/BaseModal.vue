<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  closeOnBackdrop?: boolean;
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
        <div class="base-modal__content">
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
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.base-modal__content {
  background: #ffffff;
  border-radius: 18px;
  max-width: min(680px, 90vw);
  width: 100%;
  padding: 2rem;
  box-shadow: 0 25px 65px rgba(15, 23, 42, 0.25);
}

.base-modal-enter-from,
.base-modal-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.base-modal-enter-active,
.base-modal-leave-active {
  transition: all 0.18s ease;
}
</style>
