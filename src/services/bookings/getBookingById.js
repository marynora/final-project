import prisma from "../../utils/prisma.js";

const getBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
  });
};

export default getBookingById;
