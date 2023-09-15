import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <ToastContainer />
      {children}
    </section>
  );
};

export default Layout;
