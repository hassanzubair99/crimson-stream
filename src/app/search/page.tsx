import { mediaData } from '@/lib/data';
import { ContentCard } from '@/components/common/ContentCard';
import { Search as SearchIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | Crimson Stream',
};

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  const results = query
    ? mediaData.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-headline font-bold mb-8 flex items-center gap-4">
        <SearchIcon className="w-10 h-10 text-primary" />
        {query ? `Search Results for "${query}"` : 'Search'}
      </h1>

      {query && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground/80">No Results Found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find anything for "{query}". Try a different search.
          </p>
        </div>
      )}

      {!query && (
         <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground/80">Search for content</h2>
          <p className="mt-2 text-muted-foreground">
            Use the search bar in the header to find movies and shows.
          </p>
        </div>
      )}
    </div>
  );
}
