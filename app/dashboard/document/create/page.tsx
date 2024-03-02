import Form from '@/app/ui/documents/create-form';
import Breadcrumbs from '@/app/ui/documents/breadcrumbs';
import { fetchDocuments } from '@/app/lib/data';

export default async function Page() {
    const documents = await fetchDocuments();

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
            <Form documents={document}/>
        </main>
    );
}