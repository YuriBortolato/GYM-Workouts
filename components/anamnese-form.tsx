'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  Dumbbell,
  Flame,
  HeartPulse,
  Loader2,
  User,
  Users,
  UsersRound,
} from 'lucide-react'
import { saveAnamnese, type AnamneseResult } from '@/app/onboarding/actions'
import { Field } from '@/components/field'
import { OptionGroup } from '@/components/option-group'
import { Button } from '@/components/ui/button'

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="h-12 w-full text-base font-semibold"
      disabled={pending || disabled}
    >
      {pending ? <Loader2 className="size-5 animate-spin" /> : 'Concluir e montar meu perfil'}
    </Button>
  )
}

export function AnamneseForm({ defaultName }: { defaultName: string }) {
  const [state, formAction] = useActionState<AnamneseResult, FormData>(saveAnamnese, {})

  const [gender, setGender] = useState('')
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('')
  const [days, setDays] = useState('')
  const [context, setContext] = useState('')

  const complete = goal && level && context

  return (
    <form action={formAction} className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-primary">
          Dados básicos
        </h2>
        <Field id="full_name" name="full_name" label="Nome completo" defaultValue={defaultName} required />
        <div className="grid grid-cols-2 gap-3">
          <Field id="birth_date" name="birth_date" type="date" label="Nascimento" />
          <OptionGroup
            label="Sexo"
            name="gender"
            value={gender}
            onChange={setGender}
            columns={1}
            options={[
              { value: 'masculino', label: 'Masculino' },
              { value: 'feminino', label: 'Feminino' },
              { value: 'outro', label: 'Outro' },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="height_cm" name="height_cm" type="number" label="Altura (cm)" placeholder="175" min={100} max={250} />
          <Field id="weight_kg" name="weight_kg" type="number" label="Peso (kg)" placeholder="75" min={30} max={300} step="0.1" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-primary">
          Objetivo e nível
        </h2>
        <OptionGroup
          label="Qual seu objetivo principal?"
          name="goal"
          required
          value={goal}
          onChange={setGoal}
          columns={2}
          options={[
            { value: 'hipertrofia', label: 'Hipertrofia', description: 'Ganhar massa muscular', icon: <Dumbbell className="size-5" /> },
            { value: 'emagrecimento', label: 'Emagrecimento', description: 'Reduzir gordura', icon: <Flame className="size-5" /> },
            { value: 'forca', label: 'Força', description: 'Aumentar carga', icon: <Dumbbell className="size-5" /> },
            { value: 'condicionamento', label: 'Condicionamento', description: 'Fôlego e resistência', icon: <HeartPulse className="size-5" /> },
            { value: 'saude', label: 'Saúde geral', description: 'Bem-estar e rotina', icon: <HeartPulse className="size-5" /> },
          ]}
        />
        <OptionGroup
          label="Seu nível de experiência"
          name="experience_level"
          required
          value={level}
          onChange={setLevel}
          columns={3}
          options={[
            { value: 'iniciante', label: 'Iniciante' },
            { value: 'intermediario', label: 'Intermediário' },
            { value: 'avancado', label: 'Avançado' },
          ]}
        />
        <OptionGroup
          label="Quantos dias por semana você treina?"
          name="days_per_week"
          value={days}
          onChange={setDays}
          columns={3}
          options={[
            { value: '1', label: '1 dia' },
            { value: '2', label: '2 dias' },
            { value: '3', label: '3 dias' },
            { value: '4', label: '4 dias' },
            { value: '5', label: '5 dias' },
            { value: '6', label: '6 dias' },
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-primary">
          Contexto de treino
        </h2>
        <OptionGroup
          label="Como você vai treinar?"
          name="training_context"
          required
          value={context}
          onChange={setContext}
          columns={1}
          options={[
            { value: 'sozinho', label: 'Sozinho(a)', description: 'Foco total no seu ritmo', icon: <User className="size-5" /> },
            { value: 'amigos_mesmo_sexo', label: 'Com amigos do mesmo sexo', description: 'Treino em grupo motivado', icon: <Users className="size-5" /> },
            { value: 'amigos_sexos_opostos', label: 'Com amigos de sexos opostos', description: 'Amigos / namoro', icon: <UsersRound className="size-5" /> },
          ]}
        />
      </section>

      {state.error && (
        <p className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
          {state.error}
        </p>
      )}

      <SubmitButton disabled={!complete} />
      {!complete && (
        <p className="text-center text-xs text-muted-foreground">
          Preencha os campos marcados com <span className="text-primary">*</span> para continuar.
        </p>
      )}
    </form>
  )
}
