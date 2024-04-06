import { Link } from "react-router-dom";
import "./AdminSideber.css";
const AdminSidebar = () => {
  return (
    <div className="container_adminsideber">
      <div className="adminSideber">
        <Link to="/product-order">
          <div className="sidebar_link">Order</div>
        </Link>
        <Link to="/product-add">
          <div className="sidebar_link">Add Product</div>
        </Link>
        <Link to="/product-cetagory">
          <div className="sidebar_link">Cetagory</div>
        </Link>
        <Link to="/product-brand">
          <div className="sidebar_link">Brand</div>
        </Link>
        <Link to="/product-size">
          <div className="sidebar_link">Size</div>
        </Link>
        <Link to="/product-color">
          <div className="sidebar_link">Color</div>
        </Link>
        <Link to="/product-material">
          <div className="sidebar_link">Materials</div>
        </Link>
        <Link to="/product-customer">
          <div className="sidebar_link">Customers</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
