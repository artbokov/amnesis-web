import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";
import { useEffect } from "react";

const AuthLayout = () => {
    useEffect(() => {
        document.getElementById("body")!.style.backgroundColor = "#00153F";
    }, []);

    return (
        <div className={classes["wrapper"]}>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
