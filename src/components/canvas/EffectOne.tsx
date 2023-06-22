import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export default function EffectOne() {
  return (
    <>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={1.1}
          height={300}
          opacity={3}
        />
      </EffectComposer>
    </>
  )
}
