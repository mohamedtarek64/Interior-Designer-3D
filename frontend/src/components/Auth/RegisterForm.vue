<script setup lang="ts">
import { reactive } from 'vue';

import { BaseButton, BaseInput } from '@/components/UI';

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const state = reactive<RegisterFormState>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const emit = defineEmits<{
  (e: 'submit', payload: RegisterFormState): void;
}>();

const handleSubmit = () => {
  emit('submit', { ...state });
};
</script>

<template>
  <form class="register-form" @submit.prevent="handleSubmit">
    <BaseInput v-model="state.name" label="Full name" required />
    <BaseInput v-model="state.email" label="Email address" type="email" required />
    <BaseInput v-model="state.password" label="Password" type="password" required />
    <BaseInput
      v-model="state.confirmPassword"
      label="Confirm password"
      type="password"
      required
    />
    <BaseButton type="submit" block>Create account</BaseButton>

    <p class="register-form__disclaimer">
      By creating an account you agree to our
      <RouterLink to="/">terms of service</RouterLink>.
    </p>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.register-form__disclaimer {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
}

.register-form__disclaimer a {
  color: #2563eb;
  text-decoration: none;
}

.register-form__disclaimer a:hover {
  text-decoration: underline;
}
</style>
