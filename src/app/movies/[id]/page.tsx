import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { Users, Clapperboard } from 'lucide-react';
import { WatchlistButton } from '@/components/common/WatchlistButton';
import { RelatedContent } from '@/components/common/RelatedContent';
import { VideoPlayer } from '@/components/common/VideoPlayer';

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MovieDetailsPageProps) {
  const movie = await getMovieDetails(parseInt(params.id, 10));
  if (!movie) {
    return { title: 'Not Found' };
  }
  return {
    title: `${movie.title} | Crimson Stream`,
    description: movie.description,
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movie = await getMovieDetails(parseInt(params.id, 10));

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] w-full">
        <Image
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : movie.coverImage}
          alt={`Poster for ${movie.title}`}
          fill
          className="object-cover object-top"
          priority
          data-ai-hint="movie scene"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      {/* Content Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 pb-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">
            {movie.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <Badge variant="secondary">{movie.type === 'movie' ? 'Movie' : 'TV Show'}</Badge>
            <Badge variant="outline">{movie.genre}</Badge>
          </div>
          
          <p className="mt-6 text-lg text-foreground/80">
            {movie.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <VideoPlayer src={movie.videoUrl} title={movie.title} />
            <WatchlistButton mediaId={movie.id} />
          </div>

          <div className="mt-12 space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <Users className="text-primary" />
                Cast
              </h3>
              <p className="text-foreground/70">{movie.cast.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <Clapperboard className="text-primary" />
                Genre
              </h3>
              <p className="text-foreground/70">{movie.genre}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <RelatedContent media={movie} />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   // This would require fetching all possible movie IDs from TMDB at build time,
//   // which is not practical. We will rely on on-demand rendering.
//   return [];
// }
