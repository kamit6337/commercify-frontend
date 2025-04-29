import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const prefetchUserAddress = () => {
  return {
    queryKey: ["user addresses"],
    queryFn: () => getReq("/address"),
  };
};

const useUserAddress = () => {
  const query = useQuery({
    queryKey: ["user addresses"],
    queryFn: () => getReq("/address"),
    staleTime: Infinity,
  });

  return query;
};

export default useUserAddress;
