import {
  Square2StackIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  auditoria: Square2StackIcon,
  utilizador: UserGroupIcon,
  pendente: ClockIcon,
  documento: DocumentDuplicateIcon,
};

export default async function CardWrapper() {
  const {
      numberOfUsers,
      numberOfDocuments,
      totalAuditoria,
      totalPendingDocuments,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Auditorias" value={totalAuditoria} type="auditoria" />
      <Card title="Docs. Pendentes" value={totalPendingDocuments} type="pendente" />
      <Card title="Total Documentos" value={numberOfDocuments} type="documento" />
      <Card
        title="Total Utilizadores"
        value={numberOfUsers}
        type="utilizador"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'documento' | 'utilizador' | 'pendente' | 'auditoria';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
