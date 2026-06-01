import prisma from "../../utils/prisma.js";

const deleteProperty = async (id) => {
  await prisma.booking.deleteMany({
    where: { propertyId: id },
  });

  await prisma.review.deleteMany({
    where: { propertyId: id },
  });

  return prisma.property.delete({
    where: { id },
  });
};

export default deleteProperty;
