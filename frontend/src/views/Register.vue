<script setup lang="ts">
import { RegisterForm } from '@/components/Auth';
import { BaseCard } from '@/components/UI';

const handleSubmit = (payload: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log('Register submit', payload);
};
</script>

<template>
  <div class="auth-view">
    <BaseCard bordered elevated class="auth-view__card">
      <header class="auth-view__header">
        <h1>Create your account</h1>
        <p>Join the community and start building beautiful spaces.</p>
      </header>
      <RegisterForm @submit="handleSubmit" />
      <p class="auth-view__footer">
        Already have an account?
        <RouterLink to="/login">Sign in</RouterLink>
      </p>
    </BaseCard>
  </div>
</template>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-view__card {
  width: min(420px, 90vw);
  gap: 1.5rem;
}

.auth-view__header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #0f172a;
}

.auth-view__header p {
  margin: 0.5rem 0 0;
  color: #475569;
}

.auth-view__footer {
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
  color: #475569;
}

.auth-view__footer a {
  color: #2563eb;
  text-decoration: none;
}

.auth-view__footer a:hover {
  text-decoration: underline;
}
</style>
