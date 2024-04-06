/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./orderpage.css";
import { MdDelete } from "react-icons/md";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const OrderPage = () => {
  const [allShippingData, setAllShippingData] = useState([]);
  const [errorBorder, setErrorBorder] = useState(false);
  const [toastId, setToastId] = useState(null);
  const [cart, setCart] = useCart();
  const [language, setLanguage] = useState("");
  const [shippingCost, setShipingCost] = useState("");

  //states for transections:
  const [customer_name, setCustomerName] = useState("");
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [shipping_id, setShipingId] = useState("");
  const [invoice_no, setInvoiceNo] = useState("");

  useEffect(() => {
    if (shipping_id) {
      const cost = allShippingData.filter((s) => s.id_shipping == shipping_id);

      setShipingCost(cost[0].cost);
      console.log("cost", cost[0].cost);
    }
  }, [shipping_id]);

  useEffect(() => {
    const getAllproducts = async () => {
      try {
        const response = await axiosInstance.get("/transactionsRouter/getAll");
        const res_Data = response.data;

        const allSaleTransections = res_Data.filter(
          (p) => p.operation_type_id === 1
        );

        const invoices = allSaleTransections.filter(
          (item) => item.invoice_no !== null
        );
        invoices.sort((a, b) => b.invoice_no - a.invoice_no);
        const lastInvoice = invoices[0]?.invoice_no || 0;
        setInvoiceNo(lastInvoice + 1);
      } catch (error) {
        console.log(error);
      }
    };
    getAllproducts();
  }, []);

  const getAllShipping = async () => {
    try {
      const response = await axiosInstance.get("/shipping/getAll");
      const res_Data = response.data;
      setAllShippingData(res_Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllShipping();
  }, []);

  useEffect(() => {
    // Update session storage whenever cart state changes
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity -= 1;
    setCart(updatedCart);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDeleteProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Function to calculate total price for each item
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };
  // Function to calculate overall total price
  const calculateOverallTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += calculateItemTotal(item);
    });
    return total;
  };

  //reset Input For order save
  const resetAll = () => {
    setCustomerName("");
    setCustomerAddress("");
    setCustomerPhone("");
    setInvoiceNo("");
  };

  const handleConfirmOrder = async (e) => {
    if (e.detail > 1) {
      return;
    }
    if (
      (cart.length > 0,
      customer_name,
      customer_address,
      customer_phone,
      shipping_id)
    ) {
      //save customer:
      console.log(customer_name, customer_address, customer_phone, shipping_id);
      const customerData = {
        customer_name,
        customer_address,
        customer_phone,
        shipping_id,
      };
      const response = await axiosInstance.post(
        "/customers/post",
        customerData
      );
      const res_Data = response.data;
      if (response.status === 200) {
        console.log(res_Data.id_customer);

        //order bulk save:
        const orderData = [];
        cart.map((c) => {
          const makeData = {
            customer_id: res_Data.id_customer,
            invoice_no,
            image_id: c.Image.id_image,
            brand_id: c.Brand.id_brand,
            quantity: c.quantity,
            order_status_id: 1,
            price: c.price,
            operation_type_id: 1,
          };
          orderData.push(makeData);
        });

        if (orderData && orderData.length > 0) {
          const response = await axiosInstance.post(
            "/transactionsRouter/postTransactionFromAnyPageBulk",
            orderData,

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            sessionStorage.removeItem("cart"); // Removing cart data from session storage
            resetAll(); // Resetting input fields
            // Update session storage
            setCart([]);
          } else {
            console.log("Failed to save data");
          }

          console.log(orderData);
        }
      } else {
        setErrorBorder(true);
        setTimeout(() => {
          setErrorBorder(false);
        }, 2600);
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`One or many field is empty!`, {
          duration: 1000,
        });
        setToastId(newToastId);
        console.log("`One or many field is empty!`");
      }
    } else {
      if (cart.length == 0) {
        //toast message:
        if (toastId) {
          toast.dismiss(toastId);
        }
        const newToastId = toast.error(`cart is empty!`, {
          duration: 1000,
        });
        setToastId(newToastId);
      }
      setErrorBorder(true);
      setTimeout(() => {
        setErrorBorder(false);
      }, 2600);
    }
  };
  console.log("shipping_id", shipping_id);
  return (
    <Layout>
      <div className="container_div_ecommerce_order">
        {cart.length > 0 ? (
          <div className="order_container">
            <div className="order_from">
              <div className="hearder_text_order_secondary">
                {language ? (
                  ""
                ) : (
                  <span>
                    অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার,
                    লিখে{" "}
                    <span style={{ color: "red" }}>অর্ডার কনফার্ম করুন</span>{" "}
                    বাটনে ক্লিক করুন
                  </span>
                )}
              </div>
              <div className="container_div_form">
                <div className="input_field_ecommerce_order">
                  <label htmlFor="">আপনার নাম *</label>
                  <input
                    placeholder="আপনার নাম লিখুন  "
                    value={customer_name}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={
                      errorBorder && !customer_name ? "errorBorder" : ""
                    }
                  />
                </div>
                <div className="input_field_ecommerce_order">
                  <label htmlFor="">আপনার ঠিকানা *</label>
                  <input
                    placeholder="আপনার ঠিকানা লিখুন "
                    value={customer_address}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className={
                      errorBorder && !customer_address ? " errorBorder" : ""
                    }
                  />
                </div>
                <div className="input_field_ecommerce_order">
                  <label htmlFor="">আপনার মোবাইল *</label>
                  <input
                    placeholder="আপনার মোবাইল নাম্বার দিন"
                    value={customer_phone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={
                      errorBorder && !customer_phone ? " errorBorder" : ""
                    }
                  />
                </div>
                <div className="input_field_ecommerce_order">
                  <label htmlFor="">Shipping Area *</label>
                  <select
                    value={shipping_id}
                    onChange={(e) => setShipingId(e.target.value)}
                    className={errorBorder && !shipping_id ? "errorBorder" : ""}
                  >
                    <option value="">শিপিং এরিয়া সিলেক্ট করুন</option>{" "}
                    {allShippingData &&
                      allShippingData.length > 0 &&
                      allShippingData.map((data) => (
                        <option value={data.id_shipping} key={data.id_shipping}>
                          {data.id_shipping == 1
                            ? "ঢাকার ভিতরে"
                            : "ঢাকার বাহীরে"}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="button_field_ecommerce_order">
                  <button onClick={(e) => handleConfirmOrder(e)}>
                    অর্ডার কনফার্ম করুন
                  </button>
                </div>
              </div>
            </div>
            <div className="order_quantity_other">
              <div className="hearder_text_order">আপনার অর্ডার</div>
              <div className="container_table_order">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <div className="order_button"></div>
                  <tbody>
                    {cart &&
                      cart.length > 0 &&
                      cart.map((c, index) => (
                        <tr key={c.id}>
                          <td>
                            <div className="action_button_order">
                              <button
                                onClick={() => handleDeleteProduct(index)}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                          <td>
                            {c.Image.ProductTrace.product_name.substring(0, 15)}
                          </td>
                          <td className="orderitem">
                            <span className="order_text_tarsiary">ট </span>
                            <span>{c.price}</span>
                          </td>
                          <td>
                            <div className="order_quantity">
                              <button
                                onClick={() => handleDecreaseQuantity(index)}
                                disabled={c.quantity === 0}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={c.quantity}
                                readOnly
                              />
                              <button
                                onClick={() => handleIncreaseQuantity(index)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="orderitem">
                            <span className="order_text_tarsiary">ট </span>
                            <span>{c.price * c.quantity}</span>
                          </td>
                        </tr>
                      ))}

                    <div className="order_py"></div>
                    <tr>
                      <td>Sub Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="orderitem">
                        <span className="order_text_tarsiary">ট </span>{" "}
                        <span>{calculateOverallTotal()}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="orderitem">(+) Shipping</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="orderitem">
                        <span className="order_text_tarsiary">ট </span>{" "}
                        <span>{shippingCost}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="orderitem">
                        {" "}
                        <span className="order_text_tarsiary">ট</span>{" "}
                        <span>{calculateOverallTotal() + shippingCost}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="container_footer_order">
                <table>
                  <td></td>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty_card_div">
            <h4>There are no items in this cart! please select first.</h4>
            <Link to={"/"}>
              <button className="contine_button">Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </Layout>
  );
};

export default OrderPage;
