import { prisma } from '~/server/prisma';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);
  const store = await prisma.store.create({
    data: {
      userId: session!.user!.id,
      name: body.name
    }
  });
  return store;
});
