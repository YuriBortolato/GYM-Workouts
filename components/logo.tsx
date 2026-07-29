import { Dumbbell } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Dumbbell className="size-5" strokeWidth={2.5} />
      </span>
      {showText && (
        <span className="font-display text-2xl font-bold uppercase tracking-tight leading-none">
          System <span className="text-primary">GYM-EX</span>
        </span>
      )}
    </div>
  )
}
