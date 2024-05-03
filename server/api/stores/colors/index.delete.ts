import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await prisma.color.delete({
    where: {
      id: body.id
    }
  });
  return result;
});
