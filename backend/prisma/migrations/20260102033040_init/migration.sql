/*
  Warnings:

  - Added the required column `tipo` to the `oferta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_oferta" (
    "oferta_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor_usuario_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" TEXT NOT NULL,
    "propriedades" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "oferta_autor_usuario_id_fkey" FOREIGN KEY ("autor_usuario_id") REFERENCES "usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "oferta_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria" ("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_oferta" ("ativa", "autor_usuario_id", "categoria_id", "created_at", "descricao", "oferta_id", "propriedades", "titulo") SELECT "ativa", "autor_usuario_id", "categoria_id", "created_at", "descricao", "oferta_id", "propriedades", "titulo" FROM "oferta";
DROP TABLE "oferta";
ALTER TABLE "new_oferta" RENAME TO "oferta";
CREATE INDEX "oferta_autor_usuario_id_idx" ON "oferta"("autor_usuario_id");
CREATE INDEX "oferta_categoria_id_idx" ON "oferta"("categoria_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
