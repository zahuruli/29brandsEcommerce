import "./Customer.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import { MdAddCircle } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [id_customer, setIdCustomer] = useState([]);
  const [customer_name, setCustomerName] = useState("");
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  // http://194.233.87.22:1002/api/customers/getAll
  const fatchCustomerData = async () => {
    try {
      const response = await axiosInstance.get("/customers/getAll");
      console.log(response);
      const res_Data = response.data;
      setCustomerData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchCustomerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =================Add Request=====================
  // http://194.233.87.22:1002/api/customers/post?
  // Add Customer
  const AddCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!customer_name && !customer_phone && !customer_address) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/customers/post?customer_name=${customer_name}&customer_address=${customer_address}&customer_phone=${customer_phone}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Customer Created");
        setCustomerAddress("");
        setCustomerName("");
        setCustomerPhone("");
        setIdCustomer("");
        fatchCustomerData();
      } else {
        toast.error("Sorry We Can't Crated New Customer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===================Update Request==================
  //http://194.233.87.22:1002/api/customers/updateByID?

  // Edit Customer
  const EditCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }

    if (!id_customer) {
      toast.error("Please Selected a Row");
      return;
    }
    if (!customer_name && !customer_phone && !customer_address) {
      toast.error("Can't leave empty field");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/customers/updateByID?id_customer=${id_customer}&customer_name=${customer_name}&customer_address=${customer_address}&customer_phone=${customer_phone}`
      );
      if (response.status === 200) {
        toast.success("SuccessFully Customer Updated");
        setCustomerAddress("");
        setCustomerName("");
        setCustomerPhone("");
        setIdCustomer("");
        fatchCustomerData();
      } else {
        toast.error("Sorry We Can't Customer");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================Delete Request==========================
  //http://194.233.87.22:1002/api/customers/deleteByID?
  // Delete Customer
  const DeleteCustomer = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (!id_customer) {
      toast.warning("Please Selected A Row");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/customers/deleteByID?id_customer=${id_customer}`
      );

      if (response.status === 200) {
        toast.success("Deleted Customer SuccessFully");
        setCustomerAddress("");
        setCustomerName("");
        setCustomerPhone("");
        setIdCustomer("");
        fatchCustomerData();
      } else {
        toast.error("Sorry Can't Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== Handel Input Data ================

  const HandelDataOnInputField = (item) => {
    if (id_customer === item.id_customer) {
      setIdCustomer("");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      return;
    }
    setIdCustomer(item.id_customer);
    setCustomerAddress(item.customer_address);
    setCustomerPhone(item.customer_phone);
    setCustomerName(item.customer_name);
  };
  return (
    <AdminLayout>
      <div className="container_customerpage">
        <Toaster />
        <span className="span-customer">Customers</span>
        <div className="customer_page_firstdiv">
          <div className="input_field_customer">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={customer_name}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <div className="input_field_customer">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              value={customer_phone}
              onChange={(event) => setCustomerPhone(event.target.value)}
            />
          </div>
          <div className="input_field_customer">
            <label htmlFor="">Address</label>
            <input
              type="text"
              value={customer_address}
              onChange={(event) => setCustomerAddress(event.target.value)}
            />
          </div>
        </div>
        <div className="customer_page_seconddiv">
          <div className="container_button_customer button_add">
            <button onClick={AddCustomer}>
              <MdAddCircle />
            </button>
            <span>Add</span>
          </div>
          <div className="container_button_customer button_edit">
            <button onClick={EditCustomer}>
              <MdEditSquare />
            </button>
            <span>Edit</span>
          </div>
          <div className="container_button_customer button_delete">
            <button onClick={DeleteCustomer}>
              <MdDeleteForever />
            </button>
            <span>Delete</span>
          </div>
        </div>
        <div className="customer_page_thirddiv">
          <table>
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customerData.length > 0 &&
                customerData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => HandelDataOnInputField(item)}
                    className={
                      id_customer === item.id_customer ? "selectedData" : "data"
                    }
                    // tabindex="0"
                  >
                    <td>{item.id_customer}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.customer_phone}</td>
                    <td>{item.customer_address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customer;
