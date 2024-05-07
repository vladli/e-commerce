import { getServerSession } from '#auth';
import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { name, value } = await readBody(event);
  const session = await getServerSession(event);
  const storeByUser = await prisma.store.findFirst({
    where: {
      id: query.storeId as string,
      userId: session?.user?.id
    }
  });
  if (!storeByUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Store not found',
      fatal: true
    });
  }
  const result = await prisma.size.update({
    where: {
      id: query.id as string,
      storeId: query.storeId as string
    },
    data: {
      name,
      value
    }
  });
  return result;
});
