import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MesaScreen } from "../../screens/MesaScreen/index";
import { EsperaScreen } from "../../screens/EsperaScreen/index";
import { createStackNavigator } from '@react-navigation/stack';
import MesaDetalheScreen from "../../screens/MesaDetalhesScreen/index";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function BottomNav () {  
  const StackNavigator = () => {

    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerTitle: (route.name === 'MesaDetalhe' ? `Mesa ${route?.params?.id_mesa}` : route.name)
        })}
      >
        <Stack.Screen name='Lista Mesas' component={MesaScreen} />
        <Stack.Screen  name='MesaDetalhe' component={MesaDetalheScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => <Icon source={ getTabBarIcon(route.name, focused) } size={ size } color={ color } />,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name="Espera" component={ EsperaScreen } />
      <Tab.Screen name="Mesas" component={StackNavigator } options={{ headerShown: false }} />
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
  }

  return iconName;
}