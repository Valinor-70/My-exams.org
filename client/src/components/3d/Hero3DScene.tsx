import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Study-themed floating objects (books, papers, etc.)
const FloatingStudyItem: React.FC<{ 
  position: [number, number, number]; 
  type: 'book' | 'paper' | 'apple'; 
  color: string 
}> = ({ position, type, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const renderItem = () => {
    switch (type) {
      case 'book':
        return (
          <Box ref={meshRef} position={position} args={[0.8, 1.2, 0.2]}>
            <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
          </Box>
        );
      case 'paper':
        return (
          <Box ref={meshRef} position={position} args={[1, 1.4, 0.05]}>
            <meshStandardMaterial color="#fefcf7" roughness={0.9} metalness={0} />
          </Box>
        );
      case 'apple':
        return (
          <Sphere ref={meshRef} position={position} args={[0.6, 16, 16]}>
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
          </Sphere>
        );
      default:
        return null;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {renderItem()}
    </Float>
  );
};

// Study-themed 3D text
const StudyText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        fontSize={1.2}
        color="#704214"
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

// Floating desk with study items
const StudyDesk: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const deskRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (deskRef.current) {
      deskRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={deskRef} position={position}>
        {/* Desk surface */}
        <Box args={[2, 0.1, 1.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b7355" roughness={0.8} metalness={0.1} />
        </Box>
        
        {/* Desk legs */}
        <Box args={[0.1, 1, 0.1]} position={[-0.9, -0.5, -0.5]}>
          <meshStandardMaterial color="#704214" roughness={0.9} metalness={0} />
        </Box>
        <Box args={[0.1, 1, 0.1]} position={[0.9, -0.5, -0.5]}>
          <meshStandardMaterial color="#704214" roughness={0.9} metalness={0} />
        </Box>
        <Box args={[0.1, 1, 0.1]} position={[-0.9, -0.5, 0.5]}>
          <meshStandardMaterial color="#704214" roughness={0.9} metalness={0} />
        </Box>
        <Box args={[0.1, 1, 0.1]} position={[0.9, -0.5, 0.5]}>
          <meshStandardMaterial color="#704214" roughness={0.9} metalness={0} />
        </Box>

        {/* Book on desk */}
        <Box args={[0.6, 0.8, 0.15]} position={[-0.3, 0.15, 0.2]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial color="#6b9dc2" roughness={0.7} metalness={0.1} />
        </Box>

        {/* Pencil holder */}
        <Box args={[0.2, 0.3, 0.2]} position={[0.5, 0.2, -0.3]}>
          <meshStandardMaterial color="#d4a574" roughness={0.6} metalness={0.2} />
        </Box>

        {/* Paper stack */}
        <Box args={[0.8, 0.05, 1]} position={[0.2, 0.08, 0.1]}>
          <meshStandardMaterial color="#fefcf7" roughness={0.9} metalness={0} />
        </Box>
      </group>
    </Float>
  );
};

// Main Hero 3D Scene for Study Studio
const Hero3DScene: React.FC = () => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        {/* Simplified lighting */}
        <ambientLight intensity={0.6} color="#f4f1e8" />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#d4a574" />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#fefcf7" />
        
        {/* Study desk centerpiece */}
        <StudyDesk position={[0, -1, 0]} />
        
        {/* Floating study items */}
        <FloatingStudyItem position={[-3, 1, -1]} type="book" color="#6b9dc2" />
        <FloatingStudyItem position={[3, 0.5, -2]} type="book" color="#d4a574" />
        <FloatingStudyItem position={[-2, -0.5, 2]} type="paper" color="#fefcf7" />
        <FloatingStudyItem position={[2.5, 2, 1]} type="apple" color="#e67e22" />
        <FloatingStudyItem position={[-1, 2.5, -0.5]} type="apple" color="#e67e22" />
        <FloatingStudyItem position={[1.5, -1, 2]} type="book" color="#8b7355" />
        
        {/* Study-themed text */}
        <StudyText text="Study" position={[-1.5, 1.5, 0.5]} />
        <StudyText text="Studio" position={[1.5, 0.8, -0.5]} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;