<script setup lang="ts">
import { computed, ref } from 'vue';

import { BaseButton, BaseCard, BaseInput } from '@/components/UI';

const profile = ref({
  name: 'Amina Hassan',
  email: 'amina@example.com',
  role: 'Interior Designer',
});

const initials = computed(() =>
  profile.value.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
);
</script>

<template>
  <div class="profile-view">
    <header class="profile-view__header">
      <div class="profile-view__avatar">{{ initials }}</div>
      <div>
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.role }}</p>
      </div>
    </header>

    <section class="profile-view__content">
      <BaseCard bordered class="profile-view__card">
        <form class="profile-view__form" @submit.prevent>
          <BaseInput v-model="profile.name" label="Full name" required />
          <BaseInput v-model="profile.email" label="Email address" type="email" required />
          <BaseInput v-model="profile.role" label="Role" />

          <div class="profile-view__actions">
            <BaseButton variant="secondary" type="button">Cancel</BaseButton>
            <BaseButton type="submit">Save Changes</BaseButton>
          </div>
        </form>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.profile-view__header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-view__avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.3rem;
  color: #f8fafc;
}

.profile-view__header h1 {
  margin: 0;
  font-size: 1.85rem;
  color: #0f172a;
}

.profile-view__header p {
  margin: 0.25rem 0 0;
  color: #475569;
}

.profile-view__card {
  max-width: 520px;
}

.profile-view__form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.profile-view__actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@media (max-width: 640px) {
  .profile-view__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
