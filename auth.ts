import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { type Utilizador, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getUser(email: string): Promise<Utilizador | undefined> {
    try {
        const user = await prisma.utilizador.findUnique({
            where: { email: email },
        });
        return user as Utilizador;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    //const passwordsMatch = await bcrypt.compare(password, user.palavra_passe);
                    const passwordsMatch = password == user.palavra_passe;

                    if (passwordsMatch) return user;
                }

                console.log('Crediciais inválidas!');
                return null;
            },
        }),
    ],
});