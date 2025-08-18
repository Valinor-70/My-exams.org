import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshWobbleMaterial, OrbitControls, Environment, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometry component
const FloatingGeometry: React.FC<{ position: [number, number, number]; geometry: 'box' | 'sphere'; color: string }> = ({ 
  position, 
  geometry, 
  color 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {geometry === 'box' ? (
        <Box ref={meshRef} position={position} args={[1, 1, 1]}>
          <MeshWobbleMaterial color={color} factor={0.5} speed={0.5} transparent opacity={0.8} />
        </Box>
      ) : (
        <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
          <MeshWobbleMaterial color={color} factor={0.3} speed={0.8} transparent opacity={0.7} />
        </Sphere>
      )}
    </Float>
  );
};

// 3D Text component using regular Text instead of Text3D
const AnimatedText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={1.5}
        color="#667eea"
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

// Hero 3D Scene
const Hero3DScene: React.FC = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Floating geometric shapes */}
        <FloatingGeometry position={[-3, 2, 0]} geometry="box" color="#667eea" />
        <FloatingGeometry position={[3, -1, -2]} geometry="sphere" color="#f093fb" />
        <FloatingGeometry position={[0, -2, 1]} geometry="box" color="#4facfe" />
        <FloatingGeometry position={[-2, -1, -1]} geometry="sphere" color="#764ba2" />
        
        {/* 3D Text */}
        <AnimatedText text="GCSE" position={[-1.5, 0, 0]} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;