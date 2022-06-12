import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import roomService from './roomService'

const initialState = {
    rooms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const createRoom = createAsyncThunk('rooms/create', async(roomData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await roomService.createRoom(roomData, token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getRooms = createAsyncThunk('rooms/get', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await roomService.getRooms(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteRoom = createAsyncThunk('rooms/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await roomService.deleteRooms(id, token)
    } catch (error) {
        const message = (error.response && error.response.data
            && error.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRoom.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rooms.push(action.payload)
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRooms.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rooms = action.payload
            })
            .addCase(getRooms.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteRoom.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.rooms = state.rooms.filter((room) => room._id !== action.payload.id)
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
   },
})



export const {reset} = roomSlice.actions
export default roomSlice.reducer