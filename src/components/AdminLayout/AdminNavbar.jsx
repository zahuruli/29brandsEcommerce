import "./AdminNavbar.css";
import Logo from "../images/Login_SignUp/BrandLogo.png";
const AdminNavbar = () => {
  return (
    <div className="container_adminavber">
      <img src={Logo} alt="" className="imgclass" />
      <div className="admin_navber">Logout</div>
    </div>
  );
};

export default AdminNavbar;
