import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Lights({ movedOn }) {
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
      {!movedOn ?
        <directionalLight
          ref={lightRef}
          castShadow
          position={[3, 6, 1]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-top={20}
          shadow-camera-right={20}
          shadow-camera-bottom={- 20}
          shadow-camera-left={- 20}
        />
        : <pointLight
          ref={lightRef}
          castShadow
          position={[3, -36, 1]}
          intensity={1}
        />
      }
    </>
  )
}
