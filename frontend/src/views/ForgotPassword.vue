<script setup lang="ts">
import { ForgotPassword } from '@/components/Auth';
import { BaseCard } from '@/components/UI';

const handleSubmit = (payload: { email: string }) => {
  console.log('Forgot password submit', payload);
};
</script>

<template>
  <div class="forgot-view">
    <div class="forgot-view__container">
      <div class="forgot-view__icon">
        <span class="material-symbols-outlined">lock_reset</span>
      </div>
      <header class="forgot-view__header">
        <h1>Reset your password</h1>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>
      </header>
      <ForgotPassword @submit="handleSubmit" />
      <p class="forgot-view__footer">
        Remembered your password?
        <RouterLink to="/login">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.forgot-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 4rem 2rem;
  background-color: #f8fafc;
}

.forgot-view__container {
  width: 100%;
  max-width: 440px;
  text-align: center;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.forgot-view__icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 24px;
  display: grid;
  place-items: center;
  margin: 0 auto 2.5rem;
  transform: rotate(-6deg);
}

.forgot-view__icon span {
  font-size: 32px;
  color: #3b82f6;
}

.forgot-view__header {
  margin-bottom: 3rem;
}

.forgot-view__header h1 {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.forgot-view__header p {
  margin: 0.75rem 0 0;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.6;
}

.forgot-view__footer {
  margin-top: 2.5rem;
  font-size: 1rem;
  color: #64748b;
}

.forgot-view__footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.25rem;
}

.forgot-view__footer a:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
