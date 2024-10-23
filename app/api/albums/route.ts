import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const json = await request.json();
    const album = await prisma.album.create({
      data: {
        title: json.title,
        description: json.description,
        date: json.date,
        userId: session.user.id,
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}