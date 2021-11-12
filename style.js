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
  list :{
    paddingHorizontal:10,
    paddingVertical:5,
    alignSelf:'center',
    width: SCREEN_WIDTH / 1.2,
    borderWidth:1,
    borderColor:'white',
    fontSize:15,
  },
  toDos:{
    height:SCREEN_HEIGHT / 7,
    alignItems:'center',
  },
  toDo:{
    flexDirection:'row',
    width: SCREEN_WIDTH / 1.2,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:5,
    borderBottomColor:'gray',
    borderBottomWidth:1,
  },
  toDoDetail:{
    color:'white',
    fontSize:20,
    width:SCREEN_WIDTH/1.4
  },
  weather: {
    top:SCREEN_WIDTH / 20
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
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