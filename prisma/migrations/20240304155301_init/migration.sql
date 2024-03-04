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
    `genero` ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    `utilizadorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Perfil_utilizadorId_key`(`utilizadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoUtilizadores` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,

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
CREATE TABLE `Documento` (
    `id` VARCHAR(36) NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `conteudo` TEXT NOT NULL,
    `Categoria` VARCHAR(255) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pendente',
    `image_url` VARCHAR(255) NOT NULL DEFAULT '/',
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataActualizacao` DATETIME(3) NOT NULL,
    `departamentoId` VARCHAR(36) NULL,
    `utilizadorId` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` VARCHAR(36) NOT NULL,
    `numeroTelefone` VARCHAR(255) NOT NULL,
    `perfilId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Telefone_numeroTelefone_key`(`numeroTelefone`),
    UNIQUE INDEX `Telefone_perfilId_key`(`perfilId`),
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
    `documentoId` VARCHAR(36) NULL,
    `utilizadorId` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilizador` ADD CONSTRAINT `Utilizador_grupoUtilizadoresId_fkey` FOREIGN KEY (`grupoUtilizadoresId`) REFERENCES `GrupoUtilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `Utilizador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permissoes` ADD CONSTRAINT `Permissoes_grupoUtilizadoresId_fkey` FOREIGN KEY (`grupoUtilizadoresId`) REFERENCES `GrupoUtilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `Utilizador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `Documento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_utilizadorId_fkey` FOREIGN KEY (`utilizadorId`) REFERENCES `Utilizador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
