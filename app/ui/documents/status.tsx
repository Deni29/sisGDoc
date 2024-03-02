import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function DocumentStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'Pendente',
          'bg-green-200 text-gray-500': status === 'Em progresso',
          'bg-green-500 text-white': status === 'Concluído',
        },
      )}
    >
      {status === 'Pendente' ? (
        <>
          Pendente
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Em progresso' ? (
        <>
          Em progresso
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'Concluído' ? (
        <>
          Concluído
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
