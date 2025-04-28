"use client";

import useCategoryProducts from "@/hooks/category/useCategoryProducts";
import HorizontalList from "@/components/HorizontalList";
import useSingleProduct from "@/hooks/products/useSingleProduct";

const CategoryProducts = ({ productId }) => {
  const { data: product } = useSingleProduct(productId);

  const { _id, title } = product.category;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useCategoryProducts(_id);

  const products = data?.pages.flatMap((page) => page) || [];

  const filterProducts = products.filter((obj) => obj._id !== productId);

  return (
    <HorizontalList
      products={filterProducts}
      name={`Suggested Products from Category : ${title}`}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      pagination={true}
    />
  );
};

export default CategoryProducts;
