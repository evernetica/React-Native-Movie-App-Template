import React from 'react';
import {Dimensions, View} from "react-native";
import * as Progress from 'react-native-progress';
import {theme} from "../theme/color";

const {width, height} = Dimensions.get('window');
export const Loading = () => {
  return (
    <View style={{width, height}}  className='absolute justify-center items-center'>
        <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  );
};
