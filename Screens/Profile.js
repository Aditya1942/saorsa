import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View>
                <Text>Profile</Text>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})
