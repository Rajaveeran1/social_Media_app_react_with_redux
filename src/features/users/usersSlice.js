import { createSlice, } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import axois  from "axois"
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []


// const  initialState = {
//     users: [],
//     status: 'idle',
//     error: null
// }


export const fetchUsers =  createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
 })


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})



export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer