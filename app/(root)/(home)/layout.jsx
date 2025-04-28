import getQueryClient from "@/providers/getQueryClient";
import CategoryScrolling from "./CategoryScrolling";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchAllCategory } from "@/hooks/category/useAllCategory";

const HomeLayout = async ({ children }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(prefetchAllCategory);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="w-full border-b-2 py-5">
        <CategoryScrolling />
      </main>
      <>{children}</>
    </HydrationBoundary>
  );
};

export default HomeLayout;
