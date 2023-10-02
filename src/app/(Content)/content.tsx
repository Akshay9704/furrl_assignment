import React, { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { FiShare } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

const modalStyles: CSSProperties = {
  position: "fixed",
  display: "flex",
  height: "50%",
  width: "23%", 
  top: "50%",
  left: "49.5%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  zIndex: 1,
  ...(window.innerWidth <= 768 && {
    left: "50%",
  }),
};

const Content: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [imageMap, setImageMap] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const handleShowModal = (productId: string, product: Product) => {
    setSelectedProductId(productId);
    setSelectedProduct(product);
  };

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
                  <div onClick={() => handleShowModal(product.id, product)}>
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={imageMap[product.id]}
                      alt={product.title}
                    />
                  </div>
                )}
                <FiShare className="share" />
              </div>
              <div className="container">
                <p className="font-extralight">{product.brandName}</p>
                <h2 className="font-medium">{product.title}</h2>
                <div className="flex gap-3">
                  <p className="font-light">{`Rs. ${product.price}`}</p>
                  {product.price !== product.compare_at_price ? (
                    <p>
                      <p className="font-light line-through">{`Rs. ${product.compare_at_price}`}</p>
                      <p className="text-blue-400 font-light">{`${product.furrlDiscountPercent}%`}</p>
                    </p>
                  ) : null}
                </div>
              </div>
              {selectedProductId && selectedProduct?.id === product.id && (
                <div style={{ ...modalStyles, display: "block",  width: "17rem" }}>
                  <Card style={{ width: "17rem", backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
                    <Card.Img variant="top" src={imageMap[selectedProductId]} />
                    <Card.Body>
                      <Card.Title className="text-lg">{selectedProduct.brandName}</Card.Title>
                      <Card.Text>
                        {selectedProduct.title}
                      </Card.Text>
                      <Card.Text>
                        {selectedProduct.price}
                      </Card.Text>
                      <Button className="border-2" variant="primary">
                        Add to Cart
                      </Button>
                      <Button className="border-2 ml-3" variant="primary" onClick={() => setSelectedProductId(null)}>
                        Close
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>

    </>
  );
};

export default Content;

