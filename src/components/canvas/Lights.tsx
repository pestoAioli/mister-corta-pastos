import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Lights() {
  const lightRef = useRef<any>(null);
  useFrame((state) => {
    lightRef.current.position.z = state.camera.position.z + 1 - 3
    if (lightRef.current.target) {
      lightRef.current.target.position.z = state.camera.position.z - 3
      lightRef.current.target.updateMatrixWorld()
    }
  })
  return (
    <>
      <ambientLight intensity={.1} />
      <directionalLight
        ref={lightRef}
        castShadow
        position={[3, 6, 1]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={60}
        shadow-camera-right={60}
        shadow-camera-bottom={- 120}
        shadow-camera-left={- 20}
      />
    </>
  )
}
