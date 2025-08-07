'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Skeleton } from '@/components/ui/skeleton';

interface WatchlistButtonProps {
  mediaId: number;
}

export function WatchlistButton({ mediaId }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isLoaded } = useWatchlist();

  if (!isLoaded) {
    return <Skeleton className="h-12 w-48" />;
  }

  const inWatchlist = isInWatchlist(mediaId);

  const handleToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(mediaId);
    } else {
      addToWatchlist(mediaId);
    }
  };

  return (
    <Button onClick={handleToggle} variant="outline" size="lg">
      {inWatchlist ? (
        <>
          <BookmarkCheck className="mr-2 h-6 w-6 text-primary" /> In Watchlist
        </>
      ) : (
        <>
          <Bookmark className="mr-2 h-6 w-6" /> Add to Watchlist
        </>
      )}
    </Button>
  );
}
