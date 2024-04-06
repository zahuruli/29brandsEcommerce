/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import style from "./home_card.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

// Placeholder image URL
const placeholderImage = "https://via.placeholder.com/150";

export const HomeCard = ({ data }) => {
  const [cart, setCart] = useCart();
  const [imageSrc, setImageSrc] = useState(
    data.Image.image_url.replace(
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/thumbnail?id="
    )
  );
  //const [imageSrc, setImageSrc] = useState("https://drive.usercontent.google.com/download?id=1v42fdhgywqwtKHakhLoxtmfqMytzc7k8&export=view&authuser=0");
  //const [imageSrc, setImageSrc] = useState("https://drive.google.com/thumbnail?id=0B6wwyazyzml-OGQ3VUo0Z2thdmc");

  console.log(data.Image.image_url);
  const handleImageError = () => {
    setImageSrc(placeholderImage);
  };

  const addToCart = () => {
    setCart([...cart, { ...data, quantity: 1 }]);
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...data, quantity: 1 }])
    );
    toast.success("Item added to cart");
  };

  const makeOrder = () => {
    setCart([...cart, { ...data, quantity: 1 }]);
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...data, quantity: 1 }])
    );
    toast.success("Item added to cart");
  };

  return (
    <div className={style.cantainer_product_list_productdetaile}>
      <div
        key={data?.id_transaction}
        className={style.cantainer_product_card_list}
      >
        <Link
          to={`/productdetails/${data.Image?.ProductTrace?.id_product_trace}`}
        >
          <div className={style.productImage}>
            <img src={imageSrc} alt="" onError={handleImageError} />
          </div>
          <div className={style.productAmount}>
            <div className={style.downPrice}>
              <span>৳</span>
              <del>{data?.price}</del>
            </div>
            <div className={style.salePrice}>
              {" "}
              <span>৳</span>
              <div>{data?.price}</div>
            </div>
          </div>
          <div className={style.productName}>
            {data.Image.ProductTrace.product_name.substring(0, 16)}...
          </div>
        </Link>
        <div className={style.button_div}>
          <button
            className={style.button_add_to_cart}
            onClick={() => addToCart(data)}
          >
            কার্ট করুন
          </button>
          <Link to={`/cart`}>
            <button
              className={style.button_add_to_order}
              onClick={() => makeOrder(data)}
            >
              অর্ডার করুন
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
