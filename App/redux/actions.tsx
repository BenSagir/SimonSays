/* eslint-disable prettier/prettier */
export const SET_SCORE = 'SET_SECORE';

export const setScore = (score: number) => (dispatch: any) => {
    dispatch({
        type: SET_SCORE,
        payload: score,
    });
};
