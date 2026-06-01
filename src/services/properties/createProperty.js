import prisma from "../../utils/prisma.js";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  hostId,
) => {
  return prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    },
  });
};

export default createProperty;
