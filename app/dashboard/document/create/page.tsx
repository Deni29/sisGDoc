import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCategory } from '@/app/lib/data';
import { fetchStatus } from '@/app/lib/data';
import { fetchDepartment } from '@/app/lib/data';

export default async function Page() {
    const category = await fetchCategory();
    const status = await fetchStatus();
    const department = await fetchDepartment();

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
            <Form categories={category} status={status} departments={department}/>
        </main>
    );
}