import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import FishNavigator from './FishNavigator';
import { Effects } from './Effect';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {MTLLoader, OBJLoader, Water} from 'three-stdlib';

const UnderwaterWorld = () => {
  const colors = [0x064e40, 0x0dad8d, 0x8dd8cc, 0x30bfbf, 0x0c98ba, 0x1164b4];
  return (
    <Canvas dpr={[1,2]} camera={{ position: new THREE.Vector3(0, 20, 50), fov: 25 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 0]} intensity={5} />
        <directionalLight position={[-10, 10, 5]} intensity={5} />
        <directionalLight position={[-10, 20, 0]} intensity={5} />
        <directionalLight position={[0, -10, 0]} intensity={5} />
        <directionalLight position={[0, 3, 0]} intensity={5} />
      <spotLight position={[10, 6, 10]} angle={0.15} intensity={10} />
      <CameraController />
      <Ocean color={colors[Math.floor(Math.random() * colors.length)]} />
      <InfiniteFish />
      <Plants scale={50} number={2000}/>
      <Soil />
      <Bubbles /> {/* Add bubbles to the scene */}
      <Suspense fallback={null}>
        <FishNavigator scale={30} position={[0, 10, 0]}/>
        {/*<UnderwaterFloor position={[0,-3,-2]}/> /!* Add the UnderwaterFloor component *!/*/}
      </Suspense>
      <Effects />  
    </Canvas>
  );
};

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

function Soil() {
  // Load a sandy texture for the beach surface
  const texture = new THREE.TextureLoader().load("./sandy_gravel_02_diff_4k.jpg", (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Repeating texture
  });

  // Load a normal map for additional texture detail (bumps and irregularities)
  const normalMap = new THREE.TextureLoader().load("./sandy_gravel_02_nrm_4k.jpg", (normalMap) => {
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping; // Repeating normal map
  });

  return (
      <mesh position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial
            map={texture} // Base texture
            normalMap={normalMap} // Normal map for additional bump detail
            normalScale={new THREE.Vector2(1, 1)} // Control the intensity of normal map effects
            color={0xf4c542} // Beach sand color
            roughness={0.9} // High roughness for sand-like texture
            metalness={0} // No metallic shine
            bumpScale={0.3} // Subtle bump effect for sand texture
        />
      </mesh>
  );
}

// Camera controls component
function CameraController() {
  const { camera, gl } = useThree();
  const [mouseDown, setMouseDown] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: -20 });
  useEffect(() => {
    const handleMouseDown = (event) => {
      setMouseDown(true);
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (!mouseDown) return;

      const deltaMove = { x: event.clientX - previousMousePosition.x, y: event.clientY - previousMousePosition.y };
      camera.rotation.order = "YXZ";
      camera.rotation.y -= deltaMove.x * 0.01;
      camera.rotation.x = -0.4;
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setMouseDown(false);
    };


    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);

    return () => {

      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [camera, gl, mouseDown, previousMousePosition]);

  console.log(camera.rotation);

  return null;
}


// Plants rendering underwater
function Plants({scale, number}) {
  const [plantModels, setPlantModels] = useState([]);

  useEffect(() => {
    // Load multiple plant models
    const plantFiles = [
      { obj: "./Coral4.obj", mtl: "./CoralBlue.mtl" },
      { obj: "./Coral5.obj", mtl: "./CoralGreen.mtl" },
      { obj: "./Coral6.obj", mtl: "./CoralPurple.mtl" },
      { obj: "./Coral3.obj", mtl: "./CoralRed.mtl" },
      { obj: "./Coral4.obj", mtl: "./Coral4.mtl" },
      { obj: "./Coral.obj", mtl: "./CoralRed.mtl" },
      { obj: "./Coral2.obj", mtl: "./CoralBlue.mtl" },

    ];

    const promises = plantFiles.map(async ({ obj, mtl }) => {
      const mtlLoader = new MTLLoader();
      const materials = await mtlLoader.loadAsync(mtl);
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      const object = await objLoader.loadAsync(obj);
      return object;
    });

    Promise.all(promises).then((models) => setPlantModels(models));
  }, []);

  // Generate random positions for the plants
  const plantPositions = Array.from({ length: number }, () => [
    Math.random() * 1000 - 500,
    -20,
    Math.random() * 1000 - 500,
  ]);

  if (plantModels.length === 0) return null; // Wait for models to load

  return (
      <>
        {plantPositions.map((pos, index) => {
          // Randomly select a plant model
          const randomModelIndex = Math.floor(Math.random() * plantModels.length);
          const PlantModel = plantModels[randomModelIndex];

          return (
              <primitive
                  key={index}
                  object={PlantModel.clone()} // Clone to avoid reusing the same instance
                  position={pos}
                  scale={[scale, scale, scale]} // Adjust scale if necessary
              />
          );
        })}
      </>
  );
}

export default UnderwaterWorld;