import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestDocuments, fetchUserById, fetchProfileByUserId } from '@/app/lib/data';

export default async function LatestDocuments() {
  const latestDocuments = await fetchLatestDocuments();

  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Últimos Documentos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestDocuments.map(async (document, i) => {
            const user = await fetchUserById(document?.utilizadorId || '');
            const profile = await fetchProfileByUserId(document?.utilizadorId || '');

            return (
              <div
                key={document.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center" key={document.id}>
                  <Image
                    src={profile?.image_url || '/'}
                    alt={`${user?.nome ? user.nome : 'User'}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {user?.nome || 'User name'}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {user?.email || 'User email'}
                    </p>
                  </div>
                </div>

                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {document.titulo}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
