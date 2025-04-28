import Link from "next/link";
import { useSelector } from "react-redux";
import { currencyState } from "../redux/slice/currencySlice";
import changePriceDiscountByExchangeRate from "../utils/javascript/changePriceDiscountByExchangeRate";

const ProductCard = ({ product }) => {
  const { symbol, exchangeRate } = useSelector(currencyState);

  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    category,
    thumbnail,
  } = product;

  const { discountedPrice } = changePriceDiscountByExchangeRate(
    price,
    discountPercentage,
    exchangeRate
  );

  return (
    <div className="xl:w-80 lg:w-64 md:w-52 w-56 lg:h-[420px] h-96 flex flex-col rounded-xl hover:shadow-2xl duration-200">
      <div className="w-full h-3/5 p-3">
        <Link href={`/products?id=${_id}`}>
          <img
            src={thumbnail}
            alt="product"
            loading="lazy"
            className="w-full h-full rounded-t-xl"
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between p-3 pb-4 pr-4">
        <div>
          <p className="text-lg font-semibold tracking-wide truncate tablet:text-base text-important_text capitalize">
            {title}
          </p>
          <p className="text-[13px] line-clamp-2 mt-1 tablet:line-clamp-2 tablet:text-xs ">
            {description}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="tablet:text-sm capitalize text-some_less_important_text font-semibold tracking-wider">
            <Link href={`/category/${category._id}`}>{category.title}</Link>
          </p>
          <p className="text-important_text font-semibold tracking-wider">
            {symbol}
            {discountedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
