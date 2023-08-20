import { Form, Formik } from "formik";
import { FormInput, Button, NavigationLink } from "../../components";
import classes from "./styles.module.scss";
import { CircularProgress } from "@mui/material";

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

interface FormPageProps<T extends string> {
    pageTitle: string;
    submitButtonTitle: string;
    validationSchema: object;
    fields: {
        name: T;
        type: string;
        endBlockContainer?: React.ReactNode;
    }[];
    handleFormSubmit: (formData: Record<T, string>) => void;
    isLoading: boolean;
    endNoteContainer?: React.ReactNode;
}

function FormPage<T extends string>({
    pageTitle,
    submitButtonTitle,
    validationSchema,
    fields,
    handleFormSubmit,
    isLoading,
    endNoteContainer,
}: FormPageProps<T>) {
    return isLoading ? (
        <CircularProgress />
    ) : (
        <Formik
            initialValues={
                fields.reduce(
                    (accumulator, current) => ({
                        ...accumulator,
                        [current.name]: "",
                    }),
                    {}
                ) as Record<T, string>
            }
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ submitForm, errors }) => (
                <>
                    <Form className={classes["form-wrapper"]}>
                        <div className={classes["page-title"]}>{pageTitle}</div>
                        {fields.map((field) => (
                            <FormInput
                                type={field.type}
                                name={field.name}
                                label={capitalize(field.name)}
                                error={Boolean(errors[field.name])}
                                endBlockContainer={field.endBlockContainer}
                            />
                        ))}
                        <Button
                            label={submitButtonTitle}
                            color="bg-blue"
                            optionalStyles={["round"]}
                            onClick={submitForm}
                        />
                        <span className={classes["end-note"]}>
                            {endNoteContainer}
                        </span>
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default FormPage;
