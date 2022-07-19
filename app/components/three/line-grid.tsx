import { FC, useEffect, useMemo, useRef } from "react";
import { NormalBlending, InstancedMesh, Matrix4, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { gridPresets, PIXEL_THICKNESS } from "./constants";
import { Preset } from "./types";

export type GridProps = {
  preset?: Preset;
  color?: string;
  opacity?: number;
  thickness?: number;
  clamp?: boolean;
};

const LineGrid: FC<GridProps> = ({
  preset = gridPresets[0],
  color = "white",
  opacity = 1,
  thickness = PIXEL_THICKNESS,
  clamp = false,
}) => {
  const count = (preset.xCount * 2 + 1) * (preset.yCount * 2 + 1) + 1;
  const refH = useRef<InstancedMesh>();
  const refV = useRef<InstancedMesh>();
  const geometryH = [preset.factor, thickness, thickness];
  const geometryV = [thickness, preset.factor, thickness];

  // cache initial positions of datums (the dot/cross)
  const { vec, transform, positions } = useMemo(() => {
    const vec = new Vector3();
    const transform = new Matrix4();
    const positions = [];

    // loop over y axis
    for (let y = preset.yCount * -1; y <= preset.yCount; y++) {
      // loop over x axis
      for (let x = preset.xCount * -1; x <= preset.xCount; x++) {
        const position = new Vector3();
        position.x = x * preset.factor;
        position.y = y * preset.factor;
        position.z = thickness * 0.5;
        positions.push(position);
      }
    }

    return { vec, transform, positions };
  }, [preset]);

  // set positions
  useEffect(() => {
    positions.forEach((p, i) => {
      transform.setPosition(p.x, p.y, p.z);
      refH.current.setMatrixAt(i, transform);
      refV.current.setMatrixAt(i, transform);
    });

    // update the horizontal/vertical instances
    refH.current.instanceMatrix.needsUpdate = true;
    refV.current.instanceMatrix.needsUpdate = true;
  }, [refH, refV, preset]);

  // update scales
  useFrame(({ clock }) => {
    let scale = 1 + Math.sin(clock.elapsedTime);

    // dont get too small
    if (scale < preset.dotScale) scale = preset.dotScale;

    // limit scale by clamping (mini cross)
    if (clamp && scale > preset.crossScale) scale = preset.crossScale;

    // dont get too big
    if (scale > 1) scale = 1;

    positions.forEach((p, i) => {
      vec.copy(p);
      transform.makeScale(scale, 1, 1);
      transform.setPosition(vec);
      refH.current.setMatrixAt(i, transform);

      vec.copy(p);
      transform.makeScale(1, scale, 1);
      transform.setPosition(vec);
      refV.current.setMatrixAt(i, transform);
    });

    refH.current.instanceMatrix.needsUpdate = true;
    refV.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={refH} args={[null, null, count]}>
        <boxBufferGeometry args={geometryH as any}>
          <instancedBufferAttribute />
        </boxBufferGeometry>
        <meshBasicMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
          blending={NormalBlending}
        />
      </instancedMesh>

      <instancedMesh ref={refV} args={[null, null, count]}>
        <boxBufferGeometry args={geometryV as any}>
          <instancedBufferAttribute />
        </boxBufferGeometry>
        <meshBasicMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
          blending={NormalBlending}
        />
      </instancedMesh>
    </>
  );
};

export default LineGrid;
