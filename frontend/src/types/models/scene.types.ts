export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface EulerRotation {
  x: number;
  y: number;
  z: number;
  order?: 'XYZ' | 'YXZ' | 'ZXY' | 'ZYX' | 'YZX' | 'XZY';
}

export interface FurnitureInstance {
  id: string;
  assetId: string;
  position: Vector3;
  rotation: EulerRotation;
  scale: Vector3;
  materialOverrides?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface SceneLightingConfig {
  environment?: string;
  exposure?: number;
  lights: Array<{
    id: string;
    type: 'directional' | 'point' | 'spot' | 'hemisphere';
    position: Vector3;
    intensity: number;
    color: string;
  }>;
}

export interface SceneState {
  camera: {
    position: Vector3;
    target: Vector3;
    fov: number;
    near?: number;
    far?: number;
  };
  furniture: FurnitureInstance[];
  lighting: SceneLightingConfig;
  gridEnabled: boolean;
  snapping: boolean;
  selectedFurnitureId: string | null;
}

}

}
