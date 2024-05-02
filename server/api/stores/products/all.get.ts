import { prisma } from '~/server/prisma';

export default defineEventHandler(async () => {
  const result = await prisma.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
      images: true
    }
  });
  return result;
});
