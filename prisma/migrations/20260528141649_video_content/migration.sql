/*
  Warnings:

  - You are about to drop the `VideoScene` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN "content" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoScene";
PRAGMA foreign_keys=on;
