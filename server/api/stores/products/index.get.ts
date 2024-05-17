import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const result = await prisma.product.findMany({
    where: {
      storeId: query.storeId as string
    },
    include: {
      category: true,
      images: true
    }
  });
  return result;
});
