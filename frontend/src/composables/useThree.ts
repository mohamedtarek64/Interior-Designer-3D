import { inject, onBeforeUnmount, provide, shallowRef } from 'vue';
import * as THREE from 'three';

import {
  LightManager,
  ModelLoader,
  RaycasterManager,
  RendererManager,
  SceneManager,
  TextureLoaderService,
  type RenderCallback,
} from '@/services/three';

const ThreeContextSymbol = Symbol('ThreeContext');

export interface ThreeRuntime {
  renderer: RendererManager;
  sceneManager: SceneManager;
  camera: THREE.PerspectiveCamera;
  raycaster: RaycasterManager;
  lightManager: LightManager;
  modelLoader: ModelLoader;
  textureLoader: TextureLoaderService;
  clock: THREE.Clock;
  registerBeforeRender: (callback: RenderCallback) => () => void;
  registerAfterRender: (callback: RenderCallback) => () => void;
}

export interface ThreeRuntimeOptions {
  fov?: number;
  near?: number;
  far?: number;
  cameraPosition?: THREE.Vector3;
  lookAt?: THREE.Vector3;
}

export function createThreeRuntime(options: ThreeRuntimeOptions = {}): ThreeRuntime {
  const renderer = new RendererManager();
  const sceneManager = new SceneManager();
  const camera = new THREE.PerspectiveCamera(
    options.fov ?? 45,
    1,
    options.near ?? 0.1,
    options.far ?? 100,
  );
  camera.position.copy(options.cameraPosition ?? new THREE.Vector3(6, 4, 8));
  camera.lookAt(options.lookAt ?? new THREE.Vector3(0, 1, 0));

  const raycaster = new RaycasterManager();
  raycaster.setCamera(camera);
  raycaster.setScene(sceneManager.scene);

  const lightManager = new LightManager(sceneManager.scene);
  const modelLoader = new ModelLoader();
  const textureLoader = new TextureLoaderService();
  const clock = new THREE.Clock();

  const registerBeforeRender = (callback: RenderCallback) => renderer.onBeforeRender(callback);
  const registerAfterRender = (callback: RenderCallback) => renderer.onAfterRender(callback);

  const runtime: ThreeRuntime = {
    renderer,
    sceneManager,
    camera,
    raycaster,
    lightManager,
    modelLoader,
    textureLoader,
    clock,
    registerBeforeRender,
    registerAfterRender,
  };

  return runtime;
}

export function provideThree(runtime: ThreeRuntime) {
  provide(ThreeContextSymbol, runtime);

  onBeforeUnmount(() => {
    runtime.renderer.dispose();
    runtime.sceneManager.dispose();
    runtime.lightManager.clear();
    runtime.modelLoader.dispose();
    runtime.textureLoader.dispose();
  });
}

export function useThree(): ThreeRuntime {
  const runtime = inject<ThreeRuntime>(ThreeContextSymbol);
  if (!runtime) {
    throw new Error('useThree must be used within a Three provider.');
  }
  return runtime;
}

export function useRendererSize(container: HTMLElement | null, camera: THREE.PerspectiveCamera) {
  const size = shallowRef({ width: 0, height: 0 });

  const updateSize = () => {
    if (!container) {
      return;
    }
    size.value = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    camera.aspect = container.clientWidth / container.clientHeight || 1;
    camera.updateProjectionMatrix();
  };

  updateSize();
  window.addEventListener('resize', updateSize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSize);
  });

  return size;
}
