import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF, Text } from '@react-three/drei'
import Portfolio from './Portfolio'

export default function Laptop(props) {
  const vec = new THREE.Vector3(props.x, props.y, props.z)
  const vec1 = new THREE.Euler(props.rx, props.ry, props.rz)

  // const [zoomed, setZoomed] = useState(false)
  // const [floating, setFloating] = useState(true)

  const group = useRef()
  // Load model
  const { nodes, materials } = useGLTF('/mac-draco.glb')

  var { zoomed, floating } = props

  const initialpos = new THREE.Vector3(0, -1, 0)
  const initialrotation = new THREE.Vector3(0.2, 0, 0)
  const zoompos = new THREE.Vector3(-2.6, -0.75, 6)
  const zoomrotation = new THREE.Vector3(0.006, -0.6, -0.01)

  const color = new THREE.Color()
  const tcolor = new THREE.Color('#3b82f6')
  const fontProps = { font: '/Inter-Bold.woff', fontSize: 1.6, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const fontProps2 = { font: '/Inter-Bold.woff', fontSize: 1.3, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const textpos = new THREE.Vector3(5, 4.5, 4.3)
  const textpos2 = new THREE.Vector3(5, 2.8, 4.6)
  const textrot = new THREE.Euler(0, -1.6, 0)
  const textref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => setHovered(true)
  const out = () => setHovered(false)

  useFrame((state) => {
    textref.current.material.color.lerp(color.set(hovered ? '#3b82f6' : 'white'), 0.1)
    // textref.current.position.lerp(vec, 0.1)
    // textref.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, vec1.x, 0.1)
    // textref.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, vec1.y, 0.1)
    // textref.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, vec1.z, 0.1)

    const t = state.clock.getElapsedTime()
    if (floating) {
      // Make it float
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
    } else {
      if (zoomed) {
        group.current.position.lerp(zoompos, 0.1)
        // group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, zoompos.x, 0.1)
        // group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, zoompos.y, 0.1)
        // group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, zoompos.z, 0.1)

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, zoomrotation.x, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, zoomrotation.y, 0.1)
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, zoomrotation.z, 0.1)
      } else {
        group.current.position.lerp(initialpos, 0.1)
        // group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, initialpos.x, 0.1)
        // group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, initialpos.y, 0.1)
        // group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, initialpos.z, 0.1)

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, initialrotation.x, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, initialrotation.y, 0.1)
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, initialrotation.z, 0.1)

        // group.current.position.lerp(initialpos, 0.1)
        // group.current.rotation.lerp(initialrotation, 0.1)
        // group.current.position = THREE.MathUtils.lerp(group.current.position, initialpos, 0.1)
        // group.current.rotation = THREE.MathUtils.lerp(group.current.rotation, initialrotation, 0.1)
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Text
        color={tcolor}
        position={textpos}
        rotation={textrot}
        onPointerOver={over}
        onPointerOut={out}
        {...fontProps}
        children={'LAKSHAN'}
      />

      <Text
        position={textpos2}
        rotation={textrot}
        ref={textref}
        onPointerOver={over}
        onPointerOut={out}
        // onClick={() => console.log('clicked')}
        {...fontProps2}
        children={'JAYASINGHE'}
      />

      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            {/* Drei's HTML component can "hide behind" canvas geometry */}
            <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} scale={0.3} transform occlude>
              <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                <Portfolio />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}
