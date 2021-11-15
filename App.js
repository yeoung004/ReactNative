import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
  ActivityIndicator,
  View,
  Text,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { styles } from "./style";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

function getBackColors() {
  const date = new Date();
  let hour = date.getHours();
  let backGroundColors;
  if (hour >= 5 && hour <= 6) {
    backGroundColors = ['#ffaf7b', '#d76d77', '#382162'];
  } else if (hour >= 7 && hour <= 17) {
    backGroundColors = ['#1e3b70', '#29539b', '#ddd0c0'];
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
    backGroundImg = require('./assets/image/back_day_break.png');
  } else if (hour >= 7 && hour <= 17) {
    backGroundImg = require('./assets/image/back_day.png');
  } else if (hour >= 18 && hour <= 19) {
    backGroundImg = require('./assets/image/back_evening.png');
  } else {
    backGroundImg = require('./assets/image/back_night_light.png');
  }

  return backGroundImg;
}

function getDate(time) {
  const date = new Date(time);
  const week = date.toDateString().substring(0, 3);
  const day = date.toDateString().substring(8, 10);
  const month = date.getMonth() + 1;

  return month + '/' + day + ' ' + week
}

const STORAGE_KEY = '@toDos';

export default function App() {
  const API_KEY = 'c5a740626d4627d2b84d0b0049f41c77';
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [days, setDays] = useState([]);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeText = (pyaload) => setText(pyaload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };
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
    await loadToDos();

    if (!granted) {
      setCity("Undefinded");
      setCountry("Undefinded");
    }
  };

  const deleteToDos = async (key) => {
    const newToDos = { ...toDos }
    delete newToDos[key]
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  useEffect(() => {
    requirePermission()
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text }
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <LinearGradient
        colors={getBackColors()}
        style={{ flex: 1 }}>
        <ImageBackground
          source={getBackImg()}
          style={styles.background}>

          {days.length == 0 ? (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading...</Text>
              <ActivityIndicator color="white" size='large' />
            </View>
          ) : (
            <View>
              <View style={styles.place}>
                <Text style={styles.city}>{city}</Text>
                <Text style={styles.country}>{country}</Text>
              </View>
              <TextInput
                autoCorrect
                onSubmitEditing={addToDo}
                onChangeText={onChangeText}
                value={text}
                style={styles.list}
                placeholder={"Start today"}
                placeholderTextColor={'white'}
                returnKeyType="done" />
              <View style={styles.toDos}>
                <ScrollView>
                  {toDos != null ? Object.keys(toDos).map(key =>
                    <View style={styles.toDo} key={key}>
                      <Text style={styles.toDoDetail}>{toDos[key].text}</Text>
                      <TouchableOpacity onPress={() => deleteToDos(key)}>
                        <Text>
                          <Feather style={styles.icon} name="trash-2" size={24} color="white" />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </ScrollView>
              </View>
              <ScrollView
                pagingEnabled
                horizontal
                contentContainerStyle={styles.weather}
                showsHorizontalScrollIndicator={false}>
                {days.map((day, index) =>
                  <View key={index} id={index} style={styles.day}>
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
                )}
              </ScrollView>
            </View>
          )}
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}