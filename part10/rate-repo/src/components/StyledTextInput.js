import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  error: {
    borderColor: "#d73a4a",
  },
});

const StyledTextInput = ({ style = {}, error, ...props }) => {
  const textInputStyle = [styles.textInput, style, error && styles.error];

  return <TextInput style={textInputStyle} {...props} />;
};

export default StyledTextInput;
