import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AlbumGrid from "@/components/album-grid";

export default async function AlbumsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  const albums = await prisma.album.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      photos: {
        take: 1,
      },
    },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Love Albums</h1>
      <AlbumGrid albums={albums} />
    </div>
  );
}