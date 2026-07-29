import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    name: 'System GYM-EX',
    short_name: 'GYM-EX',
    description: 'Seu app de treinos de academia com planos gerados por IA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  })
}
