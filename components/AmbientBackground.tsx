'use client'

import { useEffect, useRef } from 'react'

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        life: Math.random() * 100 + 50,
      })
    }

    // Nebula orbs
    const orbs = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        size: 200,
        color: 'rgba(167, 169, 172, 0.1)',
        vx: 0.2,
        vy: 0.1,
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        size: 150,
        color: 'rgba(0, 174, 239, 0.08)',
        vx: -0.15,
        vy: 0.2,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.1,
        size: 100,
        color: 'rgba(0, 174, 239, 0.06)',
        vx: 0.1,
        vy: -0.1,
      },
    ]

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nebula orbs
      orbs.forEach(orb => {
        orb.x += orb.vx
        orb.y += orb.vy

        // Wrap around screen
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        gradient.addColorStop(0, orb.color)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Reset particle when life ends
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = Math.random() * 100 + 50
        }

        // Draw particle
        ctx.fillStyle = `rgba(167, 169, 172, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(167, 169, 172, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="ambient-canvas"
    />
  )
}
