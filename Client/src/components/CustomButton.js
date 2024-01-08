import React from "react";
import { Pressable, Animated } from "react-native";


const PressableOpacity = ({ children, ...props }) => {


    return (
        <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
            <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
        </Pressable>
    );
};
const animated = new Animated.Value(1);
export default PressableOpacity;