const GetCategory = (categories, categoryId) =>
  categories.find((x) => x.id === categoryId);

const GetSubCategory = (categories, subCategoryId) =>
  categories.flatMap((x) => x.types).find((x) => x.id === subCategoryId);

export { GetCategory, GetSubCategory };
