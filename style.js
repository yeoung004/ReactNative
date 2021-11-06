import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    place: {
      paddingTop: 10,
      flex: 0.8,
      justifyContent: "center",
      backgroundColor: "tomato",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      paddingLeft: 30,
    },
    country: {
      lineHeight: 140,
      flex: 1,
      color: "whitesmoke",
      fontSize: 70,
    },
    city: {
      lineHeight: 50,
      flex: 1,
      color: "whitesmoke",
      fontSize: 30,
    },
    weather: {
      backgroundColor: "whitesmoke",
    },
    day: {
      width: SCREEN_WIDTH,
      justifyContent: "center",
      alignItems: "center"
    },
    temp: {
      flex: 1,
      fontSize: 80
    },
    info: {
      flex: 1,
      fontSize: 40
    },
    date: {
      fontSize: 30
    },
    icon: {
      width:100,
      height:100
    }
  })