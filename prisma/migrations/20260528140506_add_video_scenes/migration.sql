/*
  Warnings:

  - You are about to drop the column `script` on the `Video` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "VideoScene" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoId" INTEGER NOT NULL,
    "sceneNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "textOverlay" TEXT,
    "duration" INTEGER,
    "effect" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "VideoScene_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "publishUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Video" ("category", "createdAt", "format", "id", "priority", "publishUrl", "status", "title", "updatedAt") SELECT "category", "createdAt", "format", "id", "priority", "publishUrl", "status", "title", "updatedAt" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
