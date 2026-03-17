"use client";

import { useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

const GRID_SPACING = 50;
const CONNECTION_DISTANCE = 80;
const MOUSE_RADIUS = 200;
const MOUSE_PUSH = 25;
const RETURN_SPEED = 0.03;
const DRIFT_SPEED = 0.3;
const DOT_SIZE = 1;
const LINE_OPACITY = 0.06;
const DOT_OPACITY = 0.15;
const GLOW_OPACITY = 0.4;

export default function NetworkGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const initPoints = useCallback((width: number, height: number) => {
    const points: Point[] = [];
    const cols = Math.ceil(width / GRID_SPACING) + 1;
    const rows = Math.ceil(height / GRID_SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * GRID_SPACING;
        const y = row * GRID_SPACING;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
        });
      }
    }
    pointsRef.current = points;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints(rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      ctx.clearRect(0, 0, w, h);

      // Update points
      for (const p of points) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH;
          p.x += (dx / dist) * force * 0.05;
          p.y += (dy / dist) * force * 0.05;
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Return to base
        p.x += (p.baseX - p.x) * RETURN_SPEED;
        p.y += (p.baseY - p.y) * RETURN_SPEED;
      }

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * LINE_OPACITY;

            // Brighten lines near mouse
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDx = midX - mouse.x;
            const mouseDy = midY - mouse.y;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const mouseInfluence = mouseDist < MOUSE_RADIUS ? (1 - mouseDist / MOUSE_RADIUS) : 0;

            const r = Math.round(41 + mouseInfluence * 0);
            const g = Math.round(141 + mouseInfluence * 0);
            const bl = Math.round(255);
            const finalAlpha = alpha + mouseInfluence * 0.12;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${finalAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of points) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) : 0;

        const alpha = DOT_OPACITY + mouseInfluence * GLOW_OPACITY;
        const size = DOT_SIZE + mouseInfluence * 1.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41, 141, 255, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initPoints]);

  return (
    <div ref={containerRef} className={`absolute pointer-events-auto ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
