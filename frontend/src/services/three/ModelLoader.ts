import * as THREE from 'three';
import { DRACOLoader, GLTF, GLTFLoader } from 'three-stdlib';

type LoadOptions = {
  dracoPath?: string;
};

function cloneGLTF(gltf: GLTF): GLTF {
  const clonedScene = gltf.scene.clone(true);

  const skinnedMeshes: { [name: string]: THREE.SkinnedMesh } = {};

  gltf.scene.traverse((node) => {
    if ((node as THREE.SkinnedMesh).isSkinnedMesh) {
      skinnedMeshes[node.name] = node as THREE.SkinnedMesh;
    }
  });

  const cloneBones: { [name: string]: THREE.Bone } = {};
  const cloneSkinnedMeshes: { [name: string]: THREE.SkinnedMesh } = {};

  clonedScene.traverse((node) => {
    if ((node as THREE.Bone).isBone) {
      cloneBones[node.name] = node as THREE.Bone;
    }
    if ((node as THREE.SkinnedMesh).isSkinnedMesh) {
      cloneSkinnedMeshes[node.name] = node as THREE.SkinnedMesh;
    }
  });

  for (const name in skinnedMeshes) {
    const skinnedMesh = skinnedMeshes[name];
    const skeleton = skinnedMesh.skeleton;
    const cloneSkinnedMesh = cloneSkinnedMeshes[name];

    const bones = skeleton.bones.map((bone) => cloneBones[bone.name]);
    cloneSkinnedMesh.bind(new THREE.Skeleton(bones, skeleton.boneInverses), cloneSkinnedMesh.matrixWorld);
  }

  return {
    ...gltf,
    scene: clonedScene,
  };
}

export class ModelLoader {
  private readonly loader: GLTFLoader;
  private readonly cache = new Map<string, GLTF>();

  constructor(options: LoadOptions = {}) {
    this.loader = new GLTFLoader();
    this.loader.setCrossOrigin('anonymous');
    const dracoLoader = new DRACOLoader();
    const decoderPath =
      options.dracoPath ?? 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';
    dracoLoader.setDecoderPath(decoderPath);
    dracoLoader.setDecoderConfig({ type: 'wasm' });
    this.loader.setDRACOLoader(dracoLoader);
  }

  async load(url: string): Promise<GLTF> {
    if (this.cache.has(url)) {
      return cloneGLTF(this.cache.get(url)!);
    }

    const gltf = await this.loader.loadAsync(url);
    this.cache.set(url, gltf);
    return cloneGLTF(gltf);
  }

  dispose() {
    this.cache.clear();
  }
}
