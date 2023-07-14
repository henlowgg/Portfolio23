import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, Environment, Lightformer, MeshTransmissionMaterial, RenderTexture } from '@react-three/drei'

export const App = () => (
  <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
    <FrostedGlass>
      <OrthographicCamera makeDefault position={[0, 0, 100]} zoom={110} />
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[4.25, 64, 64]} />
        <meshStandardMaterial color="#333" envMapIntensity={0.5} metalness={0.1} roughness={0.3} />
      </mesh>
      <Ambience />
    </FrostedGlass>
  </Canvas>
)

function Ambience() {
  // Swirl camera around (we're inside the render texture)
  // Slowed down more and more , 10 seems the best for ambiance 
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime / 10
    state.camera.position.set(Math.sin(t) * Math.PI * 10, Math.atan(t) * Math.PI * 4, Math.cos(t) * Math.PI * 10)
    state.camera.lookAt(0, 0, 0)
  })
  // Render a custom environment map, this is what the sphere reflects
  return (
    <Environment preset="city" resolution={1080}>
      <group rotation={[-Math.PI / 4, 0, 0]}>
        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
          <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[10, 1, 1]} />
        ))}
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[100, 1, 1]} />
        <Lightformer intensity={6} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[100, 1, 1]} />
        <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[100, 1, 1]} />
      </group>
    </Environment>
  )
}

function FrostedGlass({ children }) {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      <MeshTransmissionMaterial samples={10} thickness={0.075} chromaticAberration={0} anisotropy={1} roughness={1}>
        <RenderTexture attach="buffer">{children}</RenderTexture>
      </MeshTransmissionMaterial>
    </mesh>
  )
}