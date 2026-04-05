import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const { title, excerpt, content, imageUrl, category, isPublished } = data;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content required" }, { status: 400 });
    }

    // Simple slug generation
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const article = await prisma.article.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        category: category || "UPDATE",
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        author: session.user.name || "Club Admin",
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null
      }
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        adminId: (session.user as any).id,
        adminName: session.user.name || "Unknown",
        action: "CREATE_ARTICLE",
        targetType: "ARTICLE",
        targetId: article.id,
        details: `Created article: ${title}`
      }
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Article Creation Error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
