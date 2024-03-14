import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {Image, Text, View, Dimensions} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";

const {width, height} = Dimensions.get('window')
export default function TrendingMovies({data}) {
  const navigation = useNavigation<any>();
    const handleClick = (item: any) => {
        navigation.navigate('Movie', item)
    }
    return (
    <View className='mb-8'>
        <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
        <Carousel
           data={data}
           renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
           firstItem={1}
           inactiveSlideOpacity={0.60}
           sliderWidth={width}
           itemWidth={width*0.62}
           slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  );
};

const MovieCard = ({item, handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick(item)}>
            <Image
                source={require('../assets/icon.png')}
                style={{
                    width: width*0.6,
                    height: height*0.4
                }}
                className='rounded-3xl' />
        </TouchableWithoutFeedback>
    )
}
