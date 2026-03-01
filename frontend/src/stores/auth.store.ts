import { defineStore } from 'pinia';
import { authService } from '../services/api/auth.service';
import type { User, LoginRequest, RegisterRequest } from '../types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials: LoginRequest) {
      this.loading = true;
      this.error = null;
      try {
        const data = await authService.login(credentials);
        this.user = data.user;
        this.token = data.access_token;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(userData: RegisterRequest) {
      this.loading = true;
      this.error = null;
      try {
        const data = await authService.register(userData);
        this.user = data.user;
        this.token = data.access_token;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Registration failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } finally {
        this.user = null;
        this.token = null;
        this.error = null;
      }
    },

    async fetchUser() {
      if (!this.token) return;

      this.loading = true;
      try {
        this.user = await authService.getCurrentUser();
      } catch (err) {
        this.logout();
      } finally {
        this.loading = false;
      }
    },
  },
});
