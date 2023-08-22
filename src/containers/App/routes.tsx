import { Navigate, NonIndexRouteObject } from "react-router-dom";
import InfoPage from "../InfoPage/InfoPage";
import ChatPage from "../ChatPage/ChatPage";
import SupportPage from "../SupportPage/SupportPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import PasswordResetPage from "../PasswordResetPage/PasswordResetPage";
import LoginPage from "../LoginPage/LoginPage";
import VerifyEmailPage from "../VerifyEmailPage/VerifyEmailPage";
import { NavigationLink } from "../../components";

interface Route extends NonIndexRouteObject {
    isPrivate?: boolean;
    layout: "auth" | "main";
}

const routes: Route[] = [
    {
        path: "/login",
        element: <LoginPage />,
        layout: "auth",
    },
    {
        path: "/register",
        element: <RegisterPage />,
        layout: "auth",
    },
    {
        path: "/email-verification",
        element: (
            <div
                style={{
                    textAlign: "center",
                    color: "white",
                    maxWidth: "500px",
                }}
            >
                На вашу почту было отправлено было отправлено письмо для
                подтверждения почты. Если вы не получили письмо, пожалуйста,
                свяжитесь с администрацией: support@oncoanalitika.com <br />
                <NavigationLink
                    text="На страницу входа"
                    navigateTo="/login"
                    optionalStyles={["no-hover", "underline", "inline"]}
                />
            </div>
        ),
        layout: "auth",
    },
    {
        path: "/verify-email/:tokenId",
        element: <VerifyEmailPage />,
        layout: "auth",
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />,
        layout: "auth",
    },
    {
        path: "/info",
        element: <InfoPage />,
        // isPrivate: true,
        layout: "main",
    },
    {
        path: "/chat",
        element: <ChatPage />,
        isPrivate: true,
        layout: "main",
    },
    {
        path: "/support",
        element: <SupportPage />,
        // isPrivate: true,
        layout: "main",
    },
    {
        path: "*",
        element: <Navigate to="/info" />,
        // isPrivate: true,
        layout: "main",
    },
];

export default routes;
