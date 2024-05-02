import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const result = await prisma.product.findUnique({
    where: {
      id: query.productId as string
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true
    }
  });
  return result;
});
