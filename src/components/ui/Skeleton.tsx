export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-800/50 rounded ${className}`} />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#111] rounded-xl overflow-hidden border border-white/5">
      <Skeleton className="aspect-square rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-[#111] rounded-xl overflow-hidden border border-white/5">
      <Skeleton className="aspect-video rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  )
}
