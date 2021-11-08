import React, { useState, useEffect } from 'react';
import { ImageBackground, StatusBar, Image, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { styles } from "./style";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
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
        colors={['#FFAF7B', '#D76D77', '#19547B']}
      >
        <ImageBackground
          source={require('./assets/back.png')}
          style={styles.background}
        >
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
                    "It's cold outside be warm"
                  </Text>
                  <View style={styles.temps}>
                    <Text style={styles.current}>{Math.round(day.temp.day)}&#186;C</Text>
                    <View style={styles.records}>
                      <Text style={styles.high}>{Math.round(day.temp.day)}&#186;C</Text>
                      <Text style={styles.row}>{Math.round(day.temp.day)}&#186;C</Text>
                    </View>
                  </View>
                  <Image style={styles.icon} source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}></Image>
                  <Text style={styles.info}>{day.weather[0].main}</Text>
                  <Text style={styles.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
                </View>
              )
            )}
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}
