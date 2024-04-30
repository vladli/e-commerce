import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const store = await prisma.size.create({
    data: {
      storeId: body.storeId as string,
      name: body.name as string,
      value: body.value as string
    }
  });
  return store;
});
