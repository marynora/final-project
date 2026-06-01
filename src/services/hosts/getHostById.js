import prisma from "../../utils/prisma.js";

const getHostById = async (id) => {
  return prisma.host.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
    },
  });
};

export default getHostById;
