// FILL HERE 3.3
import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import missileSlice from "./missilesSlice";
import attackSlice from "./attackSlisce";


export const store = configureStore({
    reducer:{
        user: userReducer,
        missiles: missileSlice,
        attack: attackSlice
    }
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;