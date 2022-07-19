import LineGrid from "../app/components/three/line-grid";
import Image from "../app/components/three/image";
import { gridPresets } from "../app/components/three/constants";
import Sender from "../app/components/three/sender";

const Page = () => {
  return (
    <>
      <Sender></Sender>
      <LineGrid preset={gridPresets[1]} color="black" clamp opacity={1} />
      <LineGrid preset={gridPresets[1]} color="white" opacity={0.25} />
      <Image
        path="ID_Imagery_Tonality&Colours_3.jpg"
        args={[1600 / 85, 1000 / 85, 1, 1]}
      />
    </>
  );
};

export default Page;
