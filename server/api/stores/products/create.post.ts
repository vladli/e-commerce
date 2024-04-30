import { prisma } from '~/server/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const store = await prisma.product.create({
    data: {
      storeId: body.storeId as string,
      categoryId: body.categoryId as string,
      name: body.name as string,
      price: body.price as number,
      isFeatured: body.isFeatured as boolean,
      isAchieved: body.isAchieved as boolean,
      sizeId: body.sizeId as string,
      colorId: body.colorId as string
    }
  });
  for (const image of body.images) {
    await prisma.image.create({
      data: {
        productId: store.id,
        url: image as string
      }
    });
  }

  return store;
});
