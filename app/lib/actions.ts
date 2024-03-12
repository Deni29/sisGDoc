'use server';

import { generateRandomId } from './placeholder-data'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    documentId: z.string(),
    name: z.string({
        invalid_type_error: 'Por favor insira um nome',
    }),
    category: z.string({
        invalid_type_error: 'Selecione uma categoria de documento.',
    }),
    conteudo: z.string({
        invalid_type_error: 'Selecione um arquivo (.docx, .xlxs, .pdf e .pptx).',
    }),
    status: z.string({
        invalid_type_error: 'Selecione o status de um documento.',
    }),
    department: z.string({
        invalid_type_error: 'Selecione um departamento de documentos.',
    }),
    user: z.string(),
});

const CreateDocument = FormSchema.omit({})

export type State = {
    errors?: {
        name?: string[];
        category?: string[];
        conteudo?: string[];
        status?: string[];
        department?: string[];
    };
    message?: string | null;
};

export async function createDocument(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateDocument.safeParse({
        documentId: generateRandomId(),
        name: formData.get('name'),
        category: formData.get('category'),
        conteudo: formData.get('conteudo')?.toString(),
        status: formData.get('status'),
        user: formData.get('user'),
        department: formData.get('department'),
        //imgURL: formData.get('imgURL'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { documentId, name, category, conteudo, status, user, department } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
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
                    dataCriacao: date,
                },
            ],
        });
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Document.',
        };
    }

    revalidatePath('/dashboard/document');
    redirect('/dashboard/document');
}

// Use Zod to update the expected types
const UpdateDocument = FormSchema.omit({ documentId: true, date: true });

export async function updateDocument(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateDocument.safeParse({
        name: formData.get('name'),
        category: formData.get('category'),
        conteudo: formData.get('conteudo')?.toString(),
        status: formData.get('status'),
        user: formData.get('userId'),
        department: formData.get('department'),
        //imgURL: formData.get('imgURL'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { name, category, conteudo, status, user, department } = validatedFields.data;

    try {
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
    } catch (error) {
        return { message: 'Database Error: Failed to Update Document.' };
    }

    revalidatePath('/dashboard/document');
    redirect('/dashboard/document');
}

export async function deleteDocument(id: string) {
    try {
        await prisma.documento.delete({
            where: { id: id },
        });
        revalidatePath('/dashboard/document');
        return { message: 'Deleted Document.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Document.' };
    }
}