import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import Weather from "./Weather";

const API_KEY = "a03004bf971234fd4cb532f6df20b7af";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error:null,
    temperature:null,
    name:null
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this._getWeather(position.coords.latitude, position.coords.longitude)
    },
    error=> {
      this.setState({
        error:error
      })
    }
  );
  }
  _getWeather=(lat, long) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?lang=kr&lat='+lat+'&lon='+long+'&APPID='+API_KEY)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        mylocation:json.name,
        country:json.sys.country,
        maxtemperature:json.main.temp_max,
        mintemperature:json.main.temp_min,
        windspeed:json.wind.speed,
        clouds:json.clouds.all,
        isLoaded:true
      });
    });
  }
  render() {
    const { isLoaded, error, temperature, name, mylocation, country, maxtemperature, mintemperature, windspeed, clouds } = this.state;
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        {isLoaded ? (
        <Weather weatherName={name} mylocation={mylocation} country={country} temp={Math.floor(temperature-273.15)} 
        maxtemp={Math.floor(maxtemperature-273.15)} mintemp={Math.floor(mintemperature-273.15)} windsp={windspeed} cloud={clouds}/>
      ) : (
        <View style={styles.loading}>
          <Text style = {styles.loadingText}>날씨를 불러오는 중</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null }
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText:{
    color:"red",
    backgroundColor:"transparent",
    marginBottom:50
  },
  loading:{
    flex: 1,
    backgroundColor:'#FDF6AA',
    justifyContent:"flex-end",
    paddingLeft : 25
  },
  loadingText:{
    fontSize : 40,
    marginBottom:100
  }
});
