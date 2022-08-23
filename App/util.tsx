/* eslint-disable prettier/prettier */
import SoundPlayer from 'react-native-sound-player';

export default function playSound(colorCode: string) {
    try {
        // play the file tone.mp3
        let colorName = 'red';
        // let colorCode = clr.color;
        if (colorCode === '#f00') {
            colorName = 'red';
        }
        if (colorCode === '#0f0') {
            colorName = 'green';
        }
        if (colorCode === '#00f') {
            colorName = 'blue';
        }
        if (colorCode === '#ff0') {
            colorName = 'yellow';
        }

        SoundPlayer.playSoundFile(colorName, 'mp3');
        // or play from url
    } catch (e) {
        console.log('cannot play the sound file', e);
    }
}
