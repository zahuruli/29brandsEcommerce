/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./home.module.css";
import Layout from "../../components/Layout/Layout";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import Footer from "../../components/Footer/Footer";
import { HomeCard } from "../../components/Card/HomeCard";
import { Pagination } from "antd";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import OurDisplaySlider from "../../components/OurDisplaySlider/OurDisplaySlider";
// import { useCart } from "../../context/cart";
import axios from "axios";
import { HotOfferCard } from "../../components/Card/HotOfferCard";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const Home = () => {
  // const [cart, setCart] = useCart();
  const [necessaryProducts, setAllNecessaryProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);
  const [hotProductsPerPage, setHotProductsPerPage] = useState(5); // Number of hot products per page
  const [searchStatus, setSearchStatus] = useState(false);

  //product group by product_code :
  function getFirstItemsByProductCode(data) {
    const groupedData = {};
    const firstItems = [];

    data.forEach((item) => {
      const productCode = item.Image?.ProductTrace?.product_code;
      if (!groupedData[productCode]) {
        groupedData[productCode] = item;
        firstItems.push(item);
      }
    });

    return firstItems;
  }
  //getAllproducts:
  const getAllproducts = async () => {
    try {
      const response = await axiosInstance.get("/transactionsRouter/getAll");
      const res_Data = response.data;
      const filteredNecessaryProduct = res_Data.filter(
        (p) =>
          p.operation_type_id === 2 &&
          p.Image?.ImagePriority?.id_image_priority === 1
      );
      const filteredHotProduct = res_Data.filter(
        (p) =>
          p.operation_type_id === 2 &&
          p.Image?.ImagePriority?.id_image_priority === 2
      );

      //group product by product code group

      const firstItems = getFirstItemsByProductCode(filteredNecessaryProduct);
      setAllNecessaryProducts(firstItems);
      setHotProducts(filteredHotProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  // Function to handle page change
  const scrollToProductsSection = () => {
    const productsSection = document.querySelector(`.${style.allProduct_div}`);
    if (productsSection) {
      const topPosition =
        productsSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  // Function to handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
    scrollToProductsSection();
  };
  // Function to handle change in page size
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToShow = necessaryProducts.slice(startIndex, endIndex);

  // Settings for react-slick
  const hotProductsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: hotProductsPerPage,
    slidesToScroll: hotProductsPerPage,
  };

  // Click event handler for previous page button
  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToProductsSection();
    }
  };

  // Function to handle the next page button click
  const handleNextPageClick = () => {
    if (currentPage < Math.ceil(necessaryProducts.length / pageSize)) {
      setCurrentPage(currentPage + 1);
      scrollToProductsSection();
    }
  };

  // Update hot products per page when window resizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 600) {
        // Handle behavior for screen width less than 768px
        setHotProductsPerPage(2);
      } else if (width < 768) {
        // Handle behavior for screen width less than 768px
        setHotProductsPerPage(3);
      } else if (width >= 768 && width < 1024) {
        // Handle behavior for screen width between 768px and 1024px
        setHotProductsPerPage(3);
      } else {
        // Handle behavior for screen width greater than or equal to 1024px
        setHotProductsPerPage(5);
      }
    };

    // Call handleResize initially
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  //product search by category:
  const productCategorySearch = (data) => {
    setAllNecessaryProducts(data);
    setSearchStatus(true);
  };

  //product search by name:
  const productNameSearch = (data) => {
    setAllNecessaryProducts(data);
    setSearchStatus(true);
  };

  //handleSearchStatusFalse:
  const handleSearchStatusFalse = () => {
    setSearchStatus(false);
  };
  return (
    <Layout
      productCategorySearch={productCategorySearch}
      productNameSearch={productNameSearch}
      getAllproducts={getAllproducts}
      handleSearchStatusFalse={handleSearchStatusFalse}
    >
      <div className={style.Home_wrapper}>
        <div className={style.categoryNav}>
          <CategoryNav productCategorySearch={productCategorySearch} />
        </div>

        <div className={style.home_content}>
          <div className={style.content}>
            {/* /=======/image slider ======*/}
            <div className={style.image_slider_div}>
              <OurDisplaySlider />
            </div>

            {/* =====hot offer products slider ======*/}
            {!searchStatus && (
              <div className={style.hotDeal_div}>
                <h2 className={style.HotText}>হট অফার</h2>
                <Slider {...hotProductsSettings}>
                  {hotProducts &&
                    hotProducts.length > 0 &&
                    hotProducts.map((p) => (
                      <div key={p.id} className="hot_offer_card_holder">
                        <HotOfferCard data={p} />
                      </div>
                    ))}
                </Slider>
                <div className={style.sliderControls}>
                  <button
                    className={`${style.sliderControlButton} ${style.prevButton}`}
                    onClick={() => {
                      document.querySelector(".slick-prev").click();
                    }}
                  >
                    <MdKeyboardDoubleArrowLeft />
                  </button>
                  <button
                    className={`${style.sliderControlButton} ${style.nextButton}`}
                    onClick={() => {
                      document.querySelector(".slick-next").click();
                    }}
                  >
                    <MdKeyboardDoubleArrowRight />
                  </button>
                </div>
              </div>
            )}
            {/* /=========/All products ========*/}
            <div className={style.allProduct_div}>
              <h2 className={style.NecessaryText}>প্রয়োজনীয় প্রোডাক্ট</h2>

              <div className={style.dealCard}>
                {productsToShow && productsToShow.length > 0
                  ? productsToShow.map((p) => <HomeCard data={p} key={p.id} />)
                  : "No product found!"}
              </div>
            </div>

            {/* /==========/pagination============== */}
            <div className={style.pagination}>
              <Pagination
                current={currentPage}
                onChange={onPageChange}
                total={necessaryProducts.length}
                pageSize={pageSize}
                showSizeChanger={true}
                showQuickJumper={true}
                pageSizeOptions={[18, 36, 72, 100, 200]}
                onShowSizeChange={handlePageSizeChange}
                onPrev={handlePrevPageClick}
                onNext={handleNextPageClick}
              />
            </div>
          </div>
          <div className={style.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
