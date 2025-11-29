<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <RouterLink to="/" class="main-layout__brand">
        Interior Designer <span>3D</span>
      </RouterLink>
      <nav class="main-layout__nav">
        <RouterLink to="/" class="main-layout__link">Home</RouterLink>
        <RouterLink to="/designs/showcase" class="main-layout__link">Design Showcase</RouterLink>
        <RouterLink to="/my-designs" class="main-layout__link">My Designs</RouterLink>
        <RouterLink to="/gallery" class="main-layout__link">Gallery</RouterLink>
      </nav>
      <div class="main-layout__actions">
        <RouterLink to="/login" class="main-layout__link main-layout__link--muted">Log in</RouterLink>
        <RouterLink to="/register" class="main-layout__cta">Get Started</RouterLink>
      </div>
    </header>

    <main class="main-layout__content">
      <slot />
    </main>

    <footer class="main-layout__footer">
      <p>© {{ currentYear }} Interior Designer 3D. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
  background-color: #101928;
  color: #f7faff;
  position: sticky;
  top: 0;
  z-index: 50;
}

.main-layout__brand {
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
  color: inherit;
  letter-spacing: 0.04em;
}

.main-layout__brand span {
  color: #80b3ff;
}

.main-layout__nav {
  display: flex;
  gap: 1.25rem;
}

.main-layout__link {
  color: #d3ddf0;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.main-layout__link.router-link-active {
  color: #ffffff;
  font-weight: 600;
}

.main-layout__link:hover {
  color: #ffffff;
}

.main-layout__link--muted {
  opacity: 0.8;
}

.main-layout__cta {
  padding: 0.5rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.main-layout__cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.4);
}

.main-layout__actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.main-layout__content {
  flex: 1;
  padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%);
}

.main-layout__footer {
  padding: 1.5rem 2.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #607089;
  background-color: #0f172a;
}

@media (max-width: 960px) {
  .main-layout__header {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .main-layout__nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .main-layout__actions {
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .main-layout__header {
    padding: 1rem 1.25rem;
  }

  .main-layout__nav {
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .main-layout__actions {
    width: 100%;
    justify-content: center;
    gap: 0.75rem;
  }

  .main-layout__content {
    padding: 2rem 1.25rem;
  }
}
</style>
