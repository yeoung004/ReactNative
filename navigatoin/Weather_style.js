import { Dimensions, StyleSheet } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setting:{
    color:'white',
    left:10,
    top:10
  },
  loading: {
    marginVertical: SCREEN_WIDTH / 3,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  loadingText: {
    flex:1,
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 50,
  },
  background: {
    alignSelf:'flex-end'
  },
  place: {
    paddingVertical: 20,
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
    fontWeight:'bold',
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 23,
    padding: 20,
  },
  temps: {
    flexDirection: 'row'
  },
  current: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 60
  },
  records: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  temp: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 25
  },
  unit: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 10
  },
  info: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 40
  },
  date: {
    fontFamily: 'sans-serif-thin',
    color: 'white',
    fontSize: 20
  },
  icon: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 12,
  }
})