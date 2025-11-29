import * as THREE from 'three';

const DEFAULT_BACKGROUND = '#1a1f2e';

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((mat) => mat.dispose());
    return;
  }
  material.dispose();
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!('geometry' in child || 'material' in child)) {
      return;
    }
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }
    if (Array.isArray(mesh.material) || mesh.material) {
      disposeMaterial(mesh.material);
    }
  });
}

export class SceneManager {
  public readonly scene: THREE.Scene;
  private gridHelper: THREE.GridHelper | null = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(DEFAULT_BACKGROUND);
    this.scene.fog = new THREE.Fog(DEFAULT_BACKGROUND, 30, 80);
  }

  add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  remove(object: THREE.Object3D) {
    this.scene.remove(object);
    disposeObject(object);
  }

  addGrid(size = 20, divisions = 20, colorCenterLine = 0x2c3e50, colorGrid = 0x1c2833) {
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper);
    }
    this.gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    this.gridHelper.material.transparent = true;
    this.gridHelper.material.opacity = 0.3;
    this.add(this.gridHelper);
  }

  toggleGrid(visible: boolean) {
    if (this.gridHelper) {
      this.gridHelper.visible = visible;
    }
  }

  setBackground(color: string) {
    this.scene.background = new THREE.Color(color);
    this.scene.fog = new THREE.Fog(color, 30, 80);
  }

  dispose() {
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        disposeObject(object);
      }
    });
    this.scene.clear();
    this.gridHelper = null;
  }
}
