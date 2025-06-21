import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back navigation skeleton */}
      <Skeleton className="h-6 w-24 mb-8" />
      
      {/* Article header skeleton */}
      <article className="space-y-6">
        <header className="space-y-4">
          <Skeleton className="h-12 w-5/6" />
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </header>
        
        {/* Article content skeleton */}
        <div className="space-y-4 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
        
        {/* Reading progress skeleton */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Skeleton className="h-1 w-full" />
        </div>
      </article>
    </div>
  )
}