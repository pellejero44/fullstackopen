import { Button, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import RepositoryItem from "../../components/RepositoryItem";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export default function RepositoryDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.fullName,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RepositoryItem {...params} />
    </SafeAreaView>
  );
}
