<script setup lang="ts">
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

type LoginFormState = {
  email: string;
  password: string;
};

const state = reactive<LoginFormState>({
  email: '',
  password: '',
});

const showPassword = ref(false);

const emit = defineEmits<{
  (e: 'submit', payload: LoginFormState): void;
}>();

const handleSubmit = () => {
  emit('submit', { ...state });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div class="login-form__field">
      <label class="login-form__label">
        <span class="login-form__label-text">Email Address</span>
        <input
          v-model="state.email"
          class="login-form__input"
          type="email"
          placeholder="Enter your email"
          required
        />
      </label>
    </div>

    <div class="login-form__field">
      <div class="login-form__password-header">
        <span class="login-form__label-text">Password</span>
        <RouterLink to="/forgot-password" class="login-form__forgot-link">
          Forgot Password?
        </RouterLink>
      </div>
      <div class="login-form__password-wrapper">
        <input
          v-model="state.password"
          class="login-form__input login-form__input--password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          class="login-form__password-toggle"
          aria-label="Toggle password visibility"
          @click="togglePasswordVisibility"
        >
          <span class="material-symbols-outlined">
            {{ showPassword ? 'visibility_off' : 'visibility' }}
          </span>
        </button>
      </div>
    </div>

    <button type="submit" class="login-form__submit">
      Login
    </button>

    <p class="login-form__footer">
      Don't have an account?
      <RouterLink to="/register" class="login-form__signup-link">
        Sign Up
      </RouterLink>
    </p>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-form__field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.login-form__label {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.login-form__label-text {
  color: rgb(30 41 59);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
}

[data-theme="dark"] .login-form__label-text {
  color: rgb(255 255 255);
}

.login-form__password-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.login-form__forgot-link {
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.2s;
}

.login-form__forgot-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.login-form__input {
  width: 100%;
  height: 3.25rem;
  padding: 0 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  background-color: #f8fafc;
  color: #0f172a;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  transition: all 0.25s;
}

.login-form__input::placeholder {
  color: rgb(148 163 184);
}

[data-theme="dark"] .login-form__input {
  border-color: rgb(59 69 84);
  background-color: rgb(28 32 39);
  color: rgb(255 255 255);
}

[data-theme="dark"] .login-form__input::placeholder {
  color: rgb(157 168 185);
}

.login-form__input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background-color: #ffffff;
}

[data-theme="dark"] .login-form__input:focus {
  border-color: #d0bb95;
}

.login-form__password-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  align-items: stretch;
  border-radius: 0.5rem;
}

.login-form__input--password {
  padding-right: 3rem;
}

.login-form__password-toggle {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  background: transparent;
  border: none;
  color: rgb(148 163 184);
  cursor: pointer;
  transition: color 0.2s;
}

[data-theme="dark"] .login-form__password-toggle {
  color: rgb(157 168 185);
}

.login-form__password-toggle:hover {
  color: #3b82f6;
}

.login-form__password-toggle .material-symbols-outlined {
  font-size: 24px;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.login-form__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.25rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3);
}

.login-form__submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.4);
  filter: brightness(1.05);
}

.login-form__submit:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.login-form__footer {
  margin: 0;
  margin-top: 2rem;
  text-align: center;
  color: rgb(71 85 105);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

[data-theme="dark"] .login-form__footer {
  color: rgb(148 163 184);
}

.login-form__signup-link {
  margin-left: 0.25rem;
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.login-form__signup-link:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>
