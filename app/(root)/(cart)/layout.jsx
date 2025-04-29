import getQueryClient from "@/providers/getQueryClient";
import PriceList from "./PriceList";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUserAddress } from "../../../hooks/address/useUserAddress";

const CartLayout = async ({ children }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(prefetchUserAddress());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-5 sm_lap:px-2 bg-gray-100">
        <main className="flex items-start tablet:items-stretch tablet:flex-col gap-5">
          <div className="flex-1">{children}</div>
          <PriceList />
        </main>
      </section>
    </HydrationBoundary>
  );
};

export default CartLayout;
