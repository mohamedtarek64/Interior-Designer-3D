<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <RouterLink to="/" class="main-layout__brand">
        <span class="material-symbols-outlined brand-icon">architecture</span>
        Interior Designer <span>3D</span>
      </RouterLink>
      <nav class="main-layout__nav">
        <RouterLink to="/" class="main-layout__link">Home</RouterLink>
        <RouterLink to="/editor" class="main-layout__link">Editor</RouterLink>
        <RouterLink to="/designs/showcase" class="main-layout__link">Showcase</RouterLink>
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
      <div class="footer-grid">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <span class="material-symbols-outlined">architecture</span>
            Interior Designer 3D
          </RouterLink>
          <p class="footer-tagline">Design stunning interiors using cutting-edge 3D technology directly in your browser.</p>
          <div class="footer-social">
            <a href="#" aria-label="GitHub"><span class="material-symbols-outlined">code</span></a>
            <a href="#" aria-label="Twitter"><span class="material-symbols-outlined">tag</span></a>
            <a href="#" aria-label="LinkedIn"><span class="material-symbols-outlined">work</span></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <RouterLink to="/editor">3D Editor</RouterLink>
          <RouterLink to="/designs/showcase">Design Showcase</RouterLink>
          <RouterLink to="/gallery">Community Gallery</RouterLink>
          <a href="#">Pricing</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Tutorials</a>
          <a href="#">FAQ</a>
          <a href="#">Blog</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ currentYear }} Interior Designer 3D. All rights reserved.</p>
        <p class="footer-credits">Built with Vue.js & Three.js — Graduation Project</p>
      </div>
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
  background-color: #f8fafc;
}

.main-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #f7faff;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.main-layout__brand {
  font-weight: 800;
  font-size: 1.5rem;
  text-decoration: none;
  color: #ffffff;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 28px;
  color: #60a5fa;
}

.main-layout__brand span:not(.material-symbols-outlined) {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}

.main-layout__nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.main-layout__link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.5rem 0;
}

.main-layout__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.main-layout__link:hover {
  color: #ffffff;
}

.main-layout__link:hover::after {
  width: 100%;
}

.main-layout__link.router-link-active {
  color: #ffffff;
  font-weight: 600;
}

.main-layout__link.router-link-active::after {
  width: 100%;
}

.main-layout__actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.main-layout__cta {
  padding: 0.7rem 1.75rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.main-layout__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3);
  filter: brightness(1.1);
}

.main-layout__content {
  flex: 1;
  padding: 0;
}

/* ─── Footer ───────────────────────────────────────── */
.main-layout__footer {
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 4rem;
  padding: 5rem 4rem 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.25rem;
  color: white;
}

.footer-logo span {
  color: #3b82f6;
}

.footer-tagline {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  max-width: 320px;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social a {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  display: grid;
  place-items: center;
  text-decoration: none;
  transition: all 0.3s;
}

.footer-social a:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-col h4 {
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.footer-col a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #f1f5f9;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-bottom p {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
}

.footer-credits {
  color: #3b82f6 !important;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .main-layout__header {
    padding: 1rem 2rem;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    padding: 3rem 2rem;
  }

  .footer-bottom {
    padding: 1.5rem 2rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .main-layout__header {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    height: auto;
  }

  .main-layout__nav {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-layout__actions {
    width: 100%;
    justify-content: center;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
