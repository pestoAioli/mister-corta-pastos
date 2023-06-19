import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { A11yAnnouncer } from "@react-three/a11y";
import { OrbitControls, Preload, Stats } from "@react-three/drei";

const Controls = () => {
  const control = useRef(null);
  return <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} ref={control} />;
};
const CanvasWrapper = ({ children }) => {
  return (
    <>
      <Canvas
        shadows
        // Is this deprecated or typed wrong? Ignoring for now.
        // @ts-ignore
        mode="concurrent"
        style={{
          position: "absolute",
          top: 0,
        }}
      >
        <Controls />
        <Preload all />
        {children}
      </Canvas>
      <A11yAnnouncer />
    </>
  );
};

export default CanvasWrapper;
