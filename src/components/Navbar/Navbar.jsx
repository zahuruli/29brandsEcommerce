/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Drawer } from "antd";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Logo from "../images/Login_SignUp/BrandLogo.png";
// import Logo from "./logomerina.png";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
const Navbar = ({
  productCategorySearch,
  productNameSearch,
  getAllproducts,
  handleSearchStatusFalse,
}) => {
  const [cart] = useCart();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allNecessaryProduct, setAllNecessaryProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  //getAllproducts:
  const getAllNecessaryproducts = async () => {
    try {
      const response = await axiosInstance.get("/transactionsRouter/getAll");
      const res_Data = response.data;
      const filteredNecessaryProduct = res_Data.filter(
        (p) =>
          p.operation_type_id === 2 &&
          p.Image?.ImagePriority?.id_image_priority === 1
      );
      setAllNecessaryProduct(filteredNecessaryProduct);
    } catch (error) {
      console.log(error);
    }
  };
  //fatchCategoryData:
  const fatchCategoryData = async () => {
    try {
      const response = await axiosInstance.get("/categorys/getAll");
      const res_Data = response.data;
      setCategories(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchCategoryData();
    getAllNecessaryproducts();
  }, []);

  // handleProductSearchCategory
  const handleProductSearchCategory = async (cid) => {
    try {
      const filterCategoryProducts = allNecessaryProduct.filter(
        (p) => p.Image.ProductTrace.category_id == cid
      );
      productCategorySearch(filterCategoryProducts);
      setVisibleDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };

  // handleProductSearchCategory
  const handleProductSearchName = async () => {
    try {
      const filterNameProducts = allNecessaryProduct.filter((p) =>
        p.Image.ProductTrace.product_name
          .toLowerCase()
          .includes(productName.toLowerCase())
      );
      productNameSearch(filterNameProducts);
      setVisibleModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Handle Enter key press
  const handleKeyPressForSearchInput = (event) => {
    if (event.key === "Enter") {
      handleProductSearchName();
      setVisibleModal(false);
      setProductName("");
    }
  };

  //handleHomeProduct:
  const handleHomeProduct = () => {
    getAllproducts();
    handleSearchStatusFalse();
  };
  //drawer function:
  const showDrawer = () => {
    setVisibleDrawer(true);
  };
  const onClose = () => {
    setVisibleDrawer(false);
  };

  //modal function:
  const showModal = () => {
    setVisibleModal(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel");
    setVisibleModal(false);
  };
  return (
    <div className={style.navbar_wrapper}>
      <div className={style.navbar_main}>
        {/*============ hambarger_div =======*/}
        <div className={style.hambarger_div}>
          <span className={style.hambarger} onClick={showDrawer}>
            <GiHamburgerMenu className={style.hamberger_icon} />{" "}
          </span>
        </div>
        {/*============ logo_div =======*/}
        <div className={style.logo_div}>
          <div className={style.logo_image_div} onClick={handleHomeProduct}>
            <Link to={"/"}>
              <img src={Logo} alt="" className={style.logoImage} />
            </Link>
          </div>
        </div>
        {/*============ search_div =======*/}

        <div className={style.search_div}>
          <div className={style.search_input_div}>
            <input
              type="text"
              className={style.search_input}
              placeholder={"সার্চ করুন "}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onKeyPress={handleKeyPressForSearchInput}
            />
            <span
              type="button"
              className={style.search_button}
              onClick={handleProductSearchName}
            >
              {" "}
              <IoSearchOutline />{" "}
            </span>
          </div>
          <div className={style.search_input_div_mobile}>
            <button
              onClick={() => setVisibleModal(true)}
              className={style.search_input_div_mobile}
            >
              <span>
                {" "}
                <IoSearchOutline />{" "}
              </span>
            </button>
          </div>
        </div>
        {/*============ cart_div =======*/}

        <div className={style.cart_div}>
          <div className={style.cart_icon_text_div}>
            <span className={style.cart_phone}>
              <span className={style.callIcon}>
                <BiSolidPhoneCall />
              </span>

              <a href="tel:01405700100" className={style.phoneNumber}>
                01405700100
              </a>
            </span>
            <Badge count={cart.length} color="primary" showZero>
              <span className={style.cart_icon}>
                <Link to={"/cart"}>
                  <FaCartPlus className="badgesize" />
                </Link>
              </span>
            </Badge>
          </div>
        </div>
      </div>

      {/*=============== drawer=================== */}
      <div className={style.drawerWrapper}>
        <div className={style.drawer}>
          <Drawer
            title={
              <span style={{ color: "black", fontWeight: "700" }}>
                CATEGORIES
              </span>
            }
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visibleDrawer}
            width={150}
            style={{ backgroundColor: "#F0CA28" }}
            closeIcon={
              <CloseOutlined
                style={{
                  position: "absolute",
                  top: "0",
                  left: "10px",
                  color: "black",
                  fontSize: "1.5rem",
                }}
              />
            }
          >
            <div className={style.drawer_categories}>
              {categories.map((c) => {
                return (
                  <>
                    <button
                      key={c.id_category}
                      className={style.category_btn}
                      onClick={() => handleProductSearchCategory(c.id_category)}
                    >
                      {c.category_name}
                    </button>
                    <hr />
                  </>
                );
              })}
            </div>
          </Drawer>
        </div>
      </div>

      {/*=============== Modal=================== */}
      <div>
        <Modal
          visible={visibleModal}
          onCancel={handleCancel}
          footer={null}
          style={{
            top: "0",
            width: "50%",
          }}
        >
          <div className={style.search_input_div_modal}>
            <input
              type="text"
              className={style.search_input}
              placeholder={"সার্চ করুন "}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onKeyPress={handleKeyPressForSearchInput}
            />
            <span
              type="button"
              className={style.search_button}
              onClick={handleProductSearchName}
            >
              {" "}
              <IoSearchOutline />{" "}
            </span>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
