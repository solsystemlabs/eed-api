import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      roleName: "admin"
    }
  });

  const userRole = await prisma.role.create({
    data: {
      roleName: "user"
    }
  });

  await prisma.user.create({
    data: {
      firstName: "admin",
      lastName: "admin",
      email: "email@google.com",
      password: bcrypt.hashSync("password", 8),
      userRoles: { create: {roleId: adminRole.id}}
    }
  });
}

main()
.then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit();
})