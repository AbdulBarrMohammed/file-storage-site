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


  async function insertNewFile({ originalname, size, createdAt, email }) {
    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Create a new folder linked to the user and possibly a parent folder
      const newFile = await prisma.file.create({
        data: {
          name: originalname,
          createdAt: createdAt,
          blob: size,
          owner: {
            connect: { id: user.id } // Link the folder to the user (author)
          },
        }
      });

      console.log('File created:', newFile);
      return newFile;
    } catch (error) {
      console.error('Error inserting file:', error);
      throw error;
    }
  }

  async function getAllFiles( email ) {
    const user = await prisma.user.findUnique({
       where: {
         email: email,

       }
    })

    const files = await prisma.file.findMany({
      where: {
        ownerId: user.id,
        folderId: null
      }
    })
    return files;

  }




  async function deleteFile( id ) {
    const deleteFile = await prisma.file.delete({
     where: {
       id: id
     },



   });
   return deleteFile;
  }


  async function updateFile(id, newFileName) {

    const updateFile = await prisma.file.update({
      where: {
        id: id
      },
      data: {
        name: newFileName,
      }
    });

    return updateFile;


  }

  async function getAllSubFiles(folderId) {
    // where parentid = parentid


   const files = await prisma.file.findMany({
     where: {
      folderId: folderId
     }
   })
   return files;

  }


  async function insertNewSubFile({originalname, size, createdAt, email, folderId}) {
    try {


      const user = await prisma.user.findUnique({
        where: { email: email }
      });


      const newSubFile = await prisma.file.create({
        data: {
          name: originalname,
          blob: size,
          createdAt: createdAt,
          folder: {
            connect: { id: folderId }
          },
          owner: {
            connect: { id: user.id } // Link the folder to the author (user who created it)
          }
        }
      });

      console.log('Successfully created new subfile:', newSubFile);
      return newSubFile;
    } catch (error) {
      console.error('Error inserting new subfolder:', error);
      throw new Error('Failed to create subfolder');
    }
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
    getAllSubFolders,
    insertNewFile,
    getAllFiles,
    deleteFile,
    updateFile,
    getAllSubFiles,
    insertNewSubFile,
    getAllSubFiles
    // other database functions
  };
