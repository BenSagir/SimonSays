/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setScore, setPlay } from './redux/actions';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();          //instance of ondevice storage

interface Scores {                          //type of score object
    name: string,
    score: number,
}

function ScoreScreen({ navigation }: any) {
    const { score } = useSelector((state: any) => state.scoreReducer);
    const dispatch = useDispatch();

    const [modal, setModal] = useState<boolean>(true);
    const [input, setInput] = useState<string>('');
    const [data, setData] = useState<Scores[]>([]);
    const [isFail, setIsFail] = useState<boolean>(false);

    const renderItem = (item: any) => {     //render function of each score object in a flatlist
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.score}</Text>
            </View>
        );
    };

    // sort by score and take only top 10 elements
    const sortData = (arr: Scores[]) => { return arr.sort((a, b) => b.score - a.score).slice(0, 10); };

    const readStoarge = () => {             //read from storage function
        try {                               //get the object as json from string ans sort wth the sort fucntion
            const object: Scores[] = JSON.parse(storage.getString('data') as any);
            setData(sortData(object));
        } catch { setIsFail(true); }
    };

    const writeStorage = () => storage.set('data', JSON.stringify(data)); //function to write to storage the recent data

    const addNewScore = () => {             //function to add new element to the data
        const obj: Scores = { name: input, score: score };  //create new object from the input name and the score from the game
        let temp: Scores[] = data;          // take the current data as instance
        temp.push(obj);                     //add the new score to the data
        setData(sortData(temp));            //set the sorted new data to the state variable
        writeStorage();                     //write to the storage
    };

    const newGame = () => {                 //function to start a new game on the main screen
        dispatch(setPlay(true) as any);     //set play as true
        dispatch(setScore(0) as any);       //set the score back to 0
        navigation.goBack();                //navigate back to the main screen
    };

    useEffect(() => {                       //on loading the screen, go to read the storage for the stored data
        readStoarge();
    }, []);


    return (
        <View style={styles.main}>
            <Text style={styles.headline}>Best Scores</Text>

            <TouchableOpacity style={styles.start} onPress={() => newGame()}>
                <Text style={styles.text}>New Game</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={styles.popup}>
                    <Text style={styles.boldText}>Game Over!</Text>
                    <Text style={styles.popText}> you got score of {score}</Text>
                    <Text style={styles.popText}>to save your score please enter your name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Your name...'}
                        placeholderTextColor={'#9e2f8b'}
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        value={input}
                        onChangeText={setInput}
                    />
                    <View style={styles.row}>
                        {input.length > 0 ?
                            <TouchableOpacity style={styles.button} onPress={() => { addNewScore(); setModal(!modal); }}>
                                <Text style={styles.popText}>Done!</Text>
                            </TouchableOpacity> :
                            <View style={styles.buttonX}>
                                <Text style={styles.popText}>Done?</Text>
                            </View>
                        }
                        {!isFail ? <TouchableOpacity style={styles.button} onPress={() => setModal(!modal)}>
                            <Text style={styles.popText}>Cancel</Text>
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </Modal>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => renderItem(item)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#241b2f',
        flex: 1,

    },
    container: {
        backgroundColor: '#241b2f',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    input: {
        flexDirection: 'row',
        backgroundColor: '#262335',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#f170db',
        paddingVertical: 16,
        paddingHorizontal: 22,
        width: Dimensions.get('screen').width * 75 / 100,
        margin: 25,
        fontSize: 20,
        color: '#eee',
    },
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 60,
        backgroundColor: '#171520',
        borderRadius: 11,
        padding: 40,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 9,
            height: 11,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 12,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    popText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 6,
    },
    boldText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 6,
    },
    headline: {
        color: '#36f9ea',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
        margin: 10,
    },
    item: {
        alignSelf: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 11,
        backgroundColor: '#171520',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 90 / 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 9,
            height: 11,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 4,
        flexDirection: 'row',
    },
    start: {
        padding: 5,
        borderRadius: 11,
        backgroundColor: '#262335',
    },
    button: {
        padding: 5,
        borderRadius: 11,
        backgroundColor: '#262335',
        margin: 10,
        marginHorizontal: 25,
        borderColor: '#4c3c5e',
        borderWidth: 2,
    },
    buttonX: {
        padding: 5,
        borderRadius: 11,
        borderColor: '#262335',
        borderWidth: 2,
        margin: 10,
        marginHorizontal: 25,
    },
});

export default ScoreScreen;
