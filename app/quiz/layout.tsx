import Header from "../header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default Layout;
