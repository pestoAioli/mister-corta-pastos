import { Lights } from "@/components/canvas/Lights";
import Loading from "@/components/canvas/Loading";
import { Html, KeyboardControls, Stars, Text, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import dynamic from "next/dynamic";
import { Perf } from "r3f-perf";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import useWindowSize from '@/helpers/useWindowSize';

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
  return <>
  </>;
};

// Canvas/R3F components here
const R3F = () => {

  const size = useWindowSize();
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  const [summary, setSummary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cutGrass = useRef(0);
  const [grassLooksNice, setGrassLooksNice] = useState(false);
  const [moveOn, setMoveOn] = useState(false);
  const hereHeIs = useRef<any>({ x: 12, z: -12 });
  const boyWhereAreYuo = (position) => {
    const adjustCoords = { x: 0, z: 0 };
    adjustCoords.x = Math.floor(position.x)
    adjustCoords.z = Math.floor(position.z)
    hereHeIs.current = adjustCoords;
  }
  const information = "Hi! Welcome to my portfolio. My name is Ricardo, but my friends call me Ricky. Use WASD(or your keyboard equivalent) to move around, and if you wish to learn more about my experience as a human, artist, and software engineer, please mow at least 20% of the lawn. Thank you for visiting! Have a wonderful day!"

  useFrame((state) => {
    // console.log(state.scene.children)
    state.scene.children.map((x, i) => {
      if (moveOn && Object.values(state.scene.children[i].userData).length) {
        state.scene.children[i].removeFromParent();
      }
      //TODO: maybe make it chek the hereHeIs z - 1 so its like under the mower but have to account for when hes sideways
      if (x.userData.x === hereHeIs.current.x && x.userData.z === hereHeIs.current.z - 1) {
        state.scene.children[i].removeFromParent();
        cutGrass.current += 1;
        if (cutGrass.current > 115) setGrassLooksNice(() => true)
        console.log(cutGrass.current)
      }
    })
  })

  return (
    <Suspense fallback={<Loading />}>
      {!isLoaded ?
        <Html center>
          <div style={{
            width: size.width ? size.width : '100%',
            height: size.height ? size.height : '100%',
            display: 'flex',
            backgroundColor: 'black',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <h2 style={{
              border: '3px solid white',
              padding: '12px 24px',
              color: 'white',
              cursor: 'pointer'
            }}
              onClick={() => setIsLoaded(true)}>enter</h2>
          </div>
        </Html>
        : null}
      <Text position={[8, 6.4, 20]} fontSize={0.6} anchorX="right" maxWidth={15}>{information}</Text>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
          < Grass userData={{ x: Math.floor(i % 24 - 11.7), z: (Math.floor(i / 24) - 10) }}
            position={[i % 24 - 11.7, x, Math.floor(i / 24) - 10]} key={i * Math.PI} />
        ))}
        <Physics gravity={[0, -12.81, 0]}>
          <Lights movedOn={moveOn} />
          <MisterPastos func={boyWhereAreYuo} />
          {grassLooksNice && !moveOn ?
            <Suspense fallback={null}>
              <RigidBody>
                <Text3D castShadow size={2} height={1} font={'/new-york-fixed.json'}
                  onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                  onClick={() => setMoveOn(true)} position={[-8, 10, -8]} >
                  Learn more :D
                  <meshStandardMaterial color="orange" />
                </Text3D>
              </RigidBody>
            </Suspense>
            : null}
          {!moveOn ?
            <RigidBody type="fixed">
              <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 0]} receiveShadow />
              <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.12, 24]} receiveShadow />
            </RigidBody>
            : null}
          {moveOn ?
            <RigidBody type="fixed">
              <mesh geometry={boxGeometry} material={floor1Material} position={[0, -44, 0]} receiveShadow />
              <mesh geometry={boxGeometry} material={floor1Material} position={[0, -44, 24]} receiveShadow />
            </RigidBody>
            : null}
          {/* paredes */}
          {moveOn ?
            <Suspense fallback={null}>
              <RigidBody>
                <Text3D castShadow size={2} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                  onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                  onClick={() => window.open("https://ezequiel4.online/RRMC4.pdf", "_blank")} position={[-1, -43, 0]}>
                  resume
                  <meshStandardMaterial color="orange" />
                </Text3D>
              </RigidBody>
              <RigidBody>
                <Text3D castShadow size={2} height={1} bevelThickness={10} font={'/new-york-fixed.json'}
                  onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                  onClick={() => window.open("https://ezequiel4.online/two", "_blank")} position={[-3, -43, 10]}>
                  about me
                  <meshStandardMaterial color="orange" />
                </Text3D>
              </RigidBody>
            </Suspense>
            : null}
          {!moveOn ?
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
            : null}
          {moveOn ?
            <RigidBody type="fixed" restitution={0.2} friction={0.5}>
              <mesh
                position={[12.3, -43.4, 12.1]}
                geometry={wallGeometry}
                material={wallMaterial}
                castShadow
              />
              <mesh
                position={[-12.5, -43.4, 12.1]}
                geometry={wallGeometry}
                material={wallMaterial}
                receiveShadow
              />
              <mesh
                position={[-0.1, -43.4, 35.86]}
                geometry={wallGeometryTwo}
                material={wallMaterial}
                receiveShadow
              />
              <mesh
                position={[-0.1, -43.4, -12]}
                geometry={wallGeometryTwo}
                material={wallMaterial}
                receiveShadow
              />
            </RigidBody>
            : null}
          <Ball position={[3, 0, 28]} />
        </Physics>
        <EffectOne />
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
