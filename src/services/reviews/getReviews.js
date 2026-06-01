import prisma from "../../utils/prisma.js";

const getReviews = async () => {
  return prisma.review.findMany();
};

export default getReviews;
