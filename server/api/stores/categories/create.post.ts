import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await prisma.category.create({
    data: {
      storeId: body.storeId as string,
      billboardId: body.billboardId as string,
      name: body.name as string
    }
  });
  return result;
});
