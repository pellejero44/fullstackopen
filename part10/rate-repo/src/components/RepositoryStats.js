import { View, StyleSheet } from "react-native";
import StyledText from "./StyledText";

const parseThousands = (number) => {
    return number > 999 ? `${(number / 1000).toFixed(1)}k` : number
}

const RepositoryStats = (props) => (
    <View style={styles.container}>
        <View>
            <StyledText align='center' fontWeight='bold'>{parseThousands(props.stargazersCount)}</StyledText>
            <StyledText align='center'>Starts</StyledText>

        </View>
        <View>
            <StyledText align='center' fontWeight='bold'>{parseThousands(props.forksCount)}</StyledText>
            <StyledText align='center'>Forks</StyledText>

        </View>
        <View>
            <StyledText align='center' fontWeight='bold'>{props.reviewCount}</StyledText>
            <StyledText align='center'>Reviews</StyledText>

        </View>
        <View>
            <StyledText align='center' fontWeight='bold'>{props.ratingAverage}</StyledText>
            <StyledText align='center'>Rating</StyledText>

        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-around'
    }
});

export default RepositoryStats;