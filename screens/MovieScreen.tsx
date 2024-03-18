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
import {fetchMovieCredits, fetchMovieDetails, fetchMovieSimilar, image500} from "../api/moviedb";
import {Movie} from "../types/movie";
import {CastMember, MovieCredits} from "../types/cast";
import {MovieSummary, SimilarMoviesResponse} from "../types/similar";

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
    const [cast, setCast] = useState<CastMember[]>([]);
    const [similarMovies, setSimilarMovies] = useState<MovieSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<Movie>({
        adult: false,
        backdrop_path: "",
        belongs_to_collection: null,
        budget: 0,
        genres: [],
        homepage: "",
        id: 0,
        imdb_id: "",
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 0,
        poster_path: "",
        production_companies: [],
        production_countries: [],
        release_date: "",
        revenue: 0,
        runtime: 0,
        spoken_languages: [],
        status: "",
        tagline: "",
        title: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
    });
    const {params: item} = useRoute() as {params: Item};
    useEffect(() => {
        setLoading(true);
        console.log('item id', item.id)
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getMovieSimilar(item.id);
    }, [item]);

    const getMovieDetails = async (id:  string | number) => {
        const data = await fetchMovieDetails(id);
        if(data) setMovie(data);
        setLoading(false);
    }
    const getMovieCredits = async (id:  string | number) => {
        const data = await fetchMovieCredits(id);
        if(data && data.cast) setCast(data.cast);
    }

    const getMovieSimilar = async (id:  string | number) => {
        const data = await fetchMovieSimilar(id);
        console.log('data similar', data)
        if(data && data.results) setSimilarMovies(data.results);
    }

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
                            //@ts_ignore
                            source={{uri: image500(movie?.poster_path)}}
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
                {
                    movie?.title
                }
            </Text>
            {
                movie?.id ? (<Text className='text-neutral-400 font-semibold text-base text-center'>
                    {movie?.status} · {movie?.release_date.split('-')[0]} · {movie?.runtime} min
                </Text>) : null
            }

            <View className='flex-row justify-center mx-4 space-x-2'>
                {
                    movie?.genres?.map((genre: any, index) => {
                        let showDot = index + 1 != movie.genres.length;
                        return (
                            <Text className='text-neutral-400 font-semibold text-base text-center'>
                                {genre?.name}{showDot ? '  ·' : null}
                            </Text>
                        )
                    })
                }
            </View>
            <Text className='text-neutral-400 mx-4 tracking-wide'>
                {
                    movie?.overview
                }
            </Text>
        </View>

        {cast.length > 0 && <CastMembers cast={cast}/>}

        {similarMovies.length > 0 && <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
};
