import * as yup from "yup";
import { useAuthentication } from "../../contexts/AuthContext";
import { UserData } from "../../api/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormPage from "../FormPage/FormPage";
import { NavigationLink } from "../../components";

const validationSchema = yup.object({
    surname: yup.string().required("Surname is required"),
    name: yup.string().required("Name is required"),
    patronymic: yup.string(),
    email: yup
        .string()
        .email("Enter valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Email is required"),
    passwordRepeat: yup
        .string()
        .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
        }),
});

const RegisterPage: React.FC = () => {
    const { signUp } = useAuthentication();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (data: UserData) => {
        setIsLoading(true);
        signUp(data)
            .then(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    };

    return (
        <FormPage
            pageTitle="Регистрация"
            submitButtonTitle="Зарегистрироваться"
            validationSchema={validationSchema}
            fields={[
                {
                    name: "surname",
                    type: "text",
                    label: "Фамилия",
                },
                {
                    name: "name",
                    type: "text",
                    label: "Имя",
                },
                {
                    name: "patronymic",
                    type: "text",
                    label: "Отчество",
                },
                {
                    name: "email",
                    type: "email",
                    label: "E-mail",
                },
                {
                    name: "password",
                    type: "password",
                    label: "Пароль",
                },
                {
                    name: "passwordRepeat",
                    type: "password",
                    label: "Повторите пароль",
                },
            ]}
            handleFormSubmit={handleSubmit}
            isLoading={isLoading}
            endNoteContainer={
                <>
                    Уже есть аккаунт?
                    <br />
                    <NavigationLink
                        text="Войти"
                        navigateTo="/login"
                        optionalStyles={["no-hover", "underline", "inline"]}
                    />
                </>
            }
        />
    );
};

export default RegisterPage;
