/* eslint-disable prettier/prettier */
export const SET_SCORE = 'SET_SECORE';
export const SET_PLAY = 'SET_PLAY';

export const setScore = (score: number) => (dispatch: any) => {
    dispatch({
        type: SET_SCORE,
        payload: score,
    });
};

export const setPlay = (play: boolean) => (dispatch: any) => {
    dispatch({
        type: SET_PLAY,
        payload: play,
    });
};
