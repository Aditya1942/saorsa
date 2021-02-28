import React from 'react'
import { View, Text,FlatList,Image,StyleSheet } from 'react-native'
import { colors, sizes, coursesImages } from '../../Constants';

const Steps = () => {
    return (
        <FlatList
            data={coursesImages}
            keyExtractor={item => item.id.toString()}
            initialNumToRender={6}
            horizontal
            style={{ paddingTop: 10 }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={sizes.ITEM_WIDTH}
            contentContainerStyle={{ paddingRight: sizes.SPACING * 2 }}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.courseItems}>
                        <Image source={item.img} style={styles.courseImg} resizeMode={'cover'} />
                        <View style={styles.courseTitle}>
                            <Text style={{ fontSize: sizes.body, color: '#fff', fontWeight: 'bold',fontFamily:'AvenirLTStd-Black' }}>{item.id}</Text>
                            <Text style={{ fontSize: sizes.caption, color: '#fff',fontFamily:'AvenirLTStd-Book' }}>{item.title}</Text>
                        </View>
                    </View>
                )
            }}
        />
    )
}

export default Steps

const styles = StyleSheet.create({
    courseItems: {
        width: sizes.ITEM_WIDTH,
        height: sizes.ITEM_HEIGHT,
        backgroundColor: 'red',
        marginRight: sizes.SPACING,
        borderRadius: 10,
        overflow: 'hidden'
    },
    courseImg: {
        width: '100%',
        height: '100%',
        
    },
    courseTitle: {
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 10,
    },
})
