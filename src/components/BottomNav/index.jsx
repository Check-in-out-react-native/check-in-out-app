import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MesaScreen } from "../../screens/MesaScreen/index";
import { EsperaScreen } from "../../screens/EsperaScreen/index";
import WelcomeScreen from "../../screens/InformacaoScreen";

const Tab = createBottomTabNavigator();

export function BottomNav () {  
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => <Icon source={ getTabBarIcon(route.name, focused) } size={ size } color={ color } />,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name="Espera" component={ EsperaScreen } />
      <Tab.Screen name="Mesas" component={MesaScreen } />
      <Tab.Screen name="Welcome" component={ WelcomeScreen } />
    </Tab.Navigator>
  );
}


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
    case 'Welcome':
      iconName = 'book';
      break;
  }

  return iconName;
}