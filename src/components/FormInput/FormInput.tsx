import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import classes from "./style.module.scss";

interface FormInputProps {
    type?: React.HTMLInputTypeAttribute;
    name: string;
    label: string;
    error: boolean;
    endBlockContainer?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
    type = "text",
    name,
    label,
    error,
    endBlockContainer,
}) => {
    const [field, _] = useField(name);

    return (
        <div className={classes["form-input"]}>
            <TextField
                type={type}
                label={label}
                variant="filled"
                error={error}
                fullWidth
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                }}
                {...field}
            />
            {endBlockContainer ? (
                <div className={classes["end-block"]}>{endBlockContainer}</div>
            ) : null}
        </div>
    );
};

export default FormInput;
