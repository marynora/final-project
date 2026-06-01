import prisma from "../../utils/prisma.js";

const getReviewById = async (id) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

export default getReviewById;
