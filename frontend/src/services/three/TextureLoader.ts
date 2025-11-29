import * as THREE from 'three';

export class TextureLoaderService {
  private readonly loader = new THREE.TextureLoader();
  private readonly cache = new Map<string, THREE.Texture>();

  async load(url: string): Promise<THREE.Texture> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    const texture = await this.loader.loadAsync(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set(url, texture);
    return texture;
  }

  dispose() {
    this.cache.forEach((texture) => texture.dispose());
    this.cache.clear();
  }
}
