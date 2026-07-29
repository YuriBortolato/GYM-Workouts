import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="Algo deu errado"
      subtitle="Não conseguimos concluir a autenticação. Tente novamente."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
          <AlertTriangle className="size-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            O link pode ter expirado ou já ter sido usado.
          </p>
        </div>
        <Button asChild className="h-11 w-full text-base font-semibold">
          <Link href="/auth/login">Voltar ao login</Link>
        </Button>
      </div>
    </AuthShell>
  )
}
