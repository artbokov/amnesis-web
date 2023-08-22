import * as yup from "yup";
import { useAuthentication } from "../../contexts/AuthContext";
import { UserCredentials } from "../../api/types";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormPage from "../FormPage/FormPage";
import { NavigationLink } from "../../components";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
    const { signIn } = useAuthentication();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (credentials: UserCredentials) => {
        setIsLoading(true);
        signIn(credentials)
            .then(() => navigate("/info"))
            .finally(() => setIsLoading(false));
    };

    if (localStorage.getItem("access_token")) {
        return <Navigate to="/chat" />;
    }

    return (
        <FormPage
            pageTitle="Войти"
            submitButtonTitle="Вход"
            validationSchema={validationSchema}
            fields={[
                {
                    name: "email",
                    type: "email",
                },
                {
                    name: "password",
                    type: "password",
                    endBlockContainer: (
                        <NavigationLink
                            text="Забыли пароль?"
                            navigateTo="/password-reset"
                            optionalStyles={["underline", "no-hover", "inline"]}
                        />
                    ),
                },
            ]}
            handleFormSubmit={handleSubmit}
            isLoading={isLoading}
            endNoteContainer={
                <>
                    Если у вас ещё нет учётной записи, перейдите по ссылке ниже:
                    <br />
                    <NavigationLink
                        text="Регистрация"
                        navigateTo="/register"
                        optionalStyles={["no-hover", "underline", "inline"]}
                    />
                </>
            }
        />
    );
};

export default LoginPage;
