//const bsv = require('scrypt-ts');
const { PrismaClient } = require('@prisma/client');
const {
  utilizadores,
  perfis,
  gruposUtilizadores,
  permissoes,
  documentos,
  telefones,
  departamentos,
  auditorias,
} = require('../app/lib/placeholder-data'); // Supondo que você tenha salvo os dados fictícios em um arquivo chamado data.js

const prisma = new PrismaClient();

async function seed() {
  try {
    // Inserir dados de grupos de utilizadores
    await prisma.grupoUtilizadores.createMany({ data: gruposUtilizadores });

    // Inserir dados de departamentos
    await prisma.departamento.createMany({ data: departamentos });

    // Inserir dados de utilizadores
    await prisma.utilizador.createMany({ data: utilizadores });

    // Inserir dados de perfis
    await prisma.perfil.createMany({ data: perfis });

    // Inserir dados de permissões
    await prisma.permissoes.createMany({ data: permissoes });

    // Inserir dados de documentos
    await prisma.documento.createMany({ data: documentos });

    // Inserir dados de telefones
    await prisma.telefone.createMany({ data: telefones });

    // Inserir dados de auditorias
    await prisma.auditoria.createMany({ data: auditorias });

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função de seed
seed();