import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ProfileDetails from '../screens/ProfileDetails';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import TouchableIcon from '../components/TouchableIcon';
import { useNavigation } from '@react-navigation/native';
import { useDirection } from '../state/hooks';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { direction } = useDirection()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: { direction: direction === 'rtl' ? 'rtl' : 'ltr' } }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const navigation = useNavigation()
  const { direction } = useDirection()
  const goToCart = () => {
    navigation.navigate("CartDetails")
  }

  return (
    <TabOneStack.Navigator
        screenOptions={{
          gestureDirection: direction === 'ltr' ? 'horizontal' : 'horizontal-inverted',
          headerRight: () => (
            <TouchableIcon onSelect={goToCart}>
              <Text>
                  <Ionicons size={30} name='cart-outline' />
              </Text>
            </TouchableIcon>
          ),
        }}
    >
      <TabOneStack.Screen
        name="Tabs"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
      <TabOneStack.Screen 
        name="profileDetails"
        component={ProfileDetails}
        options={{ headerTitle: 'Profile Details', headerStyle: { direction: direction === 'rtl' ? 'rtl' : 'ltr' } }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
