"use client";
import HorizontalScrolling from "@/components/HorizontalScrolling";
import useAllCategory from "@/hooks/category/useAllCategory";
import Link from "next/link";
import { useState } from "react";

const CategoryScrolling = () => {
  const { data: allCategory } = useAllCategory();
  const [optionIndex, setOptionIndex] = useState(null);

  return (
    <HorizontalScrolling
      renderList={allCategory}
      SingleItem={({ item, i }) => {
        const { _id, title } = item;

        return (
          <Link href={`/category?id=${_id}`} key={_id} className="">
            <div className="px-10 h-10">
              <p
                className={`${
                  optionIndex === i && "border-b-2"
                }  capitalize whitespace-nowrap text-category_text`}
                onMouseEnter={() => setOptionIndex(i)}
                onMouseLeave={() => setOptionIndex(null)}
              >
                {title}
              </p>
            </div>
          </Link>
        );
      }}
    />
  );
};

export default CategoryScrolling;
