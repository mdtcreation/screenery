import Ticker from "@/components/ticker";
import ScreenWrapper from "@/components/wrapper";
import VideoPlayer from "@/components/videoplayer";
import Image from "next/image";

type ScreenProps = {
    videos?: string[];
    ticker?: string;
}

export default function Screen({ videos, ticker }: ScreenProps) {
    return (
        <ScreenWrapper>
            <div className="flex-1 w-full grid grid-flow-col grid-cols-4 gap-3 mb-2 overflow-hidden">
                <div className="col-span-3 rounded-lg overflow-hidden bg-black">
                    <VideoPlayer videos={videos || ["/videos/WIN_20250728_12_15_16_Pro.mp4","/videos/Gadai Oke - Google Chrome 2025-08-13 08-55-48.mp4"]} />
                    {/* <VideoPlayer videos={videos} /> */}
                </div>
                <div className="col-span-1 rounded-lg border-2 border-gray-200 overflow-auto">
                    <div className="h-1/10 bg-red-900 p-2">
                        <p className="text-white font-bold">Daftar Penjualan Barang</p>
                        <p className="text-white">Kantor Cabang</p> 
                    </div>
                    <div className="h-7/10 bg-white p-2">
                        
                    </div>
                    <div className="h-2/10 bg-red-900 relative">
                        <Image src="/img/20240502121225663320b9409aa.gif" alt="gif" fill={true} className="object-contain" />
                    </div>
                </div>
            </div>
            <Ticker text={ticker || "This is a Ticker"} />
        </ScreenWrapper>
    );
}