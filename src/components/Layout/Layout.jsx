/* eslint-disable react/prop-types */
import style from "./layout.module.css";
import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
const Layout = ({
  children,
  productCategorySearch,
  productNameSearch,
  getAllproducts,
  handleSearchStatusFalse,
}) => {
  return (
    <div className={style.layout}>
      <div className={style.navbar}>
        <Navbar
          productCategorySearch={productCategorySearch}
          productNameSearch={productNameSearch}
          getAllproducts={getAllproducts}
          handleSearchStatusFalse={handleSearchStatusFalse}
        />
      </div>
      <div className={style.layoutBody}>{children}</div>
      {/* <div className={style.footer}>
        <Footer />
      </div> */}
    </div>
  );
};

export default Layout;
