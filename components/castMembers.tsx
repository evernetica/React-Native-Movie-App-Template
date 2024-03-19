import React from 'react';
import {Dimensions, Image, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import {image342} from "../api/moviedb";

const {width, height} = Dimensions.get('window');

export const CastMembers = ({cast}) => {
    const navigation = useNavigation();
  return (
    <View className='my-6'>
        <Text className='text-white text-lg mx-4 mb-5'>
          Top Cast
        </Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                cast && cast.map((person: any, index: number) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            className='mr-4 items-center'
                            //@ts-ignore
                            onPress={() => navigation.navigate('Person', person)}
                        >
                            <View
                                className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'
                            >
                                <Image
                                    // @ts-ignore
                                    defaultSource={require('../assets/profile.png')}
                                    className='rounded-2xl'
                                    style={{width: width*0.2, height: height*0.11}}
                                    source={{uri: image342(person?.profile_path)}}
                                />
                            </View>
                            <Text className='text-white text-xs mt-1'>
                                {
                                    person?.character.length > 10 ? person?.character.slice(0,10)+'...' : person?.character
                                }
                            </Text>
                            <Text className='text-neutral-400 text-xs mt-1'>
                                {
                                    person?.name.length > 10 ? person?.name.slice(0,10)+'...' : person?.name
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </View>
  );
};
