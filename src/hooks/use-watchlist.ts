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
    setWatchlist((prev) => {
      if (prev.includes(id)) return prev;
      const newList = [...prev, id];
      updateLocalStorage(newList);
      toast({ title: 'Added to Watchlist' });
      return newList;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: number) => {
    setWatchlist((prev) => {
      const newList = prev.filter((itemId) => itemId !== id);
      updateLocalStorage(newList);
      toast({ title: 'Removed from Watchlist' });
      return newList;
    });
  }, []);

  const isInWatchlist = useCallback((id: number) => {
    return watchlist.includes(id);
  }, [watchlist]);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isLoaded };
}
