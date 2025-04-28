import getQueryClient from "@/providers/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CategoryProductsPage from "./CategoryProductsPage";
import { prefetchCategoryProducts } from "@/hooks/category/useCategoryProducts";

const CategoryProducts = async ({ searchParams }) => {
  const { id } = searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(prefetchCategoryProducts(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryProductsPage categoryId={id} />
    </HydrationBoundary>
  );
};

export default CategoryProducts;
