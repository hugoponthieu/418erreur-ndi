import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import FishNavigator from './FishNavigator';
import { Effects } from './Effect';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Water } from 'three-stdlib';

const UnderwaterWorld = () => {
  const colors = [0x064e40, 0x0dad8d, 0x8dd8cc, 0x30bfbf, 0x0c98ba, 0x1164b4];
  return (
    <Canvas dpr={[1,2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 0]} intensity={5} />
        <directionalLight position={[-10, 10, 5]} intensity={5} />
        <directionalLight position={[-10, 20, 0]} intensity={5} />
        <directionalLight position={[0, -10, 0]} intensity={5} />
        <directionalLight position={[0, 3, 0]} intensity={5} />
      <spotLight position={[10, 6, 10]} angle={0.15} intensity={10} />
      <Ocean color={colors[Math.floor(Math.random() * colors.length)]} />
      <InfiniteFish />
      <Plants />
      <Bubbles /> {/* Add bubbles to the scene */}
      <Suspense fallback={null}>
        <FishNavigator scale={3}/>
        <UnderwaterFloor position={[0,-3,-2]}/> {/* Add the UnderwaterFloor component */}
      </Suspense>
      <Effects />  
    </Canvas>
  );
};

function UnderwaterFloor({ position }) {
  const { scene } = useGLTF('underwater.glb');
  scene.position.set(position[0], position[1], position[2]);
  return <primitive object={scene} scale={0.5} rotation={[-0.3,0,0]}/>;
}

function Ocean({ color }) {
  const waterRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    // Set fog to hide the far background and create clearer water
    scene.fog = new THREE.Fog(color, 10, 30); // Fog color set to light blue
    scene.fog.near = 0; // Nearer fog range for a clear underwater look
    scene.fog.far = 200; // Decrease fog far value to limit the visibility range

    // Set the background color to simulate a blue horizon
    scene.background = new THREE.Color(color); // Light sky blue background

    // Water surface geometry and settings for clearer water
    const waterGeometry = new THREE.PlaneGeometry(1000000, 1000000);
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/waternormals.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(1, 1, 1),
      sunColor: 0xffffff,
      waterColor: 0x00b0ff, // Clearer water color
      distortionScale: 1.0, // Reduced distortion for clearer water
      fog: true,
    });

    water.rotation.x = Math.PI / 2; // Flip the water plane to make it face downward
    water.position.y = 50; // Set water surface above the camera's initial position
    waterRef.current.add(water);
  }, [scene]);

  return <group ref={waterRef} />;
}

// Infinite Fish simulation
function InfiniteFish() {
  const fishPositions = Array.from({ length: 50 }, () => [
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
  ]);

  return (
    <>
      {fishPositions.map((pos, index) => (
        <Fish key={index} position={pos} />
      ))}
    </>
  );
}

// Fish component with basic movement
function Fish({ position }) {
  const fishRef = useRef();

  useFrame(() => {
    if (fishRef.current) {
      fishRef.current.position.x += 0.05;
      if (fishRef.current.position.x > 50) fishRef.current.position.x = -50;
    }
  });

  return (
    <mesh ref={fishRef} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}


// Bubbles component to simulate bubbles rising underwater
function Bubbles() {
  const bubblePositions = Array.from({ length: 50 }, () => [
    Math.random() * 100 - 50,
    Math.random() * 10 - 5,
    Math.random() * 100 - 50,
  ]);

  return (
    <>
      {bubblePositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial
            color="white"
            opacity={0.6}
            transparent={true}
          />
        </mesh>
      ))}
    </>
  );
}

// Plants rendering underwater
function Plants() {
  const plantPositions = Array.from({ length: 100 }, () => [
    Math.random() * 100 - 50,
    -50,
    Math.random() * 100 - 50,
  ]);

  return (
    <>
      {plantPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <cylinderGeometry args={[0.2, 0.2, 3, 16]} />
          <meshStandardMaterial color="green" />
        </mesh>
      ))}
    </>
  );
}

export default UnderwaterWorld;