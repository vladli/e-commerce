import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await prisma.inventory.create({
    data: {
      storeId: body.storeId,
      productId: body.productId,
      sizeId: body.sizeId,
      colorId: body.colorId,
      quantity: body.quantity
    }
  });
  return result;
});
