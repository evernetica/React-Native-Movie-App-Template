import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView} from "react-native";
import { Text, View } from 'react-native';
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {styles} from "../theme/color";
import TrendingMovies from "../components/trendingMovies";
import {MovieList} from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import {Loading} from "../components/loading";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/moviedb";

const ios = Platform.OS === 'ios';
export const HomeScreen = () => {
    const navigation = useNavigation();
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();

        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();

        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();

        if(data && data.results) setTopRated(data.results);
    }
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? 'mb-2' : 'mb-3'}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4" >
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity
                        // @ts-ignore
                        onPress={() => navigation.navigate('Search')}
                    >
                        <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        <MovieList title='Upcoming' data={upcoming} hideSeeAll={true} />
                        <MovieList title='Top Rated' data={topRated} hideSeeAll={true} />
                    </ScrollView>
                )
            }
        </View>
  );
};

