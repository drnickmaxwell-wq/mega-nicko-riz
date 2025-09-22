'use client';

import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Info } from 'lucide-react';

interface ToothModelViewerProps {
  modelType?: 'healthy' | 'cavity' | 'crown' | 'implant' | 'veneer';
  autoRotate?: boolean;
  showControls?: boolean;
  showInfo?: boolean;
  className?: string;
}

interface ToothInfo {
  title: string;
  description: string;
  features: string[];
  treatment?: string;
}

const toothData: Record<string, ToothInfo> = {
  healthy: {
    title: 'Healthy Tooth',
    description: 'A perfect example of optimal dental health with strong enamel and healthy gums.',
    features: ['Strong enamel layer', 'Healthy dentin', 'Intact pulp chamber', 'Healthy root structure'],
    treatment: 'Preventive care and regular cleanings'
  },
  cavity: {
    title: 'Tooth with Cavity',
    description: 'Shows the progression of tooth decay and the importance of early intervention.',
    features: ['Enamel erosion', 'Dentin exposure', 'Bacterial invasion', 'Potential pulp damage'],
    treatment: 'Composite filling or crown depending on severity'
  },
  crown: {
    title: 'Dental Crown',
    description: 'A ceramic crown restoration that protects and strengthens a damaged tooth.',
    features: ['Ceramic material', 'Natural appearance', 'Full tooth coverage', 'Long-lasting protection'],
    treatment: 'Crown placement procedure'
  },
  implant: {
    title: 'Dental Implant',
    description: 'A titanium implant with crown that replaces a missing tooth completely.',
    features: ['Titanium implant post', 'Abutment connection', 'Ceramic crown', 'Bone integration'],
    treatment: 'Implant surgery and crown placement'
  },
  veneer: {
    title: 'Porcelain Veneer',
    description: 'Ultra-thin porcelain shell that transforms the appearance of your smile.',
    features: ['Thin porcelain layer', 'Natural translucency', 'Stain resistance', 'Minimal tooth preparation'],
    treatment: 'Veneer bonding procedure'
  }
};

export default function ToothModelViewer({
  modelType = 'healthy',
  autoRotate = true,
  showControls = true,
  showInfo = false,
  className = ''
}: ToothModelViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [showInfoPanel, setShowInfoPanel] = useState(showInfo);

  const currentToothInfo = toothData[modelType];

  // Simple 3D tooth rendering using Canvas 2D (WebGL would be more complex)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resizeCanvas();

    function drawTooth() {
      if (!canvas || !ctx) return;
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      const baseSize = 60 * zoom;

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      // Apply rotation transform
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation.y * 0.01);
      
      // Create gradient based on tooth type
      let gradient;
      switch (modelType) {
        case 'healthy':
          gradient = ctx.createLinearGradient(-baseSize, -baseSize, baseSize, baseSize);
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#f8f8f8');
          gradient.addColorStop(1, '#e8e8e8');
          break;
        case 'cavity':
          gradient = ctx.createLinearGradient(-baseSize, -baseSize, baseSize, baseSize);
          gradient.addColorStop(0, '#f0f0f0');
          gradient.addColorStop(0.3, '#d4af37');
          gradient.addColorStop(0.7, '#8b4513');
          gradient.addColorStop(1, '#654321');
          break;
        case 'crown':
          gradient = ctx.createLinearGradient(-baseSize, -baseSize, baseSize, baseSize);
          gradient.addColorStop(0, '#f5f5f5');
          gradient.addColorStop(0.5, '#e0e0e0');
          gradient.addColorStop(1, '#d0d0d0');
          break;
        case 'implant':
          gradient = ctx.createLinearGradient(-baseSize, -baseSize, baseSize, baseSize);
          gradient.addColorStop(0, '#c0c0c0');
          gradient.addColorStop(0.3, '#a0a0a0');
          gradient.addColorStop(0.7, '#f5f5f5');
          gradient.addColorStop(1, '#e8e8e8');
          break;
        case 'veneer':
          gradient = ctx.createLinearGradient(-baseSize, -baseSize, baseSize, baseSize);
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#fafafa');
          gradient.addColorStop(1, '#f0f0f0');
          break;
        default:
          gradient = '#ffffff';
      }

      // Draw tooth crown (simplified 3D effect)
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Create tooth shape with perspective
      const perspective = Math.sin(rotation.x * 0.01) * 0.3 + 1;
      
      // Crown
      ctx.ellipse(0, -baseSize * 0.3, baseSize * 0.8 * perspective, baseSize * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Add shadow for depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.ellipse(baseSize * 0.1, -baseSize * 0.2, baseSize * 0.7 * perspective, baseSize * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Root (if visible)
      if (modelType === 'implant') {
        // Draw titanium implant post
        ctx.fillStyle = '#a0a0a0';
        ctx.fillRect(-baseSize * 0.1, baseSize * 0.2, baseSize * 0.2, baseSize * 0.8);
        
        // Add threading lines
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(-baseSize * 0.1, baseSize * 0.3 + i * baseSize * 0.1);
          ctx.lineTo(baseSize * 0.1, baseSize * 0.3 + i * baseSize * 0.1);
          ctx.stroke();
        }
      } else {
        // Regular tooth root
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, baseSize * 0.5, baseSize * 0.3 * perspective, baseSize * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add special effects based on tooth type
      if (modelType === 'cavity') {
        // Draw cavity
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.ellipse(-baseSize * 0.2, -baseSize * 0.4, baseSize * 0.15, baseSize * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      if (modelType === 'veneer') {
        // Draw veneer layer
        ctx.strokeStyle = 'rgba(64, 196, 180, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, -baseSize * 0.3, baseSize * 0.8 * perspective, baseSize * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Add highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(-baseSize * 0.3, -baseSize * 0.5, baseSize * 0.2, baseSize * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    function animate() {
      if (isRotating && !isDragging) {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 1
        }));
      }
      
      drawTooth();
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotation, zoom, isRotating, isDragging, modelType]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ minHeight: '300px' }}
      />
      
      {/* Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={toggleRotation}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title={isRotating ? 'Pause rotation' : 'Start rotation'}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={resetView}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          {showInfo && (
            <button
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
              title="Toggle info"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
      
      {/* Info Panel */}
      {showInfoPanel && currentToothInfo && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{currentToothInfo.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{currentToothInfo.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Key Features:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {currentToothInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-teal-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {currentToothInfo.treatment && (
              <div className="mt-3 pt-2 border-t border-gray-200">
                <span className="text-xs font-medium text-pink-600">
                  Treatment: {currentToothInfo.treatment}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/70 backdrop-blur-sm px-2 py-1 rounded">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}

