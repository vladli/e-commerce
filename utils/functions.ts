import type { Products } from '@prisma/client';

export function getCnameByCode(code: string) {
  const category = categories.value.find((category) => {
    const subCategory = category.subCategory.find((sub) => {
      return sub.items.find((item) => item.code === code);
    });
    return subCategory;
  });

  if (category) {
    const subCategory = category.subCategory.find((sub) => {
      return sub.items.find((item) => item.code === code);
    });

    if (subCategory) {
      const item = subCategory.items.find((item) => item.code === code);
      return item?.cname;
    }
  }
  return null;
}

export function isInStock(item: Products) {
  return item.inventory !== null && item.inventory > 0
    ? 'IN STOCK'
    : 'OUT OF STOCK';
}

export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
