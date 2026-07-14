'use client';

import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function HeroCenterpiece() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <ShaderGradientCanvas 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <ShaderGradient
          animate="on"
          axesHelper="off"
          brightness={0.5}
          cAzimuthAngle={180}
          cDistance={5.6}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#f6ff00"
          color2="#6d7351"
          color3="#f2f20c"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={40}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={0.5}
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="waterPlane"
          uAmplitude={1}
          uDensity={1.3}
          uFrequency={5.5}
          uSpeed={0.2}
          uStrength={3.8}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
      <div className="absolute bottom-4 left-4 text-green-off-white-2 text-[9px] tracking-widest uppercase opacity-40 font-mono z-10">
        [ SYSTEM SHADER ENVIRONMENT // ACTIVE ]
      </div>
    </div>
  );
}
