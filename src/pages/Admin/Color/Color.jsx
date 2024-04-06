import "./Color.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
// import { HiMinusCircle } from "react-icons/hi";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Color = () => {
  const [colorData, setColorData] = useState([]);
  const [color_name, setColorName] = useState("");
  const [id_color, setIdColor] = useState("");

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // http://194.233.87.22:1002/api/colors/getAll
  const fatchColorData = async () => {
    try {
      const response = await axiosInstance.get("/colors/getAll");
      console.log(response);
      const res_Data = response.data;
      setColorData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchColorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =================Add Color=========================
  // http://194.233.87.22:1002/api/colors/post?
  // Add Color
  const AddColor = async (event) => {
    // toast.error("Add Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (color_name === "") {
      toast.error("Can't leave empty field");
      return;
    }
    if (!color_name) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/colors/post?color_name=${color_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Color Created");
        setColorName("");
        fatchColorData();
      } else {
        toast.error("Sorry We Can't Crated New Color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // http://194.233.87.22:1002/api/colors/updateByID?
  // Edit Color
  const EditColor = async (event) => {
    // toast.error("Edit Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }

    if (!id_color) {
      toast.error("Please Selected a Row");
      return;
    }
    if (!color_name) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/colors/updateByID?id_color=${id_color}&color_name=${color_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Color Created");
        fatchColorData();
        setIdColor("");
        setColorName("");
      } else {
        toast.error("Sorry We Can't Crated New Color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================Delete Post==========================
  // http://194.233.87.22:1002/api/colors/deleteByID?
  // Delete Color
  const DeleteColor = async (event) => {
    // toast.error("Delete Letter", { duration: 500 });
    if (event.detail > 1) {
      return;
    }
    if (!id_color) {
      toast.error("Please Selected A Row");
      return;
    }
    try {
      console.log("id_color", id_color);
      const response = await axiosInstance.delete(
        `/colors/deleteByID?id_color=${id_color}`
      );
      console.log("id_color", id_color);
      if (response.status === 200) {
        toast.success("Deleted Color SuccessFully");
        setIdColor("");
        setColorName("");
        fatchColorData();
      } else {
        toast.error("Sorry Can't Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_color === item.id_color) {
      setIdColor("");
      setColorName("");
      return;
    }
    setIdColor(item.id_color);
    setColorName(item.color_name);
  };
  return (
    <AdminLayout>
      <div className="container_colorpage">
        <Toaster />
        <span className="span-color">Colors</span>
        <div className="color_page_firstdiv">
          <div className="input_field_color">
            <label htmlFor="">Color</label>
            <input
              type="text"
              value={color_name}
              onChange={(event) => setColorName(event.target.value)}
            />
          </div>
        </div>
        <div className="color_page_seconddiv">
          <div className="container_button_color button_add">
            <button onClick={AddColor}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_color button_edit">
            <button onClick={EditColor}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_color button_delete">
            <button onClick={DeleteColor}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className="color_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Color Id</th>
                <th>Color Name</th>
              </tr>
            </thead>
            <tbody>
              {colorData.length > 0 &&
                colorData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_color === item.id_color ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_color}</td>
                    <td>{item.color_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Color;
