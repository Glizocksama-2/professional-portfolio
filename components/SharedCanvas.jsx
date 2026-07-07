'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Avoid SSR for WebGL Canvas
const ViewPort = dynamic(() => import('@/components/SharedCanvasViewport'), { ssr: false });

export default function SharedCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 w-screen h-screen">
      <Canvas
        eventSource={typeof document !== 'undefined' ? document.getElementById('root-wrapper') : undefined}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <ViewPort />
        <Preload all />
      </Canvas>
    </div>
  );
}
