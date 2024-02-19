import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchDocumentById, fetchUsers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [document, users] = await Promise.all([
        fetchDocumentById(id),
        fetchUsers(),
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
            <Form document={document} users={users} />
        </main>
    );
}