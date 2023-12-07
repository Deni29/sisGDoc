'use server';

export async function createDocument(formData: FormData) {
    const rawFormData = {
        documentId: formData.get('documentId'),
        category: formData.get('category'),
        status: formData.get('status'),
    };
    // Test it out:
    console.log(rawFormData);
}
