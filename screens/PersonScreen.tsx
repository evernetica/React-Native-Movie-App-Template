import React, {useState} from 'react';
import {Dimensions, Image, Platform, SafeAreaView, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {styles, theme} from "../theme/color";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export const PersonScreen = () => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
  return (
    <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{paddingBottom: 20}}>
        <SafeAreaView
            className={verticalMargin}
            //@ts-ignore
            style={{
                zIndex: 20,
                width: '93%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
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
                onPress={() => setIsFavorite(!isFavorite)}
            >
                <HeartIcon size='35' color={isFavorite ? 'red' : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

        <View>
            <View
                className='flex-row justify-center'
                style={{
                    shadowColor: 'gray',
                    shadowRadius: 40,
                    shadowOffset: {width: 0, height: 5},
                    shadowOpacity: 1
                }}
            >
                <View
                    className='overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-500'
                >
                    <Image
                        source={require('../assets/icon.png')}
                        style={{width: width*0.74, height: height*0.43}}
                    />
                </View>
            </View>
            <View
                className='mt-6'
            >

            </View>
        </View>
    </ScrollView>
  );
};
