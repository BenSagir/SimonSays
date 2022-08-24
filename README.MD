# Simon Says - React Native Game

This is an implemetation of the long known game - Simon.
Once the game begin, a series of tones and lights and requires a user to repeat the sequence. If the user succeeds, the series becomes progressively longer and more complex. Once the user fails, the game is over.


## Disclaimer

The application was developed and tested for Android only.


## Free Download

You can download [the latest version](https://github.com/BenSagir/SimonSays/raw/master/App/assets/app-release.apk) straight to your android device.

## Installation

first of all, make sure you have [React Native CLI install properly on your computer](https://reactnative.dev/docs/environment-setup).

clone this repository to your computer using in the designated directory
```bash
git clone https://github.com/BenSagir/SimonSays.git
```
Once all the files are in the directory install all dependencies with

```bash
npm install
```


## Usage

To run the app make sure you have android device connected and the sound is on for the whole experience 

type the following command in the terminal

```bash
npx react-native run-android
```
you can use this insted for proper testing before releaseing an app
```bash
npx react-native run-android --variant=release
```
The app will build onto the device. This may take a few minutes so please be patient

