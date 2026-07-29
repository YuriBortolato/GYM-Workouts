'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function OtpInput({
  length = 6,
  onComplete,
}: {
  length?: number
  onComplete?: (code: string) => void
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function setDigit(index: number, digit: string) {
    const next = [...values]
    next[index] = digit
    setValues(next)
    if (digit && index < length - 1) refs.current[index + 1]?.focus()
    const code = next.join('')
    if (code.length === length && !next.includes('')) onComplete?.(code)
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1)
    setDigit(index, digit)
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    pasted.split('').forEach((d, i) => (next[i] = d))
    setValues(next)
    refs.current[Math.min(pasted.length, length - 1)]?.focus()
    if (pasted.length === length) onComplete?.(pasted)
  }

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`Dígito ${i + 1}`}
          className={cn(
            'size-12 rounded-lg border border-input bg-background text-center text-xl font-bold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30',
            value && 'border-primary',
          )}
        />
      ))}
    </div>
  )
}
