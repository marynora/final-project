import prisma from "../../utils/prisma.js";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
) => {
  return prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default createBooking;
