
import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native'
import { courses } from '../../Constants'
import { colors, sizes, coursesImages } from '../../Constants';
// import { Fontisto } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window')

const Courseslist = ({ image, title }) => {
    return (
        <View style={styles.courseItems}>
            <Image source={image} style={styles.courseImg} />
            <View style={styles.captions}>
                <Text style={[styles.title, { fontSize: sizes.h2,color:colors.primary,fontFamily:'AvenirLTStd-Black' }]}>{title}</Text>
                <View style={{borderBottomColor:'blue',borderBottomWidth:1}}>
                    <Text style={{color:'#fff',fontFamily:'AvenirLTStd-Black'}}>START YOUR FREE INTRO NOW</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{color:'#fff',fontFamily:'AvenirLTStd-Black'}}>MUSIC</Text>
                    <Image source={require('../../assets/lock.png')} style={{width:13,height:13,marginLeft:5 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{color:'#fff',fontFamily:'AvenirLTStd-Black'}}>EXCERCISE</Text>
                    <Image source={require('../../assets/lock.png')} style={{width:13,height:13,marginLeft:5 }} />
                </View>
            </View>
        </View>
    )
}

export default Courseslist

const styles = StyleSheet.create({
    courseItems: {
        width: sizes.width,
        height: height * 0.2,
        backgroundColor: 'red',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    courseImg: {
        width: '100%',
        height: '100%',
    },
    captions: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: {

    }
})
