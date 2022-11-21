import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export function setupStore(){
    return configureStore({
        reducer: {
            root: rootReducer
        },

    })
}