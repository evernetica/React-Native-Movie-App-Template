import React from 'react';
import {Text, View} from "react-native";

export const MovieList = ({title, data}) => {
  return (
    <View className='mb'>
        <Text>{title}</Text>
    </View>
  );
};
