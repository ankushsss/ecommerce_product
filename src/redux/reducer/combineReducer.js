import {configureStore} from '@reduxjs/toolkit'
import userLogin from './userLogin'
import productReducer from './productReducer'
import userReducer from './userReducer'

import logger from 'redux-logger'


const reducer ={
    userLogin: userLogin,
    product:productReducer,
    users:userReducer
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})