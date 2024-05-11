-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
