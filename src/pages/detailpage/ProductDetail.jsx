/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import "./productdetail.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import Layout from "../../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { ProductDetailCard } from "../../components/Card/ProductDetailCard";
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";
import { SimilarProductCard } from "../../components/Card/SimilarProductCard";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState("");
  const [similarCode_MultipleColorProducts, setSimilaryCodeColorProducts] =
    useState([]);
  const [sameCode_sameColor_MultiSize, setSimilarAllSizesProducts] = useState(
    []
  );
  const [similarCategoryProducts, setSimilarCategoryProducts] = useState([]);

  const params = useParams();
  const pid = params.id;

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axiosInstance.get("/transactionsRouter/getAll");
        const products = response.data.filter((p) => p.operation_type_id === 2);
        setAllProducts(products);

        //single product
        const foundProduct = products.find(
          (p) => p.Image?.product_trace_id == pid
        );
        if (foundProduct) {
          setSingleProduct(foundProduct);
        }

        //similarCodeProducts:
        const similarCode_MultipleColorProducts = products.filter(
          (p, index, self) =>
            p.Image?.ProductTrace?.product_code ==
              foundProduct?.Image?.ProductTrace?.product_code &&
            p.Image?.product_trace_id !==
              foundProduct.Image?.product_trace_id &&
            self.findIndex(
              (item) =>
                item.Image?.ProductTrace?.color_id ===
                p.Image?.ProductTrace?.color_id
            ) === index
        );

        setSimilaryCodeColorProducts(similarCode_MultipleColorProducts);

        // sameCode_sameColor_MultiSize:
        const similarCode_similarColor_multisizeProducts = products.filter(
          (p, index) =>
            p.Image?.ProductTrace?.product_code ==
              foundProduct?.Image?.ProductTrace?.product_code &&
            p.Image?.ProductTrace?.color_id ==
              foundProduct.Image?.ProductTrace?.color_id
        );
        setSimilarAllSizesProducts(similarCode_similarColor_multisizeProducts);

        // similarCategoryProducts
        const foundSimilarCategoryProducts = products.filter(
          (p) =>
            p.Image?.ProductTrace?.category_id ==
            foundProduct?.Image?.ProductTrace?.category_id
        );
        setSimilarCategoryProducts(foundSimilarCategoryProducts);
        console.log(
          "foundSimilarCategoryProducts",
          foundSimilarCategoryProducts
        );
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [pid]);

  const addToCart = (data) => {
    setCart([...cart, { ...data, quantity: 1 }]);
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...data, quantity: 1 }])
    );
    toast.success("Item added to cart");
  };

  const makeOrder = (data) => {
    setCart([...cart, { ...data, quantity: 1 }]);
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...data, quantity: 1 }])
    );
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <div className="container_div_ecommerce_productdetaile">
        <div className="productdetaile_container">
          <div className="image_conatainer_productdetaile">
            <div className="image_conatainer_productdetaile_image_div">
              {singleProduct && (
                <img
                  src={singleProduct.Image.image_url.replace(
                    "https://drive.google.com/uc?export=view&id=",
                    "https://drive.google.com/thumbnail?id="
                  )}
                  alt=""
                />
              )}
            </div>
            <div className="image_conatainer_productdetaile_similarProduct_div">
              <span>Sizes</span>
              <div className="similar_size">
                {sameCode_sameColor_MultiSize &&
                  sameCode_sameColor_MultiSize.length > 0 &&
                  sameCode_sameColor_MultiSize.map((p) => (
                    <Link
                      to={`/productdetails/${p.Image?.ProductTrace?.id_product_trace}`}
                      key={p.id_transaction}
                    >
                      <button>{p.Image.ProductTrace.Size.size_name}</button>
                    </Link>
                  ))}
              </div>
              <span>Colors</span>
              <div className="similar_product_slider">
                {similarCode_MultipleColorProducts &&
                  similarCode_MultipleColorProducts.length > 0 &&
                  similarCode_MultipleColorProducts.slice(0, 5).map((p) => (
                    <div key={p.id}>
                      <SimilarProductCard data={p} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="orderplace_conatainer_productdetaile">
            <div className="text_primary_productdetaile">
              {singleProduct && singleProduct.Image.ProductTrace.product_name}
            </div>
            <div className="amount_price_productdetaile">
              {singleProduct && (
                <del className="del_priceing_productdetaile">
                  ট {singleProduct.price}
                </del>
              )}
              {singleProduct && (
                <span className="text_color_secondary_productdetaile">
                  ট {singleProduct.price}
                </span>
              )}
            </div>
            <div className="product_code_productdetaile">
              প্রোডাক্ট কোড:{" "}
              {singleProduct && singleProduct.Image.ProductTrace.product_code}
            </div>
            <div className="stock_in_productdetaile">
              কালার :{" "}
              <span className="color_name">
                {singleProduct &&
                  singleProduct.Image.ProductTrace.Color.color_name}
              </span>
            </div>
            <div className="stock_in_productdetaile">
              স্টক : <span>ইন স্টক</span>
            </div>
            <div className="order_button_productdetaile">
              <Link to={`/cart`}>
                <button onClick={() => makeOrder(singleProduct)}>
                  অর্ডার করুন
                </button>
              </Link>
            </div>
            <div className="add_tocart_productdetaile">
              <button onClick={() => addToCart(singleProduct)}>
                <span>
                  <FaShoppingCart />
                </span>
                <span>কার্ট-এ যোগ করুন</span>
                <span>
                  <IoIosArrowForward />
                </span>
              </button>
            </div>
            <div className="call_commnication_productdetaile">
              <button>
                <span>কল করতে ক্লিক করুন</span>
                <span>
                  <FaPhoneVolume />
                  01841140942
                </span>
              </button>
            </div>
            <div className="cantainer_table_productdetaile">
              <table>
                <tr>
                  <td>ঢাকায় ডেলিভারি খরচ</td>
                  <td className="padding_left"></td>
                  <td>৳80.00</td>
                </tr>
                <div className="line_buttom_table_productdetaile"></div>
                <tr>
                  <td>ঢাকার বাইরে ডেলিভারি খরচ অগ্রিম দিতে হবে</td>
                  <td className="padding_left"></td>
                  <td>৳130.00</td>
                </tr>
                <div className="line_buttom_table_productdetaile"></div>
                <tr>
                  <td>বিকাশ : 01752120578</td>
                  <td className="padding_left"></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        {/* //second row div */}
        <div className="container_div_product_summery_productdetaile">
          <div className="text_tarsiary_productdetaile">পন্যের বিবরণ</div>
          <div className="product_descrtiption_productdetaile">
            <ul>
              <li>
                Brand Name:{" "}
                {singleProduct && singleProduct.Image.ProductTrace.product_name}
              </li>
              <li>
                Size :{" "}
                {singleProduct &&
                  singleProduct.Image.ProductTrace.Size.size_name}{" "}
              </li>
              <li>
                Main Material:{" "}
                {singleProduct &&
                  singleProduct.Image.ProductTrace.Material.material_name}{" "}
              </li>
              <li>Water proof Artificial </li>
              <li>Origin: Materials </li>
              <li>Pattern Type: Solid</li>
            </ul>
          </div>
        </div>
        <div className="container_related_product_productdetaile">
          <div className="text_tarsiary_productdetaile">রিলেটেড প্রোডাক্ট</div>
          <div className="card_container">
            {similarCategoryProducts.map((product) => (
              <div key={product.id}>
                <ProductDetailCard data={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductDetail;
