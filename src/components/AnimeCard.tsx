import React from 'react';
import { Link } from 'react-router-dom';
import type { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link
      to={`/anime/${anime.id}`}
      className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] group w-full max-w-[280px] mx-auto"
    >
      <div className="aspect-[2/3] relative overflow-hidden w-full h-[320px]">
        <img
          src={anime.coverImage.extraLarge}
          alt={anime.title.english || anime.title.romaji}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          style={{
            objectPosition: 'center 15%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-medium text-base line-clamp-1">
            {anime.title.english || anime.title.romaji}
          </h3>
          {anime.title.english && (
            <p className="text-sm text-gray-400 line-clamp-1">{anime.title.romaji}</p>
          )}
        </div>
        
        <p className="text-sm text-gray-300 line-clamp-2" 
           dangerouslySetInnerHTML={{ __html: anime.description || 'No description available.' }} />
        
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
          <span>{anime.episodes || '?'} eps</span>
          <span>{anime.seasonYear || 'TBA'}</span>
          <span className="capitalize">{anime.status.toLowerCase()}</span>
        </div>
      </div>
    </Link>
  );
}