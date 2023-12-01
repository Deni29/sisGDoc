import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    const utilizador = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Documentos', href: '/dashboard/document' },
                    {
                        label: 'Create Document',
                        href: '/dashboard/document/create',
                        active: true,
                    },
                ]}
            />
            <Form customers={utilizador} />
        </main>
    );
}