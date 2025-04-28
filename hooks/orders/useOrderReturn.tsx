import Toastify from "@/lib/Toastify";
import { BUY } from "@/types";
import { patchReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOrderReturn = (buyId: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["order return", buyId],
    mutationFn: () => patchReq("/buy/return", { id: buyId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["buy products of user"],
        exact: true,
      });

      const previousData = JSON.parse(
        JSON.stringify(queryClient.getQueryData(["buy products of user"]) || [])
      );

      const checkState = queryClient.getQueryState(["buy products of user"]);

      if (checkState) {
        queryClient.setQueryData(["buy products of user"], (old: BUY[]) => {
          const modify = old.map((buy) => {
            if (buy._id === buyId) {
              return { ...buy, isReturned: true };
            }

            return buy;
          });

          return modify;
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      const checkState = queryClient.getQueryState(["buy products of user"]);

      if (checkState) {
        queryClient.setQueryData(
          ["buy products of user"],
          context?.previousData
        );
      }

      showErrorMessage({ message: error.message });
    },
  });

  return mutation;
};

export default useOrderReturn;
