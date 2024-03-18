import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, SafeAreaView, Image, View, Text} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {styles, theme} from "../theme/color";
import {HeartIcon} from "react-native-heroicons/solid";
import { LinearGradient } from 'expo-linear-gradient';
import {CastMembers} from "../components/castMembers";
import {MovieList} from "../components/movieList";
import {Loading} from "../components/loading";

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

const {width, height} = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';
export const MovieScreen = () => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [cast, setCast] = useState([1,2,3,4,5]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(false)
    const {params: item} = useRoute() as {params: Item};
    useEffect(() => {
        console.log('itemid', item.id)
    }, [item]);
    let movieName = 'Ant-Man and the Wasp: Humanitarian';
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
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <HeartIcon size='35' color={isFavorite ? theme.background : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            source={require('../assets/icon.png')}
                            style={{width, height: height*0.55}}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{width, height: height*0.40}}
                            start={{x: 0.5, y:0}}
                            end={{x: 0.5, y: 1}}
                            className='absolute bottom-0'
                        />
                    </View>
                )
            }
        </View>
        <View style={{marginTop: -(height*0.09)}} className='space-y-3'>
            <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                {movieName}
            </Text>
            <Text className='text-neutral-400 font-semibold text-base text-center'>
                Released · 2020 · 170 min
            </Text>
            <View className='flex-row justify-center mx-4 space-x-2'>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Action ·
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Thrill ·
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Comedy ·
                </Text>
            </View>
            <Text className='text-neutral-400 mx-4 tracking-wide'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dignissimos dolorem dolorum et iste modi provident rerum sapiente tenetur voluptatibus.
            </Text>
        </View>

        <CastMembers cast={cast}/>

        <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
};
