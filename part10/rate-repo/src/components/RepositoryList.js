import { FlatList, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepository";


const RepositoryList = () => {
  const {repositories} = useRepositories()

  const { navigate } = useNavigation();
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: repository }) => (
        <Pressable
          onPress={() => navigate("RepositoryDetailsScreen", { ...repository })}
        >
          <RepositoryItem {...repository} />
        </Pressable>
      )}
    />
  );
};
export default RepositoryList;
