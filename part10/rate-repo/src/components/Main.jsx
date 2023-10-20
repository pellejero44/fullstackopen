import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

// const AppBar = Platform.select({
//     ios: () => require('./AppBarIOS').default,
//     android: () => require('./AppBar').default,
// })();

export default Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppBar />
            <RepositoryList />
        </View>
    );
}