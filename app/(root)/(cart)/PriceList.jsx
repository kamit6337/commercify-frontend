"use client";
import Loading from "@/lib/Loading";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useUserAddress from "../../../hooks/address/useUserAddress";
import Link from "next/link";
import amountToWordsInternational from "../../../utils/javascript/amountToWordsInternational";
import rupeesToWords from "../../../utils/javascript/rupeesToWords";
import changePriceDiscountByExchangeRate from "../../../utils/javascript/changePriceDiscountByExchangeRate";
import { usePathname, useSearchParams } from "next/navigation";
import Toastify from "@/lib/Toastify";
import { cartAndWishlistState } from "../../../redux/slice/cartAndWishlistSlice";
import { currencyState } from "../../../redux/slice/currencySlice";
import useProductsFromIDs from "../../../hooks/products/useProductsFromIDs";

const PriceList = () => {
  const { cart } = useSelector(cartAndWishlistState);
  const cartIds = cart.map((obj) => obj.id);
  const { isLoading, error, data: products } = useProductsFromIDs(cartIds);

  const { data: addresses } = useUserAddress();

  const { symbol, exchangeRate, country, name, code } =
    useSelector(currencyState);

  const pathname = usePathname();

  const { showErrorMessage } = Toastify();
  const addressId = useSearchParams().get("address");

  const selectedAddress = addresses?.find(
    (address) => address._id === addressId
  );

  const { actualProductPrice, sellingPrice, productsDiscount } = useMemo(() => {
    let actualProductPrice = 0;
    let sellingPrice = 0;
    let productsDiscount = 0;

    if (!products || products.length === 0)
      return {
        actualProductPrice,
        sellingPrice,
        productsDiscount,
      };

    const filterData = products.filter((obj) => obj);

    filterData.forEach((product) => {
      const { _id, price, discountPercentage } = product;

      const findProduct = cart.find((obj) => obj.id === _id);

      if (!findProduct) return;

      const { discountedPrice, discountPercentCost, exchangeRatePrice } =
        changePriceDiscountByExchangeRate(
          price,
          discountPercentage,
          exchangeRate
        );

      actualProductPrice =
        actualProductPrice + findProduct.quantity * exchangeRatePrice;
      sellingPrice = sellingPrice + findProduct.quantity * discountedPrice;

      productsDiscount =
        productsDiscount + findProduct.quantity * discountPercentCost;
    });

    return { actualProductPrice, sellingPrice, productsDiscount };
  }, [products, cart, exchangeRate]);

  if (!cart || cart.length === 0) return;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(environment.STRIPE_PUBLISHABLE_KEY);

      const checkoutSession = await postReq("/payment", {
        products: cart,
        address: selectedAddress,
        code,
        exchangeRate,
      });

      stripe?.redirectToCheckout({
        sessionId: checkoutSession.session.id,
      });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Issue in doing Payment. Try later...",
      });
    }
  };

  const totalQuantity = cart.reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);

  const deliveryCharges = Math.round(products.length * exchangeRate * 0.48); //  dollars

  const productSellingPrice = sellingPrice + deliveryCharges;

  return (
    <div className="bg-white w-96 sm_lap:w-80 tablet:w-full sticky top-[100px]">
      <p className="uppercase p-4 border-b tracking-wide font-semibold text-gray-500 text-sm">
        Price Details
      </p>
      <div className="p-4 flex justify-between">
        <p>
          Price <span>({totalQuantity} item)</span>
        </p>
        <p>
          {symbol}
          {actualProductPrice}
        </p>
      </div>
      <div className="p-4 flex justify-between">
        <p>Discount</p>
        <p>
          <span className="mx-1">-</span>
          {symbol}
          {productsDiscount}
        </p>
      </div>
      <div className="p-4 flex justify-between">
        <p>
          Delivery Charges <span>({products.length} item)</span>
        </p>
        <p>
          {symbol}
          {deliveryCharges}
        </p>
      </div>
      <div className="border-t p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-semibold">Total Amount</p>
          <p>
            {symbol}
            {productSellingPrice}
          </p>
        </div>
        <>
          {country === "India" ? (
            <p className="text-xs self-end">
              {rupeesToWords(productSellingPrice)} {name}s
            </p>
          ) : (
            <p className="text-xs self-end">
              {amountToWordsInternational(productSellingPrice)} {name}s
            </p>
          )}
        </>
      </div>
      <p className="border-t p-4 text-sm text-green-600 font-semibold tracking-wide">
        You are saving {symbol}
        {productsDiscount} on this order
      </p>
      {pathname === "/cart" && (
        <div className="hidden tablet:flex justify-end py-3 px-10 sticky bottom-0 place_order_box bg-white">
          <Link href={`/cart/address`}>
            <button className="py-4 px-16 rounded-md bg-orange-400 text-white font-semibold tracking-wide">
              Placed Order
            </button>
          </Link>
        </div>
      )}
      {pathname === "/cart/checkout" && (
        <div className="hidden tablet:flex justify-end py-3 px-10 sticky bottom-0 place_order_box bg-white">
          <button
            className="py-4 px-16 rounded-md bg-orange-400 text-white font-semibold tracking-wide cursor-pointer"
            onClick={makePayment}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceList;
