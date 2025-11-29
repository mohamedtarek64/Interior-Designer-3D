import { useSceneStore } from '@/stores';

export function saveSceneToJson(): string {
  const sceneStore = useSceneStore();
  const scene = {
    camera: sceneStore.camera,
    furniture: sceneStore.furniture,
    gridEnabled: sceneStore.gridEnabled,
    snapping: sceneStore.snapping,
  };
  return JSON.stringify(scene);
}

export function loadSceneFromJson(sceneJson: string) {
  const sceneStore = useSceneStore();
  const parsed = JSON.parse(sceneJson);
  sceneStore.resetScene();
  parsed.furniture?.forEach((item: any) => {
    sceneStore.addFurniture(item);
  });
  sceneStore.toggleGrid(parsed.gridEnabled);
  sceneStore.toggleSnapping(parsed.snapping);
  if (parsed.camera) {
    sceneStore.camera.position = { ...parsed.camera.position };
    sceneStore.camera.target = { ...parsed.camera.target };
    sceneStore.camera.fov = parsed.camera.fov;
    if (parsed.camera.near) {
      sceneStore.camera.near = parsed.camera.near;
    }
    if (parsed.camera.far) {
      sceneStore.camera.far = parsed.camera.far;
    }
  }
}
