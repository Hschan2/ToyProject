import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
  StyleSheet,
} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import RouteSearch from './RouteSearch';

type Location = {
  latitude: number;
  longitude: number;
};

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'android') {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setPermissionGranted(permission === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        setPermissionGranted(result === RESULTS.GRANTED);
      }

      if (permissionGranted) {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location');
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleRouteSearch = () => {
    if (!permissionGranted) {
      requestLocationPermission();
    } else {
      navigation.navigate('RouteSearch');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Naver Map' }}>
          {(props: HomeScreenProps) => (
            <View style={{ flex: 1 }}>
              <NaverMapView
                style={{ flex: 1 }}
                center={{
                  latitude: location ? location.latitude : 37.5665, // 기본값: 서울
                  longitude: location ? location.longitude : 126.9780,
                  zoom: 15,
                }}
              >
                {location && <Marker coordinate={location} />} {/* 현재 위치 마커 */}
              </NaverMapView>
              <View style={styles.buttonContainer}>
                <Button title="경로 탐색" onPress={handleRouteSearch} />
              </View>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="RouteSearch" component={RouteSearch} options={{ title: '경로 탐색' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default App;
