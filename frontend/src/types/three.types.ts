export type GLTFModelRef = {
  url: string;
  name?: string;
  metadata?: Record<string, unknown>;
};

export interface Load3DAssetOptions {
  draco?: boolean;
  basis?: boolean;
  onProgress?: (progress: number) => void;
}

export type TextureRef = {
  id: string;
  url: string;
  type?: 'color' | 'normal' | 'roughness' | 'metalness';
};
