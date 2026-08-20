import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers: request.headers })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [productsRes, postsRes, inquiriesRes, mediaRes, categoriesRes, usersRes] =
      await Promise.all([
        payload.find({ collection: 'products', limit: 0 }),
        payload.find({ collection: 'posts', limit: 0 }),
        payload.find({ collection: 'inquiries', limit: 0 }),
        payload.find({ collection: 'media', limit: 0 }),
        payload.find({ collection: 'categories', limit: 0 }),
        payload.find({ collection: 'users', limit: 0 }),
      ])

    const [recentProducts, recentPosts, recentInquiries] = await Promise.all([
      payload.find({
        collection: 'products',
        limit: 5,
        sort: '-createdAt',
        select: { title: true, createdAt: true },
      }),
      payload.find({
        collection: 'posts',
        limit: 5,
        sort: '-publishedAt',
        select: { title: true, publishedAt: true, createdAt: true },
      }),
      payload.find({
        collection: 'inquiries',
        limit: 5,
        sort: '-createdAt',
        select: { companyName: true, contactPerson: true, createdAt: true },
      }),
    ])

    return NextResponse.json({
      stats: {
        products: productsRes.totalDocs,
        posts: postsRes.totalDocs,
        inquiries: inquiriesRes.totalDocs,
        media: mediaRes.totalDocs,
        categories: categoriesRes.totalDocs,
        users: usersRes.totalDocs,
      },
      recentProducts: recentProducts.docs.map((doc: Record<string, unknown>) => ({
        id: doc.id,
        title: doc.title || 'Untitled',
        date: doc.createdAt,
      })),
      recentPosts: recentPosts.docs.map((doc: Record<string, unknown>) => ({
        id: doc.id,
        title: doc.title || 'Untitled',
        date: doc.publishedAt || doc.createdAt,
      })),
      recentInquiries: recentInquiries.docs.map((doc: Record<string, unknown>) => ({
        id: doc.id,
        title: doc.companyName || doc.contactPerson || 'Unknown',
        date: doc.createdAt,
      })),
    })
  } catch (error) {
    console.error('[Dashboard API]', error)
    return NextResponse.json(
      {
        stats: { products: 0, posts: 0, inquiries: 0, media: 0, categories: 0, users: 0 },
        recentProducts: [],
        recentPosts: [],
        recentInquiries: [],
      },
      { status: 500 }
    )
  }
}
