import { Dimensions, StyleSheet } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loading: {
    marginVertical:SCREEN_WIDTH/3,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  loadingText:{
    fontFamily: 'sans-serif-thin',
    color:'white',
    fontSize:50,
  },
  background:{
    resizeMode:'cover',
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
  },
  place: {
    paddingVertical:50,
    alignItems: "center",
  },
  city: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 80,
  },
  country: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 20,
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  letter: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 23,
    padding:20,
  },
  temp: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 80
  },
  info: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 40
  },
  date: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 30
  },
  icon: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    width: 100,
    height: 100,
  }
})