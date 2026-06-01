import prisma from "../../utils/prisma.js";

const updateUser = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
) => {
  return prisma.user.update({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
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

export default updateUser;
