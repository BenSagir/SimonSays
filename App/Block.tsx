/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Easing, TouchableWithoutFeedback } from 'react-native';


export default function Block(clr) {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [color, setColor] = useState();

    const coloring = () => {
        let temp = clr.color;
        setColor(temp);
    };
    const animate = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            animation.setValue(0);
        });
    };

    const animateScale = animation.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [1, 1, 1],
    });
    const animateOpacity = animation.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [1, 0.1, 1],
    });

    const animateStyle = {
        transform: [{ scale: animateScale }],
        opacity: animateOpacity,
    };

    useEffect(() => {
        coloring();
        animate();
    }, []);

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { animate() }}>
                <Animated.View style={animateStyle}>
                    <View style={[styles.block, { backgroundColor: color }]} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({

    block: {
        width: 100,
        height: 100,
    },
});


