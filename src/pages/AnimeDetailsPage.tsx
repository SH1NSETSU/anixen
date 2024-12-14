import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Calendar, Clock, Star, PlayCircle, Film } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { EpisodeList } from '../components/EpisodeList';
import { VideoPlayer } from '../components/VideoPlayer';
import { useEpisodes } from '../hooks/useEpisodes';
import { useStream } from '../hooks/useStream';
import type { AnimeDetails, Episode } from '../types';
export function AnimeDetailsPage() {
const { id } = useParams<{ id: string }>();
const [anime, setAnime] = useState
<AnimeDetails | null>
(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [selectedEpisode, setSelectedEpisode] = useState
<Episode | null>
(null);
const { episodes, loading: episodesLoading, error: episodesError } = useEpisodes(id || '');
const { streamData, loading: streamLoading, error: streamError, fetchStream } = useStream();
useEffect(() => {
async function fetchAnimeDetails() {
if (!id) return;
setLoading(true);
setError(false);
try {
const res = await fetch(`https://api.amvstr.me/api/v2/info/${id}`);
if (!res.ok) throw new Error('Failed to fetch anime details');
const data = await res.json();
if (data.code !== 200) throw new Error('Invalid API response');
setAnime(data);
} catch (error) {
console.error('Error fetching anime details:', error);
setError(true);
} finally {
setLoading(false);
}
}
fetchAnimeDetails();
}, [id]);
const handleEpisodeSelect = async (episode: Episode) => {
setSelectedEpisode(episode);
if (anime?.id_provider.idGogo) {
await fetchStream(anime.id_provider.idGogo, episode.number);
}
};
if (loading) {
return (
<div className="min-h-[80vh] flex items-center justify-center">
   <Loader2 className="w-8 h-8 text-white animate-spin" />
</div>
);
}
if (error || !anime) {
return (
<main className="max-w-7xl mx-auto px-4 py-8">
   <ErrorState onRetry={() =>
   window.location.reload()} />
</main>
);
}
return (
<div>
{anime.bannerImage && (
<div className="relative h-[400px] w-full">
   <div className="absolute inset-0">
      <img
      src={anime.bannerImage}
      alt={anime.title.english || anime.title.romaji}
      className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
   </div>
   )}
   <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
         <div className="w-full md:w-[300px] shrink-0">
            <div className="sticky top-24">
               <img
               src={anime.coverImage.large}
               alt={anime.title.english || anime.title.romaji}
               className="w-full rounded-lg shadow-lg"
               />
               <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-300">
                     <Calendar className="w-5 h-5" />
                     <span>{anime.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                     <Clock className="w-5 h-5" />
                     <span>{anime.episodes} episodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                     <Star className="w-5 h-5" />
                     <span>{anime.score.decimalScore} / 10</span>
                  </div>
                  {anime.trailer && (
                  <a
                     href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-white hover:text-gray-300"
                     >
                     <PlayCircle className="w-5 h-5" />
                     <span>Watch Trailer</span>
                  </a>
                  )}
               </div>
            </div>
         </div>
         <div className="flex-1 space-y-8">
            <div>
               <h1 className="text-3xl font-bold mb-2">
                  {anime.title.english || anime.title.romaji}
               </h1>
               {anime.title.english && (
               <h2 className="text-xl text-gray-400">{anime.title.romaji}</h2>
               )}
            </div>
            <div className="space-y-4">
               <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                  <span
                     key={genre}
                     className="px-3 py-1 bg-white/10 rounded-full text-sm"
                     >
                  {genre}
                  </span>
                  ))}
               </div>
               <p
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: anime.description }}
                  />
            </div>
            {streamData && selectedEpisode && (
            <div className="space-y-4">
               <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  <span>Episode {selectedEpisode.number}</span>
               </h3>
               <VideoPlayer streamData={streamData} />
            </div>
            )}
            <div className="space-y-4">
               <h3 className="text-xl font-semibold">Episodes</h3>
               {episodesLoading ? (
               <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
               </div>
               ) : episodesError ? (
               <p className="text-red-400">Failed to load episodes</p>
               ) : (
               <EpisodeList
               episodes={episodes}
               onEpisodeSelect={handleEpisodeSelect}
               selectedEpisode={selectedEpisode || undefined}
               />
               )}
            </div>
            <div>
               <h3 className="text-xl font-semibold mb-4">Studios</h3>
               <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                  <span
                     key={studio.name}
                     className="px-3 py-1 bg-white/10 rounded-full text-sm"
                     >
                  {studio.name}
                  </span>
                  ))}
               </div>
            </div>
            {anime.relation && anime.relation.length > 0 && (
            <div>
               <h3 className="text-xl font-semibold mb-4">Related</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {anime.relation
                  .filter((related) => related.type !== "MANGA") // Exclude entries with type "MANGA"
                  .slice(0, 6) // Limit to the first 6 entries
                  .map((related) => (
                  <a
                     key={related.id}
                     href={`/anime/${related.id}`}
                     className="group"
                     >
                     <div className="aspect-[2/3] rounded-lg overflow-hidden">
                        <img
                        src={related.coverImage.large}
                        alt={related.title.english || related.title.romaji}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                     <h4 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-gray-300">
                        {related.title.english || related.title.romaji}
                     </h4>
                  </a>
                  ))}
               </div>
            </div>
            )}
         </div>
      </div>
   </main>
</div>
);
}
