import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const store = await prisma.image.create({
    data: {
      productId: body.productId,
      url: body.url
    }
  });
  return store;
});
