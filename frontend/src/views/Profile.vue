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

      <aside class="profile-view__info">
        <BaseCard bordered padding="md">
          <h3>Account Summary</h3>
          <p>You have <strong>12</strong> active designs and <strong>3</strong> shared galleries.</p>
        </BaseCard>
        
        <BaseCard bordered padding="md">
          <h3>Security</h3>
          <p>Your account is protected with 2FA.</p>
          <BaseButton variant="ghost" size="sm">Manage Security</BaseButton>
        </BaseCard>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem;
}

.profile-view__header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
}

.profile-view__avatar {
  width: 120px;
  height: 120px;
  border-radius: 32px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 2.5rem;
  color: #f8fafc;
  box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.3);
  transform: rotate(-3deg);
}

.profile-view__header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
}

.profile-view__header p {
  margin: 0.5rem 0 0;
  color: #64748b;
  font-size: 1.25rem;
  font-weight: 500;
}

.profile-view__content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4rem;
}

.profile-view__card {
  padding: 3rem !important;
}

.profile-view__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-view__info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-view__info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.profile-view__info p {
  margin: 0.5rem 0 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.profile-view__actions {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

@media (max-width: 1024px) {
  .profile-view__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .profile-view {
    padding: 2rem;
  }

  .profile-view__header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-view__avatar {
    transform: none;
  }
}
</style>
