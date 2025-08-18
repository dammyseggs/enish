import { useRef, useEffect, useCallback } from 'react';

export const useParticleEffect = (containerRef) => {
  const canvasRef = useRef(null);
  const particleSystemRef = useRef(null);

  const createParticleSystem = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    let particles = [];
    

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (x, y, type = 'ambient') => {
      const colors = ['#fbbf24', '#f59e0b', '#d97706', '#92400e'];
      return {
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        size: Math.random() * (type === 'click' ? 8 : 3) + 2,
        speedX: (Math.random() - 0.5) * (type === 'click' ? 8 : 2),
        speedY: (Math.random() - 0.5) * (type === 'click' ? 8 : 2),
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: type === 'click' ? 100 : Math.random() * 150 + 100,
        maxLife: type === 'click' ? 100 : Math.random() * 150 + 100,
        type,
      };
    };

    for (let i = 0; i < 20; i++) {
      particles.push(createParticle(null, null, 'ambient'));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.opacity = p.life / p.maxLife;

        if (p.type === 'ambient') {
          p.speedY += 0.01;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity * (p.type === 'ambient' ? 0.3 : 0.8);
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        if (p.type === 'click') {
          const spikes = 5;
          const outerRadius = p.size;
          const innerRadius = p.size * 0.5;
          for (let j = 0; j < spikes * 2; j++) {
            const radius = j % 2 === 0 ? outerRadius : innerRadius;
            const angle = (j * Math.PI) / spikes;
            const x = p.x + Math.cos(angle) * radius;
            const y = p.y + Math.sin(angle) * radius;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    };
    animate();

    return {
      addClickParticles: (x, y) => {
        for (let i = 0; i < 15; i++) {
          particles.push(createParticle(x, y, 'click'));
        }
      },
      destroy: () => {
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    const system = createParticleSystem();
    particleSystemRef.current = system;
    return () => system?.destroy();
  }, [createParticleSystem]);

  const handleCanvasClick = useCallback((e) => {
    if (particleSystemRef.current && window.innerWidth >= 768) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      particleSystemRef.current.addClickParticles(x, y);
    }
  }, []);

  return { handleCanvasClick, canvasRef };
};