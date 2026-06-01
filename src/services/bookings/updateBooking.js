import prisma from "../../utils/prisma.js";

const updateBooking = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
) => {
  return prisma.booking.update({
    where: { id },
    data: {
      userId,
      propertyId,
      checkinDate: checkinDate ? new Date(checkinDate) : undefined,
      checkoutDate: checkoutDate ? new Date(checkoutDate) : undefined,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default updateBooking;
