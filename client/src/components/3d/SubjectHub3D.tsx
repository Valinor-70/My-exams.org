import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Environment, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Subject icon 3D component
const Subject3DIcon: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  geometry: 'icosahedron' | 'octahedron';
}> = ({ position, color, geometry }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {geometry === 'icosahedron' ? (
        <Icosahedron ref={meshRef} position={position} args={[0.8, 0]}>
          <meshStandardMaterial 
            color={color} 
            metalness={0.7} 
            roughness={0.2} 
            transparent 
            opacity={0.9}
          />
        </Icosahedron>
      ) : (
        <Octahedron ref={meshRef} position={position} args={[0.8]}>
          <meshStandardMaterial 
            color={color} 
            metalness={0.6} 
            roughness={0.3} 
            transparent 
            opacity={0.8}
          />
        </Octahedron>
      )}
    </Float>
  );
};

// Subject Hub 3D Scene
const SubjectHub3D: React.FC<{ subjectName: string; subjectColor: string }> = ({ 
  subjectName, 
  subjectColor 
}) => {
  const subjects = [
    { name: 'Math', color: '#667eea', pos: [-2, 1, 0] as [number, number, number], geo: 'icosahedron' as const },
    { name: 'Science', color: '#f093fb', pos: [2, 1, -1] as [number, number, number], geo: 'octahedron' as const },
    { name: 'English', color: '#4facfe', pos: [0, -1, 1] as [number, number, number], geo: 'icosahedron' as const },
    { name: 'History', color: '#764ba2', pos: [-1, -1, -1] as [number, number, number], geo: 'octahedron' as const },
  ];

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -3]} intensity={0.3} />
        
        {/* Central subject text */}
        <group>
          <Text
            position={[-1.5, 0, 0]}
            fontSize={0.8}
            color={subjectColor}
            maxWidth={200}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            {subjectName}
          </Text>
        </group>
        
        {/* Surrounding subject icons */}
        {subjects.map((subject, index) => (
          <Subject3DIcon
            key={index}
            position={subject.pos}
            color={subject.color}
            geometry={subject.geo}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default SubjectHub3D;