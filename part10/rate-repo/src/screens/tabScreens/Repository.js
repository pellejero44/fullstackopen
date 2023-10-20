import "react-native-gesture-handler";
import { SafeAreaView, Pressable, Image } from "react-native";
import RepositoryList from "../../components/RepositoryList";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export default function Repository() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../assets/icon-deadpool.png")}
            style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
          />
        </Pressable>
      ),
    });
  }, []);

  return (
    <SafeAreaView> 
      <RepositoryList />
    </SafeAreaView>
  );
}
