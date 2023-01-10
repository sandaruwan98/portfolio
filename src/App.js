import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls } from '@react-three/drei'
import Laptop from './Laptop'
import useWindowDimensions from './helpers/useWindowDimensions'

export default function App() {
  const [floating, setFloating] = useState(true)
  const [zoomed, setZoomed] = useState(false)

  const { height, width } = useWindowDimensions()

  return (
    <>
      {width < 1024 ? (
        <iframe width="100%" height="100%" src="portfoliohtml/index.html" />
      ) : (
        <>
          <div className="zoom-div">
            <button
              class="zoom-btn"
              onClick={() => {
                if (zoomed == false && floating == true) {
                  setFloating(false)
                  setZoomed(true)
                } else if (zoomed == true) {
                  setZoomed(false)
                  setTimeout(() => {
                    setFloating(true)
                  }, 700)
                }
              }}>
              {zoomed ? 'Zoom OUT' : 'Zoom IN'}
            </button>
          </div>
          <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            <PresentationControls
              global
              enabled={!zoomed}
              config={{ mass: 2, tension: 300 }}
              snap={{ mass: 4, tension: 500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
              <Suspense fallback={null}>
                <group rotation={[-0.4, Math.PI * 1.2, 0]} position={[1.3, 0.5, -4]}>
                  <Laptop zoomed={zoomed} floating={floating} />
                </group>
                <Environment preset="city" />
              </Suspense>
            </PresentationControls>
          </Canvas>
        </>
      )}
    </>
  )
}
