import { Navigate, NonIndexRouteObject } from "react-router-dom";
import InfoPage from "../InfoPage/InfoPage";
import ChatPage from "../ChatPage/ChatPage";
import SupportPage from "../SupportPage/SupportPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import PasswordResetPage from "../PasswordResetPage/PasswordResetPage";
import LoginPage from "../LoginPage/LoginPage";

interface Route extends NonIndexRouteObject {
    isPrivate?: boolean;
}

const routes: Route[] = [
    {
        path: "*",
        element: <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />,
    },
    {
        path: "*",
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
