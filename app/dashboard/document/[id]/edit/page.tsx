import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDocumentById, fetchCategory, fetchDepartment, fetchStatus } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [document, categories, departments, estados] = await Promise.all([
        fetchDocumentById(id),
        fetchCategory(),
        fetchDepartment(),
        fetchStatus(),
    ]);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Documents', href: '/dashboard/document' },
                    {
                        label: 'Editar Documento',
                        href: `/dashboard/document/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form document={document} categories={categories} departments={departments} estados={estados} />
        </main>
    );
}