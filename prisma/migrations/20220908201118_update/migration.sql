-- CreateEnum
CREATE TYPE "TipoDeCargo" AS ENUM ('MODERADOR', 'ADIMINISTRADOR', 'USUARIO');

-- CreateEnum
CREATE TYPE "TipoDeVoto" AS ENUM ('POSITIVO', 'NEGATIVO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "imagem_de_perfil" TEXT NOT NULL,
    "cargo" "TipoDeCargo" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "deletado_em" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "visualizacoes" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "e_sugestao" BOOLEAN NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "deletado_em" TIMESTAMP(3),

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postagens" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "visualizacoes" INTEGER NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "e_sugestao" BOOLEAN NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "deletado_em" TIMESTAMP(3),

    CONSTRAINT "postagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "deletado_em" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "id_da_postagem" TEXT,
    "id_da_imagem" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    "deletado_em" TIMESTAMP(3),

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votos" (
    "id" TEXT NOT NULL,
    "id_do_comentario" TEXT NOT NULL,
    "voto" "TipoDeVoto" NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_em_imagens_postagens" (
    "id" TEXT NOT NULL,
    "id_da_postagem" TEXT,
    "id_do_usuario" TEXT NOT NULL,
    "id_da_imagem" TEXT,
    "id_da_tag" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_em_imagens_postagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens_em_postagem" (
    "id" TEXT NOT NULL,
    "id_da_postagem" TEXT NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "id_da_imagem" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagens_em_postagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redes_sociais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redes_sociais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_tem_redes_sociais" (
    "id" TEXT NOT NULL,
    "id_da_rede_social" TEXT NOT NULL,
    "id_do_usuario" TEXT NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_tem_redes_sociais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postagens" ADD CONSTRAINT "postagens_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_da_imagem_fkey" FOREIGN KEY ("id_da_imagem") REFERENCES "imagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_id_da_postagem_fkey" FOREIGN KEY ("id_da_postagem") REFERENCES "postagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votos" ADD CONSTRAINT "votos_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votos" ADD CONSTRAINT "votos_id_do_comentario_fkey" FOREIGN KEY ("id_do_comentario") REFERENCES "comentarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_em_imagens_postagens" ADD CONSTRAINT "tags_em_imagens_postagens_id_da_tag_fkey" FOREIGN KEY ("id_da_tag") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_em_imagens_postagens" ADD CONSTRAINT "tags_em_imagens_postagens_id_da_imagem_fkey" FOREIGN KEY ("id_da_imagem") REFERENCES "imagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_em_imagens_postagens" ADD CONSTRAINT "tags_em_imagens_postagens_id_da_postagem_fkey" FOREIGN KEY ("id_da_postagem") REFERENCES "postagens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_tem_redes_sociais" ADD CONSTRAINT "usuario_tem_redes_sociais_id_do_usuario_fkey" FOREIGN KEY ("id_do_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_tem_redes_sociais" ADD CONSTRAINT "usuario_tem_redes_sociais_id_da_rede_social_fkey" FOREIGN KEY ("id_da_rede_social") REFERENCES "redes_sociais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
