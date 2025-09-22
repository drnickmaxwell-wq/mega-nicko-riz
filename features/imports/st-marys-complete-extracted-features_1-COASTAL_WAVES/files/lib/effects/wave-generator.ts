export interface WaveConfig {
  amplitude: number
  frequency: number
  phase: number
  speed: number
  color: string
  opacity: number
}

export interface WavePoint {
  x: number
  y: number
}

export function generateWavePoints(
  width: number,
  height: number,
  time: number,
  config: WaveConfig,
  mousePos?: { x: number; y: number }
): WavePoint[] {
  const points: WavePoint[] = []
  const baseY = height * 0.7
  
  for (let x = 0; x <= width; x += 4) {
    let y = baseY + 
      Math.sin(x * config.frequency + time * config.speed + config.phase) * config.amplitude +
      Math.sin(x * config.frequency * 1.5 + time * config.speed * 0.8) * config.amplitude * 0.3

    // Add mouse interaction
    if (mousePos) {
      const mouseX = mousePos.x * width
      const mouseY = mousePos.y * height
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
      const influence = Math.max(0, 1 - distance / 200)
      y += influence * 30 * Math.sin(time * 0.05)
    }

    points.push({ x, y })
  }

  return points
}

export function getTimeBasedTint(time: number): string {
  const hour = new Date().getHours()
  
  if (hour >= 6 && hour < 12) {
    // Morning - warmer tones
    return 'hsl(45, 70%, 85%)'
  } else if (hour >= 12 && hour < 18) {
    // Afternoon - bright
    return 'hsl(200, 60%, 90%)'
  } else if (hour >= 18 && hour < 21) {
    // Evening - golden
    return 'hsl(35, 80%, 80%)'
  } else {
    // Night - cooler
    return 'hsl(220, 40%, 70%)'
  }
}

