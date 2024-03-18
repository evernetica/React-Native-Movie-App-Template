import React from 'react';
import {Dimensions, Image, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {styles} from "../theme/color";
import {useNavigation} from "@react-navigation/native";
import {image185, image342} from "../api/moviedb";
import fallBackImage from '../assets/icon.png';

const {width, height} = Dimensions.get('window')
export const MovieList = ({title, data, hideSeeAll}) => {
    const navigation = useNavigation<any>();
  return (
    <View className='mb-8 space-y-4'>
        <View className='mx-4 flex-row justify-between items-center'>
            <Text className='text-white text-xl'>{title}</Text>
            {!hideSeeAll &&
                <TouchableOpacity>
                    <Text style={styles.text}>See all</Text>
                </TouchableOpacity>
            }
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}

        >
            {data.map((item: any, index: number) => {
                return (
                    <TouchableOpacity
                        key={`1+${index}`}
                        onPress={()=> navigation.push('Movie', item)}
                    >
                        <View className='space-y-1 mr-4'>
                            <Image
                                source={{uri: image185(item.poster_path || fallBackImage)}}
                                className='rounded-3xl'
                                style={{width: width*0.33, height: height*0.22}}
                            />
                            <Text className='text-neutral-300 ml-1'>
                                {
                                    // item.title.length > 14 ? item.title.slice(0,14) + '...' : item.title
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </View>
  );
};
