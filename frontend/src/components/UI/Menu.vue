<script setup lang="ts">
type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  to?: string;
};

const props = defineProps<{
  items: MenuItem[];
  title?: string;
}>();
</script>

<template>
  <nav class="menu">
    <p v-if="title" class="menu__title">{{ title }}</p>
    <ul class="menu__list">
      <li v-for="item in items" :key="item.id" class="menu__item">
        <RouterLink v-if="item.to" :to="item.to" class="menu__link">
          <span v-if="item.icon" class="menu__icon">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
        <span v-else class="menu__label">
          <span v-if="item.icon" class="menu__icon">{{ item.icon }}</span>
          {{ item.label }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.menu__title {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(15, 23, 42, 0.5);
  margin: 0;
}

.menu__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.menu__link,
.menu__label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: #0f172a;
  font-size: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.menu__link.router-link-active {
  background: rgba(37, 99, 235, 0.14);
  color: #1d4ed8;
  font-weight: 600;
}

.menu__link:hover {
  background: rgba(15, 23, 42, 0.08);
}

.menu__icon {
  font-size: 1.1rem;
}
</style>
