'use client';

import { useEffect, useState, useMemo } from 'react';
import { getSimilarMovies } from '@/lib/tmdb';
import type { Media } from '@/lib/types';
import { ContentCarousel } from './ContentCarousel';
import { Skeleton } from '../ui/skeleton';

interface RelatedContentProps {
  media: Media;
}

export function RelatedContent({ media }: RelatedContentProps) {
  const [suggestions, setSuggestions] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!media.id) return;
      setIsLoading(true);
      try {
        const similarMovies = await getSimilarMovies(media.id);
        setSuggestions(similarMovies);
      } catch (error) {
        console.error('Failed to fetch related content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [media.id]);

  const LoadingSkeleton = useMemo(() => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1/6">
            <Skeleton className="aspect-[2/3]" />
          </div>
        ))}
      </div>
    </div>
  ), []);

  if (isLoading) {
    return LoadingSkeleton;
  }

  if (suggestions.length === 0) {
    return null;
  }

  return <ContentCarousel title="You Might Also Like" items={suggestions} />;
}
