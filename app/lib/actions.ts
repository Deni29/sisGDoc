'use server';

import { generateRandomId } from './placeholder-data'

export async function createDocument(formData: FormData) {
    const rawFormData = {
        documentId: generateRandomId(),
        categoryId: formData.get('id'),
        name: formData.get('name'),
        statusId: formData.get('id'),
        //imgURL: formData.get('imgURL'),
        //userId: formData.get('userId'),
    };
    // Test it out:
    console.log(rawFormData);
    console.log(typeof rawFormData.categoryId);
}
