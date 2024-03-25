import LoginForm from '@/app/ui/login-form';
import loginImage from '/public/assets/img/LoginImagem.png'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full rounded-lg p-3 md:h-36">
                    <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            src={loginImage}
                            width={140}
                            height={140}
                            className="block md:hidden"
                            alt="Login Image"
                        />
                        <Image
                            src={loginImage}
                            width={250}
                            height={250}
                            className="hidden md:block"
                            alt="Login Image"
                        />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}