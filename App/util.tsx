/* eslint-disable prettier/prettier */
import SoundPlayer from 'react-native-sound-player';

export default function playSound(colorCode: string) {
    try {
        // play the .mp3 file depand on the color pressed
        let colorName = 'red';
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
    } catch (e) {
        console.log('cannot play the sound file', e);
    }
}
