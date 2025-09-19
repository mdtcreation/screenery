"use client";
import { useEffect, useState } from 'react';

type TickerProps = {
  text: string;
}

export default function Ticker({ text }: TickerProps) {
  const [tickerText, setTickerText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerText(prev => prev === text ? text + ' ' : text);
    }, 3000);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="w-full h-12 bg-red-500 text-white overflow-hidden rounded-lg">
      <div className="animate-marquee whitespace-nowrap">
        <span className="inline-block px-4 align-middle">{tickerText}</span>
      </div>
    </div>
  );
}