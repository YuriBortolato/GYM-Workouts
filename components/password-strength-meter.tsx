'use client'

import { Check, X } from 'lucide-react'
import { checkPassword, passwordStrength } from '@/lib/password'
import { cn } from '@/lib/utils'

const LABELS: Record<string, string> = {
  vazia: '',
  fraca: 'Fraca',
  media: 'Média',
  forte: 'Forte',
}

const REQUIREMENTS: { key: keyof ReturnType<typeof checkPassword>; label: string }[] = [
  { key: 'length', label: 'Mínimo 8 caracteres' },
  { key: 'upper', label: 'Uma letra maiúscula' },
  { key: 'lower', label: 'Uma letra minúscula' },
  { key: 'number', label: 'Um número' },
  { key: 'symbol', label: 'Um símbolo (!@#$...)' },
]

export function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = passwordStrength(password)
  const checks = checkPassword(password)

  const barCount = strength === 'forte' ? 3 : strength === 'media' ? 2 : strength === 'fraca' ? 1 : 0
  const barColor =
    strength === 'forte'
      ? 'bg-success'
      : strength === 'media'
        ? 'bg-warning'
        : 'bg-primary'

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i < barCount ? barColor : 'bg-muted',
              )}
            />
          ))}
        </div>
        {strength !== 'vazia' && (
          <span
            className={cn(
              'w-14 text-right text-xs font-semibold uppercase tracking-wide',
              strength === 'forte'
                ? 'text-success'
                : strength === 'media'
                  ? 'text-warning'
                  : 'text-primary',
            )}
          >
            {LABELS[strength]}
          </span>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {REQUIREMENTS.map((req) => {
          const ok = checks[req.key]
          return (
            <li
              key={req.key}
              className={cn(
                'flex items-center gap-1.5 text-xs',
                ok ? 'text-muted-foreground' : 'text-muted-foreground/70',
              )}
            >
              <span
                className={cn(
                  'flex size-4 shrink-0 items-center justify-center rounded-full',
                  ok ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground/60',
                )}
              >
                {ok ? <Check className="size-3" strokeWidth={3} /> : <X className="size-3" strokeWidth={3} />}
              </span>
              {req.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
