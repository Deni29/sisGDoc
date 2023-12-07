'use server';

export async function createDocument(formData: FormData) {
    const rawFormData = {
        categoryId: formData.get('categoryId'),
        category: formData.get('category'),
        name: formData.get('name'),
        status: formData.get('status'),
    };
    // Test it out:
    console.log(rawFormData);
}
