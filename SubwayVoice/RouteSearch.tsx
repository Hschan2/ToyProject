import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RouteSearch = () => {
  return (
    <View style={styles.container}>
      <Text>경로 탐색 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RouteSearch;
