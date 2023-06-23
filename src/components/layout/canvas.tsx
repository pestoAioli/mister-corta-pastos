import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { A11yAnnouncer } from "@react-three/a11y";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import useWindowSize from "@/helpers/useWindowSize";

const Controls = () => {
  const control = useRef(null);
  return <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} ref={control} />;
};
const CanvasWrapper = ({ children }) => {
  const [fade, setFade] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    const time = setTimeout(() => {
      setFade(true)
    }, 1500)
    return () => clearTimeout(time)
  }, [])
  return (
    <div style={{ opacity: fade ? 1 : 0, transition: '3s', height: size.height ? size.height : '100%', width: size.width ? size.width : '100%' }}>
      <Canvas
        shadows
        // Is this deprecated or typed wrong? Ignoring for now.
        // @ts-ignore
        mode="concurrent"
        style={{
          top: 0,
        }}
      >
        <Controls />
        <Preload all />
        {children}
      </Canvas>
      <A11yAnnouncer />
    </div>
  );
};

export default CanvasWrapper;
