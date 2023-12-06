import {
  PrismaClient,
} from '@prisma/client';

import { formatCurrency, formatDateToLocal } from './utils';

const prisma = new PrismaClient();

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await prisma.auditoria.findMany();

    console.log('Data fetch complete after 3 seconds.');

    return data.values();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await prisma.documento.findMany({
      select: {
        id: true,
        titulo: true,
        Utilizador: {
          select: {
            utilizador: {
              select: {
                id: true,
                nome: true,
                email: true,
                Perfil: {
                  select: {
                    image_url: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        dataActualizacao: 'desc', // Ordene pela data de atualização em ordem decrescente
      },
      take: 5, // Obtenha os últimos 5 documentos
    });

    const latestInvoices = data;
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest documents.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = prisma.documento.findMany();
    const customerCountPromise = prisma.utilizador.findMany();
    const invoiceStatusPromise = prisma.estado.findMany();
    const auditoriaCountPromise = prisma.auditoria.findMany();

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
      auditoriaCountPromise,
    ]);

    const numberOfDocuments = Number(data[0].length ?? '0');
    const numberOfUsers = Number(data[1].length ?? '0');
    const totalAuditoria = Number(data[3].length ?? '0');
    const totalPendingDocuments = Number(await prisma.documento.count({
      where: {
        Estado: {
          descricao: 'Pendente',
        }
      }
    }) ?? '0');

    return {
      numberOfUsers,
      numberOfDocuments,
      totalAuditoria,
      totalPendingDocuments,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    //   // const invoices = await sql<InvoicesTable>`
    //   //   SELECT
    //   //     invoices.id,
    //   //     invoices.amount,
    //   //     invoices.date,
    //   //     invoices.status,
    //   //     customers.name,
    //   //     customers.email,
    //   //     customers.image_url
    //   //   FROM invoices
    //   //   JOIN customers ON invoices.customer_id = customers.id
    //   //   WHERE
    //   //     customers.name ILIKE ${`%${query}%`} OR
    //   //     customers.email ILIKE ${`%${query}%`} OR
    //   //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //   //     invoices.date::text ILIKE ${`%${query}%`} OR
    //   //     invoices.status ILIKE ${`%${query}%`}
    //   //   ORDER BY invoices.date DESC
    //   //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    //   // `;

    const data = await prisma.documento.findMany({
      include: {
        Categoria: {
          select: {
            nome: true,
          }
        },
        Estado: {
          select: {
            descricao: true
          }
        },
        Utilizador: {
          include: {
            utilizador: {
              select: {
                id: true,
                nome: true,
                Perfil: {
                  select: {
                    id: true,
                    image_url: true
                  }
                },
              }
            },
          },
        },
      },
      where: {
        OR: [
          { titulo: { contains: query } },
          // { dataCriacao: query },
          { Estado: { descricao: { contains: query } } },
          { Categoria: { nome: { contains: query } } },
          { Utilizador: { some: { utilizador: { nome: { contains: query } } } } },
          { Utilizador: { some: { utilizador: { email: { contains: query } } } } },
        ]
      },
      orderBy: { dataCriacao: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    
    const invoices = data.map(({ id, titulo, dataCriacao, Categoria, Estado, Utilizador }) => ({
      id: id,
      titulo: titulo,
      dataCriacao: dataCriacao,
      categoria: Categoria.nome,
      estado: Estado.descricao,

      utilizador: Utilizador.map(({ utilizador }) => ({
        id: utilizador.id,
        nome: utilizador.nome,
        imagemPerfil: utilizador.Perfil?.image_url || '/',
      })),
    }));

    // console.log(invoices);
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch documents.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    //   const count = await sql`SELECT COUNT(*)
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    // `;
    const count = await prisma.documento.count({
      where: {
        OR: [
          { titulo: { contains: query } },
          // { dataCriacao: query },
          { Estado: { descricao: { contains: query } } },
          { Categoria: { nome: { contains: query } } },
          { Utilizador: { some: { utilizador: { nome: { contains: query } } } } },
          { Utilizador: { some: { utilizador: { email: { contains: query } } } } },
        ],
      },
    });

    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of documents.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCategory() {
  try {
    const data = await prisma.categoria.findMany({
      select: { 
        id: true, 
        nome: true
      }
    });

    const categories = data;
    return categories;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
