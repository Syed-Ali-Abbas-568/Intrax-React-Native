import React from "react";
import { TextInput,View,StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SearchBar=({term,onTermChange,onSubmitting})=>{
    return <View style={styles.searchbackground}>
        <Feather name='search' style={styles.iconStyle}/>
        <TextInput placeholder="Search a station"
        autoCapitalize="none"
        autoCorrect={false}
         style={styles.inputStyle}

         />
        </View>

}

const styles=StyleSheet.create({
    searchbackground:{

        backgroundColor:'#E1E1E1',
        width:'80%',
        height:47,
      borderRadius:10,
      flexDirection:'row',
      marginHorizontal:15,
      marginTop:10,
      marginBottom:10
  
    },
    inputStyle:{
       
        flex:1,
        paddingLeft:5,
        fontSize:18

    },
    iconStyle:{
        fontSize:35,
        alignSelf:'center',
        marginHorizontal:15


    }





})
export default SearchBar