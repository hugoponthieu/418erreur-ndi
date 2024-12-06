import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import FishNavigator from './FishNavigator';
import { Effects } from './Effect';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {MTLLoader, OBJLoader, Water} from 'three-stdlib';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const UnderwaterWorld = (props) => {
  const colors = [0x064e40, 0x0dad8d, 0x8dd8cc, 0x30bfbf, 0x0c98ba, 0x1164b4];
  const increment = props.increment;
  const fishModels = [
    {name:"./goldfish.glb",scale:[0.5,0.5,0.5]},
    {name:"./koi.glb",scale: [0.1,0.1,0.1]},
    {name:"./bigGrey.glb",scale:[1,1,1]},
    {name:"./sharky.glb",scale:[3,3,3]},
    {name:"./littlePink.glb",scale:[0.01,0.01,0.01]},
  ]; // Add your GLB files here
  return (
    <Canvas dpr={[1,2]} camera={{ position: new THREE.Vector3(0, 20, 50), fov: 30 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 0]} intensity={5} />
        <directionalLight position={[-10, 10, 5]} intensity={5} />
        <directionalLight position={[-10, 20, 0]} intensity={5} />
        <directionalLight position={[0, -10, 0]} intensity={5} />
        <directionalLight position={[0, 3, 0]} intensity={5} />
      <spotLight position={[10, 6, 10]} angle={0.15} intensity={10} />
      <CameraController />
      <RoamingFish />
      <Ocean color={colors[Math.floor(Math.random() * colors.length)]} />
      <InfiniteFish fishModels={fishModels} />
      <BottleController increment={increment} />
      <Plants scale={50} number={200}/>
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

function RoamingFish({modelFiles}) {
  if (!modelFiles){
    return
  }
  const fishRef = useRef();
  const { camera } = useThree();  // Get the camera from the scene
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3());
  console.log(modelFiles);
  const randomModel = modelFiles[Math.floor(Math.random() * modelFiles.length)];

  // Load the GLTF model
  const { scene } = useGLTF(randomModel.name);  // Replace with your GLB model

  // Update fish's target position around the camera
  useEffect(() => {
    const updateTargetPosition = () => {
      const offsetX = Math.random() * 300 - 150;
      const offsetY = -25;
      const offsetZ = Math.random() * 300 - 150;

      // Set the new target position based on the camera's position
      setTargetPosition(camera.position.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ)));
    };

    // Set the initial target position
    updateTargetPosition();

    // Update the target position every 2-3 seconds
    const interval = setInterval(updateTargetPosition, Math.random() * 6000 + 3000); // Random interval between 1s to 3s

    return () => clearInterval(interval);
  }, [camera.position]);

  useFrame((state, delta) => {
    if (fishRef.current) {
      // Calculate direction to the target position
      const direction = new THREE.Vector3().subVectors(targetPosition, fishRef.current.position);
      const distance = direction.length();

      // Move the fish towards the target position
      if (distance > 0.1) {
        direction.normalize(); // Normalize to get unit vector
        fishRef.current.position.addScaledVector(direction, delta * 6); // Move at a constant speed

        // Rotate the fish to face the movement direction
        const targetRotation = Math.atan2(direction.x, direction.z); // Calculate the direction in radians
        fishRef.current.rotation.y = THREE.MathUtils.lerp(fishRef.current.rotation.y, targetRotation, 0.1); // Smooth rotation
      }
    }
  });

  return (
      <primitive ref={fishRef} object={scene} scale={randomModel.scale} />
  );
}

function BottleController({ increment }) {
  const [bottles, setBottles] = useState([]);

  const { camera } = useThree();
  useEffect(() => {
    const generatePositionAroundCamera = () => {
      let position;
      do {
      position = [
        camera.position.x + (Math.random() * 150 - 75),
        camera.position.y + (Math.random() * 20 - 30),
        camera.position.z + (Math.random() * 150 - 75),
      ];
      } while (Math.abs(position[0] - camera.position.x) < 30 &&
           Math.abs(position[2] - camera.position.z) < 10);
      return position;
    };

    const initialBottles = Array.from({ length: 10 }, () => ({
      position: generatePositionAroundCamera(),
      id: Math.random().toString(36).substring(7), // Generate a unique ID
    }));
    setBottles(initialBottles);

    const interval = setInterval(() => {
      setBottles((prevBottles) => [
        ...prevBottles,
        {
          position: generatePositionAroundCamera(),
          id: Math.random().toString(36).substring(7), // Unique ID for each bottle
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [camera]);

  const handleRemoveBottle = (id) => {
    setBottles((prevBottles) => prevBottles.filter((bottle) => bottle.id !== id));
    increment();
  };

  return (
    <>
      {bottles.map((bottle) => (
        <Bottle
          key={bottle.id}
          position={bottle.position}
          increment={increment}
          onRemove={() => handleRemoveBottle(bottle.id)}
        />
      ))}
    </>
  );
}

function Bottle({ position, onRemove }) {
  const bottleRef = useRef();
  const { camera } = useThree();
  const [bottleModel, setBottleModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/bottle.glb', (gltf) => {
      setBottleModel(gltf.scene);
    });
  }, []);

  useEffect(() => {
    if (bottleModel) {
      bottleModel.position.set(position[0], position[1], position[2]);
      bottleModel.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      bottleRef.current.add(bottleModel);
    }
  }, [bottleModel, position]);

  useEffect(() => {
    const handleClick = (event) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([bottleRef.current], true);

      if (intersects.length > 0 && bottleModel) {
        onRemove(); // Trigger bottle removal
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [bottleModel, camera, onRemove]);

  return <group ref={bottleRef} scale={1} />;
}

function InfiniteFish({fishModels}) {
  const fishPositions = Array.from({ length: 10 }, () => [
    Math.random() * 1200 - 600,  // Random X position within range
    Math.random() * 5 - 5,       // Random Y position within range
    Math.random() * 100 - 50,    // Random Z position within range
  ]);

  return (
      <>
        {fishPositions.map((index) => (
            <RoamingFish modelFiles={fishModels} key={index}  />
        ))}
      </>
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
        <planeGeometry args={[400, 400]} />
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
  const { camera } = useThree();

  camera.rotation.order = "YXZ";
  camera.rotation.y = 0;
  camera.rotation.x = -0.4;

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
    Math.random() * 500 - 250,
    -20,
    Math.random() * 500 - 250,
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