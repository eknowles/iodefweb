import { useLoader } from "@react-three/fiber";
import { FrontSide, PlaneGeometry, TextureLoader } from "three";
import { PIXEL_THICKNESS } from "./constants";

const Sender = () => {
  const texture = useLoader(TextureLoader, "ID_Sender_UK_2_RGB_White.png");

  return (
    <group>
      <mesh position={[1.7 + -7.15, 4.35, PIXEL_THICKNESS * 20]}>
        <planeBufferGeometry
          attach="geometry"
          args={[6719 / 2000, 878 / 2000, 1, 1]}
        />
        <meshBasicMaterial
          attach="material"
          map={texture}
          transparent={true}
          toneMapped={false}
          side={FrontSide}
        />
      </mesh>
    </group>
  );
};

export default Sender;
