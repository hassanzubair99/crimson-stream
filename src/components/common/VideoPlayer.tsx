'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlayCircle className="mr-2 h-6 w-6" />
          Play
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-0 bg-black">
        <DialogHeader className="p-4">
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={src}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
