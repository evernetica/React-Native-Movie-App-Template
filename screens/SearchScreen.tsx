import React, {useCallback, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View, TextInput, Image} from "react-native";
import {ScrollView, TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {Loading} from "../components/loading";
import debounce from "debounce";
import {fetchSearchMovies, image185} from "../api/moviedb";

const {width, height} = Dimensions.get('window');
export const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const [results, setResults] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Humanitarian';
    const handleSearch = (value: string) => {
        if(value && value.length > 2) {
            setLoading(true)
            fetchSearchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1',
            }).then(data => {
                setLoading(false);
                if(data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
            <TextInput
                onChangeText={handleTextDebounce}
                placeholder='Search Movie'
                placeholderTextColor={'lightgray'}
                className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
            />
          <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              className='rounded-full p-3 m-1 bg-neutral-500'
          >
              <XMarkIcon size='25' color='white' />
          </TouchableOpacity>
      </View>
        {
            loading ? (
                <Loading />
            ) : (
                results.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className='space-y-3'
                    >
                        <Text className='text-white font-semibold ml-1'>
                            Results ({results.length})
                        </Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback
                                            key={index}
                                            onPress={()=> navigation.push('Movie', item)}
                                        >
                                            <View className='space-y-2 mb-4'>
                                                <Image
                                                    className='rounded-3xl'
                                                    source={{uri: image185(item?.poster_path)}}
                                                    style={{width: width*0.44, height: height*0.3}}
                                                />
                                                <Text className='text-neutral-400 ml-1'>
                                                    {
                                                        item?.title.length > 22 ? item?.title.slice(0,22) : item?.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })

                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className='flex-row justify-center items-center'>
                        <Image
                            source={require('../assets/search-result.png')}
                            style={{
                                flex: 1,
                                marginTop: 200,
                                width: 100,
                                height: 150,
                                marginHorizontal: 20
                            }}
                        />
                    </View>
                )
            )
        }
    </SafeAreaView>
  );
};
