import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import Tts from 'react-native-tts';

// ===================================================================
// !! 중요 !!
// ODsay API 키를 발급받아 아래 'YOUR_ODSAY_API_KEY' 부분을 교체해주세요.
const ODsayApiKey = 'YOUR_ODSAY_API_KEY';
// ===================================================================

// --- Haversine 공식으로 두 좌표 간의 거리를 계산하는 함수 (미터 단위) ---
const getDistance = (lat1, lon1, lat2, lon2) => {
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

const RouteSearch = () => {
  // --- UI 및 로직 상태 관리 ---
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [isLoading, setIsLoading] = useState(false); // API 로딩 상태
  const [isSearching, setIsSearching] = useState(false); // 경로 탐색중 상태

  // --- 경로 및 알림 로직 상태 관리 ---
  const [route, setRoute] = useState([]);
  const [status, setStatus] = useState('대기 중');
  const [nextStationIndex, setNextStationIndex] = useState(0);
  const [distance, setDistance] = useState(0);

  // --- ODsay API 호출 로직 ---
  const fetchRouteFromODsay = async (start, end) => {
    try {
      // 1. 역 이름으로 역 코드(ID) 검색
      const stationToId = async stationName => {
        const url = `https://api.odsay.com/v1/api/searchStation?lang=0&stationName=${encodeURIComponent(
          stationName,
        )}&apiKey=${encodeURIComponent(ODsayApiKey)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.result.station[0].stationID;
      };

      const startStationId = await stationToId(start);
      const endStationId = await stationToId(end);

      // 2. 역 코드로 경로 탐색
      const pathUrl = `https://api.odsay.com/v1/api/subwayPath?lang=0&CID=1000&SID=${startStationId}&EID=${endStationId}&apiKey=${encodeURIComponent(
        ODsayApiKey,
      )}`;
      const pathResponse = await fetch(pathUrl);
      const pathData = await pathResponse.json();
      if (pathData.error) throw new Error(pathData.error.message);

      // 3. 경로 데이터 포맷팅
      const formattedRoute = pathData.result.stationSet.stations.map(st => ({
        name: st.stationName,
        latitude: parseFloat(st.y),
        longitude: parseFloat(st.x),
      }));

      return formattedRoute;
    } catch (error) {
      Alert.alert('API 오류', error.message);
      return null;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      PushNotification.createChannel({channelId: 'subway-voice-channel-id', channelName: 'SubwayVoice Channel'}, () => {});
      Tts.setDefaultLanguage('ko-KR');
      Tts.setDefaultRate(0.5);
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
      }
    };
    initialize();

    if (!isSearching || route.length === 0) return;

    const timerId = BackgroundTimer.runBackgroundTimer(() => {
      if (nextStationIndex >= route.length) {
        setStatus('경로 탐색 완료');
        BackgroundTimer.stopBackgroundTimer(timerId);
        return;
      }

      const station = route[nextStationIndex];
      setStatus(`${station.name} 탐색 중...`);

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const dist = getDistance(latitude, longitude, station.latitude, station.longitude);
          setDistance(Math.round(dist));

          if (dist < 500) {
            const message = `곧 ${station.name}에 도착합니다.`;
            PushNotification.localNotification({channelId: 'subway-voice-channel-id', title: '지하철 도착 알림', message});
            Tts.speak(message);
            setNextStationIndex(prev => prev + 1);
          }
        },
        error => setStatus('현재 위치를 가져올 수 없습니다.'),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }, 15000);

    return () => BackgroundTimer.stopBackgroundTimer(timerId);
  }, [isSearching, nextStationIndex, route]);

  const handleSearch = async () => {
    if (!startStation || !endStation) {
      Alert.alert('입력 오류', '출발역과 도착역을 모두 입력해주세요.');
      return;
    }
    if (ODsayApiKey === 'YOUR_ODSAY_API_KEY') {
      Alert.alert('API 키 필요', 'ODsay API 키를 입력해야 경로를 탐색할 수 있습니다.');
      return;
    }

    setIsLoading(true);
    const fetchedRoute = await fetchRouteFromODsay(startStation, endStation);
    setIsLoading(false);

    if (fetchedRoute) {
      setRoute(fetchedRoute);
      setIsSearching(true);
    }
  };

  if (isSearching) {
    const currentStation = route[nextStationIndex];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>경로 안내</Text>
        <Text style={styles.statusText}>{status}</Text>
        {currentStation ? (
          <>
            <Text style={styles.infoText}>다음 역: {currentStation.name}</Text>
            <Text style={styles.infoText}>남은 거리: {distance} 미터</Text>
          </>
        ) : (
          <Text style={styles.infoText}>모든 경로를 완료했습니다.</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>경로 탐색</Text>
      <TextInput style={styles.input} placeholder="출발역 (예: 강남)" value={startStation} onChangeText={setStartStation} />
      <TextInput style={styles.input} placeholder="도착역 (예: 잠실)" value={endStation} onChangeText={setEndStation} />
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Button title="경로 탐색" onPress={handleSearch} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 20},
  input: {width: '90%', height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#fff'},
  statusText: {fontSize: 20, fontStyle: 'italic', color: '#666', marginBottom: 40},
  infoText: {fontSize: 18, color: '#333', marginBottom: 10},
});

export default RouteSearch;