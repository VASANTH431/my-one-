import React, { useEffect, useRef } from 'react';

export default function HeartRainCanvas({ density = 'medium', isEnabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Palette
    const colors = [
      'rgba(183, 110, 121, ',  // Rose Gold
      'rgba(232, 197, 200, ',  // Light Rose Gold
      'rgba(140, 80, 58, ',    // Warm Bronze
      'rgba(194, 132, 111, ',  // Light Bronze
      'rgba(243, 229, 171, ',  // Champagne
      'rgba(229, 193, 88, ',   // Champagne Gold
      'rgba(255, 182, 193, ',  // Blush Pink
      'rgba(255, 209, 220, ',  // Soft Blush
      'rgba(250, 210, 184, ',  // Peach
      'rgba(102, 16, 31, '     // Deep Burgundy
    ];

    // Determine particle count based on screen width & density
    const isMobile = width < 768;
    const baseCount = isMobile ? 32 : (density === 'high' ? 80 : 55);

    class Particle {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : -30;
        this.size = 8 + Math.random() * 18; // size range
        this.speedY = 0.6 + Math.random() * 1.5;
        this.swaySpeed = 0.015 + Math.random() * 0.025;
        this.swayAmount = 1.2 + Math.random() * 2.5;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = (Math.random() - 0.5) * 0.04;
        this.rotAngle = Math.random() * Math.PI * 2;
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = 0.35 + Math.random() * 0.55;
        this.type = Math.random() < 0.65 ? 'heart' : (Math.random() < 0.6 ? 'petal' : 'star');
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.y += this.speedY;
        this.angle += this.swaySpeed;
        this.x += Math.sin(this.angle) * this.swayAmount;
        this.rotAngle += this.rotation;
        this.wobble += this.wobbleSpeed;

        // Reset when falling past screen
        if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw(c) {
        // Calculate fade near bottom and top
        let alpha = this.baseAlpha;
        if (this.y < 80) {
          alpha = this.baseAlpha * (this.y / 80);
        } else if (this.y > height - 120) {
          alpha = this.baseAlpha * Math.max(0, (height - this.y) / 120);
        }

        if (alpha <= 0.01) return;

        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotAngle);
        // 3D flip effect on horizontal axis
        c.scale(Math.cos(this.wobble), 1);

        c.fillStyle = `${this.colorPrefix}${alpha})`;

        if (this.type === 'heart') {
          // Draw Romantic Smooth Heart
          const s = this.size * 0.65;
          c.beginPath();
          c.moveTo(0, s * 0.35);
          c.bezierCurveTo(-s, -s * 0.5, -s * 1.3, s * 0.45, 0, s * 1.35);
          c.bezierCurveTo(s * 1.3, s * 0.45, s, -s * 0.5, 0, s * 0.35);
          c.closePath();
          c.fill();
        } else if (this.type === 'petal') {
          // Draw Rose Petal
          const w = this.size * 0.5;
          const h = this.size * 1.1;
          c.beginPath();
          c.ellipse(0, 0, w, h, Math.PI / 4, 0, Math.PI * 2);
          c.fill();
        } else {
          // Draw Golden 4-point Sparkle Star
          const r = this.size * 0.5;
          c.beginPath();
          c.moveTo(0, -r);
          c.quadraticCurveTo(0, 0, r, 0);
          c.quadraticCurveTo(0, 0, 0, r);
          c.quadraticCurveTo(0, 0, -r, 0);
          c.quadraticCurveTo(0, 0, 0, -r);
          c.closePath();
          c.fill();
        }

        c.restore();
      }
    }

    const particles = Array.from({ length: baseCount }, () => new Particle(true));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-25 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
