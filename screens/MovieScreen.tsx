import React, {useEffect} from 'react';
import {Dimensions, Platform, SafeAreaView, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {styles} from "../theme/color";
import {HeartIcon} from "react-native-heroicons/solid";


const {width, height} = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';
export const MovieScreen = () => {
    const navigation = useNavigation();
    // const {param: item} = useRoute();
    // useEffect(() => {
    //     //call the movie details api
    // }, [item]);
    return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        className='flex-1 bg-neutral-900'
    >
        <View className='w-full'>
            <SafeAreaView
                //@ts-ignore
                style={{
                    position: 'absolute',
                    zIndex: 20,
                    width: '93%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    marginTop: topMargin,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.background}
                    className='rounded-xl p-1'
                >
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <HeartIcon size='35' color='white' />
                </TouchableOpacity>

            </SafeAreaView>
        </View>

    </ScrollView>
  );
};
