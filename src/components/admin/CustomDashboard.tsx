'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  products: number
  posts: number
  inquiries: number
  media: number
  categories: number
  users: number
}

interface RecentItem {
  id: string
  title: string
  date: string
}

interface DashboardData {
  stats: DashboardStats
  recentProducts: RecentItem[]
  recentPosts: RecentItem[]
  recentInquiries: RecentItem[]
}

export default function CustomDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/dashboard-stats', { credentials: 'include' })
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch {
        // fallback: still show dashboard with zeros
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const stats = data?.stats ?? { products: 0, posts: 0, inquiries: 0, media: 0, categories: 0, users: 0 }
  const recentProducts = data?.recentProducts ?? []
  const recentPosts = data?.recentPosts ?? []
  const recentInquiries = data?.recentInquiries ?? []

  const statCards = [
    {
      label: 'Products',
      value: stats.products,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      href: '/admin/collections/products',
      color: 'from-[#C8A951]/10 to-[#C8A951]/5',
      borderColor: 'border-[#C8A951]/20',
      iconColor: 'text-[#C8A951]',
    },
    {
      label: 'Blog Posts',
      value: stats.posts,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      href: '/admin/collections/posts',
      color: 'from-blue-500/10 to-blue-500/5',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      label: 'Inquiries',
      value: stats.inquiries,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      href: '/admin/collections/inquiries',
      color: 'from-emerald-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      label: 'Media Files',
      value: stats.media,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18V6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 18z" />
        </svg>
      ),
      href: '/admin/collections/media',
      color: 'from-purple-500/10 to-purple-500/5',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      label: 'Categories',
      value: stats.categories,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      href: '/admin/collections/categories',
      color: 'from-amber-500/10 to-amber-500/5',
      borderColor: 'border-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      label: 'Users',
      value: stats.users,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      href: '/admin/collections/users',
      color: 'from-rose-500/10 to-rose-500/5',
      borderColor: 'border-rose-500/20',
      iconColor: 'text-rose-400',
    },
  ]

  const quickActions = [
    { label: 'Add New Product', href: '/admin/collections/products/create', icon: '+' },
    { label: 'Write Blog Post', href: '/admin/collections/posts/create', icon: '✎' },
    { label: 'View Inquiries', href: '/admin/collections/inquiries', icon: '✉' },
    { label: 'Manage Products', href: '/admin/collections/products', icon: '☰' },
    { label: 'Site Settings', href: '/admin/globals/siteSettings', icon: '⚙' },
    { label: 'Edit Homepage', href: '/admin/globals/homePage', icon: '⌂' },
  ]

  function formatDate(dateStr: string) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#C8A951]/10 via-[#C8A951]/5 to-transparent border border-[#C8A951]/15 p-6 md:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-[#C8A951] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Admin Dashboard</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Cairo', 'Inter', sans-serif" }}>
              الوحيد للاحذية
            </h1>
            <p className="text-sm text-gray-400">EL WAHEED SHOES &mdash; Management Console</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Quick Access</p>
            <div className="flex items-center gap-2 mt-1">
              <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">Ctrl</kbd>
              <span className="text-gray-600 text-xs">+</span>
              <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">Shift</kbd>
              <span className="text-gray-600 text-xs">+</span>
              <kbd className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">A</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative overflow-hidden rounded-xl border ${card.borderColor} bg-gradient-to-br ${card.color} p-5 transition-all duration-300 hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{card.label}</p>
                <p className="text-3xl font-bold text-white">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
                  ) : (
                    card.value.toLocaleString()
                  )}
                </p>
              </div>
              <div className={`${card.iconColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                {card.icon}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-[#111] p-4 text-center transition-all duration-200 hover:border-[#C8A951]/30 hover:bg-[#161616] hover:scale-[1.02] group"
            >
              <span className="text-lg text-[#C8A951]/70 group-hover:text-[#C8A951] transition-colors">{action.icon}</span>
              <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <h3 className="text-sm font-semibold text-white">Recent Products</h3>
            <Link href="/admin/collections/products" className="text-xs text-[#C8A951] hover:text-[#C8A951]/80 transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse mb-2" />
                  <div className="w-1/2 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              ))
            ) : recentProducts.length > 0 ? (
              recentProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/collections/products/${item.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-gray-300 truncate max-w-[180px]">{item.title}</span>
                  <span className="text-xs text-gray-600 shrink-0 ml-3">{formatDate(item.date)}</span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-6 text-center text-xs text-gray-600">No products yet</div>
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <h3 className="text-sm font-semibold text-white">Recent Posts</h3>
            <Link href="/admin/collections/posts" className="text-xs text-[#C8A951] hover:text-[#C8A951]/80 transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse mb-2" />
                  <div className="w-1/2 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              ))
            ) : recentPosts.length > 0 ? (
              recentPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/collections/posts/${item.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-gray-300 truncate max-w-[180px]">{item.title}</span>
                  <span className="text-xs text-gray-600 shrink-0 ml-3">{formatDate(item.date)}</span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-6 text-center text-xs text-gray-600">No posts yet</div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-xl border border-white/[0.06] bg-[#111] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <h3 className="text-sm font-semibold text-white">Recent Inquiries</h3>
            <Link href="/admin/collections/inquiries" className="text-xs text-[#C8A951] hover:text-[#C8A951]/80 transition-colors">View All</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="w-3/4 h-4 bg-white/5 rounded animate-pulse mb-2" />
                  <div className="w-1/2 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              ))
            ) : recentInquiries.length > 0 ? (
              recentInquiries.map((item) => (
                <Link
                  key={item.id}
                  href={`/admin/collections/inquiries/${item.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-gray-300 truncate max-w-[180px]">{item.title}</span>
                  <span className="text-xs text-gray-600 shrink-0 ml-3">{formatDate(item.date)}</span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-6 text-center text-xs text-gray-600">No inquiries yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Footer branding */}
      <div className="mt-10 pt-6 border-t border-white/[0.04] text-center">
        <p className="text-[11px] text-gray-600">
          EL WAHEED SHOES Admin Panel &middot; Powered by Payload CMS
        </p>
      </div>
    </div>
  )
}
