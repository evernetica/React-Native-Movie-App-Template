import React from 'react';
import {Image, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import {image185} from "../api/moviedb";

import Profile from "../assets/profile.png"

export const CastMembers = ({cast}) => {
    const navigation = useNavigation();
    let personName = 'Keanu Reevs';
    let characterName = 'John Wick'
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
                                    className='rounded-2xl h-24 w-20'
                                    source={{uri: image185(person?.profile_path || Profile)}}
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
