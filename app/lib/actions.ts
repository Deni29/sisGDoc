'use server';

import { generateRandomId } from './placeholder-data'

export async function createDocument(formData: FormData) {
    const rawFormData = {
        documentId: generateRandomId(),
        categoryId: formData.get('categoryId'),
        name: formData.get('name'),
        statusId: formData.get('statusId'),
        //imgURL: formData.get('imgURL'),
        //userId: formData.get('userId'),
    };
    // Test it out:
    console.log(rawFormData);
    console.log(typeof rawFormData.statusId);
}
