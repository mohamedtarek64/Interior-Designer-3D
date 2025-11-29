export type FurnitureCategory = 'chair' | 'table' | 'sofa' | 'bed' | 'decor' | 'custom';
export type FurnitureSourceType = 'glb' | 'procedural';

export interface FurnitureAsset {
  id: string;
  name: string;
  category: FurnitureCategory;
  thumbnail: string;
  materials: string[];
  tags: string[];
  sourceType: FurnitureSourceType;
  modelPath?: string;
  proceduralId?: string;
  isEnvironment?: boolean;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}
