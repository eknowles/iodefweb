import { FC, useLayoutEffect, useMemo, useRef } from "react";
import { InstancedMesh, Matrix4, Vector3, Color } from "three";
import { useFrame } from "@react-three/fiber";
import { gridPresets, PIXEL_THICKNESS } from "./constants";
import { Preset } from "./types";

export type SquareGridProps = {
  preset?: Preset;
  color?: string;
  opacity?: number;
};

const maskColor = new Color("blue");

const SquareGrid: FC<SquareGridProps> = ({
  preset = gridPresets[0],
  color = "white",
  opacity = 1,
}) => {
  const baseColor = new Color(color);
  const count = (preset.xCount * 2 + 2) * (preset.yCount * 2 + 2) + 1;
  const ref = useRef<InstancedMesh>();
  const geometry = [preset.factor, preset.factor, PIXEL_THICKNESS];

  // cache initial positions of squares
  const { vec, transform, positions } = useMemo(() => {
    const vec = new Vector3();
    const transform = new Matrix4();
    const positions: Vector3[] = [];

    // loop over y axis
    for (let y = preset.yCount * -1; y <= preset.yCount + 1; y++) {
      // loop over x axis
      for (let x = preset.xCount * -1; x <= preset.xCount + 1; x++) {
        const position = new Vector3();
        position.x = x * preset.factor - preset.factor / 2;
        position.y = y * preset.factor - preset.factor / 2;
        position.z = PIXEL_THICKNESS * -0.5;
        positions.push(position);
      }
    }

    return { vec, transform, positions };
  }, [preset]);

  // set positions
  useLayoutEffect(() => {
    positions.forEach((p, i) => {
      transform.setPosition(p.x, p.y, p.z);
      console.log({ i, x: p.x, y: p.y });
      ref.current.setColorAt(i, p.x < 1 ? maskColor : baseColor);
      ref.current.setMatrixAt(i, transform);
    });

    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
  }, [ref, preset, positions, transform]);

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <boxBufferGeometry args={geometry as any}>
        <instancedBufferAttribute />
      </boxBufferGeometry>
      <meshBasicMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </instancedMesh>
  );
};

export default SquareGrid;
