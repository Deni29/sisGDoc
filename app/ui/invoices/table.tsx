import Image from 'next/image';
import { UpdateDocument, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  {invoice?.utilizador.map(({ id, nome, imagemPerfil }) => (
                    <div key={id}>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={imagemPerfil || '/'}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${nome}'s profile picture`}
                        />
                        <p>{nome}</p>
                      </div>
                      <p className="text-sm text-gray-500">{invoice.titulo}</p>
                    </div>
                  ))}
                  <InvoiceStatus status={invoice.estado} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {invoice.categoria}
                    </p>
                    <p>{formatDateToLocal(invoice.dataCriacao.toString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateDocument id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Utilizador
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Documento
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Categoria
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {invoice?.utilizador.map(({ id, nome, imagemPerfil }) => (
                      <div key={id} className="flex items-center gap-3">
                        <Image
                          src={imagemPerfil}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${nome}'s profile picture`}
                        />
                        <p>{nome}</p>
                      </div>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.titulo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.categoria}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.dataCriacao.toString())}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.estado} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateDocument id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
