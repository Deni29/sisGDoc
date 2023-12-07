'use server';

import { generateRandomId } from './placeholder-data'

export async function createDocument(formData: FormData) {
    const rawFormData = {
        documentId: generateRandomId(),
        category: formData.get('category'),
        name: formData.get('name'),
        status: formData.get('status'),
        //userId: formData.get('userId'),
    };
    // Test it out:
    console.log(rawFormData);
}
