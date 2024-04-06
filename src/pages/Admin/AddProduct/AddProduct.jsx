/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./AddProduct.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { RxReset } from "react-icons/rx";
import { MdAddCircle } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const AddProduct = () => {
  const [toastId, setToastId] = useState(null);
  //all fetch data state:
  const [allFixedTransectionData, setAllFixedTransectionData] = useState([]);
  const [allTransectionData, setAllTransectionData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [operationTypeData, setOperationTypeData] = useState([]);
  const [imagePriorityData, setImagePriorityData] = useState([]);
  //input state:
  const [selectedTabID, setSelectedTabID] = useState(null);
  const [id_transaction, setIdTransection] = useState("");
  const [id_image, setIdImage] = useState("");
  const [id_product_trace, setIdProductTrace] = useState("");
  const [product_code, setProductCode] = useState("");
  const [product_name, setProductName] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_name, setColorName] = useState("");
  const [color_id, setColorId] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [size_id, setIdSize] = useState("");
  const [size_name, setSizeName] = useState("");
  const [brand_name, setBrandName] = useState("");
  const [brand_id, setBrandId] = useState("");
  const [material_name, setMaterialName] = useState("");
  const [material_id, setMaterialId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [operation_name, setOperationName] = useState("");
  const [operation_type_id, setOperationTypeId] = useState("");
  const [image_priority_id, setImagePriorityId] = useState("");
  const [priority, setPriority] = useState("");
  const [invoice_no, setInvoiceNo] = useState(1);
  //image:
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef(null);
  //errorborder:
  const [errorBorder, setErrorBorder] = useState(false);
  const [searchInput, setSearcInput] = useState("");
  const [searchTransectionId, setSearchTransectionId] = useState("");
  const [searchStatus, setSearcStatus] = useState(false);

  const allInput = {
    id_transaction,
    id_image,
    image_id: id_image,
    id_product_trace,
    product_trace_id: id_product_trace,
    product_code,
    product_name,
    category_name,
    category_id,
    id_category: category_id,
    color_name,
    color_id,
    id_color: color_id,
    price,
    size_id,
    id_size: size_id,
    size_name,
    brand_name,
    brand_id,
    id_brand: brand_id,
    material_name,
    material_id,
    id_material: material_id,
    quantity,
    operation_name,
    operation_type_id,
    id_operation_type: operation_type_id,
    image_priority_id,
    id_image_priority: image_priority_id,
    priority,
    image,
  };
  //all depended data fetching:
  //=====fatchAllTransectionData=======
  const fatchAllTransectionData = async () => {
    try {
      const response = await axiosInstance.get("/transactionsRouter/getAll");
      const res_Data = response.data;

      const allStockTransections = res_Data.filter(
        (p) => p.operation_type_id === 2
      );
      setAllTransectionData(allStockTransections);
      setAllFixedTransectionData(allStockTransections);
    } catch (error) {
      console.log(error);
    }
  };

  //reset all :
  const resetAll = () => {
    setErrorBorder(false);
    setIdProductTrace("");
    setProductCode("");
    setProductName("");
    setCategoryName("");
    setCategoryId("");
    setColorName("");
    setColorId("");
    setPrice("");
    setModel("");
    setType("");
    setIdSize("");
    setSizeName("");
    setBrandName("");
    setBrandId("");
    setMaterialName("");
    setMaterialId("");
    setQuantity("");
    setPriority("");
    setImagePriorityId("");
    setInvoiceNo("");
    setImage("");
    setImagePreview("");
    setIdTransection("");
    setIdImage("");
  };

  const resetInProductSave = () => {
    setErrorBorder(false);
    setColorName("");
    setColorId("");
    setIdSize("");
    setSizeName("");
    setQuantity("");
    setPriority("");
    setImage("");
    setImagePreview("");
  };
  //=====fatchCategoryData=======
  const fatchCategoryData = async () => {
    try {
      const response = await axiosInstance.get("/categorys/getAll");
      const res_Data = response.data;
      setCategoryData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  //=====fatchColorData=======
  const fatchColorData = async () => {
    try {
      const response = await axiosInstance.get("/colors/getAll");
      const res_Data = response.data;
      setColorData(res_Data);
    } catch (error) {
      console.log(error);
    }
  }; //=====fatchSizeData=======
  const fatchSizeData = async () => {
    try {
      const response = await axiosInstance.get("/sizes/getAll");
      const res_Data = response.data;
      setSizeData(res_Data);
    } catch (error) {
      console.log(error);
    }
  }; //=====fatchBrandData=======
  const fatchBrandData = async () => {
    try {
      const response = await axiosInstance.get("/brands/getAll");
      const res_Data = response.data;
      setBrandData(res_Data);
    } catch (error) {
      console.log(error);
    }
  }; //=====fatchMaterialData=======
  const fatchMaterialData = async () => {
    try {
      const response = await axiosInstance.get("/materials/getAll");
      const res_Data = response.data;
      setMaterialData(res_Data);
    } catch (error) {
      console.log(error);
    }
  }; //=====fatchOperationTypeData=======
  const fatchOperationTypeData = async () => {
    try {
      const response = await axiosInstance.get("/operationtypes/getAll");
      const res_Data = response.data;
      setOperationTypeData(res_Data);
      setOperationTypeId(res_Data[1].id_operation_type);
      setOperationName(res_Data[1].operation_name);
    } catch (error) {
      console.log(error);
    }
  };
  //=====fatchImagePriorityData=======
  const fatchImagePriorityData = async () => {
    try {
      const response = await axiosInstance.get("/imagepriority/getAll");
      const res_Data = response.data;
      setImagePriorityData(res_Data);
      setImagePriorityId(res_Data[0].id_image_priority);
      setPriority(res_Data[0].priority);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchAllTransectionData();
    fatchCategoryData();
    fatchColorData();
    fatchSizeData();
    fatchBrandData();
    fatchMaterialData();
    fatchOperationTypeData();
    fatchImagePriorityData();
  }, []);

  //image handling:
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };

  //handleCategoryChange:
  const handleCategoryChange = (value) => {
    const selectedCategory = categoryData.find(
      (c) => c.category_name === value
    );

    if (selectedCategory) {
      setCategoryId(selectedCategory.id_category);
      setCategoryName(selectedCategory.category_name);
      console.log(selectedCategory.id_category);
    } else {
      setCategoryId("");
      setCategoryName(value);
    }
  };

  //handleColorChange:
  const handleColorChange = (value) => {
    const selectedColor = colorData.find((c) => c.color_name === value);

    if (selectedColor) {
      setColorId(selectedColor.id_color);
      setColorName(selectedColor.color_name);
      console.log(selectedColor.id_color);
    } else {
      setColorId("");
      setColorName(value);
    }
  };
  //handleSizeChange:
  const handleSizeChange = (value) => {
    const selectedSize = sizeData.find((c) => c.size_name === value);

    if (selectedSize) {
      setIdSize(selectedSize.id_size);
      setSizeName(selectedSize.size_name);
      console.log(selectedSize.id_size);
    } else {
      setIdSize("");
      setSizeName(value);
    }
  };

  //handleBrandChange:
  const handleBrandChange = (value) => {
    const selectedBrand = brandData.find((c) => c.brand_name === value);

    if (selectedBrand) {
      setBrandId(selectedBrand.id_brand);
      setBrandName(selectedBrand.brand_name);
      console.log(selectedBrand.id_brand);
    } else {
      setBrandId("");
      setBrandName(value);
    }
  };
  //handleMaterialChange:
  const handleMaterialChange = (value) => {
    const selectedMaterial = materialData.find(
      (c) => c.material_name === value
    );

    if (selectedMaterial) {
      setMaterialId(selectedMaterial.id_material);
      setMaterialName(selectedMaterial.material_name);
      console.log(selectedMaterial.id_material);
    } else {
      setMaterialId("");
      setMaterialName(value);
    }
  };

  //handlePriorityChange:
  const handlePriorityChange = (value) => {
    const selectedPriority = imagePriorityData.find(
      (c) => c.priority === value
    );

    if (selectedPriority) {
      setImagePriorityId(selectedPriority.id_image_priority);
      setPriority(selectedPriority.priority);
    } else {
      setImagePriorityId("");
      setPriority(value);
    }
  };
  //============handleProductSave===================:
  const handleProductSave = async (e) => {
    if (e.detail > 1) {
      return;
    }
    if (id_transaction) {
      // Toast message for empty fields
      if (toastId) {
        toast.dismiss(toastId);
      }
      const errorToastId = toast.error("Product is selected.Reset first!", {
        duration: 1500,
      });
      setToastId(errorToastId);
      return;
    }
    try {
      if (
        product_code &&
        product_name &&
        category_name &&
        category_id &&
        color_name &&
        color_id &&
        price &&
        size_id &&
        size_name &&
        brand_name &&
        brand_id &&
        quantity &&
        operation_name &&
        operation_type_id &&
        image_priority_id &&
        priority &&
        // invoice_no &&
        image
      ) {
        // Display loading toast message
        const newToastId = toast.loading("Waiting...");

        const formData = new FormData();
        formData.append("product_code", product_code);
        formData.append("size_id", size_id);
        formData.append("product_name", product_name);
        formData.append("material_id", material_id);
        formData.append("category_id", category_id);
        formData.append("color_id", color_id);
        formData.append("brand_id", brand_id);
        formData.append("quantity", quantity);
        // formData.append("invoice_no", invoice_no);
        formData.append("operation_type_id", operation_type_id);
        formData.append("image_priority_id", image_priority_id);
        formData.append("price", price);
        formData.append("image", image);

        const res = await axiosInstance.post("/producttraces/post", formData);

        // Dismiss loading toast message
        toast.dismiss(newToastId);

        if (res.status === 200) {
          // Show success message
          if (toastId) {
            toast.dismiss(toastId);
          }
          const successToastId = toast.success("Product saved successfully!", {
            duration: 1000,
          });
          setToastId(successToastId);

          // Additional actions after success
          imageRef.current.value = null;
          resetInProductSave();
          fatchAllTransectionData();
        } else {
          // Toast message for error
          console.log("Error while saving product!");
        }
      } else {
        // Toast message for empty fields
        if (toastId) {
          toast.dismiss(toastId);
        }
        const errorToastId = toast.error("One or many fields are empty!", {
          duration: 1000,
        });
        setToastId(errorToastId);

        setErrorBorder(true);
        setTimeout(() => {
          setErrorBorder(false);
        }, 2600);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //============= handleClickTableDataShowInputField==============================
  const handleClickTableDataShowInputField = (d) => {
    setSelectedTabID(d.Image?.product_trace_id);

    const selectedProduct =
      allTransectionData &&
      allTransectionData.length > 0 &&
      allTransectionData.find(
        (i) => i.Image?.product_trace_id === d.Image?.product_trace_id
      );

    if (selectedProduct) {
      setIdTransection(selectedProduct.id_transaction);
      setIdImage(selectedProduct.Image?.id_image);
      setIdProductTrace(selectedProduct.Image?.product_trace_id);

      setProductCode(selectedProduct.Image?.ProductTrace?.product_code);
      setProductName(selectedProduct.Image?.ProductTrace?.product_name);
      setCategoryName(
        selectedProduct.Image?.ProductTrace?.Category?.category_name
      );
      setCategoryId(selectedProduct.Image?.ProductTrace?.Category?.id_category);
      setColorName(selectedProduct.Image?.ProductTrace?.Color?.color_name);
      setColorId(selectedProduct.Image?.ProductTrace?.Color?.id_color);
      setPrice(selectedProduct.price);
      setModel(selectedProduct.Image?.ProductTrace?.model);
      setType(selectedProduct.Image?.ProductTrace?.type);
      setIdSize(selectedProduct.Image?.ProductTrace?.Size?.id_size);
      setSizeName(selectedProduct.Image?.ProductTrace?.Size?.size_name);
      setBrandName(selectedProduct.Brand?.brand_name);
      setBrandId(selectedProduct.Brand?.id_brand);
      setMaterialName(
        selectedProduct.Image?.ProductTrace?.Material?.material_name
      );
      setMaterialId(selectedProduct.Image?.ProductTrace?.Material?.id_material);
      setQuantity(selectedProduct.quantity);
      setPriority(selectedProduct.Image?.ImagePriority?.priority);
      setImagePriorityId(
        selectedProduct.Image?.ImagePriority?.id_image_priority
      );

      // setInvoiceNo("");
      //  setImage();
      setImagePreview(
        selectedProduct.Image?.image_url.replace(
          "https://drive.google.com/uc?export=view&id=",
          "https://drive.google.com/thumbnail?id="
        )
      );
    } else {
      console.log("could not found product");
    }
  };
  //==============handleUpdateProduct:==============
  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(allInput).forEach(([key, value]) => {
        // Check if the value is null
        if (value !== null) {
          formData.append(key, value);
        } else {
          // Handle null values here if needed
          // For example, you can append an empty string instead
          formData.append(key, "");
        }
      });

      console.log(
        "id_transaction, id_product_trace, id_image",
        id_transaction,
        id_product_trace,
        id_image
      );
      //update validation check:
      if ((id_transaction, id_product_trace, id_image)) {
        // Display loading toast message
        const newToastId = toast.loading("Waiting...");
        //all data append in form data
        console.log("formData", ...formData);
        // const res = await fetch(
        //   "http://194.233.87.22:1002/api/producttraces/updateProductTraceImageTransactionByIDs",
        //   {
        //     method: "PUT",

        //     body: formData,
        //   }
        // );

        const res = await axiosInstance.put(
          "/producttraces/updateProductTraceImageTransactionByIDs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Dismiss loading toast message
        toast.dismiss(newToastId);
        if (res.status == 200) {
          //toast message:
          if (toastId) {
            toast.dismiss(toastId);
          }
          const newToastId = toast.success(`Product updated succesfully!`, {
            duration: 1000,
          });
          setToastId(newToastId);
          imageRef.current.value = null;
          resetInProductSave();
          fatchAllTransectionData();
        }
      } else {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`Please select a product first!`, {
          duration: 1000,
        });
        setToastId(newToastId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //==============deleteTransectionProduct:==============
  const deleteTransectionProduct = async (e) => {
    if (e.detail > 1) {
      return;
    }

    try {
      if (id_transaction) {
        const newToastId = toast.loading("Waiting...");
        const formData = new FormData();
        formData.append("id_transaction", id_transaction);

        const data = { id_transaction };

        console.log("id_transaction", id_transaction);

        // const res = await fetch(
        //   "http://194.233.87.22:1002/api/transactionsRouter/deleteTransactionByImageProducttraceByID",
        //   {
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ id_transaction }),
        //   }
        // );
        const res = await axiosInstance.delete(
          "/transactionsRouter/deleteTransactionByImageProducttraceByID",

          {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              id_transaction,
            },
          }
        );
        toast.dismiss(newToastId);
        if (res.status === 200) {
          // Show success message
          if (toastId) {
            toast.dismiss(toastId);
          }
          const successToastId = toast.success(
            "Product deleted successfully!",
            {
              duration: 1000,
            }
          );
          setToastId(successToastId);

          resetInProductSave();
          fatchAllTransectionData();
        } else {
          // Toast message for error
          console.log("Error while deleting product!");
        }
      } else {
        // Toast message for empty fields
        if (toastId) {
          toast.dismiss(toastId);
        }
        const errorToastId = toast.error("Select a product first!", {
          duration: 1500,
        });
        setToastId(errorToastId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handleSearchChange
  const handleSearchChange = (tId) => {
    try {
      const selectedProduct =
        allTransectionData &&
        allTransectionData.length > 0 &&
        allTransectionData.find((i) => i.id_transaction === tId);
      if (selectedProduct) {
        setSearcInput(selectedProduct.Image?.ProductTrace?.product_name);
        setSearchTransectionId(tId);
      } else {
        setSearcInput("");
        setSearchTransectionId(tId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchProduct = async () => {
    try {
      setSearcStatus(true);
      const selectedProduct =
        allFixedTransectionData &&
        allFixedTransectionData.length > 0 &&
        allFixedTransectionData.filter(
          (i) => i.id_transaction == searchTransectionId
        );
      console.log("selectedProduct", selectedProduct);
      setAllTransectionData(selectedProduct);
      setSearcInput("");
      setSearchTransectionId("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowAll = () => {
    setSearcStatus(false);
    fatchAllTransectionData();
  };
  return (
    <AdminLayout>
      <div className="addproduct_wrapper">
        <Toaster />
        <p className="addproduct_text">Add Product</p>
        {/* /================/input_div ================*/}
        <div className="addproduct_input_wrapper">
          {/* addproduct_all_input_div */}
          <div className="addproduct_all_input_div">
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  {" "}
                  <label className="star">*</label>Product Code
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !product_code
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={product_code}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Product Name
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !product_name
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Category
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !category_name
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={category_name}
                onChange={(e) => handleCategoryChange(e.target.value)}
                list="allCategory"
              />
              <datalist id="allCategory">
                {categoryData.map((category) => (
                  <option
                    key={category.id_category}
                    value={category.category_name}
                  >
                    {category.category_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">Type</label>
              </div>
              <input
                type="text"
                className="addproduct_input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
          {/* addproduct_all_input_div */}
          <div className="addproduct_all_input_div">
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">Model</label>
              </div>
              <input
                type="text"
                className="addproduct_input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">Material</label>
              </div>
              <input
                type="text"
                className="addproduct_input"
                value={material_name}
                onChange={(e) => handleMaterialChange(e.target.value)}
                list="allMaterial"
              />
              <datalist id="allMaterial">
                {materialData.map((material) => (
                  <option
                    key={material.id_material}
                    value={material.material_name}
                  >
                    {material.material_name}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Brand
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !brand_name
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={brand_name}
                onChange={(e) => handleBrandChange(e.target.value)}
                list="allBrands"
              />
              <datalist id="allBrands">
                {brandData.map((brand) => (
                  <option key={brand.id_brand} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Price
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !price
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>{" "}
          {/* addproduct_all_input_div */}
          <div className="addproduct_all_input_div">
            {/* <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">Operation Type</label>
              </div>
              <input
                type="text"
                className="addproduct_input"
                value={operation_name}
                disabled
              />
            </div> */}
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Color
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !color_name
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={color_name}
                onChange={(e) => handleColorChange(e.target.value)}
                list="allColors"
              />
              <datalist id="allColors">
                {colorData.map((color) => (
                  <option key={color.id_color} value={color.color_name}>
                    {color.color_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Size
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !size_name
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={size_name}
                onChange={(e) => handleSizeChange(e.target.value)}
                list="allSizes"
              />

              <datalist id="allSizes">
                {sizeData.map((size) => (
                  <option key={size.id_size} value={size.size_name}>
                    {size.size_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Quantity
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !quantity
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="input_div">
              <div htmlFor="" className="addproduct_input_label">
                <label htmlFor="">
                  <label className="star">*</label>Image Priority
                </label>
              </div>
              <input
                type="text"
                className={
                  errorBorder && !priority
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                list="allPriority"
              />
              <datalist id="allPriority">
                {imagePriorityData.map((priority) => (
                  <option
                    key={priority.id_image_priority}
                    value={priority.priority}
                  >
                    {priority.priority}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
          {/* addproduct_all_input_div */}
          <div className="addproduct_all_input_div_image">
            <div className="image_div">
              <div className="input_div image_input_div">
                <div className="addproduct_input_label">
                  <label htmlFor="fileInput">
                    <label className="star">*</label>Image
                  </label>
                </div>
                <label htmlFor="fileInput" className="custom-file-input">
                  Choose File
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="addproduct_input"
                  onChange={handleImageFileChange}
                  style={{ display: "none" }}
                  ref={imageRef}
                />
              </div>
              {/* <p>Preview Image</p> */}
              <img
                src={imagePreview}
                alt=""
                className={
                  errorBorder && !imagePreview
                    ? "addproduct_input errorBorder"
                    : "addproduct_input"
                }
              />
            </div>
          </div>
        </div>
        {/* /================/button_div ================*/}
        <div className="addproduct_button_wrapper">
          <div className="addproduct_button_div button_reset">
            <button onClick={resetAll}>
              <RxReset />
            </button>
            <span>Reset</span>
          </div>
          <div className="addproduct_button_div button_adds">
            <button onClick={(e) => handleProductSave(e)}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="addproduct_button_div button_edit">
            <button onClick={handleUpdateProduct}>
              <MdEditSquare />
            </button>
            <span>Update</span>
          </div>
          <div className="addproduct_button_div button_delete">
            <button onClick={(e) => deleteTransectionProduct(e)}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>

        {/* ======================thirddiv================== */}
        <div className="product_search">
          <input
            type="text"
            value={searchTransectionId}
            onChange={(e) => handleSearchChange(e.target.value)}
            list="productSearch"
          />
          <datalist id="productSearch">
            {allFixedTransectionData &&
              allFixedTransectionData.length > 0 &&
              allFixedTransectionData.map((data) => (
                <option key={data.id_transaction} value={data.id_transaction}>
                  {data.Image?.ProductTrace?.product_name}
                </option>
              ))}
          </datalist>
          {searchStatus && !searchTransectionId ? (
            <button onClick={handleShowAll}>Show All</button>
          ) : (
            <button onClick={handleSearchProduct}>search</button>
          )}
        </div>
        <div className="addproduct_table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Price</th>
                <th>Size</th>
                <th>Brand</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Image Priority</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {allTransectionData &&
                allTransectionData.length > 0 &&
                allTransectionData.map((transection) => (
                  <tr
                    key={transection.id_transaction}
                    className={`
                  ${
                    selectedTabID === transection.Image?.product_trace_id
                      ? `addProduct_tr tab_selected `
                      : "addProduct_tr"
                  }
                `}
                    onClick={() =>
                      handleClickTableDataShowInputField(transection)
                    }
                    tabIndex="0"
                  >
                    <td>{transection.Image?.ProductTrace?.product_code}</td>
                    <td>
                      {transection.Image?.ProductTrace?.product_name.substring(
                        0,
                        15
                      )}
                    </td>
                    <td>
                      {transection.Image?.ProductTrace?.Category?.category_name}
                    </td>
                    <td>
                      {transection.Image?.ProductTrace?.Color?.color_name}
                    </td>
                    <td>{transection.price}</td>
                    <td>{transection.Image?.ProductTrace?.Size?.size_name}</td>
                    <td>{transection.Brand?.brand_name}</td>
                    <td>
                      {transection.Image?.ProductTrace?.Material?.material_name}
                    </td>
                    <td>{transection.quantity}</td>
                    <td>{transection.Image?.ImagePriority?.priority}</td>
                    <td>
                      <div className="table_image">
                        <img
                          src={transection.Image?.image_url?.replace(
                            "https://drive.google.com/uc?export=view&id=",
                            "https://drive.google.com/thumbnail?id="
                          )}
                          alt=""
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
