"use client";
import { fetcher } from "@/constants/swr";
import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

let PAGE_SIZE = 5;

const getkey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;

  return `https://api.escuelajs.co/api/v1/products?offset=${
    pageIndex * PAGE_SIZE
  }&limit=${PAGE_SIZE}`;
};
const InfiniteScrolling = () => {
  const loader = useRef(null);
  const { data, size, setSize, isValidating } = useSWRInfinite(getkey, fetcher);
  let info = data ? [].concat(...data) : [];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setSize((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div>
      <h2>Infinite Scroll</h2>
      {info?.map((data) => {
        return (
          <div key={data.id}>
            <h4>{data.title}</h4>
            <img src={data.images[0]} />
          </div>
        );
      })}
      <div ref={loader} style={{ height: "200px", backgroundColor: "violet" }}>
        Loader
      </div>
    </div>
  );
};

export default InfiniteScrolling;
