import type { Media } from './types';

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const urlParams = new URLSearchParams({
    api_key: API_KEY!,
    ...params,
  });
  const url = `${API_BASE_URL}/${endpoint}?${urlParams}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}: ${url}`);
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
};

const mapResultToMedia = (result: any, genreMap: Map<number, string>): Media => ({
  id: result.id,
  title: result.title || result.name,
  description: result.overview,
  type: result.media_type === 'tv' ? 'show' : 'movie',
  genre: result.genre_ids?.map((id: number) => genreMap.get(id)).filter(Boolean).join(', ') || '',
  genres: result.genres,
  cast: [], // This will be fetched separately for details page
  poster_path: result.poster_path,
  backdrop_path: result.backdrop_path,
  release_date: result.release_date || result.first_air_date,
  vote_average: result.vote_average,
  coverImage: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://placehold.co/800x1200/141414/E50914?text=No+Image',
  videoUrl: '', // TMDB API doesn't provide direct video URLs for free
  tags: [],
});

let genreCache: Map<number, string> | null = null;
const getGenreMap = async (): Promise<Map<number, string>> => {
  if (genreCache) {
    return genreCache;
  }
  
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      tmdbApi<{ genres: { id: number; name: string }[] }>('genre/movie/list'),
      tmdbApi<{ genres: { id: number; name: string }[] }>('genre/tv/list'),
    ]);
    
    const genreMap = new Map<number, string>();
    movieGenres.genres.forEach(genre => genreMap.set(genre.id, genre.name));
    tvGenres.genres.forEach(genre => genreMap.set(genre.id, genre.name));
    
    genreCache = genreMap;
    return genreMap;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return new Map();
  }
};


export const getTrending = async (type: 'movie' | 'tv' = 'movie', time_window: 'day' | 'week' = 'week') => {
  const genreMap = await getGenreMap();
  const data = await tmdbApi<{ results: any[] }>(`trending/${type}/${time_window}`);
  return data.results.map(result => mapResultToMedia(result, genreMap));
};

export const getPopular = async (type: 'movie' | 'tv' = 'movie') => {
  const genreMap = await getGenreMap();
  const data = await tmdbApi<{ results: any[] }>(`${type}/popular`);
  return data.results.map(result => mapResultToMedia(result, genreMap));
};

export const getTopRated = async (type: 'movie' | 'tv' = 'movie') => {
  const genreMap = await getGenreMap();
  const data = await tmdbApi<{ results: any[] }>(`${type}/top_rated`);
  return data.results.map(result => mapResultToMedia(result, genreMap));
};

export const getNowPlaying = async () => {
  const genreMap = await getGenreMap();
  const data = await tmdbApi<{ results: any[] }>('movie/now_playing');
  return data.results.map(result => mapResultToMedia(result, genreMap));
};

export const getMovieDetails = async (id: number): Promise<Media | null> => {
    const genreMap = await getGenreMap();
    try {
        const details = await tmdbApi<any>(`movie/${id}`, { append_to_response: 'credits,videos' });
        const media = mapResultToMedia(details, genreMap);
        media.cast = details.credits?.cast.slice(0, 10).map((c: any) => c.name) || [];
        const trailer = details.videos?.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        media.videoUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '';
        media.genre = details.genres?.map((g: any) => g.name).join(', ') || '';
        return media;
    } catch (error) {
        console.error(`Failed to get movie details for id ${id}`, error);
        return null;
    }
}

export const getSimilarMovies = async (id: number) => {
    const genreMap = await getGenreMap();
    const data = await tmdbApi<{ results: any[] }>(`movie/${id}/similar`);
    return data.results.map(result => mapResultToMedia(result, genreMap));
}

export const searchMovies = async (query: string) => {
    const genreMap = await getGenreMap();
    const data = await tmdbApi<{ results: any[] }>('search/movie', { query });
    return data.results.map(result => mapResultToMedia(result, genreMap));
}
