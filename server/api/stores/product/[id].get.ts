import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  console.log(params);
  const result = await prisma.product.findUnique({
    where: {
      id: params.id
    },
    include: {
      category: true,
      images: true,
      inventory: {
        include: {
          size: true,
          color: true
        }
      }
    }
  });
  return result;
});
