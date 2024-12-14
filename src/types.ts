export interface AnimeResponse {
  code: number;
  message: string;
  page: {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
  };
  results: Anime[];
}

export interface Anime {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  description: string;
  episodes: number;
  seasonYear: number;
  status: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
  };
}

export interface AnimeDetails {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  description: string;
  episodes: number;
  year: number;
  status: string;
  bannerImage: string;
  coverImage: {
    large: string;
  };
  genres: string[];
  score: {
    decimalScore: number;
  };
  studios: {
    name: string;
  }[];
  trailer: {
    id: string;
  } | null;
  relation: {
    id: number;
    title: {
      english: string;
      romaji: string;
    };
    coverImage: {
      large: string;
    };
  }[];
  id_provider: {
    idGogo: string;
    idGogoDub: string;
    idZoro: string;
    idPahe: string;
  };
}

export interface Episode {
  id: string;
  title: string;
  image: string;
  number: number;
  createdAt: string;
}

export interface EpisodeResponse {
  code: number;
  message: string;
  results: Episode[];
}

export interface StreamData {
  info: {
    title: string;
    id: string;
    episode: string;
  };
  stream: {
    multi: {
      main: {
        url: string;
        isM3U8: boolean;
        quality: string;
      };
      backup: {
        url: string;
        isM3U8: boolean;
        quality: string;
      };
    };
  };
  plyr: {
    main: string;
    backup: string;
  };
}