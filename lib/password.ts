export type PasswordStrength = 'vazia' | 'fraca' | 'media' | 'forte'

export interface PasswordChecks {
  length: boolean
  upper: boolean
  lower: boolean
  number: boolean
  symbol: boolean
}

export function checkPassword(password: string): PasswordChecks {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }
}

export function passwordStrength(password: string): PasswordStrength {
  if (!password) return 'vazia'
  const checks = checkPassword(password)
  const passed = Object.values(checks).filter(Boolean).length

  // "Forte" exige TODOS os critérios: 8+ caracteres, maiúsculas,
  // minúsculas, números e símbolos.
  if (passed === 5) return 'forte'
  if (passed >= 3) return 'media'
  return 'fraca'
}
