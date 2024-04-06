import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ProductDetatil from "./pages/detailpage/ProductDetail";
import OrderPage from "./pages/orderpage/OrderPage";
import LoginPage from "./pages/Authentication/LoginPage.jsx";
import SignUp from "./pages/Authentication/SignUp.jsx";

import { Toaster } from "react-hot-toast";

import Cetagory from "./pages/Admin/Cetagory/Cetagory.jsx";
import Brand from "./pages/Admin/Brand/Brand.jsx";
import Size from "./pages/Admin/Size/Size.jsx";
import Color from "./pages/Admin/Color/Color.jsx";
import Material from "./pages/Admin/Material/Material.jsx";
import Customer from "./pages/Admin/Customer/Customer.jsx";
import Order from "./pages/Admin/Order/Order.jsx";
import AddProduct from "./pages/Admin/AddProduct/AddProduct.jsx";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/productdetails/:id" element={<ProductDetatil />} />
          <Route path="/cart" element={<OrderPage />} />

          {/* //admin routes */}
          <Route path="/product-cetagory" element={<Cetagory />} />
          <Route path="/product-brand" element={<Brand />} />
          <Route path="/product-size" element={<Size />} />
          <Route path="/product-color" element={<Color />} />
          <Route path="/product-material" element={<Material />} />
          <Route path="/product-customer" element={<Customer />} />
          <Route path="/product-order" element={<Order />} />
          <Route path="/product-add" element={<AddProduct />} />
          <Route path="/checkout/:id" element={<OrderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
