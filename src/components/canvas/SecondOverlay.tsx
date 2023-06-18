import { Html } from "@react-three/drei";
import { OverlayMaterial } from "./Loading";

export default function OverlayTwo({ onEnterClick }) {
  return (
    <>
      <Html center style={{
        border: '3px solid white',
        color: 'white',
        cursor: 'pointer',
        padding: '12px 24px',
      }}
      >
        <h2 onClick={onEnterClick}>
          enter
        </h2>
      </Html>
      <mesh>
        <planeGeometry args={[2, 2]} />
        {/*@ts-ignore*/}
        <overlayMaterial />
      </mesh>
    </>
  )
}
