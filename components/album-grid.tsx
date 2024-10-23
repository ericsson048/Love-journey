"use client";

import { Album, Photo } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ImageIcon } from "lucide-react";

type AlbumWithPhotos = Album & {
  photos: Photo[];
};

export default function AlbumGrid({ albums }: { albums: AlbumWithPhotos[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <Link key={album.id} href={`/albums/${album.id}`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{album.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {album.photos[0] ? (
                <div className="relative aspect-[3/2] rounded-md overflow-hidden">
                  <Image
                    src={album.photos[0].url}
                    alt={album.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[3/2] rounded-md bg-muted flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(album.date), "MMMM d, yyyy")}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}