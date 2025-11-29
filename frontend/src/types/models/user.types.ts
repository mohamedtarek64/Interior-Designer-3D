export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'designer' | 'viewer' | 'admin';
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
}
