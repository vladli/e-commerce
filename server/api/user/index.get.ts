import { prisma } from "~/server/prisma";

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findMany();
  return user;
});
