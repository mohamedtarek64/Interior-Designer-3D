import type { DesignDetail, DesignSummary } from '../models/design.types';
import type { FurnitureAsset } from '../models/furniture.types';
import type { MaterialDefinition } from '../models/material.types';
import type { UserProfile } from '../models/user.types';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type LoginResponse = ApiResponse<{
  user: UserProfile;
  token: string;
}>;

export type RegisterResponse = ApiResponse<UserProfile>;

export type DesignsListResponse = ApiResponse<DesignSummary[]>;

export type DesignDetailResponse = ApiResponse<DesignDetail>;

export type FurnitureListResponse = ApiResponse<FurnitureAsset[]>;

export type MaterialListResponse = ApiResponse<MaterialDefinition[]>;
