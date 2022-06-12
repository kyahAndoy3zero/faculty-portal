import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
    profiles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getProfiles = createAsyncThunk('profiles/getAll', async(roomID, thunkAPI) => {

    try {
        const token = thunkAPI.getState().auth.user.token
   
        return await profileService.getProfiles(roomID, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const profileSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload
                // state.profiles.push(action.payload)

            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
   },
})


export const { reset } = profileSlice.actions
export default profileSlice.reducer