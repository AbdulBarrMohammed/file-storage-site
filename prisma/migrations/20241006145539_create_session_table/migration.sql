/*
  Warnings:

  - You are about to drop the column `downloadById` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `likedById` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `sharedById` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_downloadById_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_likedById_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_sharedById_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "downloadById",
DROP COLUMN "likedById",
DROP COLUMN "sharedById";
