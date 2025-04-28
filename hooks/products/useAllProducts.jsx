import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getReq } from "../../utils/api/api";

export const prefetchAllProducts = {
  queryKey: ["allProducts"],
  queryFn: () => getReq("/products", { page: 1 }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (lastPage && lastPage.length > 0) {
      return lastPageParam + 1; // Increment page number for next page
    } else {
      return undefined; // No more pages to fetch
    }
  },
};

const useAllProducts = () => {
  const query = useInfiniteQuery({
    queryKey: ["allProducts"],
    queryFn: ({ pageParam }) => getReq("/products", { page: pageParam }),
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

export default useAllProducts;
