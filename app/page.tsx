import DesktopScreen from "@/components/screen/desktop/DesktopScreen";
import MobileScreen from "@/components/screen/mobile/MobileScreen";
import Image from "next/image";
import { Suspense } from "react";

const LoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-orange-500 gap-3">
    <Image src="/favicon.png" width={64} height={64} alt="" className="animate-pulse" />
    <span className="text-white font-bold text-xl">Constructo</span>
    <span className="text-white/80 text-sm">Loading...</span>
  </div>
)

export default function Home() {
  return (
    <>
      <div className="w-full h-full md:hidden">
          <Suspense fallback={<LoadingFallback/>}>
            <MobileScreen/>
          </Suspense>
      </div>
      <div className="w-full h-full hidden md:block">
          <DesktopScreen/>
      </div>
    </>
  );
}
