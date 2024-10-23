import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-16 mx-auto text-center">
        <Heart className="w-16 h-16 mx-auto mb-8 text-primary animate-pulse" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
          Document Your Love Story
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          From first date to wedding day, capture every precious moment of your journey together.
          Create beautiful photo albums and share your love story with family and friends.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6">
          {session ? (
            <Link href="/albums">
              <Button size="lg" className="text-lg">
                View Your Albums
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
            </Link>
          )}
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}