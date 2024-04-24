import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const product = await prisma.products.findFirstOrThrow({
      where: {
        id: query.id as string
      }
    });
    return product;
  } catch (e) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
      fatal: true
    });
  }
});
