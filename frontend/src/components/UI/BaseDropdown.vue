<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label?: string;
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="base-dropdown" @keydown.esc="close">
    <button type="button" class="base-dropdown__trigger" @click="toggle">
      {{ label }}
      <span aria-hidden="true">▾</span>
    </button>
    <transition name="base-dropdown">
      <div v-if="isOpen" class="base-dropdown__menu">
        <slot :close="close" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.base-dropdown {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

.base-dropdown__trigger {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  color: #0f172a;
}

.base-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.45rem);
  right: 0;
  min-width: 180px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.18);
  padding: 0.6rem;
  z-index: 20;
}

.base-dropdown-enter-from,
.base-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.base-dropdown-enter-active,
.base-dropdown-leave-active {
  transition: all 0.16s ease;
}
</style>
