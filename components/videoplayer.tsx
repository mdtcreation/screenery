import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
    videos: string[];
};

export default function VideoPlayer({ videos }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (videos.length === 0) {
            return;
        }
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('ended', () => {
                setIndex((prevIndex) => (prevIndex + 1) % videos.length);
                videoElement.play();
            });
            videoElement.addEventListener('error', () => {
                setIndex((prevIndex) => (prevIndex + 1) % videos.length);
                videoElement.play();
            });
        }
    }, [videos]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videos[index];
        }
    }, [index, videos]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="video-player">
            <video ref={videoRef} controls={false} autoPlay muted />
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};
