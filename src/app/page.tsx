import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContentCarousel } from '@/components/common/ContentCarousel';
import { mediaData } from '@/lib/data';
import { PlayCircle } from 'lucide-react';

export default function Home() {
  const trendingNow = mediaData.filter(item => item.tags.includes('trending'));
  const newReleases = mediaData.filter(item => item.tags.includes('new-release'));
  const allMovies = mediaData.filter(item => item.type === 'movie');
  const allShows = mediaData.filter(item => item.type === 'show');
  
  const heroContent = trendingNow[0] || mediaData[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end p-4 md:p-8 lg:p-12">
        <div className="absolute inset-0">
          <Image
            src={heroContent.coverImage}
            alt={heroContent.title}
            fill
            className="object-cover"
            priority
            data-ai-hint="movie poster"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            {heroContent.title}
          </h1>
          <p className="mt-4 text-sm md:text-lg text-foreground/80 drop-shadow-md line-clamp-3">
            {heroContent.description}
          </p>
          <div className="mt-6 flex gap-4">
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

      {/* Content Carousels */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
        <ContentCarousel title="Trending Now" items={trendingNow} />
        <ContentCarousel title="New Releases" items={newReleases} />
        <ContentCarousel title="Popular Movies" items={allMovies} />
        <ContentCarousel title="Must-Watch TV Shows" items={allShows} />
      </div>
    </div>
  );
}
