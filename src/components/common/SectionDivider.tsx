import { cn } from '@/lib/utils'

export interface SectionDividerProps {
  className?: string
  symbol?: string
}

export function SectionDivider({ 
  className,
  symbol = "⸻"
}: SectionDividerProps) {
  return (
    <div 
      className={cn(
        "text-center text-muted-foreground text-3xl mb-16 font-light",
        className
      )}
      aria-hidden="true"
      role="separator"
    >
      {symbol}
    </div>
  )
}