import type { DesignDetail } from '@/types';

const baseScene = {
  camera: {
    position: { x: 15, y: 10, z: 18 },
    target: { x: 0, y: 3, z: 0 },
    fov: 55,
    near: 0.1,
    far: 200,
  },
  gridEnabled: true,
  snapping: true,
};

export const designLibrary: DesignDetail[] = [
  {
    id: 'design-modern-apartment',
    name: 'Modern Apartment Interior',
    previewImage: '/assets/images/sofa.png',
    updatedAt: '2025-01-05T00:00:00.000Z',
    scene: JSON.stringify({
      ...baseScene,
      furniture: [
        {
          id: 'decor-room-001-instance',
          assetId: 'decor-room-001',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: Math.PI / 2, z: 0, order: 'XYZ' },
          scale: { x: 0.08, y: 0.08, z: 0.08 },
        },
      ],
    }),
  },
  {
    id: 'design-modern-living',
    name: 'Modern Living Room',
    previewImage: '/assets/images/sofa.png',
    updatedAt: '2025-01-04T00:00:00.000Z',
    scene: JSON.stringify({
      ...baseScene,
      furniture: [
        {
          id: 'sofa-sectional-instance',
          assetId: 'sofa-001',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: Math.PI / 4, z: 0, order: 'XYZ' },
          scale: { x: 1, y: 1, z: 1 },
        },
        {
          id: 'coffee-table-instance',
          assetId: 'table-002',
          position: { x: 0.2, y: 0, z: 0.6 },
          rotation: { x: 0, y: 0, z: 0, order: 'XYZ' },
          scale: { x: 1, y: 1, z: 1 },
        },
      ],
    }),
  },
  {
    id: 'design-cozy-bedroom',
    name: 'Cozy Bedroom Retreat',
    previewImage: '/assets/images/bed.png',
    updatedAt: '2025-01-02T00:00:00.000Z',
    scene: JSON.stringify({
      ...baseScene,
      furniture: [
        {
          id: 'bed-instance',
          assetId: 'bed-001',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0, order: 'XYZ' },
          scale: { x: 1, y: 1, z: 1 },
        },
        {
          id: 'chair-instance',
          assetId: 'chair-002',
          position: { x: -1.0, y: 0, z: 1.2 },
          rotation: { x: 0, y: Math.PI / 3, z: 0, order: 'XYZ' },
          scale: { x: 1, y: 1, z: 1 },
        },
      ],
    }),
  },
];
