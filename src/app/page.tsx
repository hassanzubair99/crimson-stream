'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContentCarousel } from '@/components/common/ContentCarousel';
import { getTrending, getNowPlaying, getPopular, getTopRated } from '@/lib/tmdb';
import { PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Media } from '@/lib/types';
import { useAppState } from '@/context/AppStateContext';
import withAuth from '@/components/auth/withAuth';


function Home() {
  const [trendingNow, setTrendingNow] = useState<Media[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<Media[]>([]);
  const [heroContent, setHeroContent] = useState<Media | null>(null);

  const { isIntroFinished } = useAppState();

  useEffect(() => {
    const fetchContent = async () => {
      const [trending, playing, popular, topRated] = await Promise.all([
        getTrending('movie', 'week'),
        getNowPlaying(),
        getPopular('movie'),
        getTopRated('tv')
      ]);
      setTrendingNow(trending);
      setNowPlaying(playing);
      setPopularMovies(popular);
      setTopRatedShows(topRated);
      setHeroContent(trending[0] || popular[0] || null);
    }
    fetchContent();
  }, []);

  if (!isIntroFinished) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {heroContent && (
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end p-4 md:p-8 lg:p-12">
          <div className="absolute inset-0">
            <Image
              src={heroContent.backdrop_path ? `https://image.tmdb.org/t/p/original${heroContent.backdrop_path}` : heroContent.coverImage}
              alt={heroContent.title}
              fill
              className="object-cover"
              priority
              data-ai-hint="movie poster"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg animate-fade-in-up">
              {heroContent.title}
            </h1>
            <p className="mt-4 text-sm md:text-lg text-foreground/80 drop-shadow-md line-clamp-3 animate-fade-in-up [--animation-delay:200ms]">
              {heroContent.description}
            </p>
            <div className="mt-6 flex gap-4 animate-fade-in-up [--animation-delay:400ms]">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/movies/${heroContent.id}`}>
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Play
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={`/movies/${heroContent.id}`}>
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Content Carousels */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
        <ContentCarousel title="Trending Now" items={trendingNow} />
        <ContentCarousel title="Now Playing" items={nowPlaying} />
        <ContentCarousel title="Popular Movies" items={popularMovies} />
        <ContentCarousel title="Top Rated TV Shows" items={topRatedShows} />
      </div>
    </div>
  );
}

export default withAuth(Home);
