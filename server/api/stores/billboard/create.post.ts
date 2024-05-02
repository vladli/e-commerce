import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await prisma.billboard.create({
    data: {
      storeId: body.storeId as string,
      label: body.label,
      image: body.image
    }
  });
  return result;
});
