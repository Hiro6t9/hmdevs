
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls, Float, Stars, Text3D } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Heart shape geometry for the 3D heart
const HeartShape = () => {
  const heartRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      heartRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  // Custom heart geometry
  const createHeartShape = () => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;

    shape.moveTo(x, y);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 5, y, x + 5, y + 2.5);
    shape.bezierCurveTo(x + 5, y + 5, x + 2.5, y + 7.5, x, y + 10);
    shape.bezierCurveTo(x - 2.5, y + 7.5, x - 5, y + 5, x - 5, y + 2.5);
    shape.bezierCurveTo(x - 5, y, x - 2.5, y + 2.5, x, y);

    return shape;
  };

  const heartShape = createHeartShape();
  const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.5, bevelThickness: 0.5 };

  const springs = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [0.2, 0.2, 0.2] },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <animated.mesh ref={heartRef} scale={springs.scale as any}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial 
        color="#f0b5c3"
        emissive="#f0b5c3"
        emissiveIntensity={0.5}
        metalness={0.2}
        roughness={0.3}
      />
    </animated.mesh>
  );
};

// Floating code symbols
const CodeSymbols = ({ count = 10 }) => {
  const symbols = ['<>', '{;}', '()', '[]', '// <3', 'const', 'React', '=>'];
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Float 
          key={i}
          speed={Math.random() * 2 + 0.5} 
          rotationIntensity={Math.random() * 0.5}
          floatIntensity={Math.random() * 0.5 + 0.5}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
          ]}
        >
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.5}
            height={0.1}
            curveSegments={12}
          >
            {symbols[Math.floor(Math.random() * symbols.length)]}
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#6D9EC5' : '#A0789C'} 
              emissive={i % 2 === 0 ? '#6D9EC5' : '#A0789C'}
              emissiveIntensity={0.5}
            />
          </Text3D>
        </Float>
      ))}
    </>
  );
};

// Main scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#A0789C" intensity={0.5} />
      
      <HeartShape />
      <CodeSymbols count={8} />
      <Stars radius={50} depth={50} count={1000} factor={4} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </>
  );
};

// Main component with Canvas
const ThreeDScene: React.FC = () => {
  return (
    <div className="h-[60vh] w-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ 
          background: 'transparent',
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;
