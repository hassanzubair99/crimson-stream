'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

function getWatchlistKey(userId: string | null) {
  return userId ? `crimson-stream-watchlist-${userId}` : null;
}

export function useWatchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const WATCHLIST_KEY = getWatchlistKey(user?.email || null);


  useEffect(() => {
    if (user) {
      try {
        const saved = localStorage.getItem(WATCHLIST_KEY!);
        if (saved) {
          setWatchlist(JSON.parse(saved));
        } else {
          setWatchlist([]);
        }
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage', error);
        setWatchlist([]);
      } finally {
        setIsLoaded(true);
      }
    } else {
      // Not logged in, clear watchlist and mark as loaded
      setWatchlist([]);
      setIsLoaded(true);
    }
  }, [user, WATCHLIST_KEY]);

  const updateLocalStorage = (newList: number[]) => {
    if (WATCHLIST_KEY) {
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
    }
  };

  const addToWatchlist = useCallback((id: number) => {
    setWatchlist(prevList => {
       if (prevList.includes(id)) return prevList;
       const newList = [...prevList, id];
       updateLocalStorage(newList);
       toast({ title: 'Added to Watchlist' });
       return newList;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: number) => {
    setWatchlist(prevList => {
       if (!prevList.includes(id)) return prevList;
       const newList = prevList.filter((itemId) => itemId !== id);
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
