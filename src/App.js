import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls } from '@react-three/drei'
import Laptop from './Laptop'

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [rposition, setrPosition] = useState({ rx: 0, ry: 0, rz: 0 })
  const { x, y, z } = position
  const { rx, ry, rz } = rposition

  return (
    <>
      <div className="controls">
        <label>x</label>
        <input onChange={(e) => setPosition({ ...position, x: e.target.value })} value={position.x} type="number" />
        <label>y</label>
        <input onChange={(e) => setPosition({ ...position, y: e.target.value })} value={position.y} type="number" />
        <label>z</label>
        <input onChange={(e) => setPosition({ ...position, z: e.target.value })} value={position.z} type="number" />
      </div>
      <div className="controls">
        <label>x</label>
        <input onChange={(e) => setrPosition({ ...rposition, rx: e.target.value })} value={rposition.rx} type="number" />
        <label>y</label>
        <input onChange={(e) => setrPosition({ ...rposition, ry: e.target.value })} value={rposition.ry} type="number" />
        <label>z</label>
        <input onChange={(e) => setrPosition({ ...rposition, rz: e.target.value })} value={rposition.rz} type="number" />
      </div>
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
              <Laptop x={x} y={y} z={z} rx={rx} ry={ry} rz={rz} />
            </group>
            <Environment preset="city" />
          </Suspense>
        </PresentationControls>
      </Canvas>
    </>
  )
}
