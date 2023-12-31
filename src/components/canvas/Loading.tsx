import { Html, shaderMaterial, useProgress } from "@react-three/drei"
import vertexShader from '@/components/canvas/ShaderExample/shaders/overlay.vert'
import fragmentShader from '@/components/canvas/ShaderExample/shaders/overlay.frag'
import * as THREE from 'three';
import { extend } from "@react-three/fiber";

const OverlayMaterial = shaderMaterial(
  {},
  vertexShader,
  fragmentShader,
  (self: any) => {
    self.side = THREE.DoubleSide
  }
)
extend({ OverlayMaterial });


export default function Loading() {
  const progress = useProgress();
  return (
    <>
      <Html style={{
        color: 'white'
      }} center>{Math.floor(progress.progress)} % loaded</Html>
      <mesh>
        <planeGeometry args={[2, 2]} />
        {/*@ts-ignore*/}
        <overlayMaterial />
      </mesh>
    </>
  )
}
