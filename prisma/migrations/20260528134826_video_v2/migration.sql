/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Video` table. All the data in the column will be lost.
  - Added the required column `category` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "script" TEXT,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "publishUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("createdAt", "id", "priority", "status", "title", "updatedAt") SELECT "createdAt", "id", "priority", "status", "title", "updatedAt" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
