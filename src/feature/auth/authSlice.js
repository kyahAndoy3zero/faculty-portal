import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(sessionStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}


export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try{
        return await authService.register(userData)
    }catch(error){
        const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try{
        return await authService.login(userData)
    }catch(error){
        const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
        }
    },

    extraReducers: (builder) =>{
        builder
            .addCase(registerUser.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload 
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})



export const { reset} = authSlice.actions
export default authSlice.reducer