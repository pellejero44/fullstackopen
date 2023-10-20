import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import Constants from 'expo-constants';
import StyledText from "./StyledText";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        paddingTop: Constants.statusBarHeight + 10,
        flexDirection: 'row',
    },
    scroll: {
        paddingBottom: 15
    },
    text: {
        color: theme.appBar.textSecondary,
        paddingHorizontal: 10
    },
    active: {
        color: theme.appBar.textActive
    }
});

const AppBarTab = ({ children, to }) => {
    const active = true;
    
    const textStyles = [
        styles.text,
        active && styles.active
    ]
    return (
        <Link to={to} component={TouchableWithoutFeedback}>
            <StyledText fontWeight='bold' style={textStyles}>
                {children}
            </StyledText>
        </Link>
    );
}

const AppBar = () => {

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scroll}>
                <AppBarTab to='/'> Repositories</AppBarTab>
                <AppBarTab to='/singin'> IOS</AppBarTab>
            </ScrollView>
        </View>
    );
}

export default AppBar;