import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { Media } from '@/lib/types';
import { PlayCircle } from 'lucide-react';

interface ContentCardProps {
  item: Media;
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Link href={`/movies/${item.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:scale-105 border-transparent">
        <div className="aspect-[2/3] relative">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            data-ai-hint="movie poster"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-semibold truncate">{item.title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
