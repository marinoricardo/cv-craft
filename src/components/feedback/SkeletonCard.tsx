import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  className?: string;
  variant?: 'cv' | 'template' | 'list';
}

export const SkeletonCard = ({ className, variant = 'cv' }: SkeletonCardProps) => {
  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'template') {
    return (
      <div className={cn('bg-card rounded-xl border border-border overflow-hidden', className)}>
        <Skeleton className="aspect-[3/4] w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  // CV card skeleton
  return (
    <div className={cn('bg-card rounded-xl border border-border overflow-hidden', className)}>
      <div className="aspect-[3/4] p-4 bg-muted/30">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
};
