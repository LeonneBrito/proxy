/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import { gangs } from '@/constants/gangs'

export function LoginForm() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    const match = Object.entries(gangs).find(
      ([_, gang]) => gang.login === login && gang.password === password,
    )

    if (!match) {
      toast.error('Login ou senha inválidos.')
      return
    }

    const [key, gang] = match

    localStorage.setItem('gang', key)

    toast.success(`Bem-vindo, ${gang.name}!`)
    router.push('/store')
  }

  useEffect(() => {
    const alreadyLogged = localStorage.getItem('gang')
    if (alreadyLogged) {
      router.push('/store')
    }
  }, [router])

  return (
    <Card className="w-full max-w-sm bg-gray-950 border border-green-800 text-white shadow-xl rounded-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-green-400 font-bold">
          ACESSAR_SISTEMA
        </CardTitle>
        <CardDescription className="text-green-200 text-sm">
          Digite o login e a senha da sua gangue para acessar o sistema.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login" className="text-green-300">
            Login
          </Label>
          <Input
            id="login"
            type="text"
            placeholder="ex: angels"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="bg-gray-950 border-green-600 focus-visible:ring-green-400 text-white rounded-none"
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
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleLogin}
          variant="outline"
          className=" text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none w-full"
        >
          [ACESSAR_SISTEMA]
        </Button>
      </CardFooter>
    </Card>
  )
}
