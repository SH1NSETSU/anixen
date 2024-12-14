import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import type { Anime } from '../types';

interface AnimeSectionProps {
  title: string;
  icon: LucideIcon;
  animeList: Anime[];
}

export function AnimeSection({ title, icon: Icon, animeList }: AnimeSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-6 h-6" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
}