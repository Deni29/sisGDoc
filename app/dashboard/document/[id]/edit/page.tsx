import Form from '@/app/ui/documents/edit-form';
import Breadcrumbs from '@/app/ui/documents/breadcrumbs';
import { fetchDocumentById, fetchDepartment } from '@/app/lib/data';
import { Documento, Departamento } from '@prisma/client';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const [document, department] = await Promise.all([
        fetchDocumentById(id),
        fetchDepartment(),
    ]);

    if (!document) {
        notFound();
    }

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
            <Form
                document={document as Documento}
                departments={department as Departamento[]} />
        </main>
    );
}