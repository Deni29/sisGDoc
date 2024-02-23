export type User = {
    id: String;
    nome: String;
    email: String;
    palavra_passe: String;
    dataCadastro: Date;
    grupoUtilizadoresId: String;
};

export type UserField = {
    id: String;
    nome: String;
    email: String;
};

export type Profile = {
    id: String;
    image_url: String;
    bio: String;
    generoId: String;
    utilizadorId: String;
};

export type GroupUsers = {};
export type Permissions = {};
export type Category = {};

export type Document = {
    id: String;
    titulo: String;
    conteudo: String;
    categoriaId: String;
    estadoId: String;
    image_url: String;
    dataCriacao: Date;
    dataActualizacao: Date;
};

export type DocumentForm = {
    id: String;
    titulo: String;
    conteudo: String;
    categoriaId: String;
    estadoId: String;
    image_url: String;
};

export type phone = {};
export type status = {};
export type gender = {};
export type department = {};
export type audit = {};
export type userDocument = {};