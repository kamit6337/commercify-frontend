import { getReq } from "../../utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const prefetchSingleProducts = (id) => {
  return {
    queryKey: ["Single Product", id],
    queryFn: () => getReq("/products", { id }),
  };
};

const useSingleProduct = (id) => {
  const query = useQuery({
    queryKey: ["Single Product", id],
    queryFn: () => getReq("/products", { id }),
    staleTime: Infinity,
    enabled: !!id,
  });

  return query;
};

export default useSingleProduct;
