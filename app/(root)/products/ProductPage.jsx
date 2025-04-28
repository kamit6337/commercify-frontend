"use client";
import ImagePart from "@/components/ImagePart";
import useSingleProduct from "@/hooks/products/useSingleProduct";
import { currencyState } from "@/redux/slice/currencySlice";
import changePriceDiscountByExchangeRate from "@/utils/javascript/changePriceDiscountByExchangeRate";
import makeDateDaysAfter from "@/utils/javascript/makeDateDaysAfter";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProductPage = ({ productId }) => {
  const { symbol, exchangeRate } = useSelector(currencyState);
  const { data } = useSingleProduct(productId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [productId]);

  const {
    title,
    description,
    price,
    category,
    discountPercentage,
    deliveredBy,
    thumbnail,
  } = data;

  const { discountedPrice, exchangeRatePrice, roundDiscountPercent } =
    changePriceDiscountByExchangeRate(price, discountPercentage, exchangeRate);

  return (
    <section className="flex md:flex-row flex-col gap-5 py-16 px-10 section_padding">
      <div className="flex-1 md:w-3/5 w-full">
        <ImagePart id={productId} image={thumbnail} title={title} />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div>
          <p className="text-xl font-semibold text-important_text">{title}</p>
          <p className="text-xs mt-2">{description}</p>
        </div>
        <p className="text-sm text-gray-500 text-some_less_important_text capitalize">
          <Link href={`/category?id=${category._id}`}>
            Category :{" "}
            <span className="font-semibold tracking-wider">
              {category.title}
            </span>
          </Link>
        </p>
        <div>
          <p className="text-xs text-green-700 font-semibold tracking-wide">
            Special Price
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-2xl font-semibold tracking-wide text-important_text">
              {symbol}
              {discountedPrice}
            </p>
            <p className="line-through">
              {symbol}
              {exchangeRatePrice}
            </p>
            <p className="text-xs">{roundDiscountPercent}% Off</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <p>Delivery by </p>
          <p>-</p>
          <p className="text-important_text">
            {makeDateDaysAfter(deliveredBy)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
