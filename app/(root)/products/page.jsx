import { prefetchSingleProducts } from "@/hooks/products/useSingleProduct";
import getQueryClient from "@/providers/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ProductPage from "./ProductPage";
import { prefetchCategoryProducts } from "@/hooks/category/useCategoryProducts";
import { prefetchGetProductRatings } from "@/hooks/ratings/useGetProductRatings";
import CategoryProducts from "./CategoryProducts";

const Products = async ({ searchParams }) => {
  const { id } = searchParams;

  const queryClient = getQueryClient();

  const product = await queryClient.fetchQuery(prefetchSingleProducts(id));

  const categoryId = product?.data?.category?._id;
  await queryClient.prefetchInfiniteQuery(prefetchCategoryProducts(categoryId));

  await queryClient.prefetchInfiniteQuery(prefetchGetProductRatings(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage productId={id} />
      <CategoryProducts productId={id} />
    </HydrationBoundary>
  );
};

export default Products;
