import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { useEffect } from "react";

const MainLayout = () => {
    useEffect(() => {
        document.getElementById("body")!.style.backgroundColor = "#FFF";
    }, []);

    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
};

export default MainLayout;
