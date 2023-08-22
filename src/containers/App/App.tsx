import { RouteObject, useRoutes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../../layouts";
import routes from "./routes";

const App = () => {
    const element: RouteObject[] = [
        {
            element: <AuthLayout />,
            children: routes.filter(
                (i) =>
                    i.layout === "auth" &&
                    (localStorage.getItem("access_token") || !i.isPrivate)
            ),
        },
        {
            element: <MainLayout />,
            children: routes.filter(
                (i) =>
                    i.layout === "main" &&
                    (localStorage.getItem("access_token") || !i.isPrivate)
            ),
        },
    ];
    return useRoutes(element);
};

export default App;
