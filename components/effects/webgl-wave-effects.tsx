'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WebGLWaveEffectsProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  colors?: string[];
  interactive?: boolean;
}

const WebGLWaveEffects: React.FC<WebGLWaveEffectsProps> = ({
  className = '',
  intensity = 'medium',
  speed = 'medium',
  colors = ['#C2185B', '#40C4B4', '#D4AF37'],
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to canvas animation');
      fallbackAnimation();
      return;
    }

    // WebGL setup
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_intensity;
      uniform float u_speed;
      
      varying vec2 v_texCoord;
      
      vec3 brandColors[3];
      
      void main() {
        brandColors[0] = vec3(0.76, 0.09, 0.36); // Magenta #C2185B
        brandColors[1] = vec3(0.25, 0.77, 0.71); // Turquoise #40C4B4
        brandColors[2] = vec3(0.83, 0.69, 0.22); // Gold #D4AF37
        
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse / u_resolution.xy;
        
        float time = u_time * u_speed;
        
        // Create multiple wave layers
        float wave1 = sin(uv.x * 10.0 + time) * 0.1;
        float wave2 = sin(uv.x * 15.0 - time * 1.5) * 0.08;
        float wave3 = sin(uv.x * 8.0 + time * 0.8) * 0.12;
        
        // Add mouse interaction
        float mouseInfluence = length(uv - mouse) * 2.0;
        float mouseWave = sin(mouseInfluence * 10.0 - time * 3.0) * 0.05;
        
        float totalWave = (wave1 + wave2 + wave3 + mouseWave) * u_intensity;
        
        // Create flowing color transitions
        float colorMix1 = sin(uv.x * 5.0 + time) * 0.5 + 0.5;
        float colorMix2 = sin(uv.x * 3.0 - time * 0.7) * 0.5 + 0.5;
        
        vec3 color1 = mix(brandColors[0], brandColors[1], colorMix1);
        vec3 color2 = mix(brandColors[1], brandColors[2], colorMix2);
        vec3 finalColor = mix(color1, color2, uv.y + totalWave);
        
        // Add wave displacement effect
        float waveHeight = uv.y + totalWave;
        if (waveHeight > 0.7) {
          finalColor = mix(finalColor, vec3(1.0), (waveHeight - 0.7) * 2.0);
        }
        
        // Add transparency for overlay effect
        float alpha = 0.3 + totalWave * 0.2;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

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

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      fallbackAnimation();
      return;
    }
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      fallbackAnimation();
      return;
    }

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,  0, 0,
       1, -1,  1, 0,
      -1,  1,  0, 1,
       1,  1,  1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');
    const speedLocation = gl.getUniformLocation(program, 'u_speed');

    // Configuration based on props
    const intensityValues = { subtle: 0.5, medium: 1.0, strong: 1.5 };
    const speedValues = { slow: 0.5, medium: 1.0, fast: 2.0 };

    function resizeCanvas() {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    }

    function render(time: number) {
      resizeCanvas();
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.useProgram(program);
      
      // Set up attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);
      
      // Set uniforms
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(intensityLocation, intensityValues[intensity]);
      gl.uniform1f(speedLocation, speedValues[speed]);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationRef.current = requestAnimationFrame(render);
    }

    // Mouse interaction
    function handleMouseMove(event: MouseEvent) {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = canvas.height - (event.clientY - rect.top);
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    
    setIsLoaded(true);
    animationRef.current = requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, speed, interactive]);

  // Fallback CSS animation for when WebGL is not available
  function fallbackAnimation() {
    setIsLoaded(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1;
    const intensityMultiplier = intensity === 'subtle' ? 0.5 : intensity === 'strong' ? 1.5 : 1;

    function drawWaves() {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0] + '40');
      gradient.addColorStop(0.5, colors[1] + '40');
      gradient.addColorStop(1, colors[2] + '40');
      
      ctx.fillStyle = gradient;
      
      // Draw wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x <= width; x += 5) {
        const wave1 = Math.sin((x / width) * Math.PI * 4 + time) * 20 * intensityMultiplier;
        const wave2 = Math.sin((x / width) * Math.PI * 6 - time * 1.5) * 15 * intensityMultiplier;
        const y = height * 0.7 + wave1 + wave2;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      
      time += 0.02 * speedMultiplier;
      animationRef.current = requestAnimationFrame(drawWaves);
    }

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(drawWaves);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-teal-500/20 to-yellow-500/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
      )}
    </div>
  );
};

// Coastal Particle System Component
interface CoastalParticlesProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
}

const CoastalParticles: React.FC<CoastalParticlesProps> = ({
  className = '',
  particleCount = 50,
  colors = ['#C2185B', '#40C4B4', '#D4AF37'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    life: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
          life: Math.random() * 100 + 50,
        });
      }
    }

    function updateParticles() {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Respawn particle if life is over
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = Math.random() * 100 + 50;
          particle.opacity = Math.random() * 0.8 + 0.2;
        }
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    function animate() {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export { WebGLWaveEffects, CoastalParticles };

