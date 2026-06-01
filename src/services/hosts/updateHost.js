import prisma from "../../utils/prisma.js";

const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe,
) => {
  return prisma.host.update({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
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

export default updateHost;
