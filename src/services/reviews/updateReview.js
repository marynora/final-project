import prisma from "../../utils/prisma.js";

const updateReview = async (id, userId, propertyId, rating, comment) => {
  return prisma.review.update({
    where: { id },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default updateReview;
