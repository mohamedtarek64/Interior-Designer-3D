<script setup lang="ts">
import { ForgotPassword } from '@/components/Auth';
import { BaseCard } from '@/components/UI';

const handleSubmit = (payload: { email: string }) => {
  console.log('Forgot password submit', payload);
};
</script>

<template>
  <div class="auth-view">
    <BaseCard bordered elevated class="auth-view__card">
      <header class="auth-view__header">
        <h1>Reset your password</h1>
        <p>We will email you instructions to reset your password.</p>
      </header>
      <ForgotPassword @submit="handleSubmit" />
      <p class="auth-view__footer">
        Remembered your password?
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
