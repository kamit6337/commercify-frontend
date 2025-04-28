import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const prefetchCurrencyExchange = {
  queryKey: ["currency exchange"],
  queryFn: () => getReq("/additional/currency"),
};

const useCurrencyExchange = () => {
  const query = useQuery({
    queryKey: ["currency exchange"],
    queryFn: () => getReq("/additional/currency"),
    staleTime: Infinity,
  });

  return query;
};

export default useCurrencyExchange;
