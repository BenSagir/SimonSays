import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from './redux/actions';





function ScoreScreen() {

    const { score } = useSelector((state: any) => state.scoreReducer);
    const dispatch = useDispatch();

    return (
        <View style={styles.main}>
            <Text style={styles.text}>{score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#594'
    },
    text: {
        color: '#000',
        fontSize: 25
    },
});

export default ScoreScreen;