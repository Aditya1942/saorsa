import React from "react";
import { View, Text,StyleSheet, Image } from "react-native";
//import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";




export const BottomMenuItem = ({  isCurrent, label,  style,image, middle }) => {
    return (
        <View
            style={[{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 15,
            }, style]}
        >
            <View style={[styles.iconstyle,middle === true ?{ height:55,width:55,top:-20}:null]}>
            {/* {iconType === 'Entypo' ? <Entypo name={iconName} size={iconSize ? iconSize : 20} style={[{ color: isCurrent ? 'blue' : 'gray' }, iconstyle]} /> : null} */}
                {/* {iconType === 'Entypo' ? <Entypo name={iconName} size={iconSize ? iconSize : middle ? 30 : 20  } color={'white'} /> : null}
                {iconType === 'AntDesign' ? <AntDesign name={iconName} size={iconSize ? iconSize : middle ? 30 : 20} color={'white'} /> : null}
                {iconType === 'FontAwesome5' ? <FontAwesome5 name={iconName} size={iconSize ? iconSize : middle ? 30 : 20} color={'white'} /> : null}
                {iconType === 'FontAwesome' ? <FontAwesome name={iconName} size={iconSize ? iconSize : middle ? 30 : 20} color={'white'} /> : null}
                {iconType === 'Ionicons' ? <Ionicons name={iconName} size={iconSize ? iconSize : middle ? 30 : 20} color={'white'} /> : null}
                {iconType === 'SimpleLineIcons' ? <SimpleLineIcons name={iconName} size={iconSize ? iconSize : middle ? 30 : 20} color={'white'} /> : null} */}
                <Image source={image} style={ middle ? {width:70,height:70} : {width:50,height:50}} />
            </View>
            <Text style={[{ color: isCurrent ? 'blue' : 'gray' },styles.textStyle]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    iconstyle:{
        backgroundColor:'#496AD1',
        borderRadius:100,
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:3
    },
    textStyle:{
        fontSize: 10,
        position:"absolute",
        bottom:8,
    }
})