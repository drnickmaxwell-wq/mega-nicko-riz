'use client'

import React, { useEffect, useState, useRef } from 'react'

interface ARViewerProps {
  modelPath: string
  fallbackImage?: string
  width?: number
  height?: number
  className?: string
  autoRotate?: boolean
  cameraControls?: boolean
}

export function ARViewer({
  modelPath,
  fallbackImage,
  width = 400,
  height = 400,
  className = '',
  autoRotate = true,
  cameraControls = true
}: ARViewerProps) {
  const [isARSupported, setIsARSupported] = useState(false)
  const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const modelViewerRef = useRef<any>(null)

  useEffect(() => {
    // Check for WebXR AR support
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          const isSupported = await (navigator as any).xr?.isSessionSupported?.('immersive-ar')
          setIsARSupported(isSupported || false)
        } catch (err) {
          console.warn('WebXR AR not supported:', err)
          setIsARSupported(false)
        }
      }
    }

    // Load model-viewer if not already loaded
    const loadModelViewer = () => {
      if (!customElements.get('model-viewer')) {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
        script.onload = () => setIsModelViewerLoaded(true)
        script.onerror = () => setError('Failed to load AR viewer')
        document.head.appendChild(script)
      } else {
        setIsModelViewerLoaded(true)
      }
    }

    checkARSupport()
    loadModelViewer()
  }, [])

  const handleModelError = () => {
    setError('Failed to load 3D model')
  }

  const handleModelLoad = () => {
    setError(null)
  }

  // Fallback component
  if (error || !isModelViewerLoaded) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-2">AR Viewer</h3>
          <p className="text-sm text-gray-500 mb-4">
            {error || 'Loading AR capabilities...'}
          </p>
          {fallbackImage && (
            <img 
              src={fallbackImage} 
              alt="Treatment preview" 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      
      {/* Model Viewer */}
      <model-viewer
        ref={modelViewerRef}
        src={modelPath}
        alt="3D dental model for AR viewing"
        ar={isARSupported}
        ar-modes="webxr scene-viewer quick-look"
        camera-controls={cameraControls}
        auto-rotate={autoRotate}
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '0.5rem'
        }}
        onLoad={handleModelLoad}
        onError={handleModelError}
      >
        
        {/* AR Button */}
        {isARSupported && (
          <button
            slot="ar-button"
            className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            View in AR
          </button>
        )}

        {/* Loading indicator */}
        <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading 3D model...</p>
          </div>
        </div>

        {/* Error message */}
        <div slot="error" className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600">⚠️</span>
            </div>
            <p className="text-red-600 font-medium">Failed to load 3D model</p>
            <p className="text-sm text-red-500 mt-1">Please check your connection and try again</p>
          </div>
        </div>
      </model-viewer>

      {/* Instructions Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600 max-w-xs">
        <div className="flex items-start gap-2">
          <span className="text-primary">💡</span>
          <div>
            <p className="font-medium mb-1">AR Instructions:</p>
            <ul className="text-xs space-y-1">
              <li>• Tap "View in AR" to start</li>
              <li>• Point camera at flat surface</li>
              <li>• Tap to place the model</li>
              <li>• Pinch to resize</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AR Support Badge */}
      <div className="absolute top-4 right-4">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isARSupported 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isARSupported ? '✓ AR Ready' : 'AR Not Available'}
        </div>
      </div>

      {/* Feature List */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>🔄 360° View</span>
          <span>📏 Scale</span>
          <span>📱 AR Mode</span>
        </div>
      </div>
    </div>
  )
}

// AR Capability Detection Hook
export function useARSupport() {
  const [isSupported, setIsSupported] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkSupport = async () => {
      try {
        if ('xr' in navigator) {
          const supported = await (navigator as any).xr?.isSessionSupported?.('immersive-ar')
          setIsSupported(supported || false)
        }
      } catch (error) {
        console.warn('AR support check failed:', error)
        setIsSupported(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkSupport()
  }, [])

  return { isSupported, isChecking }
}

