import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const store = await prisma.billboard.findMany({
    where: {
      storeId: query.storeId as string
    }
  });
  return store;
});
