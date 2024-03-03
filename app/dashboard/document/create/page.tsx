import Form from '@/app/ui/documents/create-form';
import Breadcrumbs from '@/app/ui/documents/breadcrumbs';
import { fetchDocuments, fetchDepartment, fetchUsers } from '@/app/lib/data';

export default async function Page() {
    const documents = await fetchDocuments();
    const departments = await fetchDepartment();
    const users = await fetchUsers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Documentos', href: '/dashboard/document' },
                    {
                        label: 'Criar Documento',
                        href: '/dashboard/document/create',
                        active: true,
                    },
                ]}
            />
            <Form 
                users={users} 
                documents={documents} 
                departments={departments.map((department) => ({...department, descricao: ''}))}/>
        </main>
    );
}