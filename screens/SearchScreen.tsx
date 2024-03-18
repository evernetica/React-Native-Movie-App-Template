import React, {useState} from 'react';
import {Dimensions, SafeAreaView, Text, View, TextInput, Image} from "react-native";
import {ScrollView, TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {XMarkIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {Loading} from "../components/loading";

const {width, height} = Dimensions.get('window');
export const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const [results, setResults] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Humanitarian';
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
            <TextInput
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
                                                    source={require('../assets/icon.png')}
                                                    style={{width: width*0.44, height: height*0.3}}
                                                />
                                                <Text className='text-neutral-400 ml-1'>
                                                    {
                                                        movieName.length > 22 ? movieName.slice(0,22) : movieName
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
                    <View className='flex-row justify-center'>
                        // TODO add picture if there are no search result
                        <Image
                            source={require('../assets/icon.png')}
                            className='h-96 w-96'
                        />
                    </View>
                )
            )
        }
    </SafeAreaView>
  );
};