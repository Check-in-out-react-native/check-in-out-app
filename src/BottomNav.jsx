import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MesaScreen } from "./screens/MesaScreen";
import { EsperaScreen } from "./screens/EsperaScreen";
import { CheckinScreen } from "./screens/CheckinScreen";
import { createStackNavigator } from '@react-navigation/stack';
import { MesaDetalheScreen } from "./screens/MesaDetalhesScreen";
import { useRoute } from "@react-navigation/native";

export function BottomNav () {
    return (
      <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => <Icon source={ getTabBarIcon(route.name, focused) } size={ size } color={ color } />,
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
          })}
      >
        <Tab.Screen name="Espera" component={EsperaScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Check-in" component={CheckinScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Mesas" component={StackNavigator} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  const getRouteTitle = (route) => {
    return `Mesa ${route?.params?.mesaId}`
  }
  return (
    <Stack.Navigator >
      <Stack.Screen name='Mesas' component={MesaScreen} options={{ headerShown: false }} />
      <Stack.Screen options={({route}) => ({ headerTitle: () => getRouteTitle(route) })}  name={'MesaDetalhe'} component={MesaDetalheScreen} />
    </Stack.Navigator>
  );
};


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