import LineGrid from "../app/components/three/line-grid";
import Image from "../app/components/three/image";
import { gridPresets } from "../app/components/three/constants";
import Sender from "../app/components/three/sender";

const Page = () => {
  return (
    <>
      <Sender></Sender>
      <LineGrid preset={gridPresets[0]} color="white" opacity={0.05} />
      <LineGrid preset={gridPresets[3]} color="white" clamp opacity={0.15} />
      <Image
        path="ID_Imagery_Situation&Settings_1.jpg"
        args={[1600 / 85, 1000 / 85, 1, 1]}
      />
    </>
  );
};

export default Page;
