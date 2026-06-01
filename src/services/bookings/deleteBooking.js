import prisma from "../../utils/prisma.js";

const deleteBooking = async (id) => {
  return prisma.booking.delete({
    where: { id },
  });
};

export default deleteBooking;
