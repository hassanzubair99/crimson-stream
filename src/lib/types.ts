export interface Media {
  id: number;
  title: string;
  description: string;
  type: 'movie' | 'show';
  genre: string;
  cast: string[];
  coverImage: string;
  videoUrl: string;
  tags: ('trending' | 'new-release')[];
}
