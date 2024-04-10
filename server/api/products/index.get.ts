import { prisma } from "~/server/prisma";

export default defineEventHandler(async () => {
  const products = await prisma.products.findMany();
  return products;
});
