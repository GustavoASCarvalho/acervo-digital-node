-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "imagemDePerfil" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoEm" DATETIME
);

-- CreateTable
CREATE TABLE "Imagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "visualizacoes" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "idDoUsuario" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoEm" DATETIME
);

-- CreateTable
CREATE TABLE "Postagem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "visualizacoes" INTEGER NOT NULL,
    "idDoUsuario" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idDoUsuario" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoEm" DATETIME NOT NULL,
    "deletadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
