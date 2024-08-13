// Layout.jsx
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import { Toaster} from "react-hot-toast";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Toaster />
    </>
  );
}

export default Layout;
