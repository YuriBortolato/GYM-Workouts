import type { ReactNode } from 'react'
import { Logo } from '@/components/logo'

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-10">
      {/* Faixa de destaque superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden="true" />

      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl">
          <div className="mb-6 space-y-1.5">
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>
            )}
          </div>
          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </main>
  )
}
