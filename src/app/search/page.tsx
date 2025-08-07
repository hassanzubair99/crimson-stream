'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMovies } from '@/lib/tmdb';
import { ContentCard } from '@/components/common/ContentCard';
import { Search as SearchIcon } from 'lucide-react';
import type { Media } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (query) {
        setIsLoading(true);
        const searchResults = await searchMovies(query);
        setResults(searchResults);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    };
    performSearch();
  }, [query]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-4xl font-headline font-bold mb-8 flex items-center gap-4">
        <SearchIcon className="w-10 h-10 text-primary" />
        {query ? `Search Results for "${query}"` : 'Search'}
      </h1>

      {isLoading && <LoadingSkeleton />}

      {!isLoading && query && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((item, index) => (
             <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms`}}
            >
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && query && results.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground/80">No Results Found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find anything for "{query}". Try a different search.
          </p>
        </div>
      )}

      {!query && (
         <div className="text-center py-20 border-2 border-dashed rounded-lg animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground/80">Search for content</h2>
          <p className="mt-2 text-muted-foreground">
            Use the search bar in the header to find movies and shows.
          </p>
        </div>
      )}
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
