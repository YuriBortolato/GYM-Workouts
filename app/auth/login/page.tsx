'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AuthShell } from '@/components/auth-shell'
import { Field } from '@/components/field'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setError('Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.')
      } else if (error.status === 429) {
        setError('Muitas tentativas. Aguarde alguns instantes e tente novamente.')
      } else {
        setError('E-mail ou senha inválidos.')
      }
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <AuthShell
      title="Bora treinar"
      subtitle="Entre para acessar seus treinos e evoluir todos os dias."
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link href="/auth/sign-up" className="font-semibold text-primary hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          id="email"
          type="email"
          label="E-mail"
          placeholder="voce@email.com"
          icon={<Mail className="size-4" />}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          id="password"
          type="password"
          label="Senha"
          placeholder="Sua senha"
          icon={<Lock className="size-4" />}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
            {error}
          </p>
        )}

        <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
        </Button>
      </form>
    </AuthShell>
  )
}
