import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {VideoList} from './screens/VideoList';
import { Video } from './screens/Video';

export default function App() {
  const Stack = createNativeStackNavigator();
  

  return (
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={VideoList} name='VideoList'/>
          <Stack.Screen component={Video} name='Video'/>
      </Stack.Navigator>
     </NavigationContainer>
  );
}
