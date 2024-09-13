const { PrismaClient } = require("@prisma/client");
const { emit } = require("process");
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

  async function getAllFolders( email ) {
    const user = await prisma.user.findUnique({
       where: {
         email: email
       }
    })

    const folders = await prisma.folder.findMany({
      where: {
        authorId: user.id
      }
    })
    return folders;

  }


  async function insertNewFolder({ email, folderName, createdAt, parentId = null }) {
    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Create a new folder linked to the user and possibly a parent folder
      const newFolder = await prisma.folder.create({
        data: {
          name: folderName,
          createdAt: createdAt,
          author: {
            connect: { id: user.id } // Link the folder to the user (author)
          },
          parent: parentId ? { connect: { id: parentId } } : undefined, // Optionally link to a parent folder
        }
      });

      console.log('Folder created:', newFolder);
      return newFolder;
    } catch (error) {
      console.error('Error inserting folder:', error);
      throw error;
    }
  }


  module.exports = {
    insertNewUsers,
    getUser,
    getUserById,
    insertNewFolder,
    getAllFolders
    // other database functions
  };
