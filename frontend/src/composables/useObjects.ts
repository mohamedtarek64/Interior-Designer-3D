import * as THREE from 'three';

import { useFurnitureStore } from '@/stores';

import { useThree, type ThreeRuntime } from './useThree';

type ObjectMap = Map<string, THREE.Object3D>;

function createProceduralObject(proceduralId: string, name: string): THREE.Object3D {
  const group = new THREE.Group();
  group.name = name;

  const addMesh = (mesh: THREE.Mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  };

  switch (proceduralId) {
    case 'chair-modern': {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.08, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x4f6d7a })
      );
      seat.position.set(0, 0.4, 0);
      addMesh(seat);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.6, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x4f6d7a })
      );
      back.position.set(0, 0.7, -0.25);
      addMesh(back);

      const legMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0 });
      const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 16);
      const legPositions = [
        [-0.25, 0.2, -0.25],
        [0.25, 0.2, -0.25],
        [-0.25, 0.2, 0.25],
        [0.25, 0.2, 0.25],
      ];
      legPositions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMaterial);
        leg.position.set(x, y, z);
        addMesh(leg);
      });
      break;
    }
    case 'chair-accent': {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.1),
        new THREE.MeshStandardMaterial({ color: 0x9c6b9c, metalness: 0.1, roughness: 0.6 })
      );
      shell.position.set(0, 0.4, 0);
      shell.rotation.x = Math.PI / 2;
      addMesh(shell);

      const cushion = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.1, 32),
        new THREE.MeshStandardMaterial({ color: 0xffe0b2, metalness: 0.05, roughness: 0.8 })
      );
      cushion.position.set(0, 0.25, 0);
      addMesh(cushion);

      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3c3c3c });
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.05, 0.4, 16), baseMaterial);
      base.position.set(0, 0.05, 0);
      addMesh(base);
      break;
    }
    case 'chair-dining': {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.06, 0.5),
        new THREE.MeshStandardMaterial({ color: 0xd1bfa7 })
      );
      seat.position.set(0, 0.45, 0);
      addMesh(seat);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.05),
        new THREE.MeshStandardMaterial({ color: 0xb99870 })
      );
      back.position.set(0, 0.7, -0.225);
      addMesh(back);

      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8c6742 });
      const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 12);
      [
        [-0.22, 0.2, -0.22],
        [0.22, 0.2, -0.22],
        [-0.22, 0.2, 0.22],
        [0.22, 0.2, 0.22],
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMaterial);
        leg.position.set(x, y, z);
        addMesh(leg);
      });
      break;
    }
    case 'table-dining': {
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.08, 0.9),
        new THREE.MeshStandardMaterial({ color: 0xdeb887 })
      );
      top.position.set(0, 0.75, 0);
      addMesh(top);

      const legGeo = new THREE.BoxGeometry(0.12, 0.7, 0.12);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x433422 });
      const legs = [
        [-0.7, 0.4, -0.35],
        [0.7, 0.4, -0.35],
        [-0.7, 0.4, 0.35],
        [0.7, 0.4, 0.35],
      ];
      legs.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMaterial);
        leg.position.set(x, y, z);
        addMesh(leg);
      });
      break;
    }
    case 'table-coffee': {
      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.06, 32),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      top.position.set(0, 0.45, 0);
      addMesh(top);

      const support = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: 0x3c3c3c })
      );
      support.position.set(0, 0.25, 0);
      addMesh(support);

      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.04, 32),
        new THREE.MeshStandardMaterial({ color: 0x1f2933 })
      );
      base.position.set(0, 0.05, 0);
      addMesh(base);
      break;
    }
    case 'table-desk': {
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.05, 0.6),
        new THREE.MeshStandardMaterial({ color: 0xf5f2eb })
      );
      top.position.set(0, 0.75, 0);
      addMesh(top);

      const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.3 });
      const frameGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.75, 12);
      const positions = [
        [-0.55, 0.38, -0.25],
        [0.55, 0.38, -0.25],
        [-0.55, 0.38, 0.25],
        [0.55, 0.38, 0.25],
      ];
      positions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(frameGeo, frameMaterial);
        leg.position.set(x, y, z);
        addMesh(leg);
      });
      break;
    }
    case 'sofa-sectional': {
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.3, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x7b8794 })
      );
      base.position.set(0, 0.3, 0);
      addMesh(base);

      const chaise = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.3, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x7b8794 })
      );
      chaise.position.set(-0.6, 0.3, 0.9);
      addMesh(chaise);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.5, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x6c7a89 })
      );
      back.position.set(0, 0.8, -0.425);
      addMesh(back);

      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.6, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x6c7a89 })
      );
      arm.position.set(1.025, 0.6, 0);
      addMesh(arm);
      break;
    }
    case 'sofa-two-seater': {
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.28, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xb0bec5 })
      );
      base.position.set(0, 0.28, 0);
      addMesh(base);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.6, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x90a4ae })
      );
      back.position.set(0, 0.75, -0.34);
      addMesh(back);

      const armGeo = new THREE.BoxGeometry(0.12, 0.52, 0.8);
      const armMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae });
      [-0.86, 0.86].forEach((x) => {
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.position.set(x, 0.6, 0);
        addMesh(arm);
      });
      break;
    }
    case 'sofa-chaise': {
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.26, 0.7),
        new THREE.MeshStandardMaterial({ color: 0xc0a080 })
      );
      base.position.set(0, 0.26, 0);
      addMesh(base);

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.5, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xb48a60 })
      );
      back.position.set(0, 0.7, -0.29);
      addMesh(back);

      const cushion = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.18, 0.6),
        new THREE.MeshStandardMaterial({ color: 0xf5e0c3 })
      );
      cushion.position.set(-0.4, 0.5, 0.1);
      addMesh(cushion);
      break;
    }
    default: {
      const defaultMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x999999 })
      );
      defaultMesh.position.set(0, 0.5, 0);
      addMesh(defaultMesh);
      break;
    }
  }

  return group;
}

export function useObjects(runtime?: ThreeRuntime) {
  const context = runtime ?? useThree();
  const { modelLoader, sceneManager } = context;
  const furnitureStore = useFurnitureStore();
  const objects: ObjectMap = new Map();

  const addObject = (id: string, object: THREE.Object3D) => {
    objects.set(id, object);
    sceneManager.add(object);
  };

  const removeObject = (id: string) => {
    const object = objects.get(id);
    if (!object) {
      return;
    }
    sceneManager.remove(object);
    objects.delete(id);
  };

  const clear = () => {
    Array.from(objects.keys()).forEach(removeObject);
  };

  const loadFurnitureAsset = async (assetId: string) => {
    const asset = furnitureStore.furniture.find((item) => item.id === assetId);
    if (!asset) {
      throw new Error(`Furniture asset "${assetId}" not found.`);
    }

    if (asset.sourceType === 'glb') {
      if (!asset.modelPath) {
        throw new Error(`Furniture asset "${asset.id}" is missing modelPath.`);
      }
      const gltf = await modelLoader.load(asset.modelPath);
      const root = gltf.scene;
      root.name = asset.name;
      root.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      return root;
    }

    if (asset.sourceType === 'procedural') {
      if (!asset.proceduralId) {
        throw new Error(`Furniture asset "${asset.id}" is missing proceduralId.`);
      }
      const object = createProceduralObject(asset.proceduralId, asset.name);
      return object;
    }

    throw new Error(`Unsupported asset source type for "${asset.id}".`);
  };

  const getObject = (id: string) => objects.get(id) ?? null;

  return {
    addObject,
    removeObject,
    clear,
    loadFurnitureAsset,
    getObject,
    objects,
  };
}
