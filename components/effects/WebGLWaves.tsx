'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'

// Wave shader material
const waveVertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vUv = uv;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Create multiple wave layers
    float wave1 = sin(modelPosition.x * uFrequency + uTime) * uAmplitude;
    float wave2 = sin(modelPosition.x * uFrequency * 2.0 + uTime * 1.5) * uAmplitude * 0.5;
    float wave3 = sin(modelPosition.y * uFrequency * 0.5 + uTime * 0.8) * uAmplitude * 0.3;
    
    // Mouse interaction
    float mouseDistance = distance(modelPosition.xy, uMouse);
    float mouseEffect = smoothstep(1.0, 0.0, mouseDistance) * 0.2;
    
    float elevation = wave1 + wave2 + wave3 + mouseEffect;
    modelPosition.z += elevation;
    
    vElevation = elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  }
`

const waveFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorMiddle;
  uniform vec3 uColorEnd;
  uniform float uOpacity;
  
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    // Create gradient based on UV and elevation
    float mixStrength = (vElevation + 0.2) * 2.5;
    mixStrength = clamp(mixStrength, 0.0, 1.0);
    
    vec3 color;
    if (mixStrength < 0.5) {
      color = mix(uColorStart, uColorMiddle, mixStrength * 2.0);
    } else {
      color = mix(uColorMiddle, uColorEnd, (mixStrength - 0.5) * 2.0);
    }
    
    // Add some shimmer effect
    float shimmer = sin(vUv.x * 10.0 + uTime * 2.0) * 0.1 + 0.9;
    color *= shimmer;
    
    // Fade edges
    float alpha = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    alpha *= smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    
    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`

interface WaveMeshProps {
  mousePosition: THREE.Vector2
}

function WaveMesh({ mousePosition }: WaveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  // St Mary's brand colors in RGB
  const brandColors = {
    magenta: new THREE.Color('#C2185B'),
    turquoise: new THREE.Color('#40C4B4'),
    gold: new THREE.Color('#D4AF37')
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value = mousePosition
    }
  })

  return (
    <Plane
      ref={meshRef}
      args={[viewport.width * 2, viewport.height * 2, 128, 128]}
      position={[0, 0, -1]}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uAmplitude: { value: 0.15 },
          uFrequency: { value: 2.0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColorStart: { value: brandColors.magenta },
          uColorMiddle: { value: brandColors.turquoise },
          uColorEnd: { value: brandColors.gold },
          uOpacity: { value: 0.6 }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </Plane>
  )
}

interface WebGLWavesProps {
  className?: string
  intensity?: number
  speed?: number
  opacity?: number
  interactive?: boolean
}

export function WebGLWaves({
  className = '',
  intensity = 1,
  speed = 1,
  opacity = 0.6,
  interactive = true
}: WebGLWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0))
  const [isVisible, setIsVisible] = useState(false)

  // Mouse interaction
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        setMousePosition(new THREE.Vector2(x, y))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <WaveMesh mousePosition={mousePosition} />
        </Canvas>
      )}
    </div>
  )
}

// Specialized wave variants
export function SubtleWaves(props: Omit<WebGLWavesProps, 'intensity' | 'opacity'>) {
  return (
    <WebGLWaves
      {...props}
      intensity={0.5}
      opacity={0.3}
    />
  )
}

export function IntenseWaves(props: Omit<WebGLWavesProps, 'intensity' | 'opacity'>) {
  return (
    <WebGLWaves
      {...props}
      intensity={1.5}
      opacity={0.8}
    />
  )
}

export function StaticWaves(props: Omit<WebGLWavesProps, 'interactive' | 'speed'>) {
  return (
    <WebGLWaves
      {...props}
      interactive={false}
      speed={0.3}
    />
  )
}

