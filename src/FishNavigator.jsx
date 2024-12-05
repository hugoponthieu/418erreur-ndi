import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

function FishNavigator(props) {
  const ref = useRef()
  const { scene, animations } = useGLTF('/fish.glb')
  const { actions } = useAnimations(animations, ref)
  const [targetPosition, setTargetPosition] = React.useState(new THREE.Vector3())
  const [isMoving, setIsMoving] = React.useState(false)

  const { camera, gl } = useThree()

  React.useEffect(() => {
    const handleClick = (event) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0) // y = 0 plane
      const intersectPoint = new THREE.Vector3(0,-40,0)
      raycaster.ray.intersectPlane(plane, intersectPoint)

      setTargetPosition(intersectPoint)
      ref.current.lookAt(intersectPoint.x, intersectPoint.y, intersectPoint.z)
    }

    gl.domElement.addEventListener('click', handleClick)

    return () => {
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [camera, gl])

  const playLastPartOfSwim = () => {
    const swimAction = actions['swim']
    if (swimAction) {
      const totalDuration = swimAction.getClip().duration
      const startTime = totalDuration - 1.36 // Start time for the last 1.36 seconds
      const segmentDuration = 1.36 // Duration of the loop segment
  
      swimAction.reset()
      swimAction.setLoop(THREE.LoopRepeat) // Set to repeat the segment
      swimAction.clampWhenFinished = false
      swimAction.timeScale = 1 // Normal speed
  
      // Set up time restrictions for the loop
      swimAction.time = startTime // Start at the last 1.36 seconds
      swimAction.play()
  
      // Update mixer to restrict the animation's playback within the desired range
      const mixer = swimAction.getMixer()
      mixer.addEventListener('loop', (e) => {
        if (e.action === swimAction) {
          swimAction.time = startTime // Reset time to keep looping the segment
        }
      })
    }
  }
  

  useFrame((_, delta) => {
    if (!ref.current) return
  
    const currentPosition = ref.current.position
    const direction = new THREE.Vector3().subVectors(targetPosition, currentPosition)
    const distance = direction.length()
    const moveDistance = Math.min(distance, delta * 10) // Adjust speed
  
    if (distance > 0.1) {
      if (!isMoving) {
        playLastPartOfSwim() // Play and loop the last 1.36 seconds of the swim animation
        setIsMoving(true)
      }
  
      direction.normalize()
      currentPosition.addScaledVector(direction, moveDistance)
    } else {
      if (isMoving) {
        const swimAction = actions['swim']
        const mixer = swimAction?.getMixer()
        mixer?.removeEventListener('loop') // Clean up to prevent stacking
        swimAction?.stop()
        actions['idle']?.reset().play()
        setIsMoving(false)
      }
    }
  })
  

  return <primitive ref={ref} object={scene} {...props} />
}

export default FishNavigator
