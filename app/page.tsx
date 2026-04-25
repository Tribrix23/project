import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import Image from 'next/image'
import { Suspense } from 'react'

const LoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-orange-500 gap-3">
    <Image src="/favicon.png" width={64} height={64} alt="" className="animate-pulse" />
    <span className="text-white font-bold text-xl">Constructo</span>
    <span className="text-white/80 text-sm">Loading...</span>
  </div>
)

const MobileScreen = dynamic(
  () => import('@/components/screen/mobile/MobileScreen'),
  { loading: () => <LoadingFallback /> }
)

const DesktopScreen = dynamic(
  () => import('@/components/screen/desktop/DesktopScreen'),
  { loading: () => <LoadingFallback /> }
)

export default async function Home() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)

  return (
    <>
      {isMobile ? (
        <div className="w-full h-full md:hidden">
          <Suspense fallback={<LoadingFallback/>}>
            <MobileScreen />
          </Suspense>
        </div>
      ) : (
        <div className="w-full h-full hidden md:block">
          <DesktopScreen />
        </div>
      )}
    </>
  )
}
