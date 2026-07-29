import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AnamneseForm } from '@/components/anamnese-form'
import { Logo } from '@/components/logo'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, onboarding_completed')
    .eq('id', user.id)
    .single()

  if (profile?.onboarding_completed) redirect('/dashboard')

  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-5 py-10">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Logo />
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-balance">
            Anamnese
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Conte um pouco sobre você. Usaremos essas informações para montar o treino ideal.
          </p>
        </div>
      </div>

      <AnamneseForm defaultName={profile?.full_name ?? (user.user_metadata?.full_name as string) ?? ''} />
    </main>
  )
}
