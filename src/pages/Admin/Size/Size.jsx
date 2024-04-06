import "./Size.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
// import { HiMinusCircle } from "react-icons/hi";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const Size = () => {
  const [SizeData, setSizeData] = useState([]);
  const [id_size, setIdSize] = useState("");
  const [size_name, setSizeName] = useState("");
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // http://194.233.87.22:1002/api/sizes/getAll
  const fatchSizeData = async () => {
    try {
      const response = await axiosInstance.get("/sizes/getAll");
      console.log(response);
      const res_Data = response.data;
      setSizeData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchSizeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ============== Add Size===================
  // http://194.233.87.22:1002/api/sizes/post?

  // Add Size
  const AddSize = async (event) => {
    // toast.error("Add Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (size_name === "") {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }
    if (!size_name) {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/sizes/post?size_name=${size_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Size Created");
        fatchSizeData();
        setSizeName("");
      } else {
        toast.error("Sorry We Can't Crated New Size");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ===================Update Size======================
  //  http://194.233.87.22:1002/api/sizes/updateByID?

  // Edit Size
  const EditSize = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id_size) {
      toast.error("Please Selected a Row", { duration: 500 });
      return;
    }
    if (!size_name) {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }
    try {
      const response = await axiosInstance.put(
        `/sizes/updateByID?id_size=${id_size}&size_name=${size_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Brands Created");
        fatchSizeData();
        setIdSize("");
        setSizeName("");
      } else {
        toast.error("Sorry We Can't Crated New Brands");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =====================Delete Size=====================
  // http://194.233.87.22:1002/api/sizes/deleteByID?
  // Delete Size
  const DeleteSize = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id_size) {
      toast.error("Please Selected A Row", { duration: 500 });
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/sizes/deleteByID?id_size=${id_size}`
      );
      if (response.status === 200) {
        toast.success("Deleted Size SuccessFully", { duration: 500 });
        fatchSizeData();
        setIdSize("");
        setSizeName("");
      } else {
        toast.error("Sorry Can't Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_size === item.id_size) {
      setIdSize("");
      setSizeName("");
      return;
    }
    setIdSize(item.id_size);
    setSizeName(item.size_name);
  };

  return (
    <AdminLayout>
      <div className="container_sizepage">
        <Toaster />
        <span className="span-size">Sizes</span>
        <div className="size_page_firstdiv">
          <div className="input_field_size">
            <label htmlFor="">Size</label>
            <input
              type="text"
              value={size_name}
              onChange={(event) => setSizeName(event.target.value)}
            />
          </div>
        </div>
        <div className="size_page_seconddiv">
          <div className="container_button_size button_add">
            <button onClick={AddSize}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_size button_edit">
            <button onClick={EditSize}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_size button_delete">
            <button onClick={DeleteSize}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className="size_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Size Id</th>
                <th>Size Name</th>
              </tr>
            </thead>
            <tbody>
              {SizeData.length > 0 &&
                SizeData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_size === item.id_size ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_size}</td>
                    <td>{item.size_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Size;
