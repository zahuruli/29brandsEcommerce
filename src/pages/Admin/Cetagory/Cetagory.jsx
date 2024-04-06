import "./Cetagory.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Cetagory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [category_name, setCategoryName] = useState("");
  const [id_category, setIdCategory] = useState("");
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const fatchCategoryData = async () => {
    try {
      const response = await axiosInstance.get("/categorys/getAll");
      console.log(response);
      const res_Data = response.data;
      setCategoryData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  // http://194.233.87.22:1002/api/categorys/getAll
  useEffect(() => {
    fatchCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =================Add Category=========================
  // http://194.233.87.22:1002/api/categorys/post?
  // Add Category
  const AddCategory = async (event) => {
    if (event.detail > 1) {
      return;
    }

    if (category_name === "") {
      toast.error("Can't leave empty field");
      return;
    }
    if (!category_name) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/categorys/post?category_name=${category_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Color Created");
        setCategoryName("");
        fatchCategoryData();
      } else {
        toast.error("Sorry We Can't Crated New Color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // http://194.233.87.22:1002/api/categorys/updateByID?
  // Edit Color
  const EditCategory = async (event) => {
    // toast.error("Edit Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (!id_category) {
      toast.error("Please Selected a Row");
      return;
    }
    if (!category_name) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/categorys/updateByID?id_category=${id_category}&category_name=${category_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Color Created");
        fatchCategoryData();
        setIdCategory("");
        setCategoryName("");
      } else {
        toast.error("Sorry We Can't Crated New Color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================Delete Post==========================
  // http://194.233.87.22:1002/api/categorys/deleteByID?
  // Delete Color
  const DeleteCategory = async (event) => {
    // toast.error("Delete Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }
    if (!id_category) {
      toast.warning("Please Selected A Row");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/categorys/deleteByID?id_category=${id_category}`
      );
      if (response.status === 200) {
        toast.success("Deleted Color SuccessFully");
        fatchCategoryData();
        setIdCategory("");
        setCategoryName("");
      } else {
        toast.error("Sorry Can't Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_category === item.id_category) {
      setIdCategory("");
      setCategoryName("");
      return;
    }
    setIdCategory(item.id_category);
    setCategoryName(item.category_name);
  };
  return (
    <AdminLayout>
      <div className="container_orderpage">
        <Toaster />
        <span className="span-cetagory">Cetagories</span>

        {/* ======================firstdiv================== */}
        <div className="order_page_firstdiv">
          <div className="input_field_cetagorys">
            <label htmlFor="">Cetagory</label>
            <input
              type="text"
              value={category_name}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </div>
        </div>

        {/* ======================seconddiv================== */}

        <div className="order_page_seconddiv">
          <div className="container_button_cetagory button_add">
            <button onClick={AddCategory}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_cetagory button_edit">
            <button onClick={EditCategory}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_cetagory button_delete">
            <button onClick={DeleteCategory}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>

        {/* ======================thirddiv================== */}
        <div className="order_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Cetagory Id</th>
                <th>Cetagory Name</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.length > 0 &&
                categoryData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_category === item.id_category ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_category}</td>
                    <td>{item.category_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Cetagory;
