'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Option {
  value: string
  label: string
  description?: string
  icon?: ReactNode
}

export function OptionGroup({
  label,
  name,
  options,
  value,
  onChange,
  columns = 1,
  required,
}: {
  label: string
  name: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  columns?: 1 | 2 | 3
  required?: boolean
}) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </legend>
      <input type="hidden" name={name} value={value} />
      <div
        className={cn(
          'grid gap-2',
          columns === 2 && 'grid-cols-2',
          columns === 3 && 'grid-cols-3',
        )}
      >
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={cn(
                'flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition',
                active
                  ? 'border-primary bg-primary/10 ring-1 ring-primary'
                  : 'border-border bg-background hover:border-muted-foreground/40',
              )}
            >
              {opt.icon && (
                <span className={cn('mb-0.5', active ? 'text-primary' : 'text-muted-foreground')}>
                  {opt.icon}
                </span>
              )}
              <span className="text-sm font-semibold text-foreground">{opt.label}</span>
              {opt.description && (
                <span className="text-xs leading-snug text-muted-foreground">{opt.description}</span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
