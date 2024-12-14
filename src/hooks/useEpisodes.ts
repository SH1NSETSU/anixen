import { useState, useEffect } from 'react';
import type { Episode, EpisodeResponse } from '../types';

export function useEpisodes(animeId: string) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`https://api.amvstr.me/api/v2/episodes/${animeId}`);
        if (!res.ok) throw new Error('Failed to fetch episodes');

        const data: EpisodeResponse = await res.json();
        if (data.code !== 200) throw new Error('Invalid API response');

        setEpisodes(data.results);
      } catch (err) {
        console.error('Error fetching episodes:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (animeId) {
      fetchEpisodes();
    }
  }, [animeId]);

  return { episodes, loading, error };
}