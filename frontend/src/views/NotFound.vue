<script setup lang="ts">
import { BaseButton } from '@/components/UI';
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__visual">
        <span class="not-found__number">4</span>
        <div class="not-found__orbit">
          <span class="material-symbols-outlined orbit-icon">home</span>
        </div>
        <span class="not-found__number">4</span>
      </div>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has been moved to a different location.</p>
      <div class="not-found__actions">
        <BaseButton as="router-link" to="/" size="lg">Back to Home</BaseButton>
        <BaseButton as="router-link" to="/gallery" variant="secondary" size="lg">Browse Gallery</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.not-found__content {
  max-width: 600px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.not-found__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.not-found__number {
  font-size: 10rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
  letter-spacing: -0.05em;
}

.not-found__orbit {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px dashed #e2e8f0;
  display: grid;
  place-items: center;
  position: relative;
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbit-icon {
  font-size: 48px;
  color: #3b82f6;
  animation: counter-spin 8s linear infinite;
}

@keyframes counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.not-found h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.not-found p {
  margin: 1rem 0 0;
  color: #64748b;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 420px;
  margin-inline: auto;
}

.not-found__actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .not-found__number {
    font-size: 6rem;
  }

  .not-found__orbit {
    width: 80px;
    height: 80px;
  }

  .orbit-icon {
    font-size: 32px;
  }
}
</style>
