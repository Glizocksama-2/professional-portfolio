'use client';

import React, { useRef, useEffect, useState } from 'react';

// Pure Canvas 2D fallback - no WebGL dependency, guaranteed to work
function Canvas2DHero({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      time += 0.008;

      // Central glow
      const glowR = 60 + Math.sin(time * 2) * 15;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * 3);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.04)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Icosahedron wireframe (2D projection of rotating 3D)
      const rotY = time * 0.4 + scrollProgress * Math.PI * 2;
      const rotX = time * 0.6;
      const scale = Math.min(w, h) * 0.18;

      // Generate icosahedron vertices
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawVerts = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];

      const edges = [
        [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
        [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
        [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],
        [7,8],[7,10],[8,9],[10,11]
      ];

      // Project 3D to 2D with rotation
      const project = (v) => {
        let [x, y, z] = v;
        // Rotate Y
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // Rotate X
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        // Perspective
        const fov = 4;
        const s = fov / (fov + z2);
        return [cx + x1 * scale * s, cy + y1 * scale * s, z2];
      };

      const projected = rawVerts.map(project);

      // Draw edges
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.5;
      edges.forEach(([a, b]) => {
        const pa = projected[a];
        const pb = projected[b];
        const avgZ = (pa[2] + pb[2]) / 2;
        const alpha = Math.max(0.15, Math.min(0.8, 0.5 - avgZ * 0.1));
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach(([px, py, pz]) => {
        const alpha = Math.max(0.3, Math.min(1, 0.6 - pz * 0.1));
        const r = Math.max(1.5, 3 - pz * 0.3);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbit Ring 1 (horizontal torus projection)
      const ringRadius = scale * 1.4;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const rx = Math.cos(angle) * ringRadius;
        const ry = Math.sin(angle) * ringRadius * 0.35;
        const rz = Math.sin(angle) * ringRadius * 0.7;
        // Apply rotation
        const cosRY = Math.cos(rotY * 0.3 - time * 0.15);
        const sinRY = Math.sin(rotY * 0.3 - time * 0.15);
        const fx = rx * cosRY - rz * sinRY;
        const fov = 4;
        const sz = rx * sinRY + rz * cosRY;
        const s = fov / (fov + sz);
        const screenX = cx + fx * s;
        const screenY = cy + ry * s;
        if (i === 0) ctx.moveTo(screenX, screenY);
        else ctx.lineTo(screenX, screenY);
      }
      ctx.stroke();

      // Orbit Ring 2 (vertical)
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.25)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const ringRadius2 = scale * 1.1;
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const rx = Math.cos(angle) * ringRadius2;
        const ry = Math.sin(angle) * ringRadius2;
        const cosR = Math.cos(time * 0.4);
        const sinR = Math.sin(time * 0.4);
        const fx = rx * cosR;
        const fy = ry;
        const fz = rx * sinR;
        const fov = 4;
        const s = fov / (fov + fz);
        const screenX = cx + fx * s;
        const screenY = cy + fy * s;
        if (i === 0) ctx.moveTo(screenX, screenY);
        else ctx.lineTo(screenX, screenY);
      }
      ctx.stroke();

      // Corner cage nodes (red boxes)
      [0, 1, 2, 3].forEach((i) => {
        const angle = (i * Math.PI) / 2 + rotY;
        const nx = Math.cos(angle) * scale * 1.1;
        const nz = Math.sin(angle) * scale * 1.1;
        const fov = 4;
        const s = fov / (fov + nz);
        const sx = cx + nx * s;
        const sy = cy;
        const size = 5 * s;
        ctx.fillStyle = `rgba(225, 29, 72, ${0.4 + Math.sin(time * 3 + i) * 0.2})`;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      });

      // Scanline overlay
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.02)';
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [scrollProgress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function HeroCenterpiece({ scrollProgress = 0 }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <Canvas2DHero scrollProgress={scrollProgress} />
      <div className="absolute bottom-4 left-4 text-green-off-white-2 text-[9px] tracking-widest uppercase opacity-40 font-mono">
        [ SYSTEM METRIC CORE // TELEMETRY ACTIVE ]
      </div>
    </div>
  );
}
