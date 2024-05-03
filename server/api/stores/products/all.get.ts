import { prisma } from '~/server/prisma';

export default defineEventHandler(async () => {
  const result = await prisma.product.findMany({
    include: {
      category: true,

      images: true
    }
  });
  return result;
});
