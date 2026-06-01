import prisma from "../../utils/prisma.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe,
) => {
  return prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
      aboutMe,
    },
  });
};

export default createHost;
