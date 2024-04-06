import { useState, useEffect } from "react";
import "./Order.css";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import UpdatePng from "./loading-arrow.png";
const Order = () => {

  const [selectedOption, setSelectedOption] = useState("");
  const [orderStatus, setOrderStatus] = useState([]);
  const [transtionData, setTranstionData] = useState([]);
  const [Selected_invoice_no, setInVoice] = useState("");
  const [orderDetails, SetOrderDetails] = useState([]);
  const [oprationTypeId, setOprationTypeId] = useState("");
  const [uniqueInvoice, setUniqueInvoice] = useState([]);
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // http://194.233.87.22:1002/api/orderstatus/getAll
  const fatchOrderStatusData = async () => {
    try {
      const response = await axiosInstance.get("/orderstatus/getAll");
      console.log(response);
      const res_Data = response.data;
      setOrderStatus(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  // http://194.233.87.22:1002/api/transactionsRouter/getAll
  const FatchTranscationData = async () => {
    try {
      const response = await axiosInstance.get("/transactionsRouter/getAll");
      const res_Data = response.data;
      const FilterSaleData = res_Data.filter(
        (item) => item.OperationType?.operation_name === "Sale"
      );
      console.log(FilterSaleData);
      const uniqueInvoiceNumbers = [...new Set(FilterSaleData.map(item => item.invoice_no))];
      setUniqueInvoice(uniqueInvoiceNumbers);
      console.log(uniqueInvoiceNumbers);
      setTranstionData([...new Set(FilterSaleData)]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // localStorage.setItem("selectedOption", selectedOption);
    fatchOrderStatusData();
    FatchTranscationData();
  }, []);

  

  // ==========================Update Invoice Order Status============================
  // http://194.233.87.22:1002/api/transactionsRouter/updateTransactionOrderStatusByInvoiceNo?order_status_id=6&operation_type_id=1&invoice_no=2
 
    const UpdateTranscationInvoice = async () => {
     
      try {
        const InvoiceStatusUpdate = await axiosInstance.put(`/transactionsRouter/updateTransactionOrderStatusByInvoiceNo?order_status_id=${selectedOption}&operation_type_id=${oprationTypeId}&invoice_no=${Selected_invoice_no}`);

        if(InvoiceStatusUpdate.status === 200){
          toast.success("Successfully Updated")
          FatchTranscationData();
          setSelectedOption("");
        }
        
      } catch (error) {
        console.log(error);
      }
    };
  
// ==================Invoice Search=======================
const [selectedInvoice, setSelectedInvoice] = useState("")
const InvoiceSearch = ()=>{
  if (!selectedInvoice || typeof selectedInvoice !== "string") {
    toast.error("Can't Search Empty");
    return;
  }
    const data = uniqueInvoice.filter((item) => item.invoice_no === selectedInvoice);
    if (data.length === 0) {
      toast.error("Input data not valid");
    }
    setTranstionData(data);
    setSelectedInvoice("");
    // setButtonVisible(true);
}  


  const handleInvoiceNumberOnTable = (invoiceNo,uniqueItem) => {
    console.log(invoiceNo);
    setInVoice(invoiceNo);
    console.log(selectedOption);
    setOprationTypeId(uniqueItem.operation_type_id);
    console.log("oprationTypeId",oprationTypeId);
    const data = transtionData.filter((item) => item.invoice_no === invoiceNo);
    console.log("data", data);
    SetOrderDetails(data);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  

 
  const getColorForStatus = (statusName) => {
    switch (statusName) {
      case 'Pending':
        return 'PendingColor';
      case 'Completed':
        return 'CompletedColor'; 
      case 'Processing':
        return 'ProcessingColor';
      case 'Ready-To-Shift':
        return 'Ready-To-ShiftColor'
      case 'Shifted':
        return 'ShiftedColor';
      case 'Delivered':
        return 'DeliveredColor';
      case 'Canceled':
        return 'CanceledColor';
      default:
        return ''; // Default color or CSS class
    }
  };

  // const TotalQauntity = orderDetails.reduce()

  const TotalQauntity =
  orderDetails && orderDetails.length > 0
      ? orderDetails
          .reduce((productQuantity, item) => {
            if (
              item.quantity !== undefined &&
              item.quantity !== null &&
              item.quantity !== ""
            ) {
              productQuantity += Number(item.quantity);
            }
            return productQuantity;
          }, 0)
      : 0;

      const TotalAmount =
  orderDetails && orderDetails.length > 0
      ? orderDetails
          .reduce((productPrice, item) => {
            if (
              item.price !== undefined &&
              item.price !== null &&
              item.price !== ""
            ) {
              productPrice += Number(item.price);
            }
            return productPrice;
          }, 0)
      : 0;

  return (
    <AdminLayout>
      <div className="order_wrapper">
        <ToastContainer/>
        <div className="order_text effecttop">Customer Order</div>

        {/* ======================product_search_div================== */}

        <div className="order_search effecttop">
          <input type="text" onChange={(event)=>setSelectedInvoice(event.target.value)} list="invoice"/>
          <datalist id="invoice">
            {
             uniqueInvoice && uniqueInvoice.map((item, index)=>{
                return <option key={index}>
                  {item.invoice_no}
                </option>
              })
            }
          </datalist>
          <button onClick={InvoiceSearch}>search</button>
        </div>

        <div className="order_table_wrapper effecttop">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Customer Address</th>
                <th>Order Status</th>
                <th>Action Status</th>
                <th>Action Update</th>
              </tr>
            </thead>
            <tbody>
              {transtionData.length > 0 &&
                Array.from(
                  new Set(transtionData.map((item) => item.invoice_no))
                )
                  .reverse() // Reverse the array of unique invoice numbers
                  .map((invoiceNo) => {
                    const uniqueItem = transtionData.find(
                      (item) => item.invoice_no === invoiceNo
                    );
                    return (
                      <tr
                        key={uniqueItem.transaction_id}
                        onClick={() =>
                          handleInvoiceNumberOnTable(uniqueItem.invoice_no,uniqueItem)
                        }
                        className={
                          Selected_invoice_no === uniqueItem.invoice_no
                            ? "selected"
                            : "rows"
                        }
                      >
                        <td>{uniqueItem.invoice_no}</td>
                        <td>{uniqueItem.Customer?.customer_name}</td>
                        <td>{uniqueItem.Customer?.customer_address}</td>
                        <td>{uniqueItem.Customer?.customer_phone}</td>
                        <td className={getColorForStatus(uniqueItem.OrderStatus?.order_status_name)}>{uniqueItem.OrderStatus?.order_status_name}</td>
                        <td className="order_status_button">
                          <select
                            value={
                              selectedOption &&
                              uniqueItem.invoice_no === Selected_invoice_no
                                ? selectedOption
                                : uniqueItem.OrderStatus?.order_status_name
                            }
                            onChange={handleChange}
                          >
                            <option>Change Action</option>
                            {orderStatus.map((status) => (
                              <option key={status.id_order_status} value={status.id_order_status}>
                                {status.order_status_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="order_status_update_button">
                          <button onClick={UpdateTranscationInvoice}><img src={UpdatePng} alt="" /></button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        <div className="order_text effectbottom">Product Details</div>

        <div className="order_table_wrapper effectbottom">
          <table>
            <thead>
              <tr>
                <th>SI</th>
                <th>Product Name</th>
                <th>Cetagory</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Materials</th>
                <th>Color</th>
                <th>Price</th>
                <th>Item Quantity</th>
                <th>Item Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.length > 0 &&
                orderDetails.map((item, index) => (
                  <tr
                    key={index}
                    // key={item.transaction_id}
                  >
                    <td>{index + 1}</td>
                    <td>{item.Image?.ProductTrace?.product_name}</td>
                    <td>{item.Image?.ProductTrace?.Category?.category_name}</td>
                    <td>{item.Brand?.brand_name}</td>
                    <td>{item.Image?.ProductTrace?.Size?.size_name}</td>
                    <td>{item.Image?.ProductTrace?.Material?.material_name}</td>
                    <td>{item.Image?.ProductTrace?.Color?.color_name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{parseInt(item.price) * parseInt(item.quantity)}</td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="input_field_item_order">
          <div className="input_field_order">
            <label htmlFor="">Item Quantity</label>
            <input type="number" value={TotalQauntity} disabled/>
          </div>
          <div className="input_field_order">
            <label htmlFor="">Item Total</label>
            <input type="number" value={TotalAmount}  disabled/>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Order;
