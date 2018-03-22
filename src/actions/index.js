/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/5
 */
import * as types from '../constants/ActionTypes'

export const editTitle = (title) => ({ type: types.EDIT_TITLE, title })
export const getLogged = () => ({type: types.GET_LOGGED})
export const setLogged = (logged) => ({ type: types.SET_LOGGED, logged})
export const setLogout = (logged) => ({ type: types.SET_LOGOUT, logged})