import Form from '@/app/ui/documents/edit-form';
import Breadcrumbs from '@/app/ui/documents/breadcrumbs';
import { fetchDocumentById, fetchDepartment, fetchUsers } from '@/app/lib/data';
import { Documento, Departamento, Utilizador} from '@prisma/client';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [document, departments, users] = await Promise.all([
        fetchDocumentById(id),
        fetchDepartment(),
        fetchUsers(), //alterar pelo fetch user id
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
            <Form 
                users={users as Utilizador[]}
                document={document as Documento} 
                departments={departments as Departamento[]} />
        </main>
    );
}