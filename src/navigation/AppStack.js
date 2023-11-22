import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Offers from '../screens/Offers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Event from '../screens/Event';
import Community from '../screens/Community';
import {Dimensions, Image, View, Text, SafeAreaView} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Account from '../screens/Account';
import UploadPost from '../screens/UploadPost';
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
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

const OffersStack = createNativeStackNavigator();
const OffersStackScreen = () => {
  return (
    <OffersStack.Navigator screenOptions={{headerShown: false}}>
      <OffersStack.Screen name="Offers" component={Offers} />
    </OffersStack.Navigator>
  );
};

const EventStack = createNativeStackNavigator();
const EventStackScreen = () => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen name="Event" component={Event} />
    </EventStack.Navigator>
  );
};

const UploadPostStack = createNativeStackNavigator();
const UploadPostStackScreen = () => {
  return (
    <UploadPostStack.Navigator screenOptions={{headerTitle: 'Post'}}>
      <UploadPostStack.Screen name="UploadPost" component={UploadPost} />
    </UploadPostStack.Navigator>
  );
};

const CommunityStack = createNativeStackNavigator();
const CommunityStackScreen = () => {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name="Community"
        component={Community}
        options={{headerShown: false}}
      />
      <CommunityStack.Screen name="Account" component={Account} />
    </CommunityStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          marginVertical: 5,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({size, color}) => {
            return <AntDesign name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="OffersStack"
        component={OffersStackScreen}
        options={{
          tabBarLabel: 'Nearby',
          tabBarIcon: ({size, color}) => {
            return (
              <FontAwesome6 name="location-dot" color={color} size={size} />
            );
          },
        }}
      />

      <Tab.Screen
        name="UploadPostStack"
        component={UploadPostStackScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({size, color}) => {
            return <Feather name="plus-circle" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="EventStack"
        component={EventStackScreen}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: ({size, color}) => {
            return <MaterialIcons name="event" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="CommunityStack"
        component={CommunityStackScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({size, color}) => {
            return <Feather name="users" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
