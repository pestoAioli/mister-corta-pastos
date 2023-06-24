import { Lights } from "@/components/canvas/Lights";
import Loading from "@/components/canvas/Loading";
import { Cloud, Html, KeyboardControls, Sky, Stars, Text, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import dynamic from "next/dynamic";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import useWindowSize from '@/helpers/useWindowSize';
import { isMobile } from "react-device-detect";

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
const floor1Material = new THREE.MeshStandardMaterial({ color: 'mediumseagreen' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'palegreen' })
const boxGeometry = new THREE.BoxGeometry(25, 0.2, 24);
const bumperGeometry = new THREE.IcosahedronGeometry(0.8, 4);
const wallGeometry = new THREE.BoxGeometry(0.3, 2.2, 47.6);
const wallGeometryTwo = new THREE.BoxGeometry(25.2, 2.2, 0.3);
// DOM elements here
const DOM = () => {
  const [hello, setHello] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHello(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ marginLeft: 4, transition: '3s', opacity: hello ? 1 : 0 }}>
      {/*eslint-disable-next-line react/no-unescaped-entities*/}
      <h1>Welcome to Ricardo's portfolio!</h1>
      <p>· WASD to move around </p>
      <p>· Click 3D text to learn more </p>
    </div>
  );
};

// Canvas/R3F components here
const R3F = () => {
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  const hereHeIs = useRef<any>({ x: 12, z: -12 });
  const boyWhereAreYuo = (position) => {
    const adjustCoords = { x: 0, z: 0 };
    adjustCoords.x = Math.floor(position.x)
    adjustCoords.z = Math.floor(position.z)
    hereHeIs.current = adjustCoords;
  }

  useFrame((state, delta) => {
    state.scene.children.map((x, i) => {
      //TODO: maybe make it chek the hereHeIs z - 1 so its like under the mower but have to account for when hes sideways
      if (x.userData.x === hereHeIs.current.x && x.userData.z === hereHeIs.current.z - 1) {
        state.scene.children[i].removeFromParent();
      }
    })
  })

  return (
    <Suspense fallback={<Loading />}>
      <KeyboardControls map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}>
        <Sky azimuth={0.5} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
        <fog attach="fog" args={['black', 90, 150]} />
        {arrayToMap.map((x, i) => (
          < Grass userData={{ x: Math.floor(i % 24 - 11.7), z: (Math.floor(i / 24)) }}
            position={[i % 24 - 11.7, x, Math.floor(i / 24)]} key={i * Math.PI} />
        ))}
        <Physics gravity={[0, -12.81, 0]}>
          <Lights />
          <MisterPastos func={boyWhereAreYuo} />
          <RigidBody type="fixed">
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 0]} receiveShadow />
            <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 24]} receiveShadow />
          </RigidBody>
          {/* paredes */}
          <Suspense fallback={null}>
            <RigidBody>
              <Text3D castShadow size={3} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                onClick={() => window.open("https://ezequiel4.online/RRMC4.pdf", "_blank")} rotation-y={0.3} position={[-12, 12, 7]}>
                resume
                <meshStandardMaterial color="orange" />
              </Text3D>
            </RigidBody>
            <RigidBody>
              <Text3D castShadow size={3} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                onClick={() => window.open("https://ezequiel4.online/two", "_blank")} rotation-y={-0.3} position={[-4, 12, 12]}>
                about me
                <meshStandardMaterial color="orange" />
              </Text3D>
            </RigidBody>
            <RigidBody>
              <Text3D castShadow size={2.2} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                onClick={() => window.open("https://g-0-l.vercel.app", "_blank")} position={[-3, 12, -10]}>
                game of life
                <meshStandardMaterial color="orange" />
              </Text3D>
            </RigidBody>
            <RigidBody>
              <Text3D castShadow size={2} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                onClick={() => window.open("https://curbs-your-enthusiasm.vercel.app", "_blank")} position={[-9, 12, -7]}>
                curbs
                <meshStandardMaterial color="orange" />
              </Text3D>
            </RigidBody>
          </Suspense>
          <RigidBody type="fixed" restitution={0.2} friction={0.5}>
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
              position={[-0.1, 0.6, 35.86]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
            <mesh
              position={[-0.1, 0.6, -12]}
              geometry={wallGeometryTwo}
              material={wallMaterial}
              receiveShadow
            />
          </RigidBody>
          <Ball position={[-7, 0, 10]} />
        </Physics>
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
