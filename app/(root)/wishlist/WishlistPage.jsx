"use client";

import { cartAndWishlistState } from "@/redux/slice/cartAndWishlistSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import Products from "./Products";

const WishlistPage = () => {
  const { wishlist } = useSelector(cartAndWishlistState);

  if (wishlist.length === 0) {
    return (
      <>
        <section className="p-5 bg-gray-100">
          <main className="bg-white h-96 flex flex-col gap-4 justify-center items-center">
            <p className="text-lg">Your wishlist is empty!</p>
            <Link href={`/`}>
              <p className="bg-blue-500 py-3 px-20 text-sm text-white rounded-md">
                Shop Now
              </p>
            </Link>
          </main>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="p-5 bg-gray-100">
        <main className="bg-white">
          <p className="py-5 px-10 text-xl">
            My Wishlist <span className="text-sm">({wishlist.length})</span>
          </p>
          <div>
            <Products list={wishlist} />
          </div>
        </main>
      </section>
    </>
  );
};

export default WishlistPage;
