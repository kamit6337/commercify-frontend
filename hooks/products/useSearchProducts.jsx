import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const useSearchProducts = (text) => {
  const query = useQuery({
    queryKey: ["search products", text],
    queryFn: () => getReq("/search", { q: text }),
    staleTime: Infinity,
    enabled: false,
  });

  return query;
};

export default useSearchProducts;
