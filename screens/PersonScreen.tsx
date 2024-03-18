import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Platform, SafeAreaView, Text, View} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {styles, theme} from "../theme/color";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {useNavigation, useRoute} from "@react-navigation/native";
import {MovieList} from "../components/movieList";
import {Loading} from "../components/loading";
import {fetchPersonDetails, fetchPersonMovies, image342} from "../api/moviedb";
import {MovieCast, Person, PersonMovies} from "../types/person";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-3';

interface Item {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const PersonScreen = () => {
    const navigation = useNavigation();
    const {params: item} = useRoute() as {params: Item};
    const [isFavorite, setIsFavorite] = useState(false);
    const [person, setPerson] = useState<Person | null>(null);
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item]);

    const getPersonDetails = async (id: number) => {
        const data = await fetchPersonDetails(id);
        if(data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async (id: number) => {
        const data = await fetchPersonMovies(id);
        if(data && data.cast) setPersonMovies(data.cast);
    }
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
                                source={{uri: image342(person?.profile_path)}}
                                style={{width: width*0.74, height: height*0.43}}
                            />
                        </View>
                    </View>
                    <View className='mt-6'>
                        <Text className='text-white font-bold text-center text-3xl'>
                            {
                                person?.name
                            }
                        </Text>
                        <Text className='text-base text-neutral-500 text-center'>
                            {
                                person?.place_of_birth
                            }
                        </Text>
                    </View>
                    <View className='mx-3 p-4 flex-row mt-6 justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Gender</Text>
                            <Text className='text-neutral-300 text-sm'>
                                {
                                    person?.gender === 1 ? 'Female' : 'Male'
                                }
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Birthday</Text>
                            <Text className='text-neutral-300 text-sm'>
                                {
                                    person?.birthday
                                }
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>Known for</Text>
                            <Text className='text-neutral-300 text-sm'>
                                {
                                    person?.known_for_department
                                }
                            </Text>
                        </View>
                        <View className='px-2 items-center'>
                            <Text className='text-white font-semibold'>Popularity</Text>
                            <Text className='text-neutral-300 text-sm'>
                                {
                                    person?.popularity.toFixed(2)
                                } %
                            </Text>
                        </View>
                    </View>
                    <View className='my-6 mx-4 space-y-2'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide'>
                            {
                                person?.biography || 'N/A'
                            }
                        </Text>
                    </View>

                    <MovieList data={personMovies}  title={'Movies'} hideSeeAll={true}/>
                </View>
            )
        }
    </ScrollView>
  );
};
