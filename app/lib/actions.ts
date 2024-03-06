'use server';

import { generateRandomId } from './placeholder-data'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import multer from 'multer';

// Configure multer storage settings
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    // Process the file
    const file = formData.get('conteudo') as File;

    if (file) {
        const allowedMimeTypes = [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/msword', // .doc
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/pdf', // .pdf
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
            'application/vnd.ms-powerpoint', // .ppt
        ];

        if (!allowedMimeTypes.includes(file.type)) {
            throw new Error('Invalid file type');
        }

        const fileContent = file.toString();

        const { documentId, name, category, conteudo, status, user, department } = CreateDocument.parse({
            documentId: generateRandomId(),
            name: formData.get('name'),
            category: formData.get('category'),
            conteudo: fileContent,
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
    }

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