import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiShare } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";

interface Product {
  id: string;
  productid: string;
  brandName: string;
  title: string;
  price: number;
  compare_at_price: number;
  furrlDiscountPercent: number;
  images: {
    position: number;
    src: string;
  }[];
}

const Content: React.FunctionComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const [imageMap, setImageMap] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState<number>(1);

  async function getData() {
    const API = {
      method: "post",
      url: `https://api.furrl.in/api/v1/vibe/getVibeRelate?visitId=&page=${page}`,
      data: {
        vibe: "#NightFlea",
      },
    };
    const res = await axios(API);
    const productData: Product[] = res.data.productData;
    setData((prevData) => [...prevData, ...productData]);
    console.log(productData);

    const idToImages: { [key: string]: string } = {};
    productData.forEach((product) => {
      const images = product.images.filter((image) => image.position === 1);
      if (images.length > 0) {
        idToImages[product.id] = images[0].src;
      }
    });
    setImageMap((prevImageMap) => ({ ...prevImageMap, ...idToImages }));
  }

  useEffect(() => {
    getData();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<p>Loading...</p>}
      >
        <div className="grid grid-cols-2 gap-2 mt-7">
          {data.map((product, index) => (
            <div key={`${product.id}-${index}`}>
              <div className="image-container">
                {imageMap[product.id] && (
                  <img
                  onClick={() => window.open(`https://web.furrl.in/productDetail?productId=${product.productid}&id=${product.id}&brand=${product.brandName}&name=${product.title}`, '_blank')}
                  className="w-full h-full object-cover cursor-pointer"
                  src={imageMap[product.id]}
                  alt={product.title}
                  />
                  )}
                  <FiShare className="share"/>
              </div>
              <div className="container">
                <p className="font-extralight">{product.brandName}</p>
                <h2 className="font-medium">{product.title}</h2>
                <div className="flex gap-3">
                  <p className="font-light">{`Rs. ${product.price}`}</p>
                  {product.price !== product.compare_at_price ? (
                    <>
                      <p className="font-light line-through">{`Rs. ${product.compare_at_price}`}</p>
                      <p className="text-blue-400 font-light">{`${product.furrlDiscountPercent}%`}</p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Content;
