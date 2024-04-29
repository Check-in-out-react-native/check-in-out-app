import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MesaScreen } from "./screens/MesaScreen";
import { PainelScreen } from "./screens/PainelScreen";
import { CheckinScreen } from "./screens/CheckinScreen";

const Tab = createBottomTabNavigator();

export function BottomNav () {
    return (
        <NavigationContainer>
            <Tab.Navigator
                 screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Mesas') {
                        iconName = focused
                          ? 'seat'
                          : 'seat-outline';
                      } else if (route.name === 'Home') {
                        iconName = focused
                          ? 'home-circle'
                          : 'home-circle-outline'
                      } else if (route.name === 'Checkin') {
                        iconName = focused
                          ? 'clipboard-check'
                          : 'clipboard-check-outline'
                      } else if (route.name === 'Painel') {
                        iconName = focused
                          ? 'store-cog'
                          : 'store-cog-outline'
                      }
          
                      return <Icon source={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Checkin" component={CheckinScreen} />
                <Tab.Screen name="Painel" component={PainelScreen} />
                <Tab.Screen name="Mesas" component={MesaScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}