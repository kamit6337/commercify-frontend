"use client";

import ProductsAndFilter from "@/components/ProductsAndFilter";
import useAllProducts from "@/hooks/products/useAllProducts";
import { hydrateFromLocalStorage } from "@/redux/slice/cartAndWishlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllProducts();

  useEffect(() => {
    dispatch(hydrateFromLocalStorage());
  }, [dispatch]);

  const products = data?.pages.flatMap((page) => page) || [];

  return (
    <ProductsAndFilter
      products={products}
      fetchNextPage={fetchNextPage}
      isPagination={true}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default HomePage;
