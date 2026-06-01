import prisma from "../../utils/prisma.js";

const getProperties = async (location, pricePerNight) => {
  return prisma.property.findMany({
    where: {
      location,
      pricePerNight: pricePerNight ? Number(pricePerNight) : undefined,
    },
  });
};

export default getProperties;
