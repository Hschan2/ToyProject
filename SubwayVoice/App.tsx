import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import RouteSearch from './RouteSearch';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import Tts from 'react-native-tts';

// --- Haversine 공식으로 두 좌표 간의 거리를 계산하는 함수 (미터 단위) ---
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // 미터 단위로 변환
};

type Location = {
  latitude: number;
  longitude: number;
};

export type Station = {
  name: string;
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  Home: {newRoute?: Station[]};
  RouteSearch: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation, route: navRoute}: HomeScreenProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // --- 경로 및 알림 로직 상태 관리 ---
  const [route, setRoute] = useState<Station[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState('대기 중');
  const [nextStationIndex, setNextStationIndex] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const initialize = async () => {
      await requestLocationPermission();
      PushNotification.createChannel(
        {channelId: 'subway-voice-channel-id', channelName: 'SubwayVoice Channel'},
        () => {},
      );
      Tts.setDefaultLanguage('ko-KR');
      Tts.setDefaultRate(0.5);
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        );
      }
    };
    initialize();
  }, []);

  // --- 경로 탐색 결과 처리 ---
  useEffect(() => {
    if (navRoute.params?.newRoute) {
      const newRoute = navRoute.params.newRoute;
      setRoute(newRoute);
      setNextStationIndex(0);
      setIsSearching(true);
      setStatus('경로 탐색 시작');
    }
  }, [navRoute.params?.newRoute]);

  // --- 백그라운드 위치 추적 및 알림 로직 ---
  useEffect(() => {
    if (!isSearching || route.length === 0) return;

    const timerId = BackgroundTimer.runBackgroundTimer(() => {
      if (nextStationIndex >= route.length) {
        setStatus('경로 탐색 완료');
        setIsSearching(false);
        (BackgroundTimer.stopBackgroundTimer as any)(timerId);
        return;
      }

      const station = route[nextStationIndex];
      setStatus(`${station.name} 탐색 중...`);

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const dist = getDistance(
            latitude,
            longitude,
            station.latitude,
            station.longitude,
          );
          setDistance(Math.round(dist));

          if (dist < 500) {
            const message = `곧 ${station.name}에 도착합니다.`;
            PushNotification.localNotification({
              channelId: 'subway-voice-channel-id',
              title: '지하철 도착 알림',
              message,
            });
            Tts.speak(message);
            setNextStationIndex(prev => prev + 1);
          }
        },
        error => setStatus(`현재 위치를 가져올 수 없습니다: ${error}`),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }, 15000);

    return () => (BackgroundTimer.stopBackgroundTimer as any)(timerId);
  }, [isSearching, nextStationIndex, route]);

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
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (permissionGranted) {
      const watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          Alert.alert('Error', 'Unable to fetch location');
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
      return () => Geolocation.clearWatch(watchId);
    }
  }, [permissionGranted]);

  const handleRouteSearch = () => {
    if (!permissionGranted) {
      requestLocationPermission();
    } else {
      navigation.navigate('RouteSearch');
    }
  };

  const NaverMapViewComponent = NaverMapView as any;

  return (
    <View style={{flex: 1}}>
      <NaverMapViewComponent
        style={{flex: 1}}
        center={
          location
            ? {latitude: location.latitude, longitude: location.longitude, zoom: 15}
            : {latitude: 37.5665, longitude: 126.978, zoom: 15}
        }>
        {location && <Marker coordinate={location} pinColor="blue" />}
        {route.length > 0 && (
          <>
            <Polyline
              coordinates={route.map(p => ({
                latitude: p.latitude,
                longitude: p.longitude,
              }))}
              strokeWidth={4}
              strokeColor="rgba(255, 0, 0, 0.8)"
            />
            {route.map((station, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                caption={{text: station.name}}
                pinColor={index === nextStationIndex -1 ? 'green' : 'red'}
              />
            ))}
          </>
        )}
      </NaverMapViewComponent>
      {isSearching && (
         <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
            <Text style={styles.infoText}>다음 역: {route[nextStationIndex]?.name || '없음'}</Text>
            <Text style={styles.infoText}>남은 거리: {distance} 미터</Text>
         </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="경로 탐색" onPress={handleRouteSearch} />
      </View>
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Subway Voice'}}
        />
        <Stack.Screen
          name="RouteSearch"
          component={RouteSearch}
          options={{title: '경로 탐색'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  statusContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusText: {fontSize: 18, fontWeight: 'bold', color: '#333'},
  infoText: {fontSize: 16, color: '#555', marginTop: 5},
});

export default App;