import Link from "next/link";
import Image from "next/image";
import LogoImage from "../public/assets/img/LoginImagem.png"

export default function Home() {
  
  return (
    <main className='h-screen flex flex-col'>
      <div className='flex flex-col flex-1  items-center justify-center'>
        <strong className='mt-10 text-blue-500 text-3xl'>BEM-VINDO</strong>
        <Image 
          className='-mt-16' 
          src={LogoImage} 
          width={380} 
          height={380} 
          alt="imagem centro" 
        />
      </div>
      
      <div className='bg-blue-400 flex flex-auto rounded-t-3xl -mt-12 justify-center'>
                <form action="" className='flex flex-col items-center'>
          <input type="text" className=' w-60 h-10 mt-4 rounded-xl border-4 border-white bg-blue-700 text-white p-2 ' placeholder='UTILIZADOR' />
          <input type="text" className=' w-60 h-10 mt-4 rounded-xl border-4 border-white bg-blue-700  text-white p-2' placeholder='PALAVRA-PASSE' />
          <Link href="/pages/dashboard" className="w-24 h-10 flex items-center justify-center pl-1 rounded-2xl bg-white text-blue-500 mt-4 text-2xl">
            Entrar
          </Link>
        </form>
      </div>
    </main>
  )
}