export interface Media {
  id: number;
  title: string;
  description: string;
  type: 'movie' | 'show';
  genre: string; // This will be a string of genres
  genres?: { id: number; name: string }[];
  cast: string[];
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  coverImage: string; // Will be constructed from poster_path
  videoUrl: string;
  tags: ('trending' | 'new-release')[];
}
