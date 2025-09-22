# 3D/AR/VR Module

Complete 3D visualization system with tooth model viewer, AR capabilities, and VR tour template for St Mary's House Dental Care.

## Features Included

- **Tooth Model Viewer**: Interactive GLTF/GLB 3D tooth models with OrbitControls
- **STL to GLB Conversion**: Guidance and tools for converting dental STL files
- **AR Viewer**: WebXR and Model-Viewer based AR tooth visualization
- **Treatment 3D Widget**: Interactive treatment visualization components
- **VR Tour Template**: Virtual reality office tour framework
- **Performance Optimization**: Lazy loading and fallback systems

## Brand Integration

- Consistent with St Mary's brand colors and styling
- Luxury UI overlays and controls
- Professional dental presentation

## Installation

1. Extract zip to your project root
2. Copy `src/` contents to your project
3. Add 3D model files to `public/models/`
4. Install required dependencies from `deps.txt`
5. Configure environment variables

## File Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── ToothViewer.tsx       # Main 3D tooth viewer
│   │   ├── ARViewer.tsx          # AR visualization
│   │   ├── VRTour.tsx           # VR tour component
│   │   └── TreatmentWidget.tsx   # Treatment visualization
│   ├── ui/
│   │   ├── ModelControls.tsx     # 3D model controls
│   │   └── LoadingSpinner3D.tsx  # 3D loading states
│   └── utils/
│       ├── ModelLoader.tsx       # 3D model loading utilities
│       └── WebXRSupport.tsx      # WebXR detection
├── lib/
│   ├── 3d/
│   │   ├── scene-setup.ts        # Three.js scene configuration
│   │   ├── lighting.ts           # Professional dental lighting
│   │   └── materials.ts          # Dental material presets
│   └── ar/
│       ├── webxr-utils.ts        # WebXR utilities
│       └── model-viewer-config.ts # Model-viewer setup
├── assets/
│   └── models/                   # Sample 3D models
└── demo/
    └── page.tsx                  # Complete demo showcase
```

## Usage Examples

```tsx
import { ToothViewer } from '@/components/3d/ToothViewer'
import { ARViewer } from '@/components/3d/ARViewer'

export default function TreatmentPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ToothViewer 
        modelPath="/models/molar.glb"
        showControls={true}
        autoRotate={false}
      />
      <ARViewer 
        modelPath="/models/veneer-preview.glb"
        fallbackImage="/images/veneer-fallback.jpg"
      />
    </div>
  )
}
```

## 3D Model Requirements

- **Format**: GLTF (.gltf) or GLB (.glb) preferred
- **Size**: Optimized for web (< 5MB recommended)
- **Textures**: PBR materials for realistic rendering
- **Geometry**: Clean topology, appropriate LOD

## STL Conversion Guide

Included tools and guidance for converting dental STL files to web-optimized GLB format using Blender automation scripts.

## Environment Variables

See `env.example` for WebXR settings, model paths, and performance configurations.

