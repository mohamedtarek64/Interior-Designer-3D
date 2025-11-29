<script setup lang="ts">
import { ref } from 'vue';
import * as THREE from 'three';

import { useThree } from '@/composables/useThree';
import { useSceneStore } from '@/stores';

interface Props {
  isFullscreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFullscreen: false,
});

const { sceneManager, renderer, camera } = useThree();
const sceneStore = useSceneStore();

const isCollapsed = ref(false);
const wireframeEnabled = ref(false);
const wireframeColor = ref('#ffffff');
const viewportMode = ref<'3d' | '3d-2d' | '2d'>('3d');
const renderMode = ref<'final' | 'no-post'>('final');
const geometryMode = ref<'normal' | 'matcap' | 'matcap-surface'>('normal');

const wireframeColors = [
  { value: '#000000', label: 'Black' },
  { value: '#666666', label: 'Gray' },
  { value: '#ff0000', label: 'Red' },
  { value: '#0000ff', label: 'Blue' },
  { value: '#00ff00', label: 'Green' },
  { value: '#ffff00', label: 'Yellow' },
];

const toggleWireframe = () => {
  wireframeEnabled.value = !wireframeEnabled.value;
  applyWireframe();
};

const setWireframeColor = (color: string) => {
  wireframeColor.value = color;
  applyWireframe();
};

const applyWireframe = () => {
  const color = new THREE.Color(wireframeColor.value);

  const processMaterial = (mat: THREE.Material) => {
    // Skip if material doesn't exist
    if (!mat) return;

    // Check if material supports wireframe property
    // All mesh materials in Three.js support wireframe property
    const material = mat as any;

    // Check if material has wireframe property
    // All Three.js mesh materials have this property
    if (!('wireframe' in material)) {
      return; // Material doesn't support wireframe
    }

    // Apply wireframe
    material.wireframe = wireframeEnabled.value;

      if (wireframeEnabled.value) {
        // Store original material properties if not already stored
        if (!material.__originalProps) {
          material.__originalProps = {
            color: material.color ? material.color.clone() : new THREE.Color(0xffffff),
            transparent: material.transparent !== undefined ? material.transparent : false,
            opacity: material.opacity !== undefined ? material.opacity : 1,
            side: material.side !== undefined ? material.side : THREE.FrontSide,
            emissive: material.emissive ? material.emissive.clone() : new THREE.Color(0x000000),
            emissiveIntensity: material.emissiveIntensity !== undefined ? material.emissiveIntensity : 0,
          };
        }

        // Apply wireframe line properties
        if (typeof material.wireframeLinecap !== 'undefined') {
          material.wireframeLinecap = 'round';
        }
        if (typeof material.wireframeLinejoin !== 'undefined') {
          material.wireframeLinejoin = 'round';
        }
        if (typeof material.wireframeLinewidth !== 'undefined') {
          material.wireframeLinewidth = 1.5;
        }

        // Apply wireframe color
        if (material.color && material.color instanceof THREE.Color) {
          material.color.copy(color);
        }

        // Enhance visibility with emissive
        if (material.emissive && material.emissive instanceof THREE.Color) {
          material.emissive.copy(color);
          material.emissive.multiplyScalar(0.5);
        }
        if (typeof material.emissiveIntensity !== 'undefined') {
          material.emissiveIntensity = 0.4;
        }

        // Disable transparency for better wireframe visibility
        if (typeof material.transparent !== 'undefined') {
          material.transparent = false;
        }
        if (typeof material.opacity !== 'undefined') {
          material.opacity = 1;
        }
      } else {
        // Restore original material properties
        if (material.__originalProps) {
          const original = material.__originalProps;

          if (material.color && original.color && material.color instanceof THREE.Color) {
            material.color.copy(original.color);
          }

          if (typeof material.transparent !== 'undefined') {
            material.transparent = original.transparent;
          }
          if (typeof material.opacity !== 'undefined') {
            material.opacity = original.opacity;
          }
          if (typeof material.side !== 'undefined') {
            material.side = original.side;
          }

          // Restore emissive
          if (material.emissive && original.emissive && material.emissive instanceof THREE.Color) {
            material.emissive.copy(original.emissive);
          }
          if (typeof material.emissiveIntensity !== 'undefined') {
            material.emissiveIntensity = original.emissiveIntensity;
          }

          // Clean up stored properties
          delete material.__originalProps;
        }
      }

      // Force material update
      material.needsUpdate = true;
  };

  // Process all mesh types in the scene
  let meshCount = 0;
  let materialCount = 0;

  sceneManager.scene.traverse((object) => {
    // Check if object is a mesh (including all mesh types)
    const isMesh = object instanceof THREE.Mesh ||
                   object instanceof THREE.SkinnedMesh ||
                   object instanceof THREE.InstancedMesh ||
                   (object as any).isMesh === true;

    if (isMesh) {
      meshCount++;
      const mesh = object as THREE.Mesh | THREE.SkinnedMesh | THREE.InstancedMesh;

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => {
          materialCount++;
          processMaterial(mat);
        });
      } else if (mesh.material) {
        materialCount++;
        processMaterial(mesh.material);
      }
    }
  });

  // Log for debugging (can be removed later)
  if (wireframeEnabled.value) {
    console.log(`[Wireframe] Applied to ${meshCount} meshes, ${materialCount} materials`);
  }
};

const setViewportMode = (mode: '3d' | '3d-2d' | '2d') => {
  viewportMode.value = mode;
  if (mode === '2d') {
    // Top view
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
    camera.rotation.x = -Math.PI / 2;
  } else if (mode === '3d') {
    // Reset to default 3D view
    const target = sceneStore.camera.target;
    camera.position.set(
      sceneStore.camera.position.x,
      sceneStore.camera.position.y,
      sceneStore.camera.position.z
    );
    camera.lookAt(target.x, target.y, target.z);
  }
};

const setRenderMode = (mode: 'final' | 'no-post') => {
  renderMode.value = mode;
  if (renderer.renderer) {
    if (mode === 'no-post') {
      renderer.renderer.toneMapping = THREE.NoToneMapping;
      renderer.renderer.toneMappingExposure = 1.0;
    } else {
      renderer.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.renderer.toneMappingExposure = 1.0;
    }
  }
};

const setGeometryMode = (mode: 'normal' | 'matcap' | 'matcap-surface') => {
  geometryMode.value = mode;
  // TODO: Implement geometry visualization modes
};
</script>

<template>
  <aside
    :class="[
      'model-inspector',
      {
        'model-inspector--collapsed': isCollapsed,
        'model-inspector--fullscreen': isFullscreen,
      },
    ]"
  >
    <header class="model-inspector__header" @click="isCollapsed = !isCollapsed">
      <div class="model-inspector__header-content">
        <svg
          class="model-inspector__icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <h3>Model Inspector</h3>
      </div>
      <button
        class="model-inspector__collapse-btn"
        :aria-label="isCollapsed ? 'Expand' : 'Collapse'"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          :style="{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </header>

    <transition name="slide-down">
      <div v-if="!isCollapsed" class="model-inspector__content">
        <!-- WIREFRAME SECTION -->
        <section class="model-inspector__section">
          <h4 class="model-inspector__section-title">
            <span>WIREFRAME</span>
            <span class="model-inspector__section-badge">5</span>
          </h4>
          <div class="model-inspector__colors">
            <button
              v-for="color in wireframeColors"
              :key="color.value"
              class="model-inspector__color-swatch"
              :class="{ 'model-inspector__color-swatch--active': wireframeColor === color.value }"
              :style="{ backgroundColor: color.value }"
              :title="color.label"
              @click="setWireframeColor(color.value)"
            />
          </div>
          <label class="model-inspector__toggle-switch">
            <input type="checkbox" v-model="wireframeEnabled" @change="toggleWireframe" />
            <span class="model-inspector__toggle-slider"></span>
            <span class="model-inspector__toggle-label">Wireframe</span>
          </label>
        </section>

        <!-- VIEWPORT SECTION -->
        <section class="model-inspector__section">
          <h4 class="model-inspector__section-title">VIEWPORT</h4>
          <div class="model-inspector__button-group">
            <button
              :class="[
                'model-inspector__button',
                { 'model-inspector__button--active': viewportMode === '3d' },
              ]"
              @click="setViewportMode('3d')"
            >
              3D
            </button>
            <button
              :class="[
                'model-inspector__button',
                { 'model-inspector__button--active': viewportMode === '3d-2d' },
              ]"
              @click="setViewportMode('3d-2d')"
            >
              3D + 2D
            </button>
            <button
              :class="[
                'model-inspector__button',
                { 'model-inspector__button--active': viewportMode === '2d' },
              ]"
              @click="setViewportMode('2d')"
            >
              2D
            </button>
          </div>
        </section>

        <!-- RENDER SECTION -->
        <section class="model-inspector__section">
          <h4 class="model-inspector__section-title">
            <span>RENDER</span>
            <span class="model-inspector__section-badge">1</span>
          </h4>
          <div class="model-inspector__radio-group">
            <label
              :class="[
                'model-inspector__radio',
                { 'model-inspector__radio--active': renderMode === 'final' },
              ]"
            >
              <input
                type="radio"
                value="final"
                v-model="renderMode"
                @change="setRenderMode('final')"
              />
              <span class="model-inspector__radio-icon"></span>
              <span>Final Render</span>
            </label>
            <label
              :class="[
                'model-inspector__radio',
                { 'model-inspector__radio--active': renderMode === 'no-post' },
              ]"
            >
              <input
                type="radio"
                value="no-post"
                v-model="renderMode"
                @change="setRenderMode('no-post')"
              />
              <span class="model-inspector__radio-icon"></span>
              <span>No Post-Processing</span>
            </label>
          </div>
        </section>

        <!-- GEOMETRY SECTION -->
        <section class="model-inspector__section">
          <h4 class="model-inspector__section-title">
            <span>GEOMETRY</span>
            <span class="model-inspector__section-badge">2</span>
          </h4>
          <div class="model-inspector__radio-group">
            <label
              :class="[
                'model-inspector__radio',
                { 'model-inspector__radio--active': geometryMode === 'matcap' },
              ]"
            >
              <input
                type="radio"
                value="matcap"
                v-model="geometryMode"
                @change="setGeometryMode('matcap')"
              />
              <span class="model-inspector__radio-icon"></span>
              <span>Matcap</span>
            </label>
            <label
              :class="[
                'model-inspector__radio',
                { 'model-inspector__radio--active': geometryMode === 'matcap-surface' },
              ]"
            >
              <input
                type="radio"
                value="matcap-surface"
                v-model="geometryMode"
                @change="setGeometryMode('matcap-surface')"
              />
              <span class="model-inspector__radio-icon"></span>
              <span>Matcap+Surface</span>
            </label>
          </div>
        </section>
      </div>
    </transition>
  </aside>
</template>

<style scoped>
.model-inspector {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 300px;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: 16px;
  color: #e2e8f0;
  z-index: 1000;
  max-height: calc(100vh - 2rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.model-inspector--fullscreen {
  top: 1rem;
  left: 1rem;
}

.model-inspector--collapsed {
  width: auto;
  min-width: 200px;
}

.model-inspector__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  cursor: pointer;
  user-select: none;
  background: rgba(30, 41, 59, 0.5);
  transition: background 0.2s ease;
}

.model-inspector__header:hover {
  background: rgba(30, 41, 59, 0.7);
}

.model-inspector__header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.model-inspector__icon {
  width: 16px;
  height: 16px;
  color: #818cf8;
  flex-shrink: 0;
}

.model-inspector__header h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #f1f5f9;
}

.model-inspector__collapse-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.model-inspector__collapse-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #c7d2fe;
}

.model-inspector__collapse-btn svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.model-inspector__content {
  padding: 1.25rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.model-inspector__content::-webkit-scrollbar {
  width: 6px;
}

.model-inspector__content::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 3px;
}

.model-inspector__content::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.4);
  border-radius: 3px;
}

.model-inspector__content::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}

.model-inspector__section {
  margin-bottom: 1.75rem;
}

.model-inspector__section:last-child {
  margin-bottom: 0;
}

.model-inspector__section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 1rem 0;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
}

.model-inspector__section-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #c7d2fe;
}

.model-inspector__colors {
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.model-inspector__color-swatch {
  width: 36px;
  height: 36px;
  border: 2px solid rgba(148, 163, 184, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.model-inspector__color-swatch:hover {
  border-color: rgba(99, 102, 241, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 8px rgba(99, 102, 241, 0.4);
}

.model-inspector__color-swatch--active {
  border-color: #818cf8;
  border-width: 3px;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3), 0 4px 12px rgba(99, 102, 241, 0.5);
}

.model-inspector__color-swatch--active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.model-inspector__toggle-switch {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.model-inspector__toggle-label {
  font-size: 0.875rem;
  color: #cbd5e1;
  font-weight: 500;
}

.model-inspector__toggle-switch input[type='checkbox'] {
  display: none;
}

.model-inspector__toggle-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  transition: background 0.3s ease;
  flex-shrink: 0;
}

.model-inspector__toggle-switch input[type='checkbox']:checked + .model-inspector__toggle-slider {
  background: rgba(99, 102, 241, 0.9);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
}

.model-inspector__toggle-slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  top: 3px;
  left: 3px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.model-inspector__toggle-switch input[type='checkbox']:checked + .model-inspector__toggle-slider::before {
  transform: translateX(20px);
}

.model-inspector__button-group {
  display: flex;
  gap: 0.5rem;
}

.model-inspector__button {
  flex: 1;
  padding: 0.625rem 0.875rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  color: #cbd5e1;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.model-inspector__button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.model-inspector__button:hover::before {
  width: 200px;
  height: 200px;
}

.model-inspector__button:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(99, 102, 241, 0.5);
  color: #e0e7ff;
  transform: translateY(-1px);
}

.model-inspector__button--active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  border-color: rgba(99, 102, 241, 0.6);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.model-inspector__button--active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
}

.model-inspector__radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.model-inspector__radio {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  color: #cbd5e1;
  position: relative;
}

.model-inspector__radio:hover {
  background: rgba(30, 41, 59, 0.5);
}

.model-inspector__radio--active {
  background: rgba(99, 102, 241, 0.15);
  color: #e0e7ff;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.model-inspector__radio input[type='radio'] {
  display: none;
}

.model-inspector__radio-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.3);
  border: 2px solid rgba(148, 163, 184, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
}

.model-inspector__radio-icon::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.model-inspector__radio--active .model-inspector__radio-icon {
  background: rgba(99, 102, 241, 0.9);
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.model-inspector__radio--active .model-inspector__radio-icon::after {
  background: #ffffff;
  transform: scale(1);
}

.model-inspector__radio input[type='radio']:checked + .model-inspector__radio-icon {
  background: rgba(99, 102, 241, 0.9);
  border-color: #818cf8;
}

.model-inspector__radio input[type='radio']:checked + .model-inspector__radio-icon::after {
  background: #ffffff;
  transform: scale(1);
}

/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
  opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .model-inspector {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .model-inspector {
    width: calc(100vw - 2rem);
    max-width: 280px;
    top: 0.5rem;
    left: 0.5rem;
  }

  .model-inspector__header {
    padding: 0.875rem 1rem;
  }

  .model-inspector__content {
    padding: 1rem;
  }

  .model-inspector__section {
    margin-bottom: 1.25rem;
  }

  .model-inspector__button-group {
    flex-direction: column;
  }

  .model-inspector__button {
    width: 100%;
  }

  .model-inspector__colors {
    gap: 0.5rem;
  }

  .model-inspector__color-swatch {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .model-inspector {
    width: calc(100vw - 1rem);
    max-width: none;
  }

  .model-inspector__header h3 {
    font-size: 0.8125rem;
  }

  .model-inspector__section-title {
    font-size: 0.7rem;
  }
}
</style>
