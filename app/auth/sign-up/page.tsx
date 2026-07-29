'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, Mail, Phone, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AuthShell } from '@/components/auth-shell'
import { Field } from '@/components/field'
import { PasswordStrengthMeter } from '@/components/password-strength-meter'
import { Button } from '@/components/ui/button'
import { passwordStrength } from '@/lib/password'

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isStrong = passwordStrength(password) === 'forte'
  const canSubmit = fullName.trim() && phone.trim() && email.trim() && isStrong

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          phone,
        },
      },
    })

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        setError('Este e-mail já está cadastrado. Faça login.')
      } else if (error.message.toLowerCase().includes('password')) {
        setError('Senha muito fraca. Siga os requisitos abaixo.')
      } else if (error.status === 429) {
        setError('Muitas tentativas. Aguarde alguns instantes.')
      } else {
        setError('Não foi possível criar a conta. Tente novamente.')
      }
      setLoading(false)
      return
    }

    router.push('/auth/sign-up-success')
  }

  return (
    <AuthShell
      title="Criar conta"
      subtitle="Preencha seus dados para começar a treinar com o GYM-EX."
      footer={
        <>
          Já tem conta?{' '}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          id="fullName"
          label="Nome completo"
          placeholder="Seu nome"
          icon={<User className="size-4" />}
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Field
          id="phone"
          type="tel"
          label="Telefone (identificador)"
          placeholder="(11) 99999-9999"
          icon={<Phone className="size-4" />}
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
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
          placeholder="Crie uma senha forte"
          icon={<Lock className="size-4" />}
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint={<div className="pt-2"><PasswordStrengthMeter password={password} /></div>}
        />

        {error && (
          <p className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="h-11 w-full text-base font-semibold"
          disabled={!canSubmit || loading}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Criar conta'}
        </Button>
        {!isStrong && password.length > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            A senha precisa ser <span className="font-semibold text-foreground">Forte</span> para
            liberar o cadastro.
          </p>
        )}
      </form>
    </AuthShell>
  )
}
