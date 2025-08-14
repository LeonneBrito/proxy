/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signIn, useSession } from '@/lib/auth-client'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()
  const { data: session } = useSession() 

  useEffect(() => {
    if (session?.user) {
      router.push('/store')
    }
  }, [session, router])

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Informe nome de usuário e senha.')
      return
    }

    try {
      setSubmitting(true)

      const { data, error } = await signIn.username({
        username,
        password,
      })

      if (error) {
        toast.error(error.message ?? 'Falha ao entrar.')
        return
      }

      const display = data?.user?.name || data?.user?.email || 'usuário'
      toast.success(`Bem-vindo, ${display}!`)
      router.push('/store')
    } catch (err: any) {
      toast.error('Erro inesperado ao autenticar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-sm bg-gray-950 border border-green-800 text-white shadow-xl rounded-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-green-400 font-bold">
          ACESSAR_SISTEMA
        </CardTitle>
        <CardDescription className="text-green-200 text-sm">
          Digite o login e a senha para acessar o sistema.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login" className="text-green-300">
            Login (nome de usuário)
          </Label>
          <Input
            id="login"
            placeholder="ex: usuario123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="bg-gray-950 border-green-600 focus-visible:ring-green-400 text-white rounded-none"
            autoComplete="username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-green-300">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-950 border-green-600 focus-visible:ring-green-400 text-white rounded-none"
            autoComplete="current-password"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleLogin}
          disabled={submitting}
          variant="outline"
          className="text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none w-full"
        >
          {submitting ? '[ENTRANDO...]' : '[ACESSAR_SISTEMA]'}
        </Button>
      </CardFooter>
    </Card>
  )
}
