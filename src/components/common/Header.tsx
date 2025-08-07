'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Film, Tv, Bookmark, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { useAppState } from '@/context/AppStateContext';

export function Header() {
  const router = useRouter();
  const { isIntroFinished } = useAppState();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search') as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  const navLinks = (
    <>
      <Link href="/" className="transition-colors hover:text-primary">Home</Link>
      <Link href="/watchlist" className="transition-colors hover:text-primary flex items-center gap-2">
        <Bookmark className="h-4 w-4" /> Watchlist
      </Link>
    </>
  );

  if (!isIntroFinished) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">Crimson Stream</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              className="h-9"
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </form>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                  <Link href="/" className="flex items-center gap-2 mb-8">
                     <Film className="h-6 w-6 text-primary" />
                     <span className="font-headline text-xl font-bold">Crimson Stream</span>
                  </Link>
                  <nav className="flex flex-col gap-6 text-lg font-medium">
                    {navLinks}
                  </nav>
                  <form onSubmit={handleSearch} className="flex items-center gap-2 mt-8">
                    <Input type="search" name="search" placeholder="Search..." />
                    <Button type="submit" variant="ghost" size="icon">
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
