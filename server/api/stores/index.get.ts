import { getServerSession } from '#auth';
import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session)
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  try {
    const store = await prisma.store.findMany({
      where: {
        userId: session?.user?.id
      }
    });
    return store;
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Store not found',
      fatal: true
    });
  }
});
