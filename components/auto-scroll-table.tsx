import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface AutoScrollTableProps {
  headers?: string[];
  data?: Record<string, any>[];
  height?: string;
  scrollInterval?: number;
  scrollStep?: number;
  className?: string;
}

const AutoScrollTable = ({
  headers = [],
  data = [],
  height = '300px',
  scrollInterval = 3000,
  scrollStep = 50,
  className = ''
}: AutoScrollTableProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = tableContainerRef.current;

    // Jika tidak ada data atau container belum siap, hentikan
    if (!container || data.length === 0) return;

    const scrollLogic = () => {
      // Jika user sedang hover, jangan scroll
      if (isPaused) return;

      // Cek posisi scroll saat ini
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Jika content tidak melebihi container, tidak perlu scroll
      if (scrollHeight <= clientHeight) return;

      // Cek apakah sudah sampai paling bawah (dengan toleransi 1px)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtBottom) {
        // Jika sudah di bawah, kembali ke atas dengan smooth
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Jika belum, scroll ke bawah sebesar scrollStep
        container.scrollTo({
          top: scrollTop + scrollStep,
          behavior: 'smooth'
        });
      }
    };

    // Jalankan interval sesuai waktu yang ditentukan (scrollInterval)
    const intervalId = setInterval(scrollLogic, scrollInterval);

    // Bersihkan interval saat komponen di-unmount agar tidak memori leak
    return () => clearInterval(intervalId);

  }, [isPaused, data, scrollInterval, scrollStep]);

  return (
    <div className={`w-full border rounded-lg shadow-md overflow-hidden bg-white flex flex-col ${height === 'full' ? 'h-full' : ''} ${className}`}>
      {/* Header Tabel (Tetap Diam) */}
      <div className="bg-gray-100 border-b font-bold grid shrink-0"
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((col, index) => (
          <div key={index} className="p-3 text-left text-gray-700">
            {col}
          </div>
        ))}
      </div>

      {/* Body Tabel (Bisa Di-scroll) */}
      <div
        ref={tableContainerRef}
        className={`overflow-y-auto no-scrollbar ${height === 'full' ? 'flex-1' : ''}`}
        style={height !== 'full' ? { height: height } : {}}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid border-b last:border-b-0 hover:bg-blue-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
          >
            {Object.values(row).map((cell, cellIndex) => (
              <div key={cellIndex} className="p-3 text-gray-600">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollTable;