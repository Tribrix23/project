import DesktopScreen from "@/components/screen/desktop/DesktopScreen";
import MobileScreen from "@/components/screen/mobile/MobileScreen";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-full md:hidden">
          <MobileScreen/>
      </div>
      <div className="w-full h-full hidden md:block">
          <DesktopScreen/>
      </div>
    </>
  );
}
