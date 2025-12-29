'use client';

import Ticker from "@/components/ticker";
import ScreenWrapper from "@/components/wrapper";
import VideoPlayer from "@/components/videoplayer";
import DateTime from "@/components/date-time";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArrowRightIcon, LogOut } from "lucide-react";
import AutoScrollTable from "@/components/auto-scroll-table";

type ScreenProps = {
    videos?: string[];
    ticker?: string;
}

export default function Screen({ videos, ticker }: ScreenProps) {

    const tableHeaders = ["SBG", "Nama Barang"];

    //dummy
    const tableData = [{
        "SBG": "1",
        "Nama Barang": "Barang 1"
    },
    {
        "SBG": "2",
        "Nama Barang": "Barang 2"
    },
    {
        "SBG": "3",
        "Nama Barang": "Barang 3"
    },
    {
        "SBG": "4",
        "Nama Barang": "Barang 4"
    },
    {
        "SBG": "5",
        "Nama Barang": "Barang 5"
    },
    {
        "SBG": "6",
        "Nama Barang": "Barang 6"
    },
    {
        "SBG": "7",
        "Nama Barang": "Barang 7"
    },
    {
        "SBG": "8",
        "Nama Barang": "Barang 8"
    },
    {
        "SBG": "9",
        "Nama Barang": "Barang 9"
    },
    {
        "SBG": "10",
        "Nama Barang": "Barang 10"
    },
    {
        "SBG": "11",
        "Nama Barang": "Barang 11"
    },
    {
        "SBG": "12",
        "Nama Barang": "Barang 12"
    },
    {
        "SBG": "13",
        "Nama Barang": "Barang 13"
    },
    {
        "SBG": "14",
        "Nama Barang": "Barang 14"
    },
    {
        "SBG": "15",
        "Nama Barang": "Barang 15"
    },
    {
        "SBG": "16",
        "Nama Barang": "Barang 16"
    },
    {
        "SBG": "17",
        "Nama Barang": "Barang 17"
    },
    {
        "SBG": "18",
        "Nama Barang": "Barang 18"
    },
    {
        "SBG": "19",
        "Nama Barang": "Barang 19"
    },
    {
        "SBG": "20",
        "Nama Barang": "Barang 20"
    },
    ];

    const openSwal = () => {
        withReactContent(Swal).fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
    };
    return (
        <ScreenWrapper>
            <div className="flex-1 w-full grid grid-flow-col grid-cols-4 gap-3 mb-2 overflow-hidden">
                <div className="col-span-3 rounded-lg overflow-hidden bg-black">
                    <VideoPlayer videos={videos || ["/videos/1.mp4", "/videos/2.mp4"]} />
                    {/* <VideoPlayer videos={videos} /> */}
                </div>
                <div className="col-span-1 rounded-lg border-2 border-gray-200 flex flex-col overflow-hidden">
                    <div className="h-[10%] bg-red-900 p-2">
                        <DateTime />
                    </div>
                    <div className="h-[70%] bg-gray-200 p-2 text-black flex flex-col overflow-hidden">
                        <div className="flex flex-row justify-between shrink-0">
                            <h3 className="mb-2">Daftar Barang Siap Jual</h3>
                            <button onClick={openSwal} className="font-bold flex flex-row items-center gap-2">
                                Nama Cabang
                                <LogOut className="inline" />
                            </button>
                        </div>
                        <AutoScrollTable
                            headers={tableHeaders}
                            data={tableData}
                            height="full"
                            className="flex-1"
                            scrollInterval={5000}
                            scrollStep={350}
                        />
                    </div>
                    <div className="h-[20%] bg-red-900 relative">
                        <Image src="/img/20240502121225663320b9409aa.gif" alt="gif" fill={true} className="object-contain" />
                    </div>
                </div>
            </div>
            <Ticker text={ticker || "This is a Ticker"} />
        </ScreenWrapper>
    );
}