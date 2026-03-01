<script setup lang="ts">
import { RegisterForm } from '../components/Auth';
import BaseCard from '../components/UI/BaseCard.vue';
</script>

<template>
  <div class="auth-view">
    <BaseCard bordered elevated class="auth-view__card">
      <header class="auth-view__header">
        <h1>Create Account</h1>
        <p>Start your interior design journey today.</p>
      </header>
      <RegisterForm />
    </BaseCard>
  </div>
</template>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
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
</style>
