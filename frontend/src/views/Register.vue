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
  min-height: 80vh;
  padding: 4rem 2rem;
  background-color: #f8fafc;
}

.auth-view__card {
  width: 100%;
  max-width: 480px;
  padding: 3rem !important;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-view__header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.auth-view__header h1 {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.auth-view__header p {
  margin: 0.75rem 0 0;
  color: #64748b;
  font-size: 1.1rem;
}

.auth-view__footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  color: #64748b;
}

.auth-view__footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.25rem;
}

.auth-view__footer a:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
