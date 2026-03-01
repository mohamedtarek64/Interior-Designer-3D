<script setup lang="ts">
import { LoginForm } from '../components/Auth';
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
          <p class="login-view__subtitle">Sign in to continue exploring your designs.</p>
        </header>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
}

/* Image Panel */
.login-view__image-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  overflow: hidden;
}

.login-view__background-image {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000');
  background-position: center;
  background-size: cover;
  transition: transform 10s ease;
}

.login-view__image-panel:hover .login-view__background-image {
  transform: scale(1.05);
}

.login-view__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(15, 23, 42, 0.4), transparent);
}

.login-view__brand {
  position: relative;
  z-index: 10;
}

.login-view__brand-text {
  margin: 0;
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

/* Form Panel */
.login-view__form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #f8fafc;
}

.login-view__form-container {
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.login-view__header {
  margin-bottom: 3rem;
}

.login-view__title {
  margin: 0;
  color: #0f172a;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.login-view__subtitle {
  margin: 0.75rem 0 0;
  color: #64748b;
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .login-view {
    grid-template-columns: 1fr;
  }

  .login-view__image-panel {
    display: none;
  }

  .login-view__form-panel {
    padding: 2rem;
  }
}
</style>
