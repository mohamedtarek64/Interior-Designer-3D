export type MaterialCategory = 'wood' | 'marble' | 'fabric' | 'metal' | 'custom';

export interface MaterialDefinition {
  id: string;
  name: string;
  texture: string;
  roughness: number;
  metalness: number;
  normalMap?: string;
  category?: MaterialCategory;
}
