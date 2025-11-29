from __future__ import annotations

"""
Utility script to scaffold the Interior Designer 3D project structure and seed
placeholder assets/content.

Usage:
    python setup_structure.py

The script is idempotent: existing directories are left untouched and existing
files are not overwritten.
"""

import json
import struct
import zlib
from pathlib import Path
from typing import Mapping, Union

FileContent = Union[str, None]
Structure = Mapping[str, Union["Structure", FileContent]]


PROJECT_STRUCTURE: Structure = {
    "frontend": {
        "public": {
            "index.html": "",
            "favicon.ico": "",
            "assets": {
                "textures": {
                    "wood": {},
                    "marble": {},
                    "fabric": {},
                    "metal": {},
                },
                "models": {
                    "furniture": {
                        "chair.glb": "",
                        "table.glb": "",
                        "sofa.glb": "",
                        "bed.glb": "",
                    },
                    "room": {},
                },
                "images": {},
            },
        },
        "src": {
            "components": {
                "3DViewer": {
                    "Scene.vue": "",
                    "Camera.vue": "",
                    "Controls.vue": "",
                    "Lighting.vue": "",
                    "Grid.vue": "",
                    "index.ts": "",
                },
                "Toolbar": {
                    "ObjectSelector.vue": "",
                    "MaterialPicker.vue": "",
                    "ColorPicker.vue": "",
                    "Tools.vue": "",
                    "index.ts": "",
                },
                "Sidebar": {
                    "FurnitureLibrary.vue": "",
                    "RoomTemplates.vue": "",
                    "Properties.vue": "",
                    "Layers.vue": "",
                    "index.ts": "",
                },
                "Room": {
                    "Floor.vue": "",
                    "Walls.vue": "",
                    "Ceiling.vue": "",
                    "Door.vue": "",
                    "index.ts": "",
                },
                "Furniture": {
                    "FurnitureItem.vue": "",
                    "Chair.vue": "",
                    "Table.vue": "",
                    "Sofa.vue": "",
                    "Bed.vue": "",
                    "index.ts": "",
                },
                "UI": {
                    "BaseButton.vue": "",
                    "BaseInput.vue": "",
                    "BaseModal.vue": "",
                    "BaseCard.vue": "",
                    "BaseLoader.vue": "",
                    "BaseDropdown.vue": "",
                    "Header.vue": "",
                    "Menu.vue": "",
                    "index.ts": "",
                },
                "Auth": {
                    "LoginForm.vue": "",
                    "RegisterForm.vue": "",
                    "ForgotPassword.vue": "",
                    "index.ts": "",
                },
                "Export": {
                    "ScreenshotDialog.vue": "",
                    "Export3DDialog.vue": "",
                    "ShareDialog.vue": "",
                    "index.ts": "",
                },
                "Layout": {
                    "MainLayout.vue": "",
                    "AuthLayout.vue": "",
                    "EditorLayout.vue": "",
                    "index.ts": "",
                },
            },
            "views": {
                "Home.vue": "",
                "Editor.vue": "",
                "MyDesigns.vue": "",
                "Gallery.vue": "",
                "Profile.vue": "",
                "Login.vue": "",
                "Register.vue": "",
                "NotFound.vue": "",
            },
            "composables": {
                "useScene.ts": "",
                "useThree.ts": "",
                "useObjects.ts": "",
                "useDragDrop.ts": "",
                "useKeyboard.ts": "",
                "useAuth.ts": "",
                "useAPI.ts": "",
                "useCamera.ts": "",
                "useRaycaster.ts": "",
                "index.ts": "",
            },
            "services": {
                "api": {
                    "config.ts": "",
                    "auth.service.ts": "",
                    "design.service.ts": "",
                    "furniture.service.ts": "",
                    "material.service.ts": "",
                    "index.ts": "",
                },
                "three": {
                    "SceneManager.ts": "",
                    "ModelLoader.ts": "",
                    "TextureLoader.ts": "",
                    "Raycaster.ts": "",
                    "Renderer.ts": "",
                    "LightManager.ts": "",
                    "index.ts": "",
                },
            },
            "stores": {
                "auth.store.ts": "",
                "scene.store.ts": "",
                "ui.store.ts": "",
                "design.store.ts": "",
                "furniture.store.ts": "",
                "index.ts": "",
            },
            "types": {
                "models": {
                    "design.types.ts": "",
                    "furniture.types.ts": "",
                    "material.types.ts": "",
                    "user.types.ts": "",
                    "scene.types.ts": "",
                },
                "api": {
                    "request.types.ts": "",
                    "response.types.ts": "",
                },
                "three.types.ts": "",
                "index.ts": "",
            },
            "utils": {
                "helpers": {
                    "formatters.ts": "",
                    "validators.ts": "",
                    "converters.ts": "",
                },
                "three": {
                    "sceneSetup.ts": "",
                    "geometryHelpers.ts": "",
                    "materialHelpers.ts": "",
                    "exporters.ts": "",
                    "transformHelpers.ts": "",
                },
                "constants.ts": "",
                "index.ts": "",
            },
            "data": {
                "furniture": {
                    "chairs.ts": "",
                    "tables.ts": "",
                    "sofas.ts": "",
                    "index.ts": "",
                },
                "materials": {
                    "wood.ts": "",
                    "marble.ts": "",
                    "fabric.ts": "",
                    "index.ts": "",
                },
                "roomTemplates": {
                    "bedroom.ts": "",
                    "livingroom.ts": "",
                    "kitchen.ts": "",
                    "index.ts": "",
                },
            },
            "router": {
                "index.ts": "",
                "routes.ts": "",
                "guards.ts": "",
            },
            "styles": {
                "base": {
                    "reset.css": "",
                    "variables.css": "",
                    "typography.css": "",
                    "animations.css": "",
                },
                "components": {
                    "_3d-viewer.css": "",
                    "toolbar.css": "",
                    "sidebar.css": "",
                    "furniture.css": "",
                    "buttons.css": "",
                    "modals.css": "",
                    "forms.css": "",
                    "cards.css": "",
                    "loaders.css": "",
                },
                "layouts": {
                    "main-layout.css": "",
                    "editor-layout.css": "",
                    "auth-layout.css": "",
                },
                "pages": {
                    "home.css": "",
                    "editor.css": "",
                    "my-designs.css": "",
                    "gallery.css": "",
                    "profile.css": "",
                },
                "themes": {
                    "light.css": "",
                    "dark.css": "",
                },
                "utilities": {
                    "spacing.css": "",
                    "display.css": "",
                    "flex.css": "",
                    "grid.css": "",
                    "colors.css": "",
                },
                "responsive": {
                    "mobile.css": "",
                    "tablet.css": "",
                    "desktop.css": "",
                },
                "main.css": "",
            },
            "plugins": {
                "pinia.ts": "",
                "axios.ts": "",
            },
            "App.vue": "",
            "main.ts": "",
            "vite-env.d.ts": "",
        },
        ".env": "",
        ".env.example": "",
        ".gitignore": "",
        "package.json": "",
        "tsconfig.json": "",
        "tsconfig.node.json": "",
        "vite.config.ts": "",
        "eslint.config.js": "",
        "README.md": "",
    },
    "docs": {
        "API.md": "",
        "SETUP.md": "",
        "FEATURES.md": "",
    },
    "README.md": "",
}


def create_structure(base_path: Path, structure: Structure) -> None:
    for name, content in structure.items():
        path = base_path / name

        if isinstance(content, Mapping):
            path.mkdir(parents=True, exist_ok=True)
            create_structure(path, content)  # type: ignore[arg-type]
        else:
            if not path.parent.exists():
                path.parent.mkdir(parents=True, exist_ok=True)
            if path.exists():
                continue
            path.touch()
            if content:
                path.write_text(content, encoding="utf-8")


def ensure_text_file(path: Path, content: str) -> None:
    if path.exists() and path.read_text(encoding="utf-8").strip():
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def ensure_binary_file(path: Path, data: bytes) -> None:
    if path.exists() and path.stat().st_size > 0:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def solid_color_png(color: tuple[int, int, int]) -> bytes:
    width = height = 1
    bit_depth = 8
    color_type = 2  # Truecolor

    raw = bytes([0, *color])
    compressed = zlib.compress(raw)

    def chunk(name: bytes, payload: bytes) -> bytes:
        return (
            struct.pack(">I", len(payload))
            + name
            + payload
            + struct.pack(">I", zlib.crc32(name + payload) & 0xFFFFFFFF)
        )

    ihdr = struct.pack(">IIBBBBB", width, height, bit_depth, color_type, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")
    return png


def simple_triangle_glb() -> bytes:
    positions = (
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
    )
    indices = (0, 1, 2)

    position_bytes = b"".join(struct.pack("<f", value) for value in positions)
    index_bytes = b"".join(struct.pack("<H", value) for value in indices)
    while len(index_bytes) % 4:
        index_bytes += b"\x00"

    buffer_bytes = position_bytes + index_bytes

    json_dict = {
        "asset": {"version": "2.0", "generator": "setup_structure.py"},
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [{"primitives": [{"attributes": {"POSITION": 0}, "indices": 1}]}],
        "buffers": [{"byteLength": len(buffer_bytes)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": len(position_bytes)},
            {"buffer": 0, "byteOffset": len(position_bytes), "byteLength": len(index_bytes)},
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,
                "count": 3,
                "type": "VEC3",
                "min": [0, 0, 0],
                "max": [1, 1, 0],
            },
            {
                "bufferView": 1,
                "componentType": 5123,
                "count": 3,
                "type": "SCALAR",
                "min": [0],
                "max": [2],
            },
        ],
    }

    json_bytes = json.dumps(json_dict, separators=(",", ":")).encode("utf-8")
    while len(json_bytes) % 4:
        json_bytes += b" "

    json_chunk = struct.pack("<I", len(json_bytes)) + b"JSON" + json_bytes
    bin_chunk = struct.pack("<I", len(buffer_bytes)) + b"BIN\x00" + buffer_bytes

    total_length = 12 + len(json_chunk) + len(bin_chunk)
    header = struct.pack("<4sII", b"glTF", 2, total_length)

    return header + json_chunk + bin_chunk


def seed_placeholders(base_path: Path) -> None:
    text_files: dict[str, str] = {
        "frontend/public/index.html": """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interior Designer 3D</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
""",
        "frontend/index.html": """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interior Designer 3D</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
""",
        "frontend/src/data/furniture/chairs.ts": """export const chairs = [
  {
    id: 'chair-001',
    name: 'Modern Lounge Chair',
    modelPath: '/assets/models/furniture/chair.glb',
    thumbnail: '/assets/images/chair.png',
    category: 'chair',
    materials: ['fabric-soft-blue', 'metal-brushed'],
    tags: ['modern', 'living-room'],
  },
];
""",
        "frontend/src/data/furniture/tables.ts": """export const tables = [
  {
    id: 'table-001',
    name: 'Oak Dining Table',
    modelPath: '/assets/models/furniture/table.glb',
    thumbnail: '/assets/images/table.png',
    category: 'table',
    materials: ['wood-oak', 'metal-brushed'],
    tags: ['dining-room'],
  },
];
""",
        "frontend/src/data/furniture/sofas.ts": """export const sofas = [
  {
    id: 'sofa-001',
    name: 'L-Shape Sofa',
    modelPath: '/assets/models/furniture/sofa.glb',
    thumbnail: '/assets/images/sofa.png',
    category: 'sofa',
    materials: ['fabric-soft-blue'],
    tags: ['living-room', 'family'],
  },
];
""",
        "frontend/src/data/furniture/index.ts": """export * from './chairs';
export * from './tables';
export * from './sofas';
""",
        "frontend/src/data/materials/wood.ts": """export const woodMaterials = [
  {
    id: 'wood-oak',
    name: 'Oak Wood',
    texture: '/assets/textures/wood/wood-oak.png',
    roughness: 0.6,
    metalness: 0.15,
  },
];
""",
        "frontend/src/data/materials/marble.ts": """export const marbleMaterials = [
  {
    id: 'marble-carrara',
    name: 'Carrara Marble',
    texture: '/assets/textures/marble/carrara.png',
    roughness: 0.2,
    metalness: 0.05,
  },
];
""",
        "frontend/src/data/materials/fabric.ts": """export const fabricMaterials = [
  {
    id: 'fabric-soft-blue',
    name: 'Soft Blue Fabric',
    texture: '/assets/textures/fabric/linen-blue.png',
    roughness: 0.8,
    metalness: 0.0,
  },
];
""",
        "frontend/src/data/materials/metal.ts": """export const metalMaterials = [
  {
    id: 'metal-brushed',
    name: 'Brushed Steel',
    texture: '/assets/textures/metal/brushed-steel.png',
    roughness: 0.35,
    metalness: 0.9,
  },
];
""",
        "frontend/src/data/materials/index.ts": """export * from './wood';
export * from './marble';
export * from './fabric';
export * from './metal';
""",
        "frontend/src/data/roomTemplates/bedroom.ts": """export const bedroomTemplate = {
  id: 'room-bedroom-01',
  name: 'Cozy Bedroom',
  description: 'Warm palette bedroom with soft lighting and minimal furniture.',
  furniture: ['bed-001', 'sofa-001'],
  floorMaterial: 'wood-oak',
  wallMaterial: 'fabric-soft-blue',
};
""",
        "frontend/src/data/roomTemplates/livingroom.ts": """export const livingRoomTemplate = {
  id: 'room-living-01',
  name: 'Minimalist Living Room',
  description: 'Open plan living area with neutral colors and modern furniture.',
  furniture: ['sofa-001', 'table-001', 'chair-001'],
  floorMaterial: 'wood-oak',
  wallMaterial: 'marble-carrara',
};
""",
        "frontend/src/data/roomTemplates/kitchen.ts": """export const kitchenTemplate = {
  id: 'room-kitchen-01',
  name: 'Modern Kitchen',
  description: 'Bright kitchen space with marble countertops and oak cabinets.',
  furniture: ['table-001'],
  floorMaterial: 'marble-carrara',
  wallMaterial: 'metal-brushed',
};
""",
        "frontend/src/data/roomTemplates/index.ts": """export * from './bedroom';
export * from './livingroom';
export * from './kitchen';
""",
        "frontend/src/data/index.ts": """export * from './furniture';
export * from './materials';
export * from './roomTemplates';
""",
    }

    colors: dict[str, tuple[int, int, int]] = {
        "frontend/public/assets/textures/wood/wood-oak.png": (150, 111, 51),
        "frontend/public/assets/textures/marble/carrara.png": (220, 220, 220),
        "frontend/public/assets/textures/fabric/linen-blue.png": (130, 158, 189),
        "frontend/public/assets/textures/metal/brushed-steel.png": (180, 185, 190),
        "frontend/public/assets/images/chair.png": (200, 180, 120),
        "frontend/public/assets/images/table.png": (175, 140, 90),
        "frontend/public/assets/images/sofa.png": (160, 170, 195),
        "frontend/public/assets/images/bed.png": (210, 210, 230),
    }

    models = {
        "frontend/public/assets/models/furniture/chair.glb",
        "frontend/public/assets/models/furniture/table.glb",
        "frontend/public/assets/models/furniture/sofa.glb",
        "frontend/public/assets/models/furniture/bed.glb",
    }

    for relative_path, content in text_files.items():
        ensure_text_file(base_path / relative_path, content)

    for relative_path, rgb in colors.items():
        ensure_binary_file(base_path / relative_path, solid_color_png(rgb))

    glb_bytes = simple_triangle_glb()
    for relative_path in models:
        ensure_binary_file(base_path / relative_path, glb_bytes)


def main() -> None:
    project_root = Path(__file__).resolve().parent
    create_structure(project_root, PROJECT_STRUCTURE)
    seed_placeholders(project_root)
    print("Project structure created successfully.")


if __name__ == "__main__":
    main()
