"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function GlobeCanvas() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* লাইটিং */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* ৩ডি অবজেক্ট (গ্লোব) */}
        <Sphere args={[1, 64, 64]} scale={2}>
          <MeshDistortMaterial
            color="#a078ff"
            attach="material"
            distort={0.3} // ছবিটির মতো একটু ঢেউ খেলানো ভাব দিতে
            speed={2}
          />
        </Sphere>

        {/* মাউস দিয়ে ঘুরানোর কন্ট্রোল */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function GlobeCanvas() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* লাইটিং */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* ৩ডি অবজেক্ট (গ্লোব) */}
        <Sphere args={[1, 64, 64]} scale={2}>
          <MeshDistortMaterial
            color="#a078ff"
            attach="material"
            distort={0.3} // ছবিটির মতো একটু ঢেউ খেলানো ভাব দিতে
            speed={2}
          />
        </Sphere>

        {/* মাউস দিয়ে ঘুরানোর কন্ট্রোল */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}