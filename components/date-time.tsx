'use client';

import { useEffect, useState } from 'react';

export default function DateTime() {
    const [mounted, setMounted] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    if (!mounted) {
        return <div className="h-full w-full animate-pulse bg-gray-700/50 rounded-lg"></div>;
    }

    return (
        <div className="flex flex-col h-full w-full text-white">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-white mt-1">
                {date.toLocaleTimeString('id-ID', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }).replaceAll('.', ':')}
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-gray-200">
                {date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </h2>
        </div>
    );
}
