import "./Material.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
const Material = () => {
  const [MaterialData, setMaterialData] = useState([]);
  const [id_material, setIdMaterial] = useState("");
  const [material_name, setMaterialName] = useState("");
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  // http://194.233.87.22:1002/api/materials/getAll

  const fatchMaterialData = async () => {
    try {
      const response = await axiosInstance.get("/materials/getAll");
      console.log(response);
      const res_Data = response.data;
      setMaterialData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchMaterialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  ===================== Add Material===========================
  // http://194.233.87.22:1002/api/materials/post?

  const AddMaterial = async (event) => {
    if (event.detail > 1) {
      return;
    }

    if (!material_name) {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/materials/post?material_name=${material_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Material Created");
        fatchMaterialData();
        setMaterialName("");
      } else {
        toast.error("Sorry We Can't Crated New Material");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============================= Material Updated====================

  // http://194.233.87.22:1002/api/materials/updateByID?

  const EditMaterial = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id_material) {
      toast.error("Please Selected a Row", { duration: 500 });
      return;
    }
    if (!material_name) {
      toast.error("Can't leave empty field", { duration: 500 });
      return;
    }
    try {
      const response = await axiosInstance.put(
        `/materials/updateByID?id_material=${id_material}&material_name=${material_name}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Material Created");
        fatchMaterialData();
        setIdMaterial("");
        setMaterialName("");
      } else {
        toast.error("Sorry We Can't Created New Material");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============================Delete Material=================
  //http://194.233.87.22:1002/api/materials/deleteByID?
  const DeleteMaterial = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id_material) {
      toast.error("Please Selected A Row", { duration: 500 });
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/materials/deleteByID?id_material=${id_material}`
      );
      if (response.status === 200) {
        toast.success("Deleted Materital SuccessFully", { duration: 500 });
        fatchMaterialData();
        setIdMaterial("");
        setMaterialName("");
      } else {
        toast.error("Sorry Can't Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_material === item.id_material) {
      setIdMaterial("");
      setMaterialName("");
      return;
    }
    setIdMaterial(item.id_material);
    setMaterialName(item.material_name);
  };
  return (
    <AdminLayout>
      <div className="container_materialpage">
        <Toaster />
        <span className="span-material">Materials</span>
        <div className="material_page_firstdiv">
          <div className="input_field_material">
            <label htmlFor="">Material</label>
            <input
              type="text"
              value={material_name}
              onChange={(event) => setMaterialName(event.target.value)}
            />
          </div>
        </div>
        <div className="material_page_seconddiv">
          <div className="container_button_material button_add">
            <button onClick={AddMaterial}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_material button_edit">
            <button onClick={EditMaterial}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_material button_delete">
            <button onClick={DeleteMaterial}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className="material_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Cetagory Id</th>
                <th>Cetagory Name</th>
              </tr>
            </thead>
            <tbody>
              {MaterialData.length > 0 &&
                MaterialData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_material === item.id_material ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_material}</td>
                    <td>{item.material_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Material;
