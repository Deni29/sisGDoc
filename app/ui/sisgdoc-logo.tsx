import logo from '@/public/logo.png';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'

export default function Sisgdoc() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-white`}
    >
      <Image 
        className="h-32 w-24" 
        src={logo}
        alt='SisGDoc Logo'  
      />
    </div>
  );
}
