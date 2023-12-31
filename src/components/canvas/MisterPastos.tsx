import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
//@ts-ignore
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

import { GLTF } from "three-stdlib";
//@ts-ignore
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import Loading from "./Loading";
import { isMobile } from "react-device-detect";

type ActionName = "0StillPose" | "1Walking";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
};

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Root: THREE.Bone;
    IKLegPoleL: THREE.Bone;
    IkTargetL: THREE.Bone;
    IKLegPoleR: THREE.Bone;
    IkTargetR: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};
export default function MisterPastos(props: any) {
  const group = useRef<THREE.Group>(null);
  const boyBody = useRef<RapierRigidBody>(null);
  const isMoving = useRef<boolean>(false);
  const whereHeAt = useRef<any>(null);
  const { nodes, materials, animations } = useGLTF(
    "/lowpoly1_2.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations as any, group as any);

  const [_subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition, _] = useState(() => new THREE.Vector3())
  const [smoothedCameraTarget, __] = useState(() => new THREE.Vector3())
  const [mobileForward, setMobileForward] = useState(false);
  const [mobileBackward, setMobileBackward] = useState(false);
  const [mobileLeft, setMobileLeft] = useState(false);
  const [mobileRight, setMobileRight] = useState(false);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys()
    const impulse = { x: 0, y: 0, z: 0 }
    // const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 300 * delta
    if (isMoving.current === true) {
      actions["1Walking"]?.play();
    } else {
      actions["1Walking"]?.stop();
    }

    if (forward || mobileForward) {

      impulse.z -= impulseStrength
      isMoving.current = true;
    }

    if (rightward || mobileRight) {

      impulse.x += impulseStrength
      isMoving.current = true;
    }

    if (backward || mobileBackward) {

      impulse.z += impulseStrength
      isMoving.current = true;
    }

    if (leftward || mobileLeft) {

      impulse.x -= impulseStrength
      isMoving.current = true;
    }
    if (!isMobile) {
      if (!leftward && !rightward && !forward && !backward && isMoving.current) {
        isMoving.current = false;
      }
    }
    if (!mobileLeft && !mobileRight && !mobileForward && !mobileBackward && isMoving.current && !leftward && !rightward && !forward && !backward) {
      isMoving.current = false;
    }
    boyBody.current?.applyImpulse(impulse, true)

    const bodyPosition = boyBody.current?.translation() as any;
    const cameraPosition = new THREE.Vector3();
    if (bodyPosition) cameraPosition.copy(bodyPosition);
    if (bodyPosition) props.func(bodyPosition);
    cameraPosition.z += 12.12;
    cameraPosition.y += 5.55;
    const cameraTarget = new THREE.Vector3();
    if (bodyPosition) cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;
    smoothedCameraPosition.lerp(cameraPosition, 0.1)
    smoothedCameraTarget.lerp(cameraTarget, 0.1)
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  })
  return (
    <Suspense fallback={null}>
      <RigidBody name="MisterPastos" ref={boyBody} position={[0, 0, 22]} rotation={[0, 3.1415926, 0]} linearDamping={1} restitution={-2}>
        <group ref={group} {...props} dispose={null}>
          <group name="Model">
            <group name="Armature">
              <primitive object={nodes.Root} />
              <primitive object={nodes.IKLegPoleL} />
              <primitive object={nodes.IkTargetL} />
              <primitive object={nodes.IKLegPoleR} />
              <primitive object={nodes.IkTargetR} />
              <skinnedMesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials.Material}
                skeleton={nodes.Cube.skeleton}
                castShadow
              />
            </group>
          </group>
        </group>
      </RigidBody>
      {isMobile ?
        <Html style={{
          marginTop: 200,
          fontSize: 50
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{ marginBottom: -6, border: 'none', background: 'none', padding: 0, userSelect: 'none' }} onTouchStart={() => setMobileForward(true)} onTouchEnd={() => setMobileForward(false)}>⬆️</button>
          </div>
          <div style={{ display: 'flex' }}>
            <button style={{ border: 'none', background: 'none', padding: 0, userSelect: 'none' }} onTouchStart={() => setMobileLeft(true)} onTouchEnd={() => setMobileLeft(false)} >⬅️</button>
            <button style={{ border: 'none', background: 'none', padding: 0, userSelect: 'none' }} onTouchStart={() => setMobileBackward(true)} onTouchEnd={() => setMobileBackward(false)} >⬇️</button>
            <button style={{ border: 'none', background: 'none', padding: 0, userSelect: 'none' }} onTouchStart={() => setMobileRight(true)} onTouchEnd={() => setMobileRight(false)} >➡️</button>
          </div>
        </Html>
        : null}
    </Suspense>
  );
}

useGLTF.preload("/lowpoly1_2.glb");
