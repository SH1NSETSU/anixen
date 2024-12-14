import React from 'react';
import { formatDate } from '../utils/date';
import type { Episode } from '../types';

interface EpisodeListProps {
  episodes: Episode[];
  onEpisodeSelect: (episode: Episode) => void;
  selectedEpisode?: Episode;
}

export function EpisodeList({ episodes, onEpisodeSelect, selectedEpisode }: EpisodeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((episode) => (
        <button
          key={episode.id}
          onClick={() => onEpisodeSelect(episode)}
          className={`text-left p-4 rounded-lg transition-all ${
            selectedEpisode?.number === episode.number
              ? 'bg-white/20 ring-2 ring-white/40'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <div className="aspect-video mb-3 overflow-hidden rounded-lg">
            <img
              src={episode.image}
              alt={`Episode ${episode.number}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Episode {episode.number}</h3>
            <p className="text-sm text-gray-400 line-clamp-1">{episode.title}</p>
            <p className="text-xs text-gray-500">{formatDate(episode.createdAt)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}