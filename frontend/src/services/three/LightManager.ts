import * as THREE from 'three';

interface DirectionalLightOptions {
  position?: THREE.Vector3;
  intensity?: number;
  color?: string | number;
  castShadow?: boolean;
}

export class LightManager {
  private readonly scene: THREE.Scene;
  private lights: THREE.Light[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  addAmbientLight(intensity = 0.6, color = '#ffffff') {
    const ambient = new THREE.AmbientLight(color, intensity);
    this.scene.add(ambient);
    this.lights.push(ambient);
    return ambient;
  }

  addDirectionalLight(options: DirectionalLightOptions = {}) {
    const light = new THREE.DirectionalLight(options.color ?? '#ffffff', options.intensity ?? 1);
    light.position.copy(options.position ?? new THREE.Vector3(5, 8, 5));
    light.castShadow = options.castShadow ?? true;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 30;
    light.shadow.camera.left = -15;
    light.shadow.camera.right = 15;
    light.shadow.camera.top = 15;
    light.shadow.camera.bottom = -15;

    this.scene.add(light);
    this.lights.push(light);
    return light;
  }

  setupDefaultLights() {
    this.clear();
    this.addAmbientLight(0.7, '#ffffff');
    this.addDirectionalLight({
      position: new THREE.Vector3(10, 15, 10),
      intensity: 1.5,
      color: '#ffffff',
    });
    this.addDirectionalLight({
      position: new THREE.Vector3(-8, 12, -8),
      intensity: 0.8,
      color: '#f0f4ff',
    });
    this.addDirectionalLight({
      position: new THREE.Vector3(0, 10, -10),
      intensity: 0.5,
      color: '#fff8e1',
    });
  }

  clear() {
    this.lights.forEach((light) => {
      this.scene.remove(light);
    });
    this.lights = [];
  }
}
