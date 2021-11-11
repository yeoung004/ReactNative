import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ImageBackground, StatusBar, Image, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { styles } from "./Weather_style";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

function getBackColors() {
  const date = new Date();
  let hour = date.getHours();
  let backGroundColors;
  if (hour >= 5 && hour <= 6) {
    backGroundColors = ['#ffaf7b', '#d76d77', '#382162'];
  } else if (hour >= 7 && hour <= 17) {
    backGroundColors = ['#faaca8', '#FAACA8', '#ddd6f3'];
  } else if (hour >= 18 && hour <= 19) {
    backGroundColors = ['#3a1c71', '#d76d77', '#ffaf7b'];
  } else {
    backGroundColors = ['#051937', '#051937', '#728547'];
  }

  return backGroundColors;
}

function getBackImg() {
  const date = new Date();
  let hour = date.getHours();
  let backGroundImg;
  if (hour >= 5 && hour <= 6) {
    backGroundImg = require('../assets/image/back_day_break.png');
  } else if (hour >= 7 && hour <= 17) {
    backGroundImg = require('../assets/image/back_day.png');
  } else if (hour >= 18 && hour <= 19) {
    backGroundImg = require('../assets/image/back_evening.png');
  } else {
    backGroundImg = require('../assets/image/back_night_light.png');
  }

  return backGroundImg;
}

function getLetter(temp) {
  let letter;

  if (temp < 0) {
    letter = `It's really cold outside be strong!`;
  } else if (temp < 5) {
    letter = `Quite warm outsied but cold! be safe!`;
  } else if (temp < 10) {
    letter = `feel so good today Let's go out for a cup of coffe`;
  } else if (temp < 15) {
    letter = `It's quite good weather!, I miss you`;
  } else if (temp < 20) {
    letter = `It's quite good weather!, I miss you`;
  }

  return letter;
};

function getDate(time) {
  const date = new Date(time);
  const week = date.toDateString().substring(0, 3);
  const day = date.toDateString().substring(8, 10);
  const month = date.getMonth();

  return month + '/' + day + ' ' + week
};

export function MainScreen({ navigation }) {
  const API_KEY = 'c5a740626d4627d2b84d0b0049f41c77';
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [days, setDays] = useState([]);
  const requirePermission = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const dailyWeathers = await response.json();

    setCity(location[0].city);
    setCountry(location[0].country);
    setDays(dailyWeathers.daily);

    if (!granted) {
      setCity("Undefinded");
      setCountry("Undefinded");
    }
  };

  useEffect(() => {
    requirePermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <LinearGradient
        colors={getBackColors()}
        style={{flex:1}}
        >
        <ImageBackground
          source={getBackImg()}
          style={styles.background}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <MaterialIcons style={styles.setting} name="settings" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.place}>
            <Text style={styles.city}>{city}</Text>
            <Text style={styles.country}>{country}</Text>
          </View>
          <ScrollView
            pagingEnabled
            horizontal
            contentContainerStyle={styles.weather}
            showsHorizontalScrollIndicator={false}
          >
            {days.length == 0 ? (
              <View style={styles.loading}>
                <Text style={styles.loadingText}>Loading...</Text>
                <ActivityIndicator color="white" size='large' />
              </View>
            ) : (
              days.map((day, index) =>
                <View key={index} id={index} style={styles.day}>
                  <Text style={styles.letter}>
                    "{getLetter(day.temp.day)}"
                  </Text>
                  <View style={styles.temps}>
                    <Text style={styles.current}>{Math.round(day.temp.day)}
                      <Text style={styles.unit}>&#186;C</Text>
                    </Text>
                    <View style={styles.records}>
                      <Text style={styles.temp}>{Math.round(day.temp.max)}
                        <Text style={styles.unit}>&#186;C</Text>
                      </Text>
                      <Text style={styles.temp}>{Math.round(day.temp.min)}
                        <Text style={styles.unit}>&#186;C</Text>
                      </Text>
                    </View>
                  </View>
                  <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png` }}></Image>
                  <Text style={styles.info}>{day.weather[0].main}</Text>
                  <Text style={styles.date}>{getDate(day.dt * 1000)}</Text>
                </View>
              )
            )}
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}

export default MainScreen;