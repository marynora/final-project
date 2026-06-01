import prisma from "../../utils/prisma.js";

const deleteReview = async (id) => {
  return prisma.review.delete({
    where: { id },
  });
};

export default deleteReview;
