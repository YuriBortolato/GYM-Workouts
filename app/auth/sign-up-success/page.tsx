'use client'

import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth-shell'
import { OtpInput } from '@/components/otp-input'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      title="Confirme seu acesso"
      subtitle="Enviamos um link de confirmação para o seu e-mail. Confirme para liberar sua conta."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-lg border border-success/40 bg-success/10 px-4 py-3">
          <MailCheck className="size-5 shrink-0 text-success" />
          <p className="text-sm text-foreground">
            Verifique sua caixa de entrada e clique no link para ativar sua conta.
          </p>
        </div>

        {/* Interface de OTP via SMS — pronta para ativar com um provedor de SMS */}
        <div className="space-y-3 rounded-lg border border-dashed border-border p-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Ativação por SMS</p>
            <p className="text-xs text-muted-foreground">
              Digite o código de 6 dígitos enviado por SMS (disponível ao conectar um provedor).
            </p>
          </div>
          <OtpInput />
          <Button variant="outline" className="w-full" disabled>
            Verificar código
          </Button>
        </div>

        <Button asChild className="h-11 w-full text-base font-semibold">
          <Link href="/auth/login">Ir para o login</Link>
        </Button>
      </div>
    </AuthShell>
  )
}
