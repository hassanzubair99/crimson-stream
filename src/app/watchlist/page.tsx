'use client';

import { useWatchlist } from '@/hooks/use-watchlist';
import { getMovieDetails } from '@/lib/tmdb';
import { ContentCard } from '@/components/common/ContentCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark } from 'lucide-react';
import type { Media } from '@/lib/types';
import { useMemo, useEffect, useState } from 'react';

export default function WatchlistPage() {
  const { watchlist, isLoaded } = useWatchlist();
  const [watchlistItems, setWatchlistItems] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlistDetails = async () => {
      if (isLoaded) {
        setIsLoading(true);
        const moviePromises = watchlist.map(id => getMovieDetails(id));
        const movies = await Promise.all(moviePromises);
        setWatchlistItems(movies.filter((movie): movie is Media => movie !== null));
        setIsLoading(false);
      }
    };

    fetchWatchlistDetails();
  }, [watchlist, isLoaded]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-headline font-bold mb-8 flex items-center gap-4">
        <Bookmark className="w-10 h-10 text-primary" />
        My Watchlist
      </h1>
      
      {isLoading && <LoadingSkeleton />}
      
      {!isLoading && watchlistItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlistItems.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
      
      {!isLoading && watchlistItems.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground/80">Your Watchlist is Empty</h2>
          <p className="mt-2 text-muted-foreground">Add movies and shows to your watchlist to see them here.</p>
        </div>
      )}
    </div>
  );
}
