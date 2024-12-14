import React, { useEffect, useRef } from 'react';  // Make sure useRef is imported
import type { StreamData } from '../types';

interface VideoPlayerProps {
  streamData: StreamData | null;
}

export function VideoPlayer({ streamData }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [streamData]);

  if (!streamData || !streamData.url) {
    return (
      <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center text-white">
        <p>Video is not available</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        src={streamData.url}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
