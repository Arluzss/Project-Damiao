-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "documento_fiscal" TEXT NOT NULL,
    "tipo_pessoa" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "conta_acesso" (
    "conta_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "last_login" DATETIME,
    CONSTRAINT "conta_acesso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "perfil" (
    "perfil_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario_perfil" (
    "usuario_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    PRIMARY KEY ("usuario_id", "perfil_id"),
    CONSTRAINT "usuario_perfil_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuario_perfil_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil" ("perfil_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "extrato_pontos" (
    "ponto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "extrato_pontos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categoria" (
    "categoria_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "oferta" (
    "oferta_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor_usuario_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "propriedades" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "oferta_autor_usuario_id_fkey" FOREIGN KEY ("autor_usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "oferta_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria" ("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "conexao" (
    "conexao_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "oferta_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "conexao_oferta_id_fkey" FOREIGN KEY ("oferta_id") REFERENCES "oferta" ("oferta_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "conexao_usuario" (
    "conexao_usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conexao_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "papel" TEXT NOT NULL,
    CONSTRAINT "conexao_usuario_conexao_id_fkey" FOREIGN KEY ("conexao_id") REFERENCES "conexao" ("conexao_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "conexao_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transacao" (
    "transacao_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conexao_id" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transacao_conexao_id_fkey" FOREIGN KEY ("conexao_id") REFERENCES "conexao" ("conexao_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transacao_usuario" (
    "transacao_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "papel" TEXT NOT NULL,

    PRIMARY KEY ("transacao_id", "usuario_id"),
    CONSTRAINT "transacao_usuario_transacao_id_fkey" FOREIGN KEY ("transacao_id") REFERENCES "transacao" ("transacao_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transacao_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conexao_id" INTEGER NOT NULL,
    "avaliador_usuario_id" INTEGER NOT NULL,
    "avaliado_usuario_id" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "feedback_conexao_id_fkey" FOREIGN KEY ("conexao_id") REFERENCES "conexao" ("conexao_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feedback_avaliador_usuario_id_fkey" FOREIGN KEY ("avaliador_usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "feedback_avaliado_usuario_id_fkey" FOREIGN KEY ("avaliado_usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_documento_fiscal_key" ON "usuario"("documento_fiscal");

-- CreateIndex
CREATE UNIQUE INDEX "conta_acesso_email_key" ON "conta_acesso"("email");

-- CreateIndex
CREATE INDEX "conta_acesso_usuario_id_idx" ON "conta_acesso"("usuario_id");

-- CreateIndex
CREATE INDEX "oferta_autor_usuario_id_idx" ON "oferta"("autor_usuario_id");

-- CreateIndex
CREATE INDEX "oferta_categoria_id_idx" ON "oferta"("categoria_id");

-- CreateIndex
CREATE INDEX "conexao_oferta_id_idx" ON "conexao"("oferta_id");

-- CreateIndex
CREATE INDEX "conexao_usuario_conexao_id_idx" ON "conexao_usuario"("conexao_id");

-- CreateIndex
CREATE INDEX "conexao_usuario_usuario_id_idx" ON "conexao_usuario"("usuario_id");

-- CreateIndex
CREATE INDEX "transacao_conexao_id_idx" ON "transacao"("conexao_id");

-- CreateIndex
CREATE INDEX "feedback_conexao_id_idx" ON "feedback"("conexao_id");
