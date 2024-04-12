import { prisma } from "~/server/prisma";

export default defineEventHandler(async event => {
  const userId = "660edee19a7a0da6038a7caf";
  const data = await readBody(event);
  await prisma.products.create({
    data: {
      userId: userId,
      name: data.name,
      price: data.price,
    },
  });
});
