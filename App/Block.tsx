/* eslint-disable prettier/prettier */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, View, Easing, TouchableWithoutFeedback } from 'react-native';
import playSound from './util';

export default function Block(clr: any) {
    const [animation, setAnimation] = useState<Animated.Value>(new Animated.Value(0));
    const [color, setColor] = useState<string>('');

    const coloring = () => {
        let temp: string = clr.color;
        setColor(temp);
    };
    const animate = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => animation.setValue(0));
    };

    const animateOpacity = animation.interpolate({
        inputRange: [0, 0.3, 0.6, 1],
        outputRange: [0, 0.5, 0.5, 1],
    });

    const animateStyle = { opacity: animateOpacity };

    useEffect(() => {
        coloring();
        animate();
        playSound(clr.color);
    }, []);

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { }}>
                <Animated.View style={animateStyle}>
                    <View style={[styles.block, { backgroundColor: color }]} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        width: 150,
        height: 150,
    },
});
