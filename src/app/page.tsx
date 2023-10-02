"use client";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Content from "./(Content)/content";

export default function Home() {

  const bookmarkClick = () => {
    window.location.href = "https://web.furrl.in/wishlist";
  }

  const shoppingClick = () => {
    window.location.href = "https://web.furrl.in/cart";
  }

  return (
    <>
      <div className="w-full lg:w-1/4 mx-2 lg:m-auto">
        <header className="flex justify-between mt-2 mr-3">
          <div></div>
          <div>
            <h1 className="text-xl">#Vibe Page</h1>
          </div>
          <div className="flex gap-3">
            <BsBookmark onClick={bookmarkClick} className="text-xl cursor-pointer" />
            <HiOutlineShoppingBag onClick={shoppingClick} className="text-xl cursor-pointer" />
          </div>
        </header>
        <div className="mt-2">
          <img
            className="m-auto h-60 w-full"
            src="https://cdn.furrl.in/vibes/VibeCard-NightFlea14.png"
            alt="banner"
          />
        </div>
        <div className="flex justify-center items-center h-12 bg-slate-300 mt-3 mx-6 rounded-xl">
          <div>
            <button className="px-2 py-1 bg-white rounded-lg">Products</button>
          </div>
        </div>
        <div className="categories">
          <div className="ml-4 mt-3 pt-3">
            <p className="text-sm text-grey">192 Products</p>
          </div>
          <div className="flex justify-center gap-1 mt-3 pb-4">
            <button className=" border-2 px-3 py-1 bg-blue-400 rounded-xl">
              All
            </button>
            <button className=" border-2 px-3 py-1 bg-white rounded-xl">
              Home
            </button>
            <button className=" border-2 px-3 py-1 bg-white rounded-xl">
              Apparel
            </button>
            <button className=" border-2 px-3 py-1 bg-white rounded-xl">
              Accessories
            </button>
          </div>
        </div>
        <Content />
      </div>
    </>
  );
}
