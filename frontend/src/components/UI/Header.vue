<script setup lang="ts">
import { computed } from 'vue';

type NavItem = {
  label: string;
  to: string;
  exact?: boolean;
};

const props = defineProps<{
  title?: string;
  navItems?: NavItem[];
  showAccount?: boolean;
}>();

const computedNavItems = computed<NavItem[]>(() => {
  if (props.navItems && props.navItems.length > 0) {
    return props.navItems;
  }
  return [
    { label: 'Home', to: '/' },
    { label: 'Editor', to: '/editor' },
    { label: 'My Designs', to: '/my-designs' },
    { label: 'Gallery', to: '/gallery' },
  ];
});
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__brand">
      {{ title ?? 'Interior Designer 3D' }}
    </RouterLink>

    <nav class="app-header__nav">
      <RouterLink
        v-for="item in computedNavItems"
        :key="item.to"
        :to="item.to"
        class="app-header__link"
        :class="{ 'app-header__link--active': item.exact ? $route.path === item.to : $route.path.startsWith(item.to) }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div v-if="showAccount" class="app-header__actions">
      <RouterLink to="/profile" class="app-header__link app-header__link--muted">Profile</RouterLink>
      <RouterLink to="/login" class="app-header__button">Sign Out</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem clamp(1.25rem, 5vw, 2.5rem);
  background-color: rgba(15, 23, 42, 0.92);
  color: #e2e8f0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  backdrop-filter: blur(14px);
}

.app-header__brand {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: inherit;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.app-header__link {
  text-decoration: none;
  color: rgba(226, 232, 240, 0.75);
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.app-header__link--active {
  color: #ffffff;
  font-weight: 600;
}

.app-header__link:hover {
  color: #ffffff;
}

.app-header__link--muted {
  opacity: 0.8;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header__button {
  padding: 0.45rem 1.15rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 10px 26px rgba(37, 99, 235, 0.35);
}

@media (max-width: 768px) {
  .app-header {
    flex-wrap: wrap;
    justify-content: center;
  }

  .app-header__nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
