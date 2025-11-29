export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface SaveDesignRequest {
  designId?: string;
  name: string;
  description?: string;
  scene: string;
  isPublic?: boolean;
}
