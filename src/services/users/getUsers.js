import prisma from "../../utils/prisma.js";

const getUsers = async (username, email) => {
  return prisma.user.findMany({
    where: {
      username,
      email,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getUsers;
