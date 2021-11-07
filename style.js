import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    place: {
      paddingTop: 10,
      flex: 0.4,
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
      lineHeight: 100,
      flex: 0.5,
      color: "whitesmoke",
      fontSize: 50,
    },
    city: {
      lineHeight: 30,
      flex: 0.3,
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
      lineHeight:80,
      flex: 0.15,
      fontSize: 80
    },
    info: {
      flex: 0.2,
      fontSize: 40
    },
    date: {
      fontSize: 30
    },
    icon: {
      flex:0.1,
      width:100,
      height:100,
      bottom:50
    }
  })