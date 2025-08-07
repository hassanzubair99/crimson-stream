'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

const WATCHLIST_KEY = 'crimson-stream-watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to parse watchlist from localStorage', error);
      setWatchlist([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateLocalStorage = (newList: number[]) => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
    } catch (error) {
      console.error('Failed to save watchlist to localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not update your watchlist.',
        variant: 'destructive',
      });
    }
  };

  const addToWatchlist = useCallback((id: number) => {
    if (watchlist.includes(id)) return;
    const newList = [...watchlist, id];
    setWatchlist(newList);
    updateLocalStorage(newList);
    toast({ title: 'Added to Watchlist' });
  }, [watchlist]);

  const removeFromWatchlist = useCallback((id: number) => {
    if (!watchlist.includes(id)) return;
    const newList = watchlist.filter((itemId) => itemId !== id);
    setWatchlist(newList);
    updateLocalStorage(newList);
    toast({ title: 'Removed from Watchlist' });
  }, [watchlist]);

  const isInWatchlist = useCallback((id: number) => {
    return watchlist.includes(id);
  }, [watchlist]);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isLoaded };
}
