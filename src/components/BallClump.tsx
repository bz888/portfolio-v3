"use client"

import * as THREE from 'three';
import { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, RapierRigidBody } from '@react-three/rapier';
import { PointerProps, SphereProps } from '@/types/types';
import { degreesToRadians } from '@/helper/globalHelper';
import { CameraControls, Preload} from '@react-three/drei'
import { usePathname, useRouter } from 'next/navigation';
import { useBallClump } from '@/hooks/BallClumpProvider';
import { CONTACT_BALL_COLOUR, HOVER_BALL_COLOUR, PROJECT_BALL_COLOUR } from '@/globalConstant';


export default function BallClump() {
  const initPosition =  new THREE.Vector3(0, 0, 25)
  const {isClicked, setClicked} = useBallClump()
  const pathname = usePathname()

  return (
    <Canvas
    shadows
    gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
    camera={{ position: [0, 20, 20], fov: 32.5, near: 1, far: 100 }}
    onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
      
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
    <directionalLight position={[0, 5, -4]} intensity={4} />
    <directionalLight position={[0, -15, -0]} intensity={4} color="orange" />
    <Rig clicked={isClicked} position={initPosition} path={pathname}/>
    <Suspense fallback={null}>
      <Physics /*debug*/ timeStep="vary" gravity={isClicked ? [0,-100, 0]:[0, 0, 0]}>
        <Pointer />
          <RotatingGroup isClicked={isClicked} setClicked={setClicked}/>
        <Plane/>
      </Physics>
    </Suspense>
    <Preload all />
  </Canvas>
  );
}

type RigProp = {
  position: THREE.Vector3;
  focus?: THREE.Vector3;
  clicked: boolean;
  path: string
}

function Rig({
  position,
  focus = new THREE.Vector3(0, 0, 0),
  clicked,
  path
}: RigProp) {
  const { controls } = useThree();

  useEffect(() => {
    if (clicked) {
      if (path === "/projects") {

        
        position.set(-20, 20, 50);
        focus.set(-12, -3, 0);
      } else {
        position.set(20, 10, 0);
        focus.set(0, 0, 0);
      }
    } else {
      position.set(0, 0, -30);
      focus.set(0, 0, 0);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (controls as any)?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [clicked, controls, focus, position]);

  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
}


type RotatingGroupProp = {
  setClicked: (clicked: boolean) => void;
  isClicked: boolean;
}

function RotatingGroup({setClicked, isClicked}: RotatingGroupProp) {
  const groupRef = useRef<THREE.Group>(null);

  const projectMap = useLoader(THREE.TextureLoader, '/projects.png')
  const contactsMap = useLoader(THREE.TextureLoader, '/contacts.png')

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(time / 8);
      groupRef.current.rotation.y = Math.sin(time / 6);
    }
  });
  return (
    <group ref={groupRef}>
    {[...Array(40)].map((_, i) => (
      <Sphere
        setClicked={setClicked}
        isClicked={isClicked}
        key={i}
        textureMap={i % 2 === 0 ? projectMap : contactsMap} // Even index -> projectMap, Odd index -> contactsMap
        color={
          i % 2 === 0
            ? PROJECT_BALL_COLOUR // project
            : CONTACT_BALL_COLOUR // contacts
        }
      />
    ))}
    </group>
  );
}

function Plane() {
  const { viewport } = useThree();
  const thickness = 1

  return (
    <RigidBody type='fixed'>
      <mesh position={[5, -10, 10]} rotation={[0, 0, degreesToRadians(0)]}>
        <boxGeometry args={[viewport.width + 50, thickness, viewport.height + 50]} />
        <meshStandardMaterial color="pink" transparent opacity={0}/>
      </mesh>
    </RigidBody>
  )
}

function Sphere({color, textureMap, vec = new THREE.Vector3(), scale = 1, r = THREE.MathUtils.randFloatSpread, setClicked, isClicked }: SphereProps) {

  const api = useRef<RapierRigidBody>(null);
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => [r(50), r(50), r(50)], [])
  const [hover, setHover] = useState(false)

  const router = useRouter()
  const handleNavigate = () => {
    if (color !== CONTACT_BALL_COLOUR) {
      router.push('/projects')
      return
    }
    router.push('/contacts')
 
   }

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
      friction={1.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh 
      onClick={() => {
        setClicked(!isClicked)
        handleNavigate()
      }} 
      ref={ref} 
      castShadow 
      receiveShadow
      scale={hover ? 1.5 : 1}
      onPointerOver={(event) => (event.stopPropagation(), setHover(true))}
      onPointerOut={() => setHover(false)}
      >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
      map={textureMap}
      color={hover ? HOVER_BALL_COLOUR: color}
      roughness={hover ? 0.1 : 0.9}
      envMapIntensity={1}
      >
        </meshStandardMaterial>
      </mesh>
    </RigidBody>
  );
}


function Pointer({ vec = new THREE.Vector3()}: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  useFrame(({ pointer, viewport }) => ref.current?.setNextKinematicTranslation(vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)))
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}