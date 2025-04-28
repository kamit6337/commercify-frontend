import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FilterSection from "./FilterSection";
import ProductGrid from "./ProductGrid";

const ProductsAndFilter = ({
  products,
  isPagination = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  id,
}) => {
  const [filterProducts, setFilterProducts] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setFilterProducts([]);
  }, [id]);

  useEffect(() => {
    if (isPagination && inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, isPagination, hasNextPage]);

  const filterProductsFn = (products) => {
    setFilterProducts(products);
  };

  return (
    <>
      <section className="w-full h-full flex gap-2 bg-gray-100 p-2 relative">
        <div
          className="w-64 lg:w-56 md:w-48 hidden md:flex border-r-2 sticky top-[88px] bg-white"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <FilterSection
            id={id}
            products={products}
            filterProductsFn={filterProductsFn}
          />
        </div>

        <main className="flex-1 bg-white">
          {filterProducts?.length > 0 ? (
            <ProductGrid products={filterProducts} />
          ) : products.length > 0 ? (
            <div>
              <ProductGrid products={products} />
              {isFetchingNextPage && (
                <div className="text-gray-600 animate-pulse">
                  Loading more products...
                </div>
              )}
              <div
                ref={ref}
                style={{ minHeight: 50 }}
                className="flex justify-center py-4"
              />
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              Sorry, no product available
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default ProductsAndFilter;
