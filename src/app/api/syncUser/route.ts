import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, email, name } = await req.json();

    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { id: userId, email, name },
    });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return new Response(JSON.stringify({ error: "Failed to sync user" }), {
      status: 500,
    });
  }
}
