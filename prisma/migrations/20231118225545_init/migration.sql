-- CreateTable
CREATE TABLE `Utilizador` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `palavra_passe` VARCHAR(255) NOT NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `grupoUtilizadoresId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Utilizador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` VARCHAR(36) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL DEFAULT '/',
    `bio` TEXT NULL,
    `generoId` VARCHAR(191) NOT NULL,
    `utilizadorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Perfil_utilizadorId_key`(`utilizadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoUtilizadores` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `GrupoUtilizadores_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissoes` (
    `id` VARCHAR(36) NOT NULL,
    `nivel` VARCHAR(255) NOT NULL,
    `recurso` VARCHAR(255) NOT NULL,
    `grupoUtilizadoresId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` VARCHAR(36) NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `conteudo` TEXT NOT NULL,
    `categoriaId` VARCHAR(191) NOT NULL,
    `estadoId` VARCHAR(191) NOT NULL DEFAULT 'Pendente',
    `image_url` VARCHAR(255) NOT NULL DEFAULT '/',
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataActualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Documento_titulo_key`(`titulo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` VARCHAR(36) NOT NULL,
    `numeroTelefone` VARCHAR(255) NOT NULL,
    `PerfilId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Telefone_numeroTelefone_key`(`numeroTelefone`),
    UNIQUE INDEX `Telefone_PerfilId_key`(`PerfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado` (
    `id` VARCHAR(36) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genero` (
    `id` VARCHAR(36) NOT NULL,
    `denominacao` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Genero_denominacao_key`(`denominacao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `Departamento_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `id` VARCHAR(36) NOT NULL,
    `alteracao` TEXT NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UtilizadorDocumento` (
    `id` VARCHAR(36) NOT NULL,
    `dataAtribuicao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `utilizadorId` VARCHAR(191) NOT NULL,
    `documentoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DepartamentoToDocumento` (
    `A` VARCHAR(36) NOT NULL,
    `B` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `_DepartamentoToDocumento_AB_unique`(`A`, `B`),
    INDEX `_DepartamentoToDocumento_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AuditoriaToDocumento` (
    `A` VARCHAR(36) NOT NULL,
    `B` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `_AuditoriaToDocumento_AB_unique`(`A`, `B`),
    INDEX `_AuditoriaToDocumento_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilizador` ADD CONSTRAINT `Utilizador_grupoUtilizadoresId_fkey` FOREIGN KEY (`grupoUtilizadoresId`) REFERENCES `GrupoUtilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `Utilizador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permissoes` ADD CONSTRAINT `Permissoes_grupoUtilizadoresId_fkey` FOREIGN KEY (`grupoUtilizadoresId`) REFERENCES `GrupoUtilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `Estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_PerfilId_fkey` FOREIGN KEY (`PerfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UtilizadorDocumento` ADD CONSTRAINT `UtilizadorDocumento_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `Utilizador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UtilizadorDocumento` ADD CONSTRAINT `UtilizadorDocumento_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `Documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartamentoToDocumento` ADD CONSTRAINT `_DepartamentoToDocumento_A_fkey` FOREIGN KEY (`A`) REFERENCES `Departamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartamentoToDocumento` ADD CONSTRAINT `_DepartamentoToDocumento_B_fkey` FOREIGN KEY (`B`) REFERENCES `Documento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuditoriaToDocumento` ADD CONSTRAINT `_AuditoriaToDocumento_A_fkey` FOREIGN KEY (`A`) REFERENCES `Auditoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuditoriaToDocumento` ADD CONSTRAINT `_AuditoriaToDocumento_B_fkey` FOREIGN KEY (`B`) REFERENCES `Documento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
