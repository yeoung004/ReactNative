import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WeatherScreen } from './navigatoin/Weather';
import { SettingScreen } from './navigatoin/Setting';
import { HomeScreen } from './navigatoin/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{headerShown:false}}/>
        <Stack.Screen name="Setting" component={SettingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
