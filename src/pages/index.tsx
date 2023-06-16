import { Lights } from "@/components/canvas/Lights";
import { KeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import dynamic from "next/dynamic";
import { Perf } from "r3f-perf";
import * as THREE from 'three';

const MisterPastos = dynamic(() => import("@/components/canvas/MisterPastos"), {
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
const boxGeometry = new THREE.BoxGeometry(24.2, 0.2, 24);
const bumperGeometry = new THREE.IcosahedronGeometry(0.8, 4);
const wallGeometry = new THREE.BoxGeometry(0.3, 1.2, 48);
const wallGeometryTwo = new THREE.BoxGeometry(24.2, 1.2, 0.3);
// DOM elements here
const DOM = () => {
  return <></>;
};

// Canvas/R3F components here
const R3F = () => {

  return (
    <>
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
          < Grass position={[i % 24 - 11.7, x, Math.floor(i / 24) - 12]} key={i * Math.PI} />
        ))}
        <Physics>
          <Lights />
          <MisterPastos />
          <RigidBody type="fixed">
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 0]} receiveShadow />
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, -24]} receiveShadow />
          </RigidBody>
          {/* paredes */}
          <RigidBody type="fixed" restitution={0.2} friction={0}>
            <mesh
              position={[12, 0.6, -12.1]}
              geometry={wallGeometry}
              material={wallMaterial}
              castShadow
            />
            <mesh
              position={[-11.86, 0.6, -12.1]}
              geometry={wallGeometry}
              material={wallMaterial}
              receiveShadow
            />
            <mesh
              position={[0, 0.6, 11.86]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
            <mesh
              position={[0, 0.6, -36]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
          </RigidBody>
          <RigidBody>
            <mesh
              position={[0, 0, -1]}
              geometry={bumperGeometry}
              material={wallMaterial}
              receiveShadow
              castShadow
            />
          </RigidBody>
          <RigidBody>
            <mesh
              position={[-0.5, 0, -2]}
              geometry={bumperGeometry}
              material={wallMaterial}
              receiveShadow
              castShadow
            />
          </RigidBody>
          <RigidBody>
            <mesh
              position={[2, 0, -4]}
              geometry={bumperGeometry}
              material={wallMaterial}
              receiveShadow
              castShadow
            />
          </RigidBody>
          <RigidBody>
            <mesh
              position={[-1, 0, -8]}
              geometry={bumperGeometry}
              material={wallMaterial}
              receiveShadow
              castShadow
            />
          </RigidBody>
        </Physics>
        <EffectOne />
        <Perf />
      </KeyboardControls>

    </>
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
      title: "Welcome!",
    },
  };
}
