import Link from "next/link";
import "../styles.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="menu">
        <Link href="/">index</Link>
        <Link href="/example1">example1</Link>
        <Link href="/example2">example2</Link>
        <Link href="/example3">example3</Link>
        <Link href="/example4">example4</Link>
        <Link href="/example5">example5</Link>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
          <Suspense fallback={null}>
            <Component {...pageProps} />
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}
