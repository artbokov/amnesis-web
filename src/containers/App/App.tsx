import { RouteObject, useRoutes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../../layouts";
import routes from "./routes";
import { useAuthentication } from "../../contexts/AuthContext";

const App = () => {
    const authContext = useAuthentication();

    const element: RouteObject[] = [
        {
            element: <AuthLayout />,
            children: !authContext.user
                ? routes.filter((i) => !i.isPrivate)
                : undefined,
        },
        {
            element: <MainLayout />,
            children: authContext.user
                ? routes.filter((i) => i.isPrivate)
                : undefined,
        },
    ];
    return useRoutes(element);
};

export default App;
