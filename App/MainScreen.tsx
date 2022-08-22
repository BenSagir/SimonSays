/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Block from './Block';

function MainScreen() {
    const [mainSeq, setMainSeq] = useState('');
    const [userSeq, setUserSeq] = useState('');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadRed, setLoadRed] = useState(false);
    const [loadGreen, setLoadGreen] = useState(false);
    const [loadBlue, setLoadBlue] = useState(false);
    const [loadYellow, setLoadYellow] = useState(false);

    const colors = ['R', 'G', 'B', 'Y'];

    const newColor = () => {
        const random = Math.floor(Math.random() * colors.length);
        let temp = mainSeq;
        temp += colors[random];
        setMainSeq(temp);
    };

    const handleInput = val => {
        let temp = userSeq;
        temp += val;
        let isOk = mainSeq.includes(temp, 0);

        if (isOk) {
            if (mainSeq.length === temp.length) {
                if (mainSeq === temp) {
                    setUserSeq('');
                    setScore(score + 1);
                }
            } else
                setUserSeq(temp);
        }
        else {
            setMainSeq('');
            setUserSeq('');
        }
    };

    const newGame = () => {
        setMainSeq('');
        setUserSeq('');
        setScore(0);
    };

    async function display() {
        let timelen = mainSeq.length * 1000;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, timelen);

        for (let i = 0; i <= mainSeq.length; i++) {

            if (i === 0) {
                if (mainSeq[i] === 'R') setLoadRed(true);
                if (mainSeq[i] === 'G') setLoadGreen(true);
                if (mainSeq[i] === 'B') setLoadBlue(true);
                if (mainSeq[i] === 'Y') setLoadYellow(true);
            }
            let timer = 1000 * i;
            setTimeout(() => {
                var next;
                const letter = mainSeq[i];
                if (i + 1 < mainSeq.length)
                    next = mainSeq[i + 1];
                if (letter === 'R') setLoadRed(false);
                else if (letter === 'G') setLoadGreen(false);
                else if (letter === 'B') setLoadBlue(false);
                else if (letter === 'Y') setLoadYellow(false);
                if (next === 'R') setLoadRed(true);
                else if (next === 'B') setLoadBlue(true);
                else if (next === 'G') setLoadGreen(true);
                else if (next === 'Y') setLoadYellow(true);
            }, 1000 + timer);


        }
    }

    useEffect(() => {
        newColor();
    }, [score]);

    useEffect(() => {
        display();
    }, [mainSeq]);



    return (
        <View style={styles.main}>
            <Text style={styles.text}>Score: {score}</Text>
            <Text style={styles.text}>{mainSeq}</Text>
            {/* <TouchableOpacity style={{ backgroundColor: loading ? '#000' : '#fff' }} onPress={() => setLoading(!loading)}>
                <Text style={styles.text}>Black True -- White False   loading</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ backgroundColor: '#f00', width: 50, height: 50, borderWidth: loadRed ? 2 : 0 }} onPress={() => setLoadRed(!loadRed)} />
                <TouchableOpacity style={{ backgroundColor: '#0f0', width: 50, height: 50, borderWidth: loadGreen ? 2 : 0 }} onPress={() => setLoadGreen(!loadGreen)} />
                <TouchableOpacity style={{ backgroundColor: '#00f', width: 50, height: 50, borderWidth: loadBlue ? 2 : 0 }} onPress={() => setLoadBlue(!loadBlue)} />
                <TouchableOpacity style={{ backgroundColor: '#ff0', width: 50, height: 50, borderWidth: loadYellow ? 2 : 0 }} onPress={() => setLoadYellow(!loadYellow)} />
            </View> */}

            <TouchableOpacity style={{ backgroundColor: '#999', height: 40 }} onPress={() => { newGame(); }}>
                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
            <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                    {loading ? loadRed ? <Block color={'#f00'} /> : <View style={styles.red} /> :
                        <TouchableOpacity style={styles.red} onPress={() => handleInput('R')} />}

                    {loading ? loadGreen ? <Block color={'#0f0'} /> : <View style={styles.green} /> :
                        <TouchableOpacity style={styles.green} onPress={() => handleInput('G')} />}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {loading ? loadBlue ? <Block color={'#00f'} /> : <View style={styles.blue} /> :
                        <TouchableOpacity style={styles.blue} onPress={() => handleInput('B')} />}

                    {loading ? loadYellow ? <Block color={'#ff0'} /> : <View style={styles.yellow} /> :
                        <TouchableOpacity style={styles.yellow} onPress={() => handleInput('Y')} />}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#e2e2e1',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#48484A',
        fontSize: 25,
    },
    temp: {
        color: '#48484A',
        fontWeight: 'bold',
        fontSize: 65,
    },
    img: {
        width: 100,
        height: 100,
    },
    red: { backgroundColor: '#f00', width: 100, height: 100 },
    green: { backgroundColor: '#0f0', width: 100, height: 100 },
    blue: { backgroundColor: '#00f', width: 100, height: 100 },
    yellow: { backgroundColor: '#ff0', width: 100, height: 100 },
});
export default MainScreen;
