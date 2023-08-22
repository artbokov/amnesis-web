import { RouteObject, useRoutes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../../layouts";
import routes from "./routes";
import { useAuthentication } from "../../contexts/AuthContext";

const App = () => {
    const { user } = useAuthentication();

    const element: RouteObject[] = [
        {
            element: <AuthLayout />,
            children: routes.filter(
                (i) => i.layout === "auth" && (user || !i.isPrivate)
            ),
        },
        {
            element: <MainLayout />,
            children: routes.filter(
                (i) => i.layout === "main" && (user || !i.isPrivate)
            ),
        },
    ];
    return useRoutes(element);
};

export default App;
