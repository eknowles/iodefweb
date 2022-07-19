import LineGrid from "../app/components/three/line-grid";
import Image from "../app/components/three/image";
import { gridPresets } from "../app/components/three/constants";
import SquareGrid from "../app/components/three/square-grid";
import Sender from "../app/components/three/sender";

const Index = () => {
  return (
    <>
      <Sender></Sender>
      <SquareGrid preset={gridPresets[0]} color="black" opacity={0.4} />
      <LineGrid preset={gridPresets[0]} clamp />
      <LineGrid preset={gridPresets[0]} opacity={0.25} />
      <Image path="1.jpg" args={[1600 / 85, 1001 / 85, 1, 1]} />
    </>
  );
};

export default Index;
