/* eslint-disable react/prop-types */
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminLayout.css";
const AdminLayout = ({ children }) => {
  return (
    <div className="container_adminlayout_eocmm">
      <div className="adminlayout_ecomm_admin_nav">
        <AdminNavbar />
      </div>
      <div className="admin_layout_separator">
        <div className="adminlayout_ecomm_admin_side">
          <AdminSidebar />
        </div>
        <div className="container_adminlayout_children">
          <div className="childen_div">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
