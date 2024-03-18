import React, {useState} from 'react';
import {Dimensions, Image, Platform, SafeAreaView, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {styles, theme} from "../theme/color";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {MovieList} from "../components/movieList";
import {Loading} from "../components/loading";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

export const PersonScreen = () => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);
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

        {
            loading ? (
                <Loading />
            ) : (
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
                    <View className='mt-6'>
                        <Text className='text-white font-bold text-center text-3xl'>
                            Keanu Reeves
                        </Text>
                        <Text className='text-base text-neutral-500 text-center'>
                            London, United Kingdom
                        </Text>
                    </View>
                    <View className='mx-3 p-4 flex-row mt-6 justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Gender</Text>
                            <Text className='text-neutral-300 text-sm'>Male</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Birthday</Text>
                            <Text className='text-neutral-300 text-sm'>1054-95-33</Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Known for</Text>
                            <Text className='text-neutral-300 text-sm'>Acting</Text>
                        </View>
                        <View className='px-2 items-center'>
                            <Text className='text-white font-semibold'>Popularity</Text>
                            <Text className='text-neutral-300 text-sm'>64.23</Text>
                        </View>
                    </View>
                    <View className='my-6 mx-4 space-y-2'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, illo.</Text>
                    </View>

                    <MovieList data={personMovies}  title={'Movies'} hideSeeAll={true}/>
                </View>
            )
        }
    </ScrollView>
  );
};
