"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartAndWishlistState } from "@/redux/slice/cartAndWishlistSlice";
import useSearchProducts from "@/hooks/products/useSearchProducts";
import useDebounce from "@/hooks/general/useDebounce";
import Icons from "@/assets/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toastify from "@/lib/Toastify";
import CustomImages from "@/assets/images";
import Image from "next/image";
import UserCountry from "./UserCountry";

const Navbar = () => {
  const router = useRouter();
  const { cart } = useSelector(cartAndWishlistState);
  const [showClearAll, setShowClearAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const { error, data, refetch } = useSearchProducts(searchText);

  const debouncedSearch = useDebounce(() => {
    refetch();
  }, 500);

  const { showErrorMessage } = Toastify();

  useEffect(() => {
    if (data) {
      setSearchList(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
    }
  }, [error, showErrorMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      const query = e.currentTarget.value;
      router.push(`/search?q=${query}`);
      setSearchList([]);
    }
  };

  const handleChange = (value) => {
    if (!value) {
      setSearchText("");
      setSearchList([]);
      setShowClearAll(false);
      return;
    }
    setShowClearAll(true);
    setSearchText(value);
    debouncedSearch();
  };

  const resetSearch = () => {
    setSearchText("");
    setSearchList([]);
    setShowClearAll(false);
  };

  return (
    <section className="w-full flex justify-between items-center gap-5 h-full">
      {/* MARK: APP LOGO */}
      <Link href={`/`} className="hidden lg:flex">
        {/* <div className="cursor-pointer w-40"> */}
        <Image
          src={CustomImages.logo}
          alt="company logo"
          width={160}
          className="w-full object-cover "
        />
        {/* </div> */}
      </Link>

      {/* <div className="cursor-pointer w-10 lg:hidden "> */}
      <Link href={`/`} className="lg:hidden">
        <Image
          src={CustomImages.smallLogo}
          alt="company logo"
          width={40}
          className="w-full object-cover"
        />
      </Link>
      {/* </div> */}

      {/* MARK: SEARCH BAR */}
      <div className="flex-1 relative flex justify-between items-center rounded-full border-2">
        <input
          type="text"
          value={searchText}
          spellCheck="false"
          autoComplete="off"
          placeholder="Search Products"
          className="bg-inherit px-5 py-2 w-full border-none outline-none"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {showClearAll ? (
          <p
            className="px-5 py-2 flex justify-center items-center cursor-pointer whitespace-nowrap text-xs"
            onClick={resetSearch}
          >
            Clear All
          </p>
        ) : (
          <p className="px-5 py-2 flex justify-center items-center">
            <Icons.search className="text-xl text-gray-400" />
          </p>
        )}

        {searchList.length > 0 && (
          <div className="bg-background absolute z-50 w-full top-full mt-1 border-2 rounded-lg max-h-96 overflow-y-auto">
            {searchList.map((product) => {
              const { _id, title } = product;
              return (
                <div key={_id} className={` p-2 border-b last:border-none  `}>
                  <Link href={`/products/${_id}`} onClick={resetSearch}>
                    {title}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MARK: USER PROFILE */}
      <UserCountry />
      {/* <UserProfile /> */}

      {/* MARK: CART */}
      <Link href={`/cart`}>
        <div className="flex items-center gap-1">
          <div className="relative cursor-pointer">
            <Icons.cart className="text-2xl" />
            <p className="absolute z-50 bottom-full right-0 text-xs -mb-1 mr-[6px]">
              {cart.length}
            </p>
          </div>
          <p className="tracking-wide hidden md:flex">Cart</p>
        </div>
      </Link>
    </section>
  );
};

export default Navbar;
