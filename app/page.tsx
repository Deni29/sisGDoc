"use client"

import loginImage from '../public/assets/img/LoginImagem.png'
import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-sisgdoc">
        Conecte-se à sua conta
      </h2>
      <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src={loginImage}
          width={184}
          height={184}
          className="block md:hidden"
          alt="Login Image"
        />
        <Image
          src={loginImage}
          width={300}
          height={300}
          className="hidden md:block"
          alt="Login Image"
        />
      </div>

      <div className="mt-auto sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Endereço de e-mail</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-sisgdoc sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div className="text-sm">
                <Link href="/forgotPassword">
                  <span className="font-semibold text-blue-sisgdoc hover:text-blue-sisgdoc">Esqueceu da senha?</span>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-sisgdoc sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-sisgdoc px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-sisgdoc focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-sisgdoc">Entrar</button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Não tem uma conta?
          <Link href="/dashboard">
            <span className="font-semibold leading-6 text-blue-sisgdoc hover:text-blue-sisgdoc">Cria uma conta</span>
          </Link>
        </p>
      </div>
    </div>
  )
}