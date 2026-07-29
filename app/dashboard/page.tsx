import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bell, LogOut, Sparkles, Target, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const GOAL_LABELS: Record<string, string> = {
  hipertrofia: 'Hipertrofia',
  emagrecimento: 'Emagrecimento',
  forca: 'Força',
  condicionamento: 'Condicionamento',
  saude: 'Saúde geral',
}

const LEVEL_LABELS: Record<string, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

const CONTEXT_LABELS: Record<string, string> = {
  sozinho: 'Sozinho(a)',
  amigos_mesmo_sexo: 'Com amigos do mesmo sexo',
  amigos_sexos_opostos: 'Com amigos de sexos opostos',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  if (!profile?.onboarding_completed) redirect('/onboarding')

  const firstName = (profile.full_name as string)?.split(' ')[0] ?? 'atleta'

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg px-5 pb-16 pt-6">
      <header className="mb-8 flex items-center justify-between">
        <Logo showText={false} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notificações"
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
          >
            <Bell className="size-5" />
          </button>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Sair"
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-primary"
            >
              <LogOut className="size-5" />
            </button>
          </form>
        </div>
      </header>

      <div className="mb-8 space-y-1">
        <p className="text-sm text-muted-foreground">Bem-vindo de volta,</p>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-balance">
          {firstName}
        </h1>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard icon={<Target className="size-4" />} label="Objetivo" value={GOAL_LABELS[profile.goal] ?? '-'} />
        <StatCard icon={<TrendingUp className="size-4" />} label="Nível" value={LEVEL_LABELS[profile.experience_level] ?? '-'} />
        <StatCard icon={<Sparkles className="size-4" />} label="Dias/sem" value={profile.days_per_week ? String(profile.days_per_week) : '-'} />
      </div>

      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Contexto de treino</p>
        <p className="mt-1 font-semibold text-foreground">
          {CONTEXT_LABELS[profile.training_context] ?? '-'}
        </p>
      </div>

      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center">
        <Sparkles className="mx-auto mb-3 size-8 text-primary" />
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">
          Seu treino está a um clique
        </h2>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Gere um plano personalizado com IA baseado no seu perfil.
        </p>
        <Button className="mt-4 h-11 w-full text-base font-semibold" disabled>
          Gerar Plano de Treino com IA
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">Disponível na próxima etapa.</p>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/onboarding" className="text-primary hover:underline">
          Editar minha anamnese
        </Link>
      </p>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <span className="text-primary">{icon}</span>
      <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
