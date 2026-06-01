import prisma from "../../utils/prisma.js";

const getPropertyById = async (id) => {
  return prisma.property.findUnique({
    where: { id },
  });
};

export default getPropertyById;
