import { getServerSession } from '#auth';
import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const store = await prisma.store.findMany({
    where: {
      userId: session?.user?.id
    }
  });
  return store;
});
