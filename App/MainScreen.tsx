/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Block from './Block';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from './redux/actions';
import playSound from './util';

function MainScreen({ navigation }) {

    const { score } = useSelector((state: any) => state.scoreReducer);
    const dispatch = useDispatch();

    const [mainSeq, setMainSeq] = useState<string>('');
    const [userSeq, setUserSeq] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadRed, setLoadRed] = useState<boolean>(false);
    const [loadGreen, setLoadGreen] = useState<boolean>(false);
    const [loadBlue, setLoadBlue] = useState<boolean>(false);
    const [loadYellow, setLoadYellow] = useState<boolean>(false);

    const colors = ['R', 'G', 'B', 'Y'];                //bank of colors differ by the first letter of the color

    const newColor = () => {                            //genrate a random color from the color bank and add it to the end of the main sequence
        const random = Math.floor(Math.random() * colors.length);
        let temp = mainSeq;
        temp += colors[random];
        setMainSeq(temp);
    };

    const handleInput = (val: string) => {              //handle input from any press on the color buttons
        if (val !== 'R' && val !== 'G' && val !== 'B' && val !== 'Y') { return; }   //if the val is not a letter from the bank return

        if (val === 'R') { playSound('#f00'); }         //play the sound of the pressed color
        else if (val === 'G') { playSound('#0f0'); }
        else if (val === 'B') { playSound('#00f'); }
        else if (val === 'Y') { playSound('#ff0'); }

        let temp = userSeq;                             //append the pressed letter to the user sequence
        temp += val;
        let isOk = mainSeq.includes(temp, 0);           //isOK is a boolean. true when the user sequence is match to the start of the main sequence
        if (isOk) {
            if (mainSeq.length === temp.length) {       //if both sequences are in the same length therefor the user entered the right sequence
                setTimeout(() => {                      //set timeout for the last sound to be played
                    if (mainSeq === temp) {             //if there is a match between the main sequence and the user sequence
                        setUserSeq('');                 //set the user sequence back to empty
                        dispatch(setScore(score + 1) as any);   //increment the score by 1
                    }
                }, 1000);
            } else { setUserSeq(temp); }                //if the user is in the middle of his sequence, set the temp input as the user sequnce for further inputs
        }
        else {                                          //whenever there is no match between the sequences, GAME OVER
            setMainSeq('');                             //set the main seq to empty
            setUserSeq('');                             //as well as the user seq
        }
    };

    const newGame = () => {                             //set a new game
        setMainSeq('');
        setUserSeq('');
        dispatch(setScore(0) as any);
    };

    async function display() {                          //display function to present the animation and sound of the new sequnece that the user should be following
        let timelen = mainSeq.length * 1000;            //the amount of miliseconds require for the whole animation the roll
        setLoading(true);                               //set loading to true - the animtaion starts and the user cant press any color
        setTimeout(() => setLoading(false), timelen);   //set the loading to false when the animation is done

        for (let i = 0; i <= mainSeq.length; i++) {

            if (i === 0) {                              //if the first letter setLoadColor to true to start the animation
                if (mainSeq[i] === 'R') { setLoadRed(true); }
                if (mainSeq[i] === 'G') { setLoadGreen(true); }
                if (mainSeq[i] === 'B') { setLoadBlue(true); }
                if (mainSeq[i] === 'Y') { setLoadYellow(true); }
            }
            let timer = 1000 * i;                       //a timer for each color animation
            setTimeout(() => {                          //timeout to stop the animation of the current color and start the animation for the next color
                var next;
                const letter = mainSeq[i];
                if (i + 1 < mainSeq.length) { next = mainSeq[i + 1]; }
                if (letter === 'R') { setLoadRed(false); }
                else if (letter === 'G') { setLoadGreen(false); }
                else if (letter === 'B') { setLoadBlue(false); }
                else if (letter === 'Y') { setLoadYellow(false); }
                if (next === 'R') { setLoadRed(true); }
                else if (next === 'B') { setLoadBlue(true); }
                else if (next === 'G') { setLoadGreen(true); }
                else if (next === 'Y') { setLoadYellow(true); }
            }, 1000 + timer);
        }
    }

    useEffect(() => {   //whenever the score is updated, get the next color add and a new turn
        newColor();
    }, [score]);

    useEffect(() => {   //whenever the main sequecne is changed, display the animation
        display();
    }, [mainSeq]);



    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => navigation.navigate('Result')}>
                <Text style={styles.text}>to results</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Score: {score}</Text>
            <Text style={styles.text}>{mainSeq}</Text>

            <TouchableOpacity style={styles.start} onPress={() => { newGame(); }}>
                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>

            <View style={[styles.game, { borderColor: loading ? '#999' : '#e2e2e1' }]}>
                <View style={styles.row}>
                    {loading ? loadRed ? <Block color={'#f00'} /> : <View style={styles.red} /> :
                        <TouchableOpacity style={styles.red} onPress={() => handleInput('R')} />}

                    {loading ? loadGreen ? <Block color={'#0f0'} /> : <View style={styles.green} /> :
                        <TouchableOpacity style={styles.green} onPress={() => handleInput('G')} />}
                </View>
                <View style={styles.row}>
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
    start: {
        padding: 5,
        borderRadius: 11,
        backgroundColor: '#999',
    },
    row: {
        flexDirection: 'row',
    },
    game: {
        borderRadius: 200,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 10,
    },
    red: {
        backgroundColor: '#f00',
        width: 150,
        height: 150,
    },
    green: {
        backgroundColor: '#0f0',
        width: 150,
        height: 150,
    },
    blue: {
        backgroundColor: '#00f',
        width: 150,
        height: 150,
    },
    yellow: {
        backgroundColor: '#ff0',
        width: 150,
        height: 150,
    },
});
export default MainScreen;
