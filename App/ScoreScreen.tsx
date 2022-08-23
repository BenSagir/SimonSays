/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions, FlatList, Modal, TextInput, TouchableOpacity, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setScore } from './redux/actions';

const data = [
    { name: 'suzy', score: 5 }, { name: 'lior', score: 10 }, { name: 'ben', score: 50 }, { name: 'tamir', score: 15 }];

function ScoreScreen() {
    const { score } = useSelector((state: any) => state.scoreReducer);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState<string>('');

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.score}</Text>
            </View>
        );
    };

    const reargData = data.sort((a, b) => b.score - a.score).slice(0, 10)


    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.headline}>Best Scores</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.popup}>
                    <Text style={styles.text}>Game Over! you got score of {score}</Text>
                    <Text style={styles.text}>to save your score please enter your name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Your name...'}
                        placeholderTextColor={'#79a8d8'}
                        autoCapitalize={'words'}
                        autoCorrect={false}
                        value={input}
                        onChangeText={setInput}

                    />
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => { data.push({ name: input, score: score }); setModalVisible(!modalVisible); }}>
                            <Text style={styles.text}>Done!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={reargData}
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#e2e2e1',
    },
    row: {
        flexDirection: 'row'
    },
    input: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#79A8D8',
        paddingVertical: 16,
        paddingHorizontal: 22,
        width: Dimensions.get('screen').width * 90 / 100,
        margin: 7,
        fontSize: 20,
        color: '#273746'
    },
    popup: {

        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: '#fff',
        borderRadius: 11,
        padding: 40,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 9,
            height: 11,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 4,
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
    headline: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    },
    item: {
        alignSelf: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 11,
        backgroundColor: '#fff',
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
    button: {
        padding: 5,
        borderRadius: 11,
        backgroundColor: '#999',
    },
});

export default ScoreScreen;
