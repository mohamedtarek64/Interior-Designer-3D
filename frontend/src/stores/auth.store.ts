import { defineStore } from 'pinia';

import type { AuthTokens, UserProfile } from '@/types';

type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'error';

interface AuthState {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  status: AuthStatus;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    tokens: null,
    status: 'idle',
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
    userName: (state) => state.user?.name ?? '',
  },
  actions: {
    setCredentials(user: UserProfile, tokens: AuthTokens) {
      this.user = user;
      this.tokens = tokens;
      this.status = 'authenticated';
    },
    clearSession() {
      this.user = null;
      this.tokens = null;
      this.status = 'idle';
    },
    async login() {
      this.status = 'authenticating';
      // TODO: Integrate with API or local auth flow.
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.status = 'authenticated';
    },
  },
});
