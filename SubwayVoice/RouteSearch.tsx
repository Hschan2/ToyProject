import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// ===================================================================
// !! 중요 !!
// ODsay API 키를 발급받아 아래 'YOUR_ODSAY_API_KEY' 부분을 교체해주세요.
const ODsayApiKey = 'YOUR_ODSAY_API_KEY';
// ===================================================================

const RouteSearch = () => {
  const navigation = useNavigation();
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchRouteFromODsay = async (start, end) => {
    try {
      const stationToId = async stationName => {
        const url = `https://api.odsay.com/v1/api/searchStation?lang=0&stationName=${encodeURIComponent(
          stationName,
        )}&apiKey=${encodeURIComponent(ODsayApiKey)}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error || data.result.station.length === 0) {
          throw new Error(
            data.error?.message || `"${stationName}" 역을 찾을 수 없습니다.`,
          );
        }
        return data.result.station[0].stationID;
      };

      const startStationId = await stationToId(start);
      const endStationId = await stationToId(end);

      const pathUrl = `https://api.odsay.com/v1/api/subwayPath?lang=0&CID=1000&SID=${startStationId}&EID=${endStationId}&apiKey=${encodeURIComponent(
        ODsayApiKey,
      )}`;
      const pathResponse = await fetch(pathUrl);
      const pathData = await pathResponse.json();
      if (pathData.error) throw new Error(pathData.error.message);

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

  const handleSearch = async () => {
    if (!startStation || !endStation) {
      Alert.alert('입력 오류', '출발역과 도착역을 모두 입력해주세요.');
      return;
    }
    if (ODsayApiKey === 'YOUR_ODSAY_API_KEY') {
      Alert.alert(
        'API 키 필요',
        'ODsay API 키를 입력해야 경로를 탐색할 수 있습니다.',
      );
      return;
    }

    setIsLoading(true);
    const fetchedRoute = await fetchRouteFromODsay(startStation, endStation);
    setIsLoading(false);

    if (fetchedRoute) {
      // 경로 데이터를 Home 화면으로 전달하고 이동
      navigation.navigate('Home', {newRoute: fetchedRoute});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>경로 탐색</Text>
      <TextInput
        style={styles.input}
        placeholder="출발역 (예: 강남)"
        value={startStation}
        onChangeText={setStartStation}
      />
      <TextInput
        style={styles.input}
        placeholder="도착역 (예: 잠실)"
        value={endStation}
        onChangeText={setEndStation}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="경로 탐색 및 안내 시작" onPress={handleSearch} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 20},
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default RouteSearch;
