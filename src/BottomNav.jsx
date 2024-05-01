import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MesaScreen } from "./screens/MesaScreen";
import { EsperaScreen } from "./screens/EsperaScreen";
import { CheckinScreen } from "./screens/CheckinScreen";

const Tab = createBottomTabNavigator();

function getTabBarIcon (routeName, focused) {
  let iconName;

  switch(routeName) {
    case 'Mesas':
      iconName = focused ? 'seat' : 'seat-outline';
      break
    case 'Espera':
      iconName = focused ? 'account-clock' : 'account-clock-outline'
      break;
    case 'Check-in':
      iconName = focused ? 'clipboard-check' : 'clipboard-check-outline';
      break;
  }

  return iconName;
}

export function BottomNav () {
    return (
        <NavigationContainer>
          <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => <Icon source={ getTabBarIcon(route.name, focused) } size={ size } color={ color } />,
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
              })}
          >
            <Tab.Screen name="Espera" component={EsperaScreen} />
            <Tab.Screen name="Check-in" component={CheckinScreen} />
            <Tab.Screen name="Mesas" component={MesaScreen} />
          </Tab.Navigator>
        </NavigationContainer>
    );
}