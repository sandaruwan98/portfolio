import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls } from '@react-three/drei'
import Laptop from './Laptop'

export default function App() {
  return (
    <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} /> */}
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Suspense fallback={null}>
          <group rotation={[-0.4, Math.PI * 1.2, 0]} position={[1.3, 0.5, -4]}>
            <Laptop />
          </group>
          <Environment preset="city" />
        </Suspense>
      </PresentationControls>
    </Canvas>
  )
}
