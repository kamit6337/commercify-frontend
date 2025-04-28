import Navbar from "@/containers/navbar/Navbar";
import OfflineDetector from "@/lib/OfflineDetector";
import ScrollToTop from "@/lib/ScrollToTop";
import { ToastContainer } from "react-toastify";

const RootLayout = ({ children }) => {
  return (
    <>
      <OfflineDetector />
      <div className="h-20 w-full border-b-2 sticky top-0 z-20 bg-background px-5 md:px-12">
        <Navbar />
      </div>
      {children}
      {/* <div className="h-96 w-full">
    <Footer />
  </div> */}
      <ScrollToTop />
      <ToastContainer />
    </>
  );
};

export default RootLayout;
