import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = (props: any) => {
  return <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>;
};

export default Layout;