<script setup lang="ts">
import { reactive } from 'vue';

import { BaseButton, BaseInput } from '@/components/UI';

type ForgotPasswordState = {
  email: string;
};

const state = reactive<ForgotPasswordState>({
  email: '',
});

const emit = defineEmits<{
  (e: 'submit', payload: ForgotPasswordState): void;
}>();

const handleSubmit = () => {
  emit('submit', { ...state });
};
</script>

<template>
  <form class="forgot-password" @submit.prevent="handleSubmit">
    <p>
      Enter the email associated with your account and we'll send a reset link if it exists in our
      records.
    </p>
    <BaseInput v-model="state.email" label="Email address" type="email" required />
    <BaseButton type="submit" block>Send reset link</BaseButton>
  </form>
</template>

<style scoped>
.forgot-password {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.forgot-password p {
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.6;
}
</style>
