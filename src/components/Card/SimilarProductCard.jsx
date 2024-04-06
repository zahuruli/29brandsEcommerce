/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import style from "./similarProductCard.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

// Placeholder image URL
const placeholderImage = "https://via.placeholder.com/150";

export const SimilarProductCard = ({ data }) => {
  const [cart, setCart] = useCart();
  const [imageSrc, setImageSrc] = useState(
    data.Image?.image_url?.replace(
      "https://drive.google.com/uc?export=view&id=",
      "https://drive.google.com/thumbnail?id="
    )
  );

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
        </Link>
      </div>
    </div>
  );
};
