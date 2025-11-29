import * as THREE from 'three';

export interface RaycastHit {
  object: THREE.Object3D;
  point: THREE.Vector3;
}

export class RaycasterManager {
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private camera: THREE.Camera | null = null;
  private scene: THREE.Scene | null = null;

  setCamera(camera: THREE.Camera) {
    this.camera = camera;
  }

  setScene(scene: THREE.Scene) {
    this.scene = scene;
  }

  updatePointer(event: PointerEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  cast(objects?: THREE.Object3D[]): RaycastHit[] {
    if (!this.camera || !this.scene) {
      return [];
    }

    const intersects = this.raycaster.intersectObjects(
      objects ?? this.scene.children,
      true,
    );

    return intersects.map((intersection) => ({
      object: intersection.object,
      point: intersection.point.clone(),
    }));
  }
}
