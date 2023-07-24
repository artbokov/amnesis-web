import { Navigate, NonIndexRouteObject } from "react-router-dom";
import InfoPage from "../InfoPage/InfoPage";
import ChatPage from "../ChatPage/ChatPage";
import SupportPage from "../SupportPage/SupportPage";

interface Route extends NonIndexRouteObject {
  isPrivate?: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <></>,
  },
  {
    path: "/register",
    element: <></>,
  },
  {
    path: "/",
    element: <Navigate to="/info" />,
    isPrivate: true,
  },
  {
    path: "/info",
    element: <InfoPage />,
    isPrivate: true,
  },
  {
    path: "/chat",
    element: <ChatPage />,
    isPrivate: true,
  },
  {
    path: "/support",
    element: <SupportPage />,
    isPrivate: true,
  },
];

export default routes;
