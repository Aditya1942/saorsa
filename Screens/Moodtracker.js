import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import { colors, sizes, MoodImgs } from '../Constants';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


const MoodMenu = ({ MoodImg, menuStyle }) => {
    const setMenuRef = useRef(null);
    const [blurImg, setBlurImg] = useState(0)
    function handleShowMenu() {
        setMenuRef.current.show();
        setBlurImg(5)
    }
    function handleHideMenu() {
        setBlurImg(0)
    }
    return (
        <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'center' }}>
            <Menu
                style={menuStyle}
                ref={setMenuRef} onHidden={handleHideMenu}
                button={
                    <TouchableOpacity onPress={(e) => { handleShowMenu(); console.log(e.target) }} activeOpacity={0.5}>
                        <Image blurRadius={blurImg} source={MoodImg} style={MoodTrackerStyle.MoodImg} />
                    </TouchableOpacity>}
            >
                <MenuItem textStyle={MoodTrackerStyle.MoodMenuItem} Style={MoodTrackerStyle.MoodMenuItemStyle} >A Little</MenuItem>
                <MenuItem textStyle={MoodTrackerStyle.MoodMenuItem} Style={MoodTrackerStyle.MoodMenuItemStyle}>Somewhat</MenuItem>
                <MenuItem textStyle={MoodTrackerStyle.MoodMenuItem} Style={MoodTrackerStyle.MoodMenuItemStyle}>Very</MenuItem>
                <MenuItem textStyle={MoodTrackerStyle.MoodMenuItem} Style={MoodTrackerStyle.MoodMenuItemStyle} >Extremely</MenuItem>

            </Menu>
        </View>
    )
}

const Moodtracker = ({ navigation }) => {
    console.log(MoodImgs)
    const happy = require('../assets/Moods/excited.png');
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 20 }}>
            <Header navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5, marginBottom: 50 }}>
                <Text style={{ fontSize: sizes.h1, color: '#fff', paddingTop: 10, fontFamily: 'AvenirLTStd-Black' }}>Mood Checker</Text>
                <Text style={{ fontSize: sizes.h1, color: '#fff', paddingTop: 30, fontFamily: 'AvenirLTStd-Black' }}>How are you {"\n"}Feeling today?</Text>
                <ScrollView style={{ marginTop: 30, marginBottom: 30 }}>
                    {MoodImgs.map(MoodRow => {
                        return (
                            <View style={MoodTrackerStyle.container}>
                                {MoodRow.map(MoodImg => {
                                    let moodMenu;
                                    if (MoodImg.id === 3 || MoodImg.id === 6 || MoodImg.id === 9 || MoodImg.id === 12)
                                        moodMenu = MoodTrackerStyle.MoodMenuLeft
                                    else
                                        moodMenu = MoodTrackerStyle.MoodMenu
                                    return (
                                        <MoodMenu key={MoodImg.id} menuStyle={moodMenu} MoodImg={MoodImg.img} />


                                    );
                                })}
                            </View>
                        )
                    })}
                    <TouchableOpacity activeOpacity={0.5}>
                        <View style={MoodTrackerStyle.moodChart}>
                            <View style={MoodTrackerStyle.MoodInfoMain}>
                                <Text style={MoodTrackerStyle.ChartInfoHeading}>Mood Chart</Text>
                                <View>
                                    <Text style={MoodTrackerStyle.MoodInfo}>HAPPY 23rd Feb 1:28pm</Text>
                                    <Text style={MoodTrackerStyle.MoodInfo}>ANGRY 13th Feb 4:30pm</Text>
                                </View>
                            </View>
                            <View style={MoodTrackerStyle.MoodInfoChart}><Text>Chart</Text></View>
                        </View>
                    </TouchableOpacity>


                </ScrollView>
            </ScrollView >
        </SafeAreaView >
    )
}

export default Moodtracker

const MoodTrackerStyle = StyleSheet.create({
    // Mood Chart And information
    ChartInfoHeading: {
        padding: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    MoodInfo: {
        marginBottom: 5,
        marginLeft: 10,
        fontSize: 13,

    },
    MoodInfoMain: {
        flex: 0.6
    },
    MoodInfoChart: {
        flex: 0.4

    },
    moodChart: {
        height: 100, width: "100%", backgroundColor: "#fff",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    // Mood Icons 
    MoodMenu: {
        backgroundColor: "rgba( 9, 56, 110, 0.8 )",
        marginLeft: 100
    },
    MoodMenuLeft: {
        backgroundColor: "rgba( 9, 56, 110, 0.8 )",
        marginTop: 100

    },
    MoodMenuItem: {
        color: "#fff",
        fontSize: 20
    },
    MoodMenuItemStyle: {

    },
    MoodImg: {
        width: 100,
        height: 100,
        margin: 5,
        // backgroundColor: 'red',
        // marginRight: sizes.SPACING,
        // borderRadius: 10,
        // overflow: 'hidden'
    },
    // Main Container
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

})
