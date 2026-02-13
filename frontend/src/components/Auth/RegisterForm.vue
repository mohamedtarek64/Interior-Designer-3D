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
    <BaseInput v-model="state.name" label="Full name" icon="person" required />
    <BaseInput v-model="state.email" label="Email address" type="email" icon="mail" required />
    <BaseInput v-model="state.password" label="Password" type="password" icon="lock" required />
    <BaseInput
      v-model="state.confirmPassword"
      label="Confirm password"
      type="password"
      icon="lock"
      required
    />
    <BaseButton type="submit" block>Create account</BaseButton>

    <p class="register-form__disclaimer">
      By creating an account you agree to our
      <RouterLink to="/">terms of service</RouterLink>
      and
      <RouterLink to="/">privacy policy</RouterLink>.
    </p>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.register-form__disclaimer {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
  text-align: center;
  line-height: 1.5;
}

.register-form__disclaimer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

.register-form__disclaimer a:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
