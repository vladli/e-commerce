import { prisma } from "~/server/prisma";

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const response = await prisma.products.delete({
    where: {
      id: query.id as string,
    },
  });
  return response;
});
