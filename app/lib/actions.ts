'use server';

import { generateRandomId } from './placeholder-data'

export async function createDocument(formData: FormData) {
    const rawFormData = {
        documentId: generateRandomId(),
        categoryId: formData.get('category'),
        departmentId: formData.get('department'),
        name: formData.get('name'),
        statusId: formData.get('status'),
        //imgURL: formData.get('imgURL'),
        //userId: formData.get('userId'),
    };
    // Test it out:
    console.log(rawFormData);
    console.log(typeof rawFormData.departmentId);
}
