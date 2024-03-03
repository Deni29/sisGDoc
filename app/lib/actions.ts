'use server';

import { generateRandomId } from './placeholder-data'
import { z } from 'zod'
import { Categoria, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    documentId: z.string(),
    name: z.string(),
    conteudo: z.string(),
    status: z.string(),
    user: z.string(),
    department: z.string(),
});

const CreateDocument = FormSchema.omit({})

export async function createDocument(formData: FormData) {
    const { documentId, name, conteudo, status, user, department } = CreateDocument.parse({
        documentId: generateRandomId(),
        name: formData.get('name'),
        conteudo: formData.get('conteudo'),
        status: formData.get('status'),
        user: formData.get('user'),
        department: formData.get('department'),
        //imgURL: formData.get('imgURL'),
    });

    const  category = formData.get('category') as Categoria;

    await prisma.documento.createMany({
        data: [
            {
                id: documentId.toString(),
                titulo: name,
                Categoria: category,
                conteudo: conteudo,
                status: status,
                utilizadorId: user,
                departamentoId: department,
            },
        ],
    });

    revalidatePath('/dashboard/document');
    redirect('/dashboard/document');
}
