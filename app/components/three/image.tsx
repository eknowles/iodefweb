import type { FC } from "react";
import { useLoader } from "@react-three/fiber";
import type { Args } from "@react-three/drei";
import { FrontSide, TextureLoader } from "three";
import { PIXEL_THICKNESS } from "./constants";

const Image: FC<{ path: string; args: Args<any> }> = ({ path, args }) => {
  const texture = useLoader(TextureLoader, path);

  return (
    <mesh position={[0, 0, PIXEL_THICKNESS * -20]}>
      <planeBufferGeometry attach="geometry" args={args} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        toneMapped={false}
        side={FrontSide}
      />
    </mesh>
  );
};

export default Image;
