"use client";

import ProductsAndFilter from "@/components/ProductsAndFilter";
import useCategoryProducts from "@/hooks/category/useCategoryProducts";
import { useEffect } from "react";

const CategoryProductsPage = ({ categoryId }) => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCategoryProducts(categoryId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [categoryId]);

  const products = data?.pages.flatMap((page) => page) || [];

  return (
    <>
      <ProductsAndFilter
        products={products}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isPagination={true}
        id={categoryId}
      />
    </>
  );
};

export default CategoryProductsPage;
