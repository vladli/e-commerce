import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const result = await prisma.inventory.findMany({
    where: {
      storeId: query.storeId as string
    },
    include: {
      product: {
        include: {
          images: true
        }
      },
      color: true,
      size: true
    }
  });
  return result;
});
