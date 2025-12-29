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
    "documento_fiscal" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "last_login" DATETIME,
    CONSTRAINT "conta_acesso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_documento_fiscal_key" ON "usuario"("documento_fiscal");

-- CreateIndex
CREATE UNIQUE INDEX "conta_acesso_usuario_id_key" ON "conta_acesso"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "conta_acesso_documento_fiscal_key" ON "conta_acesso"("documento_fiscal");
