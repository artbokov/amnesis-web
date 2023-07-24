import { RouteObject, useRoutes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../../layouts";
import routes from "./routes";
import { useState } from "react";

const publicRoutes = (isAuthorized: boolean) => {
  if (isAuthorized) {
    return routes.filter((i) => !i.isPrivate && i.path != "/");
  }
  return routes.filter((i) => !i.isPrivate);
};

const privateRoutes = (isAuthorized: boolean) => {
  if (isAuthorized) {
    return routes.filter((i) => i.isPrivate);
  }
  return [];
};

const App = () => {
  const [isAuth, setIsAuth] = useState(true);

  const element: RouteObject[] = [
    {
      element: <AuthLayout />,
      children: publicRoutes(isAuth),
    },
    {
      element: <MainLayout />,
      children: privateRoutes(isAuth),
    },
  ];
  return useRoutes(element);
};

export default App;
