import React, { useEffect, useState, useCallback } from 'react';
import { Loader2, TrendingUp, Star } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { AnimeSection } from '../components/AnimeSection';
import { Pagination } from '../components/Pagination';
import { ErrorState } from '../components/ErrorState';
import { AnimeCard } from '../components/AnimeCard';
import type { Anime, AnimeResponse } from '../types';

export function HomePage() {
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const [popularRes, trendingRes] = await Promise.all([
        fetch('https://api.amvstr.me/api/v2/popular?limit=30').then(res => {
          if (!res.ok) throw new Error('Popular anime fetch failed');
          return res.json();
        }),
        fetch('https://api.amvstr.me/api/v2/trending?limit=30').then(res => {
          if (!res.ok) throw new Error('Trending anime fetch failed');
          return res.json();
        })
      ]);
      
      if (popularRes.code !== 200 || trendingRes.code !== 200) {
        throw new Error('Invalid API response');
      }

      setPopularAnime(popularRes.results);
      setTrendingAnime(trendingRes.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`https://api.amvstr.me/api/v2/search?q=${encodeURIComponent(query)}&page=${currentPage}`);
      if (!res.ok) throw new Error('Search failed');
      
      const data: AnimeResponse = await res.json();
      if (data.code !== 200) throw new Error('Invalid API response');

      setSearchResults(data.results);
      setTotalPages(data.page.lastPage);
    } catch (error) {
      console.error('Error searching:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      fetchData();
    }
  }, [fetchData, handleSearch, searchQuery, currentPage]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ErrorState onRetry={() => searchQuery ? handleSearch(searchQuery) : fetchData()} />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="flex justify-center">
        <SearchBar onSearch={query => {
          setCurrentPage(1);
          setSearchQuery(query);
        }} isSearching={searching} />
      </div>

      {searching ? (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-6">
              Search Results {searchResults.length > 0 && `for "${searchQuery}"`}
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">No results found</p>
            )}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <>
          <AnimeSection
            title="Popular Now"
            icon={Star}
            animeList={popularAnime}
          />
          <AnimeSection
            title="Trending"
            icon={TrendingUp}
            animeList={trendingAnime}
          />
        </>
      )}
    </main>
  );
}