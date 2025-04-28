import getQueryClient from "@/providers/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import HomePage from "./HomePage";
import { prefetchAllProducts } from "@/hooks/products/useAllProducts";

const Home = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(prefetchAllProducts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default Home;
