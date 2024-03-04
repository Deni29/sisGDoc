'use server';

import { generateRandomId } from './placeholder-data'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    documentId: z.string(),
    name: z.string(),
    category: z.string(),
    conteudo: z.string(),
    status: z.string(),
    user: z.string(),
    department: z.string(),
});

const CreateDocument = FormSchema.omit({})

export async function createDocument(formData: FormData) {
    const { documentId, name, category, conteudo, status, user, department } = CreateDocument.parse({
        documentId: generateRandomId(),
        name: formData.get('name'),
        category: formData.get('category'),
        conteudo: formData.get('conteudo'),
        status: formData.get('status'),
        user: formData.get('user'),
        department: formData.get('department'),
        //imgURL: formData.get('imgURL'),
    });


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

// Use Zod to update the expected types
const UpdateDocument = FormSchema.omit({ documentId: true, date: true });

export async function updateDocument(id: string, formData: FormData) {
    const { name, category, conteudo, status, user, department } = UpdateDocument.parse({
        name: formData.get('name'),
        category: formData.get('category'),
        conteudo: formData.get('conteudo'),
        status: formData.get('status'),
        user: formData.get('userId'),
        department: formData.get('department'),
        //imgURL: formData.get('imgURL'),
    });

    await prisma.documento.update({
        where: { id: id },
        data: {
            titulo: name,
            Categoria: category,
            conteudo: conteudo,
            status: status,
            utilizadorId: user,
            departamentoId: department,
        },
    });

    revalidatePath('/dashboard/document');
    redirect('/dashboard/document');
}