import React from 'react'
import { StyleSheet,View,ImageBackground } from 'react-native'

export default Maps = () => {
  return (
    <View>
              <ImageBackground source={require("../../assets/map.png")} style={styles.mapStyle} ></ImageBackground>
    </View>
  )
}
const styles=StyleSheet.create({
mapStyle:{
justifyContent:'center',
alignItems:'center',
height:500,
width:'100%',




}

})

