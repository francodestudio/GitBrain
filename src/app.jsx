import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Edges } from "@react-three/drei";

function Brain() {
  const { nodes } = useGLTF("/brain.glb");
  
  return (
    <group>
      {Object.values(nodes).map((node, i) => (
        <mesh key={i} geometry={node.geometry}>
          <meshBasicMaterial color="white" />
          <Edges color="white" />
        </mesh>
      ))}
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 500] }}>
      <ambientLight intensity={0.5} />
      <Brain />
      <OrbitControls />
    </Canvas>
  );
}
