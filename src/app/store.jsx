import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../feature/auth/authSlice'
import profileReducer from '../feature/profile/profileSlice'
import roomReducer from '../feature/room/roomSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        profiles: profileReducer,
        rooms: roomReducer
    }
})