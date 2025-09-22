'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WebGLLuxuryEffectsProps {
  intensity?: number;
  colorScheme?: 'coastal' | 'gold' | 'pearl';
  effectType?: 'shimmer' | 'waves' | 'particles' | 'aurora';
  className?: string;
}

export default function WebGLLuxuryEffects({
  intensity = 0.5,
  colorScheme = 'coastal', // Reserved for future color scheme variations
  effectType = 'shimmer',
  className = ''
}: WebGLLuxuryEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    
    uniform mat4 u_matrix;
    uniform float u_time;
    uniform float u_intensity;
    
    varying vec2 v_texCoord;
    varying float v_time;
    varying float v_intensity;
    
    void main() {
      gl_Position = u_matrix * a_position;
      v_texCoord = a_texCoord;
      v_time = u_time;
      v_intensity = u_intensity;
    }
  `;

  // Fragment shader for shimmer effect
  const shimmerFragmentShader = `
    precision mediump float;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    
    varying vec2 v_texCoord;
    
    vec3 getCoastalColors(float t) {
      vec3 teal = vec3(0.25, 0.77, 0.71);
      vec3 pink = vec3(0.76, 0.09, 0.36);
      vec3 gold = vec3(0.83, 0.69, 0.22);
      
      float phase1 = sin(t * 2.0) * 0.5 + 0.5;
      float phase2 = sin(t * 3.0 + 1.57) * 0.5 + 0.5;
      
      vec3 color1 = mix(teal, pink, phase1);
      return mix(color1, gold, phase2 * 0.3);
    }
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Create flowing shimmer effect
      float time = u_time * 0.5;
      vec2 pos = st * 3.0;
      
      float shimmer = 0.0;
      shimmer += smoothNoise(pos + vec2(time * 0.5, time * 0.3)) * 0.5;
      shimmer += smoothNoise(pos * 2.0 + vec2(time * 0.7, time * 0.5)) * 0.25;
      shimmer += smoothNoise(pos * 4.0 + vec2(time * 1.1, time * 0.8)) * 0.125;
      
      // Add wave-like movement
      float wave = sin(st.x * 10.0 + time * 2.0) * sin(st.y * 8.0 + time * 1.5) * 0.1;
      shimmer += wave;
      
      // Create gradient overlay
      float gradient = 1.0 - distance(st, vec2(0.5)) * 1.4;
      gradient = smoothstep(0.0, 1.0, gradient);
      
      vec3 color = getCoastalColors(time + shimmer);
      
      // Apply shimmer intensity
      float alpha = (shimmer + 0.5) * gradient * u_intensity * 0.3;
      alpha = clamp(alpha, 0.0, 0.8);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Fragment shader for wave effect
  const waveFragmentShader = `
    precision mediump float;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    
    vec3 getCoastalColors(float t) {
      vec3 teal = vec3(0.25, 0.77, 0.71);
      vec3 blue = vec3(0.2, 0.4, 0.8);
      vec3 white = vec3(0.9, 0.95, 1.0);
      
      float phase = sin(t) * 0.5 + 0.5;
      return mix(mix(blue, teal, phase), white, phase * 0.3);
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      float time = u_time * 0.3;
      
      // Create multiple wave layers
      float wave1 = sin(st.x * 8.0 + time * 2.0) * 0.1;
      float wave2 = sin(st.x * 12.0 - time * 1.5) * 0.05;
      float wave3 = sin(st.x * 16.0 + time * 3.0) * 0.03;
      
      float totalWave = wave1 + wave2 + wave3;
      
      // Create flowing effect
      float flow = smoothstep(0.3, 0.7, st.y + totalWave);
      
      vec3 color = getCoastalColors(time + st.x);
      float alpha = flow * u_intensity * 0.4;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Fragment shader for particle effect
  const particleFragmentShader = `
    precision mediump float;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      float time = u_time * 0.2;
      
      vec3 color = vec3(0.0);
      float alpha = 0.0;
      
      // Create floating particles
      for(int i = 0; i < 20; i++) {
        float fi = float(i);
        vec2 particlePos = vec2(
          mod(fi * 0.1 + time * 0.3, 1.0),
          mod(fi * 0.13 + time * 0.2, 1.0)
        );
        
        float dist = distance(st, particlePos);
        float particle = 1.0 - smoothstep(0.0, 0.02, dist);
        
        vec3 particleColor = vec3(0.83, 0.69, 0.22); // Gold
        if(mod(fi, 3.0) < 1.0) particleColor = vec3(0.25, 0.77, 0.71); // Teal
        if(mod(fi, 3.0) > 2.0) particleColor = vec3(0.76, 0.09, 0.36); // Pink
        
        color += particleColor * particle;
        alpha += particle;
      }
      
      alpha *= u_intensity * 0.6;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      setIsWebGLSupported(false);
      return;
    }

    // Compile shader
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    // Create program
    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    // Select fragment shader based on effect type
    let fragmentShaderSource = shimmerFragmentShader;
    if (effectType === 'waves') fragmentShaderSource = waveFragmentShader;
    if (effectType === 'particles') fragmentShaderSource = particleFragmentShader;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');

    // Resize canvas
    function resizeCanvas() {
      if (!canvas || !gl) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    // Animation loop
    function animate(time: number) {
      if (!gl || !canvas) return;
      
      resizeCanvas();
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      // Set uniforms
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(intensityLocation, intensity);
      
      // Set up attributes
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Enable blending for transparency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, effectType]);

  if (!isWebGLSupported) {
    // Fallback CSS animation for browsers without WebGL
    return (
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          background: effectType === 'shimmer' 
            ? 'linear-gradient(45deg, rgba(194, 24, 91, 0.1), rgba(64, 196, 180, 0.1), rgba(212, 175, 55, 0.1))'
            : effectType === 'waves'
            ? 'linear-gradient(to bottom, rgba(64, 196, 180, 0.1), rgba(194, 24, 91, 0.1))'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent)',
          animation: `luxuryEffect${effectType} 8s ease-in-out infinite`,
          opacity: intensity
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: intensity 
      }}
    />
  );
}

// CSS animations for fallback
const styles = `
  @keyframes luxuryEffectshimmer {
    0%, 100% { transform: translateX(-100%) rotate(0deg); }
    50% { transform: translateX(100%) rotate(180deg); }
  }
  
  @keyframes luxuryEffectwaves {
    0%, 100% { transform: translateY(0) scaleY(1); }
    50% { transform: translateY(-10px) scaleY(1.1); }
  }
  
  @keyframes luxuryEffectparticles {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(180deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

