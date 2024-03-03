//Função para gerar IDs aleatórios de 36 caracteres
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

const gruposUtilizadores = [
  {
    id: generateRandomId(),
    nome: 'Administradores',
    descricao: 'Grupo de administradores do sistema',
  },
  {
    id: generateRandomId(),
    nome: 'Usuários Padrão',
    descricao: 'Grupo de usuários comuns',
  },
  // Adicione mais grupos conforme necessário
];

const departamentos = [
  {
    id: generateRandomId(),
    nome: 'Departamento 1',
    descricao: 'Descrição do departamento 1',
  },
  {
    id: generateRandomId(),
    nome: 'Departamento 2',
    descricao: 'Descrição do departamento 2',
  },
  // Adicione mais departamentos conforme necessário
];

const utilizadores = [
  {
    id: generateRandomId(),
    nome: 'João Silva',
    email: 'joao@example.com',
    palavra_passe: 'senha123',
    grupoUtilizadoresId: gruposUtilizadores[0].id,
  },
  {
    id: generateRandomId(),
    nome: 'Maria Santos',
    email: 'maria@example.com',
    palavra_passe: 'senha456',
    grupoUtilizadoresId: gruposUtilizadores[1].id,
  },
  // Adicione mais usuários conforme necessário
];

const perfis = [
  {
    id: generateRandomId(),
    image_url: '../img/users/michael-novotny.png',
    bio: 'Descrição do perfil 1',
    genero: 'Masculino',
    utilizadorId: utilizadores[0].id,
  },
  {
    id: generateRandomId(),
    image_url: '../img/users/amy-burns.png',
    bio: 'Descrição do perfil 2',
    genero: 'Feminino',
    utilizadorId: utilizadores[1].id,
  },
  // Adicione mais perfis conforme necessário
];

const permissoes = [
  {
    id: generateRandomId(),
    nivel: 'admin',
    recurso: 'todos',
    grupoUtilizadoresId: gruposUtilizadores[0].id,
  },
  {
    id: generateRandomId(),
    nivel: 'user',
    recurso: 'leitura',
    grupoUtilizadoresId: gruposUtilizadores[1].id,
  },
  // Adicione mais permissões conforme necessário
];

const documentos = [
  {
    id: generateRandomId(),
    titulo: 'Documento 1',
    conteudo: 'Conteúdo do documento 1',
    Categoria: 'Atas',
    utilizadorId: utilizadores[0].id,
    departamentoId: departamentos[0].id,
  },
  {
    id: generateRandomId(),
    titulo: 'Documento 2',
    conteudo: 'Conteúdo do documento 2',
    Categoria: 'Cartas',
    utilizadorId: utilizadores[1].id,
    departamentoId: departamentos[1].id,
  },
  // Adicione mais documentos conforme necessário
];

const telefones = [
  {
    id: generateRandomId(),
    numeroTelefone: generateAngolanPhoneNumber(),
    perfilId: perfis[0].id,
  },
  {
    id: generateRandomId(),
    numeroTelefone: generateAngolanPhoneNumber(),
    perfilId: perfis[1].id,
  },
  // Adicione mais telefones conforme necessário
];

const auditorias = [
  {
    id: generateRandomId(),
    alteracao: 'Alteração 1',
    utilizadorId: utilizadores[0].id,
    documentoId: documentos[0].id,
  },
  {
    id: generateRandomId(),
    alteracao: 'Alteração 2',
    utilizadorId: utilizadores[1].id,
    documentoId: documentos[1].id,
  },
  // Adicione mais auditorias conforme necessário
];


module.exports = {
  utilizadores,
  perfis,
  gruposUtilizadores,
  permissoes,
  documentos,
  telefones,
  departamentos,
  auditorias,
  generateRandomId
};