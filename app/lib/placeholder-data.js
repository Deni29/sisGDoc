//const { equire('@/ Função para gerar IDs aleatórios de 36 caracteres
function generateRandomId(length='36') {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
// Função para gerar números de telefone angolanos fictícios
function generateAngolanPhoneNumber() {
  // Lógica para gerar números fictícios, adapte conforme necessário
  const prefixOptions = ['92', '93', '94', '95', '96', '97', '99'];
  const randomPrefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
  const randomNumber = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');

  return `+244${randomPrefix}${randomNumber}`;
}

// Dados para a tabela GrupoUtilizadores
const grupos = [
  { id: generateRandomId(), nome: 'Admins', descricao: 'Administradores do sistema' },
  { id: generateRandomId(), nome: 'Professores', descricao: 'Corpo docente da universidade' },
  { id: generateRandomId(), nome: 'Estudantes', descricao: 'Alunos da universidade' },
];

// Dados para a tabela Permissoes
const permissoes = [
  { id: generateRandomId(), nivel: 'Leitura', recurso: 'Documentos', grupoUtilizadoresId: grupos[1].id },
  { id: generateRandomId(), nivel: 'Escrita', recurso: 'Documentos', grupoUtilizadoresId: grupos[1].id },
  { id: generateRandomId(), nivel: 'Admin', recurso: 'Sistema', grupoUtilizadoresId: grupos[0].id },
];

// Dados para a tabela Categoria
const categorias = [
  { id: generateRandomId(), nome: 'Ensino' },
  { id: generateRandomId(), nome: 'Pesquisa' },
  { id: generateRandomId(), nome: 'Administração' },
];

// Dados para a tabela Estado
const estado = [
  { id: generateRandomId(), descricao: 'Pendente' },
  { id: generateRandomId(), descricao: 'Em progresso' },
  { id: generateRandomId(), descricao: 'Concluído' },
];

// Dados para a tabela Genero
const generos = [
  { id: generateRandomId(), denominacao: 'Masculino' },
  { id: generateRandomId(), denominacao: 'Feminino' },
  { id: generateRandomId(), denominacao: 'Outro' },
];

// Dados para a tabela Departamento
const departamentos = [
  { id: generateRandomId(), nome: 'Departamento de Ciências da Computação', descricao: '...' },
  { id: generateRandomId(), nome: 'Departamento de Matemática', descricao: '...' },
];

// Dados para a tabela Utilizador
const utilizadores = [
  {
    id: generateRandomId(),
    nome: 'Admin',
    email: 'admin@example.com',
    palavra_passe: 'senha123',
    grupoUtilizadoresId: grupos[0].id,
  },
  {
    id: generateRandomId(),
    nome: 'Professor1',
    email: 'professor1@example.com',
    palavra_passe: 'senha123',  
    grupoUtilizadoresId: grupos[1].id,
  },
  {
    id: generateRandomId(),
    nome: 'Estudante1',
    email: 'estudante1@example.com',
    palavra_passe: 'senha123',  
    grupoUtilizadoresId: grupos[2].id,
  },
];

// Dados para a tabela Perfil
const perfis = [
  { id: generateRandomId(), image_url: '/assets/img/users/hector-simpson.png', bio: 'Descrição do perfil', generoId: generos[0].id, utilizadorId: utilizadores[0].id },
  { id: generateRandomId(), image_url: '/assets/img/users/guillermo-rauch.png', bio: 'Descrição do perfil', generoId: generos[0].id, utilizadorId: utilizadores[1].id },
];

// Dados para a tabela Documento
const documentos = [
  {
    id: generateRandomId(),
    titulo: 'Documento1',
    conteudo: 'Conteúdo do documento 1',
    categoriaId: categorias[0].id,
    estadoId: estado[0].id,
    image_url: '/',
  },
  {
    id: generateRandomId(),
    titulo: 'Documento2',
    conteudo: 'Conteúdo do documento 2',
    categoriaId: categorias[1].id,
    estadoId: estado[1].id,
    image_url: '/',
  },
  {
    id: generateRandomId(),
    titulo: 'Documento3',
    conteudo: 'Conteúdo do documento 3',
    categoriaId: categorias[2].id,
    estadoId: estado[2].id,
    image_url: '/',
  },
];

// Dados para a tabela Telefone
const telefones = [
  { id: generateRandomId(), numeroTelefone: generateAngolanPhoneNumber(), PerfilId: perfis[0].id },

];

// Dados para a tabela Auditoria
const auditorias = [
  { id: generateRandomId(), alteracao: 'Alteração 1' },
  { id: generateRandomId(), alteracao: 'Alteração 2' },
];

// Dados para a tabela UtilizadorDocumento
const utilizadorDocumentos = [
  { id: generateRandomId(), utilizadorId: utilizadores[0].id, documentoId: documentos[0].id },
  { id: generateRandomId(), utilizadorId: utilizadores[1].id, documentoId: documentos[1].id },
  { id: generateRandomId(), utilizadorId: utilizadores[1].id, documentoId: documentos[2].id },
];

module.exports = {
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
};