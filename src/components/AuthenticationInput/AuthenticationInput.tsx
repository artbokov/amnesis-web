import { ErrorMessage, useField } from "formik";
import React from "react";

interface AuthetnicationInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
}

const AuthenticationInput: React.FC<AuthetnicationInputProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`${meta.error && meta.touched ? "error-input" : ""} input`}
        {...field}
        {...props}
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="input-error-message"
      />
    </div>
  );
};

export default AuthenticationInput;
