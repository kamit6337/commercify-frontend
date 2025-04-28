import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const prefetchGetProductRatings = (productId) => {
  return {
    queryKey: ["Product Rating", productId],
    queryFn: ({ pageParam }) =>
      getReq("/ratings", { page: pageParam, id: productId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      } else {
        return lastPageParam + 1;
      }
    },
  };
};

const useGetProductRatings = (productId) => {
  const query = useInfiniteQuery({
    queryKey: ["Product Rating", productId],
    queryFn: ({ pageParam }) =>
      getReq("/ratings", { page: pageParam, id: productId }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      } else {
        return lastPageParam + 1;
      }
    },
  });

  return query;
};

export default useGetProductRatings;
