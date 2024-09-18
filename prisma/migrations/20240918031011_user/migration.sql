-- AlterTable
ALTER TABLE "File" ADD COLUMN     "downloadById" TEXT,
ADD COLUMN     "likedById" TEXT,
ADD COLUMN     "sharedById" TEXT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_sharedById_fkey" FOREIGN KEY ("sharedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_downloadById_fkey" FOREIGN KEY ("downloadById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
