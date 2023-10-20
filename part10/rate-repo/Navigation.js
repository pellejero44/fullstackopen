import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Repository from "./src/screens/tabScreens/Repository";
import Feed from "./src/screens/tabScreens/Feed";
import { Ionicons } from "@expo/vector-icons";
import RepositoryDetailsScreen from "./src/screens/homeStack/RepositoryDetailsScrenn";
import Payments from "./src/screens/drawerScreens/Payments";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import Login from "./src/components/Login";

// Stack Navigator
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="TabsGroup"
        component={TabsGroup}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RepositoryDetailsScreen"
        component={RepositoryDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
}

//Tab Bottom Navigator
const Tab = createBottomTabNavigator();

function TabsGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIicon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Repository") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Feed") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if(route.name === "Login") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Repository"
        component={TopTabsGroup}
        options={{ tabBarLabel: "@pellejero44" }}
      />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeStackGroup" component={HomeStackGroup} />
      <Drawer.Screen
        name="Payment"
        component={Payments}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

// Top Tabs

const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen name="main" component={Repository} />
      <TopTabs.Screen name="Following" component={Payments} />
      <TopTabs.Screen name="👀" component={Payments} />
    </TopTabs.Navigator>
  );
}

export default function Navigation() {
  const currentName = useColorScheme();
  return (
    <NavigationContainer
      theme={currentName === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
}
