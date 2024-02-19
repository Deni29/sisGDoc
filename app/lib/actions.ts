'use server';

import { generateRandomId } from './placeholder-data'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    documentId: z.string(),
    categoryId: z.string(),
    departmentId: z.string(),
    name: z.string(),
    statusId: z.string(),
});

const CreateDocument = FormSchema.omit({})

export async function createDocument(formData: FormData) {
    const { documentId, categoryId, departmentId, name, statusId } = CreateDocument.parse({
        documentId: generateRandomId(),
        categoryId: formData.get('category'),
        departmentId: formData.get('department'),
        name: formData.get('name'),
        statusId: formData.get('status'),
        //imgURL: formData.get('imgURL'),
        //userId: formData.get('userId'),
    });

    await prisma.documento.createMany({
        data: [
            {
                id: documentId.toString(),
                titulo: name,
                conteudo: '',
                categoriaId: categoryId,
                estadoId: statusId,
            },
        ],
    });

    revalidatePath('/dashboard/document');
    redirect('/dashboard/document');
}
