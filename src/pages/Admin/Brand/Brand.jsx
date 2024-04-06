import "./Brand.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Brand = () => {
  const [brandData, setBrandData] = useState([]);
  const [id_brand, setIdBrand] = useState("");
  const [brand_name, setBrandName] = useState("");

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // http://194.233.87.22:1002/api/brands/getAll
  const fatchBrandData = async () => {
    try {
      const response = await axiosInstance.get("/brands/getAll");
      console.log(response);
      const res_Data = response.data;
      setBrandData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchBrandData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //http://194.233.87.22:1002/api/brands/post?
  // Add Brands
  const AddBrands = async (event) => {
    // toast.error("Add Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (brand_name === "") {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }
    if (!brand_name) {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/brands/post?brand_name=${brand_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Brand Created");
        fatchBrandData();
        setBrandName("");
      } else {
        toast.error("Sorry We Can't Crated New Brand");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =======================Update Requres================
  // http://194.233.87.22:1002/api/brands/updateByID?

  // Edit Brand
  const EditBrand = async (event) => {
    // toast.error("Edit Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (!id_brand) {
      toast.error("Please Selected a Row");
      return;
    }
    if (!brand_name) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/brands/updateByID?id_brand=${id_brand}&brand_name=${brand_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Brands Created");
        fatchBrandData();
        setIdBrand("");
        setBrandName("");
      } else {
        toast.error("Sorry We Can't Crated New Brands");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =====================Delete Request=====================

  // http://194.233.87.22:1002/api/brands/deleteByID?
  // Delete Color
  const DeleteBrand = async (event) => {
    // toast.error("Delete Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }
    if (!id_brand) {
      toast.error("Please Selected A Row");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/brands/deleteByID?id_brand=${id_brand}`
      );
      if (response.status === 200) {
        toast.success("Deleted Brands SuccessFully");
        fatchBrandData();
        setIdBrand("");
        setBrandName("");
      } else {
        toast.error("Sorry Can't Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_brand === item.id_brand) {
      setIdBrand("");
      setBrandName("");
      return;
    }
    setIdBrand(item.id_brand);
    setBrandName(item.brand_name);
  };

  return (
    <AdminLayout>
      <div className="container_brandpage">
        <Toaster />
        <span className="span-brand">Brands</span>
        <div className="brand_page_firstdiv">
          <div className="input_field_brand">
            <label htmlFor="">Brand</label>
            <input
              type="text"
              value={brand_name}
              onChange={(event) => setBrandName(event.target.value)}
            />
          </div>
        </div>
        <div className="brand_page_seconddiv">
          <div className="container_button_brand button_add">
            <button onClick={AddBrands}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_brand button_edit">
            <button onClick={EditBrand}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_brand button_delete">
            <button onClick={DeleteBrand}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className="brand_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Brand Id</th>
                <th>Brand Name</th>
              </tr>
            </thead>
            <tbody>
              {brandData.length > 0 &&
                brandData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_brand === item.id_brand ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_brand}</td>
                    <td>{item.brand_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Brand;
