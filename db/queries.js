const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

async function insertNewUsers({ email, hashedPassword }) {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Ensure your Prisma schema uses "password" for this field
      },
    });
  }

async function getUser(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async function getUserById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }


  module.exports = {
    insertNewUsers,
    getUser,
    getUserById
    // other database functions
  };
