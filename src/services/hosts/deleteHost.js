import prisma from "../../utils/prisma.js";

const deleteHost = async (id) => {
  const properties = await prisma.property.findMany({
    where: { hostId: id },
    select: { id: true },
  });

  const propertyIds = properties.map((property) => property.id);

  await prisma.booking.deleteMany({
    where: { propertyId: { in: propertyIds } },
  });

  await prisma.review.deleteMany({
    where: { propertyId: { in: propertyIds } },
  });

  await prisma.property.deleteMany({
    where: { hostId: id },
  });

  return prisma.host.delete({
    where: { id },
  });
};

export default deleteHost;
