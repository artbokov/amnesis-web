import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
