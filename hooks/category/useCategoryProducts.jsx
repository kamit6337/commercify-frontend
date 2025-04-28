import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const prefetchCategoryProducts = (id) => {
  return {
    queryKey: ["Category Products", id],
    queryFn: () => getReq("/products", { page: 1, categoryId: id }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined; // No more pages
      }
      return allPages.length + 1; // next page is number of pages + 1
    },
  };
};

const useCategoryProducts = (id) => {
  const query = useInfiniteQuery({
    queryKey: ["Category Products", id],
    queryFn: ({ pageParam }) =>
      getReq("/products", { page: pageParam, categoryId: id }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined; // No more pages
      }
      return allPages.length + 1; // next page is number of pages + 1
    },
  });

  return query;
};

export default useCategoryProducts;
