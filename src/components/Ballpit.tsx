"use client"

import * as THREE from "three"
import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { BallCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { PointerProps, SphereProps } from "@/types/types"
import { useRouter } from "next/navigation"

export const Ballpit = () => {
  const map404 = useLoader(THREE.TextureLoader, '/404.png')
  return (
    <Canvas 
    shadows
    orthographic
    camera={{ position: [0, 0, 100], zoom: 100}}
    onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
    >
    <ambientLight intensity={1} />
    <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
    <directionalLight position={[0, 5, -4]} intensity={4} />
    <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
    <Suspense>
      <Physics /*debug*/ gravity={[0, -20, 0]}>
            <Pointer />
            {[...Array(60)].map((_, i) => (
              <Sphere
              setClicked={()=> null}
              isClicked={false}
              key={i}
              textureMap={map404} // Even index -> projectMap, Odd index -> contactsMap
              color={"white"}
              />
            ))}
            <Borders/>
        </Physics>
    </Suspense>
    </Canvas>
  )
}

function Pointer({ vec = new THREE.Vector3() }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null); 
   useFrame(({ pointer, viewport }) => ref.current?.setNextKinematicTranslation(vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)))
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Borders() {
  const { viewport } = useThree();
const thickness = 0.05
  return (
    <>
      <RigidBody type="fixed">
        {/* Bottom Border */}
        <mesh position={[0, -viewport.height / 2, 0]}>
          <boxGeometry args={[viewport.width, thickness, viewport.height]} />
          <meshStandardMaterial color="white" transparent/>
        </mesh>

        {/* Left Border */}
        <mesh position={[-viewport.width / 2, 0, 0]}>
          <boxGeometry args={[thickness, viewport.height, viewport.height]} />
          <meshStandardMaterial color="white" transparent/>
        </mesh>

        {/* Right Border */}
        <mesh position={[viewport.width / 2, 0, 0]}>
          <boxGeometry args={[thickness, viewport.height, viewport.height]} />
          <meshStandardMaterial color="white" transparent />
        </mesh>

        {/* Front Border */}
        <mesh position={[0, 0, viewport.height / 2]}>
          <boxGeometry args={[viewport.width, viewport.height, thickness]} />
          <meshStandardMaterial color="white" transparent opacity={0} />
        </mesh>

        {/* Back Border */}
        <mesh position={[0, 0, -viewport.height / 2]}>
          <boxGeometry args={[viewport.width, viewport.height, thickness]} />
          <meshStandardMaterial color="white" transparent opacity={0}/>
        </mesh>
      </RigidBody>
    </>
  );
}

function Sphere({vec = new THREE.Vector3(), scale = 1, r = THREE.MathUtils.randFloatSpread,textureMap }: SphereProps) {

  const api = useRef<RapierRigidBody>(null); 
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => [r(10), r(10), r(10)], [])
  const [hover, setHover] = useState(false)

  const router = useRouter()

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    api.current?.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
        true
    )
  })

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh 
      onClick={() => {
        router.push("/")
      }} 
      ref={ref} 
      castShadow 
      receiveShadow
      onPointerOver={(event) => (event.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
              >        
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={hover ? "white": "orange"} roughness={0.1} envMapIntensity={1}  map={textureMap}/>
      </mesh>
    </RigidBody>
  );
}

export default Ballpit
