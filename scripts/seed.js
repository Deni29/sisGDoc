const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// Desestruturação do placeholder
const {
  grupos,
  permissoes,
  categorias,
  estado,
  generos,
  departamentos,
  utilizadores,
  perfis,
  documentos,
  telefones,
  auditorias,
  utilizadorDocumentos,
} = require('../app/lib/placeholder-data');

// Configura o número de "salt rounds" para o bcrypt (usado para fazer hash de senhas)
const saltRounds = 10;

// Função para gerar hash de senha usando bcrypt
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Função para realizar o seed dos dados
async function seedData() {
  try {
    // Inserir Grupos
    await prisma.grupoUtilizadores.createMany({ data: grupos });

    // Inserir Permissoes
    await prisma.permissoes.createMany({ data: permissoes });

    // Inserir Categorias
    await prisma.categoria.createMany({ data: categorias });

    // Inserir Estado
    await prisma.estado.createMany({ data: estado });

    // Inserir Generos
    await prisma.genero.createMany({ data: generos });

    // Inserir Departamentos
    await prisma.departamento.createMany({ data: departamentos });

    // Inserir Utilizadores
    for (const usuario of utilizadores) {
      usuario.palavra_passe = await hashPassword(usuario.palavra_passe);
    }
    await prisma.utilizador.createMany({ data: utilizadores });

    // Inserir Perfis
    await prisma.perfil.createMany({ data: perfis });

    // Inserir Documentos
    await prisma.documento.createMany({ data: documentos });

    // Inserir Telefones
    await prisma.telefone.createMany({ data: telefones });

    // Inserir Auditorias
    await prisma.auditoria.createMany({ data: auditorias });

    // Inserir UtilizadorDocumentos
    await prisma.utilizadorDocumento.createMany({ data: utilizadorDocumentos });

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Executar a função de seed
seedData();