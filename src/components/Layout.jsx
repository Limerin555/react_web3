// import { useLocation, useHistory } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";

const Layout = () => {
  // const history = useHistory();
  // const location = useLocation();

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default Layout
