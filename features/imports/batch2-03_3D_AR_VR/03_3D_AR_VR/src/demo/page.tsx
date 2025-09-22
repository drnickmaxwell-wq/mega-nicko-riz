'use client'

import React, { useState } from 'react'
import { ToothViewer } from '@/components/3d/ToothViewer'
import { ARViewer, useARSupport } from '@/components/3d/ARViewer'

export default function ThreeDARVRDemo() {
  const [selectedModel, setSelectedModel] = useState('/models/tooth-sample.glb')
  const [viewerSettings, setViewerSettings] = useState({
    autoRotate: false,
    showControls: true,
    enableZoom: true
  })
  
  const { isSupported: isARSupported, isChecking } = useARSupport()

  const models = [
    { name: 'Sample Tooth', path: '/models/tooth-sample.glb', description: 'Basic tooth model for demonstration' },
    { name: 'Molar', path: '/models/molar.glb', description: 'Detailed molar with realistic textures' },
    { name: 'Veneer', path: '/models/veneer.glb', description: 'Porcelain veneer visualization' },
    { name: 'Implant', path: '/models/implant.glb', description: 'Dental implant with crown' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">3D/AR/VR Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Interactive 3D dental models with augmented reality capabilities for 
            St Mary's House Dental Care treatment visualization.
          </p>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Demo Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3D Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {models.map((model) => (
                  <option key={model.path} value={model.path}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto Rotate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Rotate
              </label>
              <button
                onClick={() => setViewerSettings(prev => ({ ...prev, autoRotate: !prev.autoRotate }))}
                className={`w-full p-2 rounded-lg transition-colors ${
                  viewerSettings.autoRotate 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {viewerSettings.autoRotate ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Controls
              </label>
              <button
                onClick={() => setViewerSettings(prev => ({ ...prev, showControls: !prev.showControls }))}
                className={`w-full p-2 rounded-lg transition-colors ${
                  viewerSettings.showControls 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {viewerSettings.showControls ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Zoom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom
              </label>
              <button
                onClick={() => setViewerSettings(prev => ({ ...prev, enableZoom: !prev.enableZoom }))}
                className={`w-full p-2 rounded-lg transition-colors ${
                  viewerSettings.enableZoom 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {viewerSettings.enableZoom ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* 3D Viewers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Standard 3D Viewer */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">3D Model Viewer</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                WebGL Ready
              </div>
            </div>
            
            <div className="mb-4">
              <ToothViewer
                modelPath={selectedModel}
                width={500}
                height={400}
                autoRotate={viewerSettings.autoRotate}
                showControls={viewerSettings.showControls}
                enableZoom={viewerSettings.enableZoom}
                className="mx-auto"
                onModelLoad={() => console.log('3D model loaded')}
                onError={(error) => console.error('3D model error:', error)}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>Current Model:</strong> {models.find(m => m.path === selectedModel)?.name}
              </p>
              <p>
                {models.find(m => m.path === selectedModel)?.description}
              </p>
            </div>
          </div>

          {/* AR Viewer */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">AR Viewer</h3>
              <div className="flex items-center gap-2 text-sm">
                {isChecking ? (
                  <span className="text-gray-600">Checking AR...</span>
                ) : (
                  <>
                    <span className={`w-2 h-2 rounded-full ${
                      isARSupported ? 'bg-green-400' : 'bg-red-400'
                    }`}></span>
                    <span className={isARSupported ? 'text-green-600' : 'text-red-600'}>
                      {isARSupported ? 'AR Supported' : 'AR Not Available'}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <ARViewer
                modelPath={selectedModel}
                fallbackImage="/images/tooth-fallback.jpg"
                width={500}
                height={400}
                autoRotate={viewerSettings.autoRotate}
                cameraControls={viewerSettings.showControls}
                className="mx-auto"
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>AR Status:</strong> {isARSupported ? 'Ready for AR viewing' : 'AR not supported on this device'}
              </p>
              <p>
                {isARSupported 
                  ? 'Tap "View in AR" to place the model in your real environment.'
                  : 'AR requires a compatible mobile device with ARCore (Android) or ARKit (iOS).'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🦷</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Interactive 3D Models</h3>
            <p className="text-gray-600 text-sm">
              Rotate, zoom, and explore detailed dental models with realistic materials and lighting.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Augmented Reality</h3>
            <p className="text-gray-600 text-sm">
              View dental models in your real environment using your device's camera and AR capabilities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">High Performance</h3>
            <p className="text-gray-600 text-sm">
              Optimized for web with lazy loading, fallbacks, and progressive enhancement.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">3D Viewer Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Three.js with React Three Fiber
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  GLTF/GLB model support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  PBR materials and realistic lighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Orbit controls and camera management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Shadow mapping and environment lighting
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">AR Capabilities</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  WebXR Device API support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Model-viewer for cross-platform AR
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  ARCore (Android) and ARKit (iOS) support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Plane detection and model placement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Scale and rotation controls
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

