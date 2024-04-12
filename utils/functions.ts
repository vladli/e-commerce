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
