import * as THREE from 'three';
import vertexShader from './ShaderExample/shaders/grass.vert';
import fragmentShader from './ShaderExample/shaders/grass.frag';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import React, { useRef, useMemo, Suspense, useEffect } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { Geometry } from "three/examples/jsm/deprecated/Geometry";
import Loading from './Loading';
//These have been taken from "Realistic real-time grass rendering" by Eddie Lee, 2010

const GrassMaterial = shaderMaterial(
  {
    bladeHeight: 1,
    map: null,
    alphaMap: null,
    time: 0,
    //@ts-ignore
    tipColor: new THREE.Color(0.0, 0.6, 0.0).convertSRGBToLinear(),
    //@ts-ignore
    bottomColor: new THREE.Color(0.0, 0.1, 0.0).convertSRGBToLinear(),
  },
  vertexShader,
  fragmentShader,
  (self: any) => {
    self.side = THREE.DoubleSide
  },
);

extend({ GrassMaterial });

export default function Grass({ options = { bW: 0.02, bH: 0.3, joints: 5 }, width = 1.1, instances = 222, ...props }) {
  const { bW, bH, joints } = options
  const materialRef = useRef<any>()
  const [texture, alphaMap] = useLoader(THREE.TextureLoader, ["/blade_diffuse.jpg", "/blade_alpha.jpg"])
  const attributeData = useMemo(() => getAttributeData(instances, width), [instances, width])
  const baseGeom = useMemo(() => new THREE.PlaneBufferGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0), [options])
  useFrame((state) => {
    materialRef.current.uniforms.time.value = state.clock.elapsedTime / 4
    // console.log(state.raycaster)
  })
  return (
    <Suspense fallback={null}>
      <group {...props}>
        <mesh>
          <instancedBufferGeometry index={baseGeom.index} attributes-position={baseGeom.attributes.position} attributes-uv={baseGeom.attributes.uv}>
            <instancedBufferAttribute attach="attributes-offset" args={[new Float32Array(attributeData.offsets), 3]} />
            <instancedBufferAttribute attach="attributes-orientation" args={[new Float32Array(attributeData.orientations), 3]} />
            <instancedBufferAttribute attach="attributes-stretch" args={[new Float32Array(attributeData.stretches), 1]} />
            <instancedBufferAttribute attach="attributes-halfRootAngleSin" args={[new Float32Array(attributeData.halfRootAngleSin), 1]} />
            <instancedBufferAttribute attach="attributes-halfRootAngleCos" args={[new Float32Array(attributeData.halfRootAngleCos), 1]} />
          </instancedBufferGeometry>
          {/*@ts-ignore*/}
          <grassMaterial ref={materialRef} map={texture} alphaMap={alphaMap} toneMapped={false} />
        </mesh>
      </group>
    </Suspense>
  )
}

function getAttributeData(instances, width) {
  const offsets = []
  const orientations = []
  const stretches = []
  const halfRootAngleSin = []
  const halfRootAngleCos = []

  let quaternion_0 = new THREE.Vector4()
  let quaternion_1 = new THREE.Vector4()

  //The min and max angle for the growth direction (in radians)
  const min = -0.25
  const max = 0.25

  //For each instance of the grass blade
  for (let i = 0; i < instances; i++) {
    //Offset of the roots
    const offsetX = Math.random() * width - width / 2
    const offsetZ = Math.random() * width - width / 2
    const offsetY = getYPosition(offsetX, offsetZ)
    offsets.push(offsetX, offsetY, offsetZ)

    //Define random growth directions
    //Rotate around Y
    let angle = Math.PI - Math.random() * (2 * Math.PI)
    halfRootAngleSin.push(Math.sin(0.5 * angle))
    halfRootAngleCos.push(Math.cos(0.5 * angle))

    let RotationAxis = new THREE.Vector3(0, 1, 0)
    let x = RotationAxis.x * Math.sin(angle / 2.0)
    let y = RotationAxis.y * Math.sin(angle / 2.0)
    let z = RotationAxis.z * Math.sin(angle / 2.0)
    let w = Math.cos(angle / 2.0)
    quaternion_0.set(x, y, z, w).normalize()

    //Rotate around X
    angle = Math.random() * (max - min) + min
    RotationAxis = new THREE.Vector3(1, 0, 0)
    x = RotationAxis.x * Math.sin(angle / 2.0)
    y = RotationAxis.y * Math.sin(angle / 2.0)
    z = RotationAxis.z * Math.sin(angle / 2.0)
    w = Math.cos(angle / 2.0)
    quaternion_1.set(x, y, z, w).normalize()

    //Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

    //Rotate around Z
    angle = Math.random() * (max - min) + min
    RotationAxis = new THREE.Vector3(0, 0, 1)
    x = RotationAxis.x * Math.sin(angle / 2.0)
    y = RotationAxis.y * Math.sin(angle / 2.0)
    z = RotationAxis.z * Math.sin(angle / 2.0)
    w = Math.cos(angle / 2.0)
    quaternion_1.set(x, y, z, w).normalize()

    //Combine rotations to a single quaternion
    quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1)

    orientations.push(quaternion_0.x, quaternion_0.y, quaternion_0.z, quaternion_0.w)

    //Define variety in height
    if (i < instances / 3) {
      stretches.push(Math.random() * 1.8)
    } else {
      stretches.push(Math.random())
    }
  }

  return {
    offsets,
    orientations,
    stretches,
    halfRootAngleCos,
    halfRootAngleSin,
  }
}

function multiplyQuaternions(q1, q2) {
  const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
  const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
  const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
  const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
  return new THREE.Vector4(x, y, z, w)
}

function getYPosition(x, z) {
  return 0
}
