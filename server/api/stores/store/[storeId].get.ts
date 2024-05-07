import { getServerSession } from '#auth';
import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const session = await getServerSession(event);
  const store = await prisma.store.findUnique({
    where: {
      id: params.storeId as string,
      userId: session?.user?.id
    },
    include: {
      billboards: true,
      products: true,
      categories: true,
      sizes: true,
      colors: true
    }
  });
  if (!store) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Store not found',
      fatal: true
    });
  }
  return store;
});
