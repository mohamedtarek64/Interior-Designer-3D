import * as THREE from 'three';

export type RenderCallback = (delta: number) => void;

export interface RendererOptions {
  antialias?: boolean;
  toneMapping?: THREE.ToneMapping;
  physicallyCorrectLights?: boolean;
}

export class RendererManager {
  public renderer: THREE.WebGLRenderer | null = null;
  private container: HTMLElement | null = null;
  private animationId: number | null = null;
  private readonly beforeRenderCallbacks = new Set<RenderCallback>();
  private readonly afterRenderCallbacks = new Set<RenderCallback>();
  private readonly clock = new THREE.Clock();

  init(container: HTMLElement, options: RendererOptions = {}) {
    if (this.renderer) {
      return;
    }

    this.container = container;
    this.renderer = new THREE.WebGLRenderer({
      antialias: options.antialias ?? true,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = options.toneMapping ?? THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.resize();

    container.appendChild(this.renderer.domElement);
  }

  resize() {
    if (!this.renderer || !this.container) {
      return;
    }

    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight);
  }

  onBeforeRender(callback: RenderCallback) {
    this.beforeRenderCallbacks.add(callback);
    return () => this.beforeRenderCallbacks.delete(callback);
  }

  onAfterRender(callback: RenderCallback) {
    this.afterRenderCallbacks.add(callback);
    return () => this.afterRenderCallbacks.delete(callback);
  }

  start(scene: THREE.Scene, camera: THREE.Camera) {
    if (!this.renderer) {
      throw new Error('RendererManager: call init() before start().');
    }

    const loop = () => {
      const delta = this.clock.getDelta();
      this.beforeRenderCallbacks.forEach((callback) => callback(delta));
      this.renderer!.render(scene, camera);
      this.afterRenderCallbacks.forEach((callback) => callback(delta));
      this.animationId = requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose() {
    this.stop();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container?.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
    this.container = null;
    this.beforeRenderCallbacks.clear();
    this.afterRenderCallbacks.clear();
  }

  get domElement(): HTMLCanvasElement | null { 
    return this.renderer ? this.renderer.domElement : null;
  }
}
