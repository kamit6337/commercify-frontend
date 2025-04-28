import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import Icons from "@/assets/icons";

const HorizontalList = ({
  products,
  name,
  pagination = false,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  const [index, setIndex] = useState(0);
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);

  const { ref: findalDivRef, inView: finalDivInView } = useInView({
    rootMargin: "0px 0px 0px 200px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (pagination && !isFetchingNextPage && finalDivInView && hasNextPage) {
      fetchNextPage();
    }
  }, [
    finalDivInView,
    pagination,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  ]);

  const scrollLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const scrollRight = () => {
    setIndex((prev) => prev - 1);
  };

  return (
    <section className="flex flex-col gap-4 relative pt-5 pb-16">
      {name && (
        <div className="flex justify-between items-center">
          <p className="ml-14 text-xl font-semibold tracking-wider tablet:ml-10 tablet:text-base">
            {name}
          </p>
        </div>
      )}

      <div className="relative">
        <div className="ml-10 tablet:ml-4 mr-5">
          <div
            className="flex gap-5 transition-all duration-500"
            style={{ translate: `${100 * index}%` }}
          >
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}

            {hasNextPage && !isFetchingNextPage && pagination && (
              <div ref={products?.length > 0 ? findalDivRef : null} />
            )}
          </div>
        </div>

        {index < 0 && (
          <div
            className="absolute z-10 top-0 left-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => scrollLeft()}
            onMouseEnter={() => setLeftArrowInLarge(true)}
            onMouseLeave={() => setLeftArrowInLarge(false)}
          >
            <Icons.leftArrow
              className={`${
                leftArrowInLarge ? "text-4xl" : "text-xl"
              } text-white transition-all duration-500  `}
            />
          </div>
        )}

        {finalDivInView || (
          <div
            className="absolute z-10 top-0 right-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => scrollRight()}
            onMouseEnter={() => setRightArrowInLarge(true)}
            onMouseLeave={() => setRightArrowInLarge(false)}
          >
            <Icons.rightArrow
              className={`${
                rightArrowInLarge ? "text-4xl" : "text-xl"
              } text-white  transition-all duration-500 `}
            />
          </div>
        )}
      </div>

      <div className="ml-14 w-max h-10 tablet:h-8 ">
        {index <= -2 && (
          <p className="back_to_start" onClick={() => setIndex(0)}>
            Back to Start
          </p>
        )}
      </div>
    </section>
  );
};

export default HorizontalList;
