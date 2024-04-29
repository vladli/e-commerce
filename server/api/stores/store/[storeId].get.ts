import { getServerSession } from '#auth';
import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const session = await getServerSession(event);
  const store = await prisma.store.findUnique({
    where: {
      id: query.storeId as string,
      userId: session?.user?.id
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
