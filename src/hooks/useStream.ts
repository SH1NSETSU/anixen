import { useState } from 'react';
import type { StreamData } from '../types';

export function useStream() {
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchStream(gogoId: string, episodeNumber: number) {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`https://api.amvstr.me/api/v2/stream/${gogoId}/${episodeNumber}`);
      if (!res.ok) throw new Error('Failed to fetch stream');

      const data = await res.json();
      const iframe = data.iframe?.[0]?.iframe;  // Get the first iframe URL

      if (!iframe) throw new Error('No iframe URL available');

      // Set the iframe URL as the primary stream
      setStreamData({
        url: iframe,
        quality: 'default', // Set to default or any appropriate value from the JSON
      });

    } catch (err) {
      console.error('Error fetching stream:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return { streamData, loading, error, fetchStream };
}
