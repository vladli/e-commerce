import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const store = await prisma.store.findUnique({
    where: {
      id: query.storeId as string
    }
  });
  return store;
});
