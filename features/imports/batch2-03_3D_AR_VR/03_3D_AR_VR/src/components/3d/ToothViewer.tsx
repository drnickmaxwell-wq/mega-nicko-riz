'use client'

import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

interface ToothViewerProps {
  modelPath: string
  width?: number
  height?: number
  showControls?: boolean
  autoRotate?: boolean
  enableZoom?: boolean
  className?: string
  onModelLoad?: () => void
  onError?: (error: Error) => void
}

// 3D Model Component
function ToothModel({ 
  modelPath, 
  autoRotate = false,
  onLoad,
  onError 
}: {
  modelPath: string
  autoRotate?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
}) {
  const meshRef = useRef<THREE.Group>(null)
  
  // Load the 3D model
  const { scene } = useGLTF(modelPath, true, true, (loader) => {
    loader.manager.onLoad = () => onLoad?.()
    loader.manager.onError = (error) => onError?.(new Error(`Failed to load model: ${error}`))
  })

  // Auto rotation animation
  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  // Clone scene to avoid conflicts
  const clonedScene = scene.clone()

  // Apply professional dental materials
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Apply tooth-like material properties
      if (child.material) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xffffff),
          roughness: 0.1,
          metalness: 0.0,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          transmission: 0.1,
          thickness: 0.5,
          ior: 1.4,
        })
      }
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <group ref={meshRef} dispose={null}>
      <primitive object={clonedScene} scale={[2, 2, 2]} />
    </group>
  )
}

// Fallback component for loading errors
function ToothFallback({ error }: { error?: string }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🦷</span>
        </div>
        <h3 className="font-semibold text-gray-700 mb-2">3D Model Unavailable</h3>
        <p className="text-sm text-gray-500">
          {error || 'Loading 3D visualization...'}
        </p>
      </div>
    </div>
  )
}

// Loading component
function LoadingSpinner3D() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-600">Loading 3D model...</p>
      </div>
    </div>
  )
}

// Main ToothViewer component
export function ToothViewer({
  modelPath,
  width = 600,
  height = 400,
  showControls = true,
  autoRotate = false,
  enableZoom = true,
  className = '',
  onModelLoad,
  onError
}: ToothViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleModelLoad = () => {
    setIsLoading(false)
    onModelLoad?.()
  }

  const handleError = (err: Error) => {
    setIsLoading(false)
    setError(err.message)
    onError?.(err)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (error) {
    return (
      <div className={`${className}`} style={{ width, height }}>
        <ToothFallback error={error} />
      </div>
    )
  }

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white' 
    : `relative ${className}`
  
  const canvasStyle = isFullscreen 
    ? { width: '100vw', height: '100vh' }
    : { width, height }

  return (
    <div className={containerClass} style={!isFullscreen ? { width, height } : undefined}>
      
      {/* 3D Canvas */}
      <Canvas
        style={canvasStyle}
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Environment */}
        <Environment preset="studio" />
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <ToothModel 
            modelPath={modelPath}
            autoRotate={autoRotate}
            onLoad={handleModelLoad}
            onError={handleError}
          />
        </Suspense>

        {/* Ground Shadow */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />

        {/* Camera Controls */}
        <OrbitControls
          enabled={showControls}
          enableZoom={enableZoom}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm">
          <LoadingSpinner3D />
        </div>
      )}

      {/* Controls Overlay */}
      {showControls && !isLoading && !error && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Instructions */}
      {showControls && !isLoading && !error && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600">
          <p>🖱️ Drag to rotate • 🔍 Scroll to zoom</p>
        </div>
      )}

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Preload models for better performance
useGLTF.preload('/models/tooth-sample.glb')

