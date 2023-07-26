import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthentication } from '../../contexts/UserContext';
import { AuthenticationInput, Button } from '../../components';

const LoginSchema = Yup.object().shape({
  login: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required")
});

const LoginPage: React.FC = () => {
  const { isLoading, signin } = useAuthentication();

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <Formik
      initialValues={{
        login: "",
        password: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={value => {
        signin(value);
      }}
    >
      {({ submitForm }) => (
        <Form>
          <AuthenticationInput name='login' label='Login' />
          <AuthenticationInput name='password' label='Password' />
          <Button onClick={submitForm} text='Submit' />
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default LoginPage;
