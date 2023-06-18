import { Lights } from "@/components/canvas/Lights";
import Loading from "@/components/canvas/Loading";
import OverlayTwo from "@/components/canvas/SecondOverlay";
import { KeyboardControls, useProgress, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import dynamic from "next/dynamic";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { TextureLoader } from "three";

const MisterPastos = dynamic(() => import("@/components/canvas/MisterPastos"), {
  ssr: false,
})
const Ball = dynamic(() => import("@/components/canvas/Ball"), {
  ssr: false,
})
const EffectOne = dynamic(() => import("@/components/canvas/EffectOne"), {
  ssr: false,
});

const Grass = dynamic(() => import("@/components/canvas/Grass"), {
  ssr: false,
})

const arrayToMap = Array(576).fill(0);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'skyblue' })
const boxGeometry = new THREE.BoxGeometry(25, 0.2, 24);
const bumperGeometry = new THREE.IcosahedronGeometry(0.8, 4);
const wallGeometry = new THREE.BoxGeometry(0.3, 1.2, 48);
const wallGeometryTwo = new THREE.BoxGeometry(25, 1.2, 0.3);
// DOM elements here
const DOM = () => {
  return <>
  </>;
};

// Canvas/R3F components here
const R3F = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const hereHeIs = useRef<any>({ x: 12, z: -12 });
  const boyWhereAreYuo = (position) => {
    const adjustCoords = { x: 0, z: 0 };
    adjustCoords.x = Math.floor(position.x)
    adjustCoords.z = Math.floor(position.z)
    hereHeIs.current = adjustCoords;
  }
  useFrame((state) => {
    // console.log(state.scene.children)
    state.scene.children.map((x, i) => {
      //TODO: maybe make it chek the hereHeIs z - 1 so its like under the mower but have to account for when hes sideways
      if (x.userData.x === hereHeIs.current.x && x.userData.z === hereHeIs.current.z) {
        console.log(x.userData, hereHeIs.current, 'EUREKAAAAAAAAAAAAAAAAAAAA')
        state.scene.children[i].removeFromParent();
      }
    })
  })

  return (
    <Suspense fallback={<Loading />}>
      {!isLoaded ? <OverlayTwo onEnterClick={() => setIsLoaded(true)} /> : null}
      <KeyboardControls map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}>
        <color attach="background" args={[0, 0, 0]} />
        <fog attach="fog" args={['black', 90, 150]} />
        {arrayToMap.map((x, i) => (
          < Grass userData={{ x: Math.floor(i % 24 - 11.7), z: (Math.floor(i / 24) - 12) }} position={[i % 24 - 11.7, x, Math.floor(i / 24) - 12]} key={i * Math.PI} />
        ))}
        <Physics>
          <Lights />
          <MisterPastos func={boyWhereAreYuo} />
          <RigidBody type="fixed">
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 0]} receiveShadow />
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 24]} receiveShadow />
          </RigidBody>
          {/* paredes */}
          <RigidBody type="fixed" restitution={0.2} friction={0}>
            <mesh
              position={[12.3, 0.6, 12.1]}
              geometry={wallGeometry}
              material={wallMaterial}
              castShadow
            />
            <mesh
              position={[-12.5, 0.6, 12.1]}
              geometry={wallGeometry}
              material={wallMaterial}
              receiveShadow
            />
            <mesh
              position={[0, 0.6, 35.86]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
            <mesh
              position={[0, 0.6, -12]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
          </RigidBody>
          <RigidBody>
            <Ball position={[0, 2, 32]} />
          </RigidBody>
        </Physics>
        <EffectOne />
        <Perf />
      </KeyboardControls>
    </Suspense>
  );
};

export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Ricky <3's yuo :D",
    },
  };
}
