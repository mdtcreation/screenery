"use client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
    videos: string[];
};

export default function VideoPlayer({ videos }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Handle video source changes and play the video when ready
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || videos.length === 0) return;

        const handleCanPlay = () => {
            videoElement.play().catch(error => {
                console.error("Error playing video:", error);
            });
        };

        const handleEnded = () => {
            setCurrentVideoIndex(prev => (prev + 1) % videos.length);
        };

        const handleError = () => {
            console.error("Error loading video:", videos[currentVideoIndex]);
            setCurrentVideoIndex(prev => (prev + 1) % videos.length);
        };

        videoElement.addEventListener('canplay', handleCanPlay);
        videoElement.addEventListener('ended', handleEnded);
        videoElement.addEventListener('error', handleError);

        // Set the source and load the video
        videoElement.src = videos[currentVideoIndex];
        videoElement.load();

        // Cleanup function
        return () => {
            videoElement.removeEventListener('canplay', handleCanPlay);
            videoElement.removeEventListener('ended', handleEnded);
            videoElement.removeEventListener('error', handleError);
        };
    }, [currentVideoIndex, videos]);

    // Handle play/pause
    const handlePlayPause = () => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (videoElement.paused) {
            videoElement.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Error playing video:", error);
            });
        } else {
            videoElement.pause();
            setIsPlaying(false);
        }
    };

    if (videos.length === 0) {
        return <div className="w-full h-full flex items-center justify-center">No videos available</div>;
    }

    return (
        <div 
            className="w-full h-full relative"
            onClick={handlePlayPause}
        >
            <video 
                ref={videoRef} 
                controls={false}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            
            {/* Optional: Add play/pause overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-black bg-opacity-50 rounded-full p-4">
                    {isPlaying ? (
                        <span className="text-white text-2xl"><Pause></Pause></span>
                    ) : (
                        <span className="text-white text-2xl"><Play></Play></span>
                    )}
                </button>
            </div>
        </div>
    );
}
