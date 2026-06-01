import prisma from "../../utils/prisma.js";

const deleteUser = async (id) => {
  await prisma.booking.deleteMany({
    where: { userId: id },
  });

  await prisma.review.deleteMany({
    where: { userId: id },
  });

  return prisma.user.delete({
    where: { id },
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

export default deleteUser;
