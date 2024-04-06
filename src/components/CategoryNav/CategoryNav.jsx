/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import style from "./categoryNav.module.css";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const CategoryNav = ({ productCategorySearch }) => {
  const [allNecessaryProduct, setAllNecessaryProduct] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const handleProductSearchCategory = async (cid) => {
    try {
      const filterCategoryProducts = allNecessaryProduct.filter(
        (p) => p.Image.ProductTrace.category_id == cid
      );
      productCategorySearch(filterCategoryProducts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.CategoryNav_wrapper}>
      <div className={style.categories_div}>
        {categories.map((c) => {
          return (
            <button
              key={c.id_category}
              className={style.category_btn}
              onClick={() => handleProductSearchCategory(c.id_category)}
            >
              {c.category_name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNav;
