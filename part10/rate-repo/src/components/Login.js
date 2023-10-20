import { Formik, useField } from "formik";
import { View, Button, StyleSheet } from "react-native";
import StyledTextInput from "./StyledTextInput";
import StyledText from "./StyledText";
import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .min(5, "Too short!")
    .max(100, "Too long!")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const styles = StyleSheet.create({
  form: {
    margin: 12,
  },
  error: {
    color: "red",
    marginBottom: 20,
    marginTop: -5,
    fontSize: 12,
  },
});

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <StyledTextInput
        error={meta.error}
        onChangeText={(value) => helpers.setValue(value)}
        value={field.value}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  );
};

export default function Login() {
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikInputValue placeholder="E-mail" name="email" />
            <FormikInputValue
              placeholder="Password"
              name="password"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        );
      }}
    </Formik>
  );
}
