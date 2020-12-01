import React, {Component} from 'React';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {LinearGradient} from "expo";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PropTypes from "prop-types";

const weatherCases = {
    Rain : {
        imagebackground: require('./assets/rainy.png'),
        title : "비가 내려요",
        subtitle : "우산을 챙기세요",
        icon : "weather-pouring",
    },
    Clear : {
        imagebackground: require('./assets/sunny.png'),
        title : "맑은 날입니다",
        subtitle : "산책을 해보는 건 어떨까요?",
        icon : "weather-sunny"
    },
    Thunderstorm : {
        imagebackground: require('./assets/thunder.png'),
        title : "번개가 쳐요",
        subtitle : "토르가 올건가 봐요",
        icon : "weather-lightning"
    },
    Clouds : {
        imagebackground: require('./assets/cloud.png'),
        title : "오늘은 흐려요",
        subtitle : "그래도 우울해지지 마세요",
        icon : "weather-cloudy"
    },
    Snow : {
        imagebackground: require('./assets/snow.png'),
        title : "눈이 내려요",
        subtitle : "Do you want to build a snowman?",
        icon : "weather-snowy"
    },
    Drizzle : {
        imagebackground: require('./assets/rainy.png'),
        title : "이슬비가 내려요",
        subtitle : "비 같은 비 아닌 비 같은 너",
        icon : "weather-hail"
    },
    Haze : {
        imagebackground: require('./assets/haze.png'),
        title : "안개가 꼈어요",
        subtitle : "앞을 보고 싶다",
        icon : "weather-fog"
    },
    Mist : {
        imagebackground: require('./assets/mist.png'),
        title : "습해요",
        subtitle : "찝찝하다",
        icon : "weather-rainy"
    }
}
//export default class Weather extends Component {
//    render() {
//        return(
//         <LinearGradient
//          colors={["#00C6FB", "#005BEA"]} 
//          style={styles.container}
//         >
//            <View style={styles.upper}>
//            <Ionicons color="white" size={144} name="ios-rainy" />
//                <Text style={styles.temp}>20º</Text>
//            </View>
//            <View style={styles.lower}>
//                <Text style={styles.title}>비가 내려요</Text>
//                <Text style={styles.subtitle}>우산을 챙기세요</Text>
//            </View>
//         </LinearGradient>
//        );
//    }
//}

function Weather({weatherName ,temp, mylocation, country, maxtemp, mintemp, windsp, cloud}) {
    return(
        
        <ImageBackground
          source={weatherCases[weatherName].imagebackground}
          style={styles.container}>
            <View style={styles.upper}>
            <MaterialCommunityIcons color="white" size={144} name={weatherCases[weatherName].icon} />
                <Text style={styles.information}>{country}, {mylocation}</Text>
                <Text style={styles.temp}>{temp}℃</Text>
                <Text style={styles.information}>{maxtemp}℃ / {mintemp}℃</Text>
                <Text style={styles.information}> 초속 {windsp}M</Text>
                <Text style={styles.information}>습도 : {cloud}%</Text>
            </View>
            <View style={styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>
         </ImageBackground>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weatherName : PropTypes.string.isRequired,
    mylocation : PropTypes.string.isRequired,
    country : PropTypes.string.isRequired,
    maxtemp : PropTypes.number.isRequired,
    mintemp : PropTypes.number.isRequired,
    windsp : PropTypes.number.isRequired,
    cloud : PropTypes.number.isRequired,
}

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        height:'100%'
    },
    upper:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "transparent",
        marginTop:120
    },
    information:{
        fontSize:24,
        backgroundColor:"transparent",
        color:"white",
        marginTop:10
    },
    temp:{
        fontSize:70,
        backgroundColor:"transparent",
        color:"white",
        marginTop:10
    },
    lower:{
        flex:1,
        alignItems: "flex-start",
        justifyContent:"flex-end",
        paddingLeft:25
    },
    title:{
        fontSize:38,
        backgroundColor:"transparent",
        color:"white",
        marginBottom:10,
        fontWeight:"300"
    },
    subtitle:{
        fontSize:24,
        backgroundColor:"transparent",
        color:"white",
        marginBottom:24
    }
});