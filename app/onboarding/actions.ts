'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AnamneseResult {
  error?: string
}

export async function saveAnamnese(
  _prev: AnamneseResult,
  formData: FormData,
): Promise<AnamneseResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Sessão expirada. Faça login novamente.' }

  const payload = {
    id: user.id,
    full_name: (formData.get('full_name') as string)?.trim() || null,
    birth_date: (formData.get('birth_date') as string) || null,
    gender: (formData.get('gender') as string) || null,
    height_cm: formData.get('height_cm') ? Number(formData.get('height_cm')) : null,
    weight_kg: formData.get('weight_kg') ? Number(formData.get('weight_kg')) : null,
    goal: (formData.get('goal') as string) || null,
    experience_level: (formData.get('experience_level') as string) || null,
    days_per_week: formData.get('days_per_week') ? Number(formData.get('days_per_week')) : null,
    training_context: (formData.get('training_context') as string) || null,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  }

  if (!payload.goal || !payload.experience_level || !payload.training_context) {
    return { error: 'Preencha os campos obrigatórios para continuar.' }
  }

  const { error } = await supabase.from('profiles').upsert(payload)

  if (error) {
    console.log('[v0] saveAnamnese error:', error.message)
    return { error: 'Não foi possível salvar seus dados. Tente novamente.' }
  }

  redirect('/dashboard')
}
