/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import { EDIT_TITLE, GET_LOGGED, SET_LOGGED, SET_LOGOUT } from "../constants/ActionTypes";

const State = {
    title: 'Aeolus',
    logged: true,
    name: '神奇小虾米',
    pic: 'https://avatars1.githubusercontent.com/u/10916771?s=460&v=4',
    status: 'online'
}

export default function (state = State, action) {
    switch (action.type) {
        case EDIT_TITLE:
            return {...state, title: action.title};
        case GET_LOGGED:
             return {...state};
        case SET_LOGGED:
            return {...state, logged: action.logged};
        case SET_LOGOUT:
            return {...state, logged: action.logged};
        default:
            return state;
    }
}