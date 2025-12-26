import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <section style={{ minHeight: "80vh" }}>
        {children}
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;
