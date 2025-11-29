<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

import { useThree } from '@/composables/useThree';
import { useSceneStore } from '@/stores';

const { camera, renderer, registerBeforeRender } = useThree();
const sceneStore = useSceneStore();

const controls = ref<OrbitControls | null>(null);
let disposeRenderHook: (() => void) | null = null;
let stopWatching: (() => void) | null = null;

const movementState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
};

let shiftPressed = false;

const handleKeyDown = (event: KeyboardEvent) => {
  let handled = true;
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      movementState.forward = true;
      break;
    case 'KeyS':
    case 'ArrowDown':
      movementState.backward = true;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      movementState.left = true;
      break;
    case 'KeyD':
    case 'ArrowRight':
      movementState.right = true;
      break;
    case 'KeyQ':
    case 'PageDown':
      movementState.down = true;
      break;
    case 'KeyE':
    case 'PageUp':
      movementState.up = true;
      break;
    case 'Space':
      movementState.up = true;
      event.preventDefault();
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      shiftPressed = true;
      handled = false;
      break;
    default:
      handled = false;
  }
  if (handled) {
    event.preventDefault();
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      movementState.forward = false;
      break;
    case 'KeyS':
    case 'ArrowDown':
      movementState.backward = false;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      movementState.left = false;
      break;
    case 'KeyD':
    case 'ArrowRight':
      movementState.right = false;
      break;
    case 'KeyQ':
    case 'PageDown':
      movementState.down = false;
      break;
    case 'KeyE':
    case 'PageUp':
      movementState.up = false;
      break;
    case 'Space':
      movementState.up = false;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      shiftPressed = false;
      break;
    default:
      break;
  }
};

const applyKeyboardMovement = (delta: number) => {
  if (!controls.value) {
    return;
  }
  const moveVector = new THREE.Vector3();
  const forwardDir = new THREE.Vector3();
  const rightDir = new THREE.Vector3();
  const upDir = new THREE.Vector3(0, 1, 0);

  camera.getWorldDirection(forwardDir);
  forwardDir.normalize();

  const planarForward = forwardDir.clone().setY(0).normalize();
  if (!Number.isFinite(planarForward.length()) || planarForward.lengthSq() === 0) {
    planarForward.set(0, 0, -1);
  }

  rightDir.crossVectors(forwardDir, upDir).normalize();

  if (movementState.forward) {
    moveVector.add(planarForward);
  }
  if (movementState.backward) {
    moveVector.sub(planarForward);
  }
  if (movementState.left) {
    moveVector.sub(rightDir);
  }
  if (movementState.right) {
    moveVector.add(rightDir);
  }

  if (movementState.up) {
    moveVector.y += 1;
  }
  if (movementState.down) {
    moveVector.y -= 1;
  }

  if (moveVector.lengthSq() === 0) {
    return;
  }

  moveVector.normalize();
  const baseSpeed = shiftPressed ? 8 : 4;
  const adjustedSpeed = baseSpeed * Math.min(delta * 60, 2);
  moveVector.multiplyScalar(adjustedSpeed);

  camera.position.add(moveVector);
  controls.value.target.add(moveVector);
  controls.value.update();

  sceneStore.camera.position = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  };
  sceneStore.camera.target = {
    x: controls.value.target.x,
    y: controls.value.target.y,
    z: controls.value.target.z,
  };
};

onMounted(() => {
  const initControls = () => {
    const canvas = renderer.domElement;
    if (!canvas) {
      requestAnimationFrame(initControls);
      return;
    }

    const orbit = new OrbitControls(camera, canvas);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.05;
    orbit.enablePan = true;
    orbit.screenSpacePanning = false;
    orbit.enableRotate = true;
    orbit.enableZoom = true;
    orbit.maxPolarAngle = Math.PI;
    orbit.minPolarAngle = 0;
    orbit.maxDistance = 1000;
    orbit.minDistance = 0.1;
    orbit.zoomSpeed = 1.2;
    orbit.panSpeed = 2.0;
    orbit.rotateSpeed = 1.0;
    orbit.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    orbit.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    orbit.target.set(
      sceneStore.camera.target.x,
      sceneStore.camera.target.y,
      sceneStore.camera.target.z,
    );
    orbit.update();
    controls.value = orbit;

    disposeRenderHook = registerBeforeRender((delta) => {
      if (controls.value) {
        controls.value.update();
        applyKeyboardMovement(delta);
      }
    });

    const stop = sceneStore.$subscribe(
      (_mutation, state) => {
        if (controls.value) {
          controls.value.target.set(
            state.camera.target.x,
            state.camera.target.y,
            state.camera.target.z,
          );
        }
      },
      { detached: false },
    );
    stopWatching = () => stop();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  };

  initControls();
});

onBeforeUnmount(() => {
  disposeRenderHook?.();
  controls.value?.dispose();
  controls.value = null;
  stopWatching?.();
  stopWatching = null;
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
});
</script>

<template>
  <slot />
</template>
