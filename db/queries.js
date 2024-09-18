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
        authorId: user.id,
        parentId: null
      }
    })
    return folders;

  }

  async function deleteFolder( id ) {
   const deleteFolder = await prisma.folder.delete({
    where: {
      id: id
    },
  })

  return deleteFolder;
  /*
    await prisma.folder.deleteMany({
      where: {
        parentId: id // Delete subfolders
      }
    });

    // Then, delete the parent folder
    await prisma.folder.delete({
      where: {
        id: id// Delete the parent folder itself
      }
    }); */
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

  async function updateFolder(id, newFolderName) {

    const updateFolder = await prisma.folder.update({
      where: {
        id: id
      },
      data: {
        name: newFolderName,
      }
    });

    return updateFolder


  }

  async function insertNewSubFolder({ subFolderName, createdAt, parentId, email }) {
    try {
      // Debugging: Log input parameters
      console.log('folderName:',subFolderName);
      console.log('createdAt:', createdAt);
      console.log('parentId:', parentId);

      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!subFolderName| !createdAt || !parentId) {
        throw new Error('Missing required fields: folderName, createdAt, or parentId');
      }

      const newSubFolder = await prisma.folder.create({
        data: {
          name: subFolderName,
          createdAt: createdAt,
          parent: {
            connect: { id: parentId }
          },
          author: {
            connect: { id: user.id } // Link the folder to the author (user who created it)
          }
        }
      });

      console.log('Successfully created new subfolder:', newSubFolder);
      return newSubFolder;
    } catch (error) {
      console.error('Error inserting new subfolder:', error);
      throw new Error('Failed to create subfolder');
    }
  }

  async function getFolder(id) {
    const folder = await prisma.folder.findUnique({
      where: { id: id }
    });

    return folder;

  }

  async function getAllSubFolders(parentId) {
    // where parentid = parentid


   const folders = await prisma.folder.findMany({
     where: {
       parentId: parentId
     }
   })
   return folders;

  }

  module.exports = {
    insertNewUsers,
    getUser,
    getUserById,
    insertNewFolder,
    getAllFolders,
    deleteFolder,
    updateFolder,
    insertNewSubFolder,
    getFolder,
    getAllSubFolders
    // other database functions
  };
