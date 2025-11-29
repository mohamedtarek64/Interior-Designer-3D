<script setup lang="ts">
import { LoginForm } from '@/components/Auth';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async (payload: { email: string; password: string }) => {
  try {
    await authStore.login(payload.email, payload.password);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<template>
  <div class="login-view">
    <!-- Left Panel: Image -->
    <div class="login-view__image-panel">
      <div
        class="login-view__background-image"
        aria-label="A beautifully rendered modern living room with minimalist furniture, large windows, and soft lighting."
      ></div>
      <div class="login-view__overlay"></div>
      <div class="login-view__brand">
        <p class="login-view__brand-text">Interior Designer 3D</p>
      </div>
    </div>

    <!-- Right Panel: Form -->
    <div class="login-view__form-panel">
      <div class="login-view__form-container">
        <header class="login-view__header">
          <h1 class="login-view__title">Welcome Back</h1>
          <p class="login-view__subtitle">Sign in to continue to your projects.</p>
        </header>
        <LoginForm @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Manrope', sans-serif;
  background-color: #f7f7f6;
}

[data-theme="dark"] .login-view {
  background-color: #1d1a15;
}

/* Image Panel */
.login-view__image-panel {
  position: relative;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

@media (min-width: 1024px) {
  .login-view {
    grid-template-columns: 1fr 1fr;
  }

  .login-view__image-panel {
    display: flex;
  }
}

.login-view__background-image {
  position: absolute;
  inset: 0;
  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD41LFrTCyQTszyBziNmOxaytuuNB2qDMPCB25PsmzQGA34lEPn3xvnTz61voCGnpHsTQF3gk8zMRsdnczE951hdFXnOpfh8wjWuMvqGsur6o6KyjMURsE5k-4cAM9Gb5smmgF5WdxH1v5n49hNhDjypQ0Taelpsbko46cmYLH7kNYlAqquqyXPCLl_E2Ue-RM-pjQbpfgA2hUUPKYyhAHUS7Teq6WTy7CnzCQmSVbRQb-47tiWPx_BMstBBlRjdNl20fUnXEqYzr2p');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-view__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.login-view__brand {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
}

.login-view__brand-text {
  margin: 0;
  color: rgb(255 255 255);
  font-size: 1.125rem;
  font-weight: 700;
}

/* Form Panel */
.login-view__form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  background-color: #f7f7f6;
}

[data-theme="dark"] .login-view__form-panel {
  background-color: #1d1a15;
}

@media (min-width: 640px) {
  .login-view__form-panel {
    padding: 3rem;
  }
}

@media (min-width: 1024px) {
  .login-view__form-panel {
    padding: 4rem;
  }
}

.login-view__form-container {
  width: 100%;
  max-width: 28rem;
}

.login-view__header {
  margin-bottom: 2rem;
}

.login-view__title {
  margin: 0;
  margin-bottom: 0.5rem;
  color: rgb(15 23 42);
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  text-align: left;
}

[data-theme="dark"] .login-view__title {
  color: rgb(255 255 255);
}

.login-view__subtitle {
  margin: 0;
  color: rgb(71 85 105);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

[data-theme="dark"] .login-view__subtitle {
  color: rgb(148 163 184);
}
</style>
