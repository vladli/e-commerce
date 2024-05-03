import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await prisma.product.delete({
    where: {
      id: body.productId
    }
  });
  return result;
});
