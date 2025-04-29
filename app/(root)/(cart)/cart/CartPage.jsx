"use client";
import { useEffect } from "react";
import Product from "./Product";
import { useSelector } from "react-redux";
import { cartAndWishlistState } from "@/redux/slice/cartAndWishlistSlice";
import useProductsFromIDs from "@/hooks/products/useProductsFromIDs";
import Loading from "@/lib/Loading";
import Link from "next/link";

const CartPage = () => {
  const { cart } = useSelector(cartAndWishlistState);
  const cartIds = cart.map((obj) => obj.id);
  const { isLoading, error, data } = useProductsFromIDs(cartIds);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const products = data || [];

  if (!cart || cart.length === 0) {
    return (
      <>
        <div
          className="p-5 bg-gray-100 "
          style={{ height: "calc(100vh - 180px)" }}
        >
          <div className="bg-white w-full h-full flex flex-col gap-4 justify-center items-center">
            <p className="text-lg">Your cart is empty!</p>
            <Link href={`/`}>
              <p className="bg-blue-500 py-3 px-20 text-sm text-white rounded-md">
                Shop Now
              </p>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="bg-white">
        <p className="py-5 px-10 text-xl border-b">
          My Cart <span className="text-sm">({products.length})</span>
        </p>
        {products.length > 0 ? (
          <>
            <div>
              {products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
            </div>
            <div className="md:flex justify-end py-3 px-10 border-t-2 sticky bottom-0 bg-white hidden">
              <Link href={`/cart/address`}>
                <button className="py-4 px-16 rounded-md bg-orange-400 text-white font-semibold tracking-wide">
                  Placed Order
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div>No Cart</div>
        )}
      </section>
    </>
  );
};

export default CartPage;
