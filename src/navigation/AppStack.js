import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Offers from '../screens/Offers';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const OffersStack = createNativeStackNavigator();
const OffersStackScreen = () => {
  return (
    <OffersStack.Navigator>
      <OffersStack.Screen name="Offers" component={Offers} />
    </OffersStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="OffersStack" component={OffersStackScreen} />
    </Tab.Navigator>
  );
}

export default AppStack;
