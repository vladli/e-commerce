import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const result = await prisma.product.findUnique({
    where: {
      id: query.productId as string
    },
    include: {
      category: true,
      images: true,
      inventory: {
        include: {
          color: true,
          size: true
        }
      }
    }
  });
  return result;
});
