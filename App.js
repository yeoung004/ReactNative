import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { styles } from "./style";

export default function App() {
  let date = new Date();
  const API_KEY = 'c5a740626d4627d2b84d0b0049f41c77';
  const [city, setCity] = useState("loading...")
  const [country, setCountry] = useState("loading...")
  const [days, setDays] = useState("loading...");
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
      <View style={styles.place}>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.city}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
        showsHorizontalScrollIndicator={false}
      >
        {days.length == 0 ? (
          <View style={styles.day}>
            <Text>Loading...</Text>
            <ActivityIndicator color="black" size='large' />
          </View>
        ) : (
          days.map((day, index)=>
            <View id={index} style={styles.day}>
              <Text style={styles.date}>{date.getMonth()}/{date.getDay() + index}</Text>
              <Text style={styles.temp}>{Math.round(day.temp.day)}&#186;C</Text>
              <Text style={styles.info}>{day.weather[0].main}</Text>
              <Image style={styles.icon} source={{uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}}></Image>
            </View>            
          )
        )}
      </ScrollView>
    </View>
  );
}
