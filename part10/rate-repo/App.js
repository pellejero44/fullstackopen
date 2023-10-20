import "react-native-gesture-handler";
import Navigation from "./Navigation";
import Main from "./src/components/Main";
import { View, Text } from "react-native";

export default function App() {
  return (
    <Navigation />
    // <NativeRouter>
    //   <Main />
    // </NativeRouter>
  );
}
