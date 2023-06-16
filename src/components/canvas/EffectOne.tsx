import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export default function EffectOne() {
  return (
    <>
      <EffectComposer>

        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          height={600}
          opacity={3}
        />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}
